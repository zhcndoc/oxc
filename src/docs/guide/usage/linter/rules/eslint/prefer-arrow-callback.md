---
title: "eslint/prefer-arrow-callback | Oxlint"
rule: "eslint/prefer-arrow-callback"
category: "样式"
version: "1.65.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/prefer-arrow-callback"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_arrow_callback.rs`;
</script>

<RuleHeader />

### 作用

要求回调使用箭头函数。

### 为什么这不好？

箭头函数通常更适合用于回调，因为它们：

- 从外围作用域继承 `this`，避免了常见的错误来源；
- 更简短，也更易于阅读；
- 不能用作构造函数，这一点对回调来说是理想的。

### 选项

```json
{
  "prefer-arrow-callback": [
    "error",
    {
      "allowNamedFunctions": false,
      "allowUnboundThis": true
    }
  ]
}
```

- `allowNamedFunctions`（默认 `false`）— 当为 `true` 时，允许命名函数
  表达式。
- `allowUnboundThis`（默认 `true`）— 当为 `false` 时，引用 `this` 的函数
  表达式即使未绑定到 `this` 值，也会被报告。

### 示例

以下是此规则的**错误**代码示例：

```js
foo(function (a) {
  return a;
});
foo(
  function () {
    return this.a;
  }.bind(this),
);
```

以下是此规则的**正确**代码示例：

```js
foo((a) => a);
foo(function* () {
  yield;
});
foo(function () {
  this;
});
foo(function bar() {
  bar();
});
```

## 配置

### allowNamedFunctions

type: `boolean`

default: `false`

### allowUnboundThis

type: `boolean`

default: `true`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.65.0 中添加。

## 参考资料

<RuleReferences />
