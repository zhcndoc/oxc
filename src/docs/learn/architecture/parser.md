---
title: 解析器
outline: deep
---

# 解析器架构

Oxc 维护着自己的 AST 和解析器，这是迄今为止用 Rust 编写的最快且最符合标准的 JavaScript 和 TypeScript（包括 JSX 和 TSX）解析器。

由于解析器通常是 JavaScript 工具链中的关键性能瓶颈，
任何微小的改进都可能对我们的下游工具产生连锁反应。
通过开发我们自己的解析器，我们有机会探索和实施经过充分研究的性能技术。

## AST 设计哲学

虽然许多现有的 JavaScript 工具依赖 [estree] 作为其 AST 规范，
但一个显著的缺点是其存在大量模糊的节点。
这种模糊性往往导致在使用 [estree] 开发时产生混淆。

Oxc AST 与 [estree] AST 的不同之处在于移除了模糊节点并引入了独特的类型。
例如，Oxc AST 不使用通用的 [estree] `Identifier`，
而是提供特定的类型，如 `BindingIdentifier`、`IdentifierReference` 和 `IdentifierName`。

这种清晰的区分通过与 ECMAScript 规范更紧密地对齐，极大地增强了开发体验。

### AST 节点类型

```rust
// 而不是通用的 Identifier
pub struct BindingIdentifier<'a> {
    pub span: Span,
    pub name: Atom<'a>,
}

pub struct IdentifierReference<'a> {
    pub span: Span,
    pub name: Atom<'a>,
    pub reference_id: Cell<Option<ReferenceId>>,
}

pub struct IdentifierName<'a> {
    pub span: Span,
    pub name: Atom<'a>,
}
```

### 语义清晰度

这种方法提供了语义清晰度：

- **`BindingIdentifier`**：变量声明（`let x = 1`）
- **`IdentifierReference`**：变量使用（`console.log(x)`）
- **`IdentifierName`**：属性名（`obj.property`）

## 性能架构

### 为何如此快速

- **内存竞技场（Memory Arena）**：AST 分配在 [内存竞技场](https://crates.io/crates/bumpalo) 中，以实现快速的分配和释放
- **字符串优化**：短字符串通过 [CompactString](https://crates.io/crates/compact_str) 进行内联
- **最小化堆使用**：除上述两项外，不进行其他堆分配
- **关注点分离**：作用域绑定、符号解析和一些语法错误被委托给语义分析器

### 内存管理细节

#### 竞技场分配

```rust
use oxc_allocator::Allocator;

// 所有 AST 节点都分配在这个竞技场中
let allocator = Allocator::default();
let ast_node = allocator.alloc(Expression::NumericLiteral(
    allocator.alloc(NumericLiteral { value: 42.0, span: SPAN })
));
```

优势：

- **O(1) 分配**：简单的指针 bump
- **O(1) 释放**：一次性释放整个竞技场
- **缓存友好**：线性内存布局
- **无碎片**：连续的内存使用

#### 使用 CompactString 进行字符串驻留

```rust
// 长度 ≤ 24 字节的字符串以内联方式存储（无堆分配）
let short_name = CompactString::from("variableName");  // 栈分配
let long_name = CompactString::from("a_very_long_variable_name_that_exceeds_limit");  // 堆分配
```

这减少了大多数 JavaScript 标识符和字符串字面量的内存分配。

## 解析器架构

### 两阶段设计

Oxc 解析器遵循两阶段方法：

1. **解析阶段**：构建 AST 结构，进行最少的语义分析
2. **语义阶段**：执行作用域分析、符号解析和高级错误检查

```rust
// 阶段 1：解析为 AST
let parser_result = Parser::new(&allocator, &source_text, source_type).parse();

// 阶段 2：语义分析
let semantic_result = SemanticBuilder::new()
    // 启用解析器未执行的额外语法检查
    .with_check_syntax_error(true)
    .build(&parser_result.program);
```

### 解析器组件

#### 词法分析器

- **Token 生成**：将源文本转换为结构化 token
- **SIMD 优化**：使用 SIMD 指令跳过空白字符
- **上下文感知**：处理正则表达式与除法运算符的消歧

#### 递归下降解析器

- **手写**：自定义实现以获得最大性能
- **错误恢复**：具有有意义消息的高级错误处理
- **语法合规**：精确遵循 ECMAScript 规范

#### AST 构建器

- **类型安全**：利用 Rust 的类型系统确保正确性
- **内存效率**：直接竞技场分配
- **构建器模式**：便捷的节点构建方法

## 一致性策略

### 测试套件覆盖率

- **Test262**：ECMAScript 一致性测试 100% 通过率
- **Babel**：与 Babel 解析器测试 99.62% 兼容
- **TypeScript**：与 TypeScript 编译器测试 99.86% 兼容

### 错误处理哲学

```rust
// 带有源位置的意义明确的错误消息
pub struct OxcDiagnostic {
    pub message: String,
    pub span: Span,
    pub severity: Severity,
    pub help: Option<String>,
}
```

解析器提供：

- **精确的错误位置**：确切的源位置
- **恢复策略**：错误后继续解析
- **有用的建议**：可操作的错误消息

## 高级特性

### TypeScript 支持

- **类型剥离**：移除 TypeScript 特定语法
- **装饰器解析**：处理实验性装饰器
- **命名空间支持**：完整的模块和命名空间解析
- **JSX 集成**：TypeScript + JSX (TSX) 支持

### 研究领域

- **SIMD 文本处理**：向量化字符串操作
- **缓存优化**：最小化内存访问模式
- **分支预测**：优化热点解析路径
- **零拷贝解析**：消除不必要的字符串复制

[estree]: https://github.com/estree/estree
