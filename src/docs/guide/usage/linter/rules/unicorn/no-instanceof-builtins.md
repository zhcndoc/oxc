---
title: "unicorn/no-instanceof-builtins"
category: "可疑"
default: false
type_aware: false
fix: "conditional_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_instanceof_builtins.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将 `instanceof` 与 ECMAScript 内置构造函数一起使用，因为：

- 它会在不同执行上下文之间失效（`iframe`、Web Worker、Node VM 等）；
- 它常常具有误导性（例如，`instanceof Array` 对子类会失败）；
- 总是存在更清晰、更安全的替代方案（`Array.isArray`、`typeof`、`Buffer.isBuffer` 等）。

### 为什么这不好？

`instanceof` 会在不同执行上下文之间失效（`iframe`、Web Worker、Node `vm`），
并且对于子类或奇异对象可能给出误导性的结果。

### 示例

该规则的 **错误** 代码示例：

```javascript
if (arr instanceof Array) { … }
if (el instanceof HTMLElement) { … }
```

该规则的 **正确** 代码示例：

```javascript
if (Array.isArray(arr)) { … }
if (el?.nodeType === 1) { … }
```

## 配置

此规则接受一个包含以下属性的配置对象：

### exclude

type: `string[]`

default: `[]`

要从检查中排除的构造函数名称。

### include

type: `string[]`

default: `[]`

除默认集合之外，还要额外检查的构造函数名称。
使用它可为该规则扩展更多构造函数。

### strategy

type: `"strict" | "loose"`

default: `"loose"`

控制检查哪些内置构造函数。

#### `"strict"`

还会额外检查 Error 类型、集合、类型数组以及其他内置构造函数。

#### `"loose"`

仅检查 Array、Function、Error（如果 `useErrorIsError` 为 true）以及基本类型包装对象。

### useErrorIsError

type: `boolean`

default: `false`

当为 `true` 时，会检查 `instanceof Error`，并建议改用 `Error.isError()`。
需要可用 [`Error.isError()` 函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/isError)。

## 如何使用

<RuleHowToUse />

## 参考资料

<RuleReferences />
