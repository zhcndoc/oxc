---
title: AST
outline: deep
---

# 抽象语法树 (AST)

Oxc AST 是所有 Oxc 工具的基础。理解其结构以及如何操作它对于贡献解析器、linter、转换器和其他组件至关重要。

## AST 架构

### 设计原则

Oxc AST 的设计遵循以下原则：

1. **性能优先**：针对速度和内存效率进行优化
2. **类型安全**：利用 Rust 的类型系统防止常见错误
3. **规范合规**：紧密遵循 ECMAScript 规范
4. **语义清晰**：消除其他 AST 格式中存在的歧义

## 使用 AST

### 生成 AST 相关代码

当你修改 AST 定义时，运行代码生成工具：

```bash
just ast
```

这将生成：

- **访问者模式**：用于遍历 AST
- **构建器方法**：用于构建 AST 节点
- **Trait 实现**：用于常见操作
- **TypeScript 类型**：用于 Node.js 绑定

### AST 节点结构

每个 AST 节点都遵循一致的模式：

```rust
#[ast(visit)]
pub struct FunctionDeclaration<'a> {
    pub span: Span,
    pub id: Option<BindingIdentifier<'a>>,
    pub generator: bool,
    pub r#async: bool,
    pub params: FormalParameters<'a>,
    pub body: Option<FunctionBody<'a>>,
    pub type_parameters: Option<TSTypeParameterDeclaration<'a>>,
    pub return_type: Option<TSTypeAnnotation<'a>>,
}
```

关键组件：

- **`span`**：源代码位置信息
- **`#[ast(visit)]`**：生成访问者方法
- **生命周期 `'a`**：指向 arena 分配内存的引用

### 内存管理

AST 使用内存 arena 进行高效分配：

```rust
use oxc_allocator::Allocator;

let allocator = Allocator::default();
let ast = parser.parse(&allocator, source_text, source_type)?;
```

优势：

- **快速分配**：无需单独的 malloc 调用
- **快速释放**：一次性释放整个 arena
- **缓存友好**：线性内存布局
- **无引用计数**：简单的生命周期管理

## AST 遍历

### 访问者模式

使用生成的访问者进行 AST 遍历：

```rust
use oxc_ast::visit::{Visit, walk_mut};

struct MyVisitor;

impl<'a> Visit<'a> for MyVisitor {
    fn visit_function_declaration(&mut self, func: &FunctionDeclaration<'a>) {
        println!("发现函数：{:?}", func.id);
        walk_mut::walk_function_declaration(self, func);
    }
}

// 用法
let mut visitor = MyVisitor;
visitor.visit_program(&program);
```

### 可变访问者

`VisitMut` 可用于在遍历期间修改 AST。

例如，将字符串字面量的二元加法转换为单个字符串字面量：

```rust
use oxc_ast::AstBuilder;
use oxc_ast_visit::{VisitMut, walk_mut};
use oxc_str::Str;

struct MyTransformer<'a> {
    pub builder: &'a AstBuilder<'a>,
}

impl<'a> VisitMut<'a> for MyTransformer<'a> {
    fn visit_expression(&mut self, expr: &mut Expression<'a>) {
        // 检测你想在从一种枚举变体变为另一种时修改的表达式类型。
        if let Expression::BinaryExpression(bin_expr) = expr
            && let (
                BinaryOperator::Addition,
                Expression::StringLiteral(sl),
                Expression::StringLiteral(sr),
            ) = (bin_expr.operator, &bin_expr.left, &bin_expr.right)
        {
            let value = Str::from_strs_array_in(
                [sl.value.as_str(), sr.value.as_str()],
                self.builder.allocator,
            );
            *expr = self.builder.expression_string_literal(SPAN, value, None);
        }

        walk_mut::walk_expression(self, expr);
    }
}
```

例如，在不改变其类型的情况下修改二元表达式：

```rust
use oxc_ast::AstBuilder;
use oxc_ast_visit::{VisitMut, walk_mut};

struct MyTransformer<'a> {
    pub builder: &'a AstBuilder<'a>,
}

impl<'a> VisitMut<'a> for MyTransformer<'a> {
    fn visit_binary_expression(&mut self, expr: &mut BinaryExpression<'a>) {
        if expr.operator == BinaryOperator::Addition {
            // 修改 AST 节点。你只能修改 left/right 和 operator 部分，不能修改表达式本身的类型。
        }
        walk_mut::walk_binary_expression(self, expr);
    }
}
```

