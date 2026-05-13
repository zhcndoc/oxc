---
title: "eslint/no-inner-declarations | Oxlint"
rule: "eslint/no-inner-declarations"
category: "Pedantic"
version: "0.0.5"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_inner_declarations.rs`;
</script>

<RuleHeader />

### 作用

禁止在嵌套块中声明变量或函数。

### 为什么这不好？

变量声明可以出现在语句可以出现的任何地方，即使是深度嵌套在其他块内部。
由于变量提升，这通常并不理想，而且将声明移动到程序或函数体的根部可以提高清晰度。
请注意，块级绑定（let、const）不会被提升，因此它们不受此规则影响。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (test) {
  function doSomethingElse() {}
}
```

以下是此规则的**正确**代码示例：

```javascript
function doSomethingElse() {}
if (test) {
  // 你的代码在这里
}
```

## 配置

### 第 1 个选项

type: `"functions" | "both"`

决定要检查哪种类型的声明。

#### `"functions"`

禁止在嵌套块中声明函数。

#### `"both"`

禁止在嵌套块中声明函数和 var。

### 第 2 个选项

此选项是一个具有以下属性的对象：

#### blockScopedFunctions

type: `"allow" | "disallow"`

控制在严格模式下是否允许在嵌套块中声明函数（ES6+ 行为）。

##### `"allow"`

在严格模式下允许在嵌套块中声明函数（ES6+ 行为）。

##### `"disallow"`

无论是否为严格模式，都禁止在嵌套块中声明函数。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.5 中添加的。

## 参考资料

<RuleReferences />
