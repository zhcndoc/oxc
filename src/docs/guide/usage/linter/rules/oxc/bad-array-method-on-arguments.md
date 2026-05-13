---
title: "oxc/bad-array-method-on-arguments | Oxlint"
rule: "oxc/bad-array-method-on-arguments"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_array_method_on_arguments.rs`;
</script>

<RuleHeader />

### 说明

当在 arguments 对象本身上调用数组方法时，会应用此规则。

### 为什么这不好？

[arguments 对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
不是数组，而是类数组对象。在调用数组方法之前，应将其转换为真正的数组。
否则，由于方法不存在，将抛出 TypeError 异常。

请注意，如果你只使用 TypeScript，可能不需要此规则，因为它会在类型检查时捕获这些错误。

现代 JavaScript 中通常不建议使用 `arguments`，你应当优先使用
剩余参数，例如 `function sum(...args)`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function add(x, y) {
  return x + y;
}
function sum() {
  return arguments.reduce(add, 0);
}
```

以下是此规则的**正确**代码示例：

```javascript
function add(x, y) {
  return x + y;
}

function sum(...args) {
  return args.reduce(add, 0);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