## AST 构建

### 构建器模式

使用 AST 构建器创建节点：

```rust
use oxc_ast::AstBuilder;

let ast = AstBuilder::new(&allocator);

// 创建一个二元表达式：a + b
let left = ast.expression_identifier_reference(SPAN, "a");
let right = ast.expression_identifier_reference(SPAN, "b");
let expr = ast.expression_binary_expression(
    SPAN,
    left,
    BinaryOperator::Addition,
    right,
);
```

### 辅助函数

常用模式作为辅助函数提供：

```rust
impl<'a> AstBuilder<'a> {
    pub fn expression_numeric_literal(&self, span: Span, value: f64) -> Expression<'a> {
        self.alloc(Expression::NumericLiteral(
            self.alloc(NumericLiteral { span, value, raw: None })
        ))
    }
}
```

## 开发工作流

### 添加新的 AST 节点

1. **定义结构体**：

   ```rust
   #[ast(visit)]
   pub struct MyNewNode<'a> {
       pub span: Span,
       pub name: Atom<'a>,
       pub value: Expression<'a>,
   }
   ```

2. **添加到枚举**：

   ```rust
   pub enum Statement<'a> {
       // ... 现有变体
       MyNewStatement(Box<'a, MyNewNode<'a>>),
   }
   ```

3. **运行代码生成**：

   ```bash
   just ast
   ```

4. **实现解析逻辑**：
   ```rust
   impl<'a> Parser<'a> {
       fn parse_my_new_node(&mut self) -> Result<MyNewNode<'a>> {
           // 解析实现
       }
   }
   ```

## 比较 AST 格式

### 使用 AST Explorer

为了与其他解析器进行比较，使用 [ast-explorer.dev](https://ast-explorer.dev)：

1. **更好的 UI**：具有语法高亮的现代界面
2. **最新**：最新的解析器版本
3. **多种解析器**：比较 Oxc、Babel、TypeScript 等
4. **导出格式**：JSON、代码生成

## 性能考量

### 内存布局

AST 专为缓存效率而设计：

```rust
// 好：紧凑表示
struct CompactNode<'a> {
    span: Span,           // 8 字节
    flags: u8,            // 1 字节
    name: Atom<'a>,       // 8 字节
}

// 避免：未装箱的大枚举
enum LargeEnum {
    Small,
    Large { /* 200 字节的数据 */ },
}
```

### Arena 分配

所有 AST 节点都在 arena 中分配：

```rust
// 由 #[ast] 宏自动处理
let node = self.ast.alloc(MyNode {
    span: SPAN,
    value: 42,
});
```

### 枚举大小测试

我们强制要求较小的枚举大小：

```rust
#[cfg(all(target_arch = "x86_64", target_pointer_width = "64"))]
#[test]
fn no_bloat_enum_sizes() {
    use std::mem::size_of;
    assert_eq!(size_of::<Statement>(), 16);
    assert_eq!(size_of::<Expression>(), 16);
    assert_eq!(size_of::<Declaration>(), 16);
}
```

## 高级主题

### 自定义 AST 属性

为特定工具添加自定义属性：

```rust
#[ast(visit)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
pub struct MyNode<'a> {
    #[cfg_attr(feature = "serialize", serde(skip))]
    pub internal_data: u32,
    pub public_field: Atom<'a>,
}
```

### 与语义分析集成

将 AST 节点与语义信息链接：

```rust
#[ast(visit)]
pub struct IdentifierReference<'a> {
    pub span: Span,
    pub name: Atom<'a>,
    #[ast(ignore)]
    pub reference_id: Cell<Option<ReferenceId>>,
}
```

这允许工具在 AST 遍历期间访问绑定信息、作用域上下文和类型信息。

## 调试技巧

### 美化打印

使用调试格式化器检查 AST：

```rust
println!("{:#?}", ast_node);
```

### Span 信息

跟踪源代码位置以用于错误报告：

```rust
let span = node.span();
println!("错误位置：{}:{}", span.start, span.end);
```
