---
title: "node/exports-style | Oxlint"
rule: "node/exports-style"
category: "风格"
version: "1.76.0"
default: false
type_aware: false
fix: "待定"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/exports-style.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/exports_style.rs`;
</script>

<RuleHeader />

### 功能

强制使用 `module.exports` 或 `exports`。

### 为什么这是不好的？

默认情况下，`module.exports` 和 `exports` 是同一个实例。但如果其中一个被修改，它们就会变成不同的实例。

```js
module.exports = {
  foo: 1,
};

exports.bar = 2;
```

在这种情况下，`exports.bar` 将会丢失，因为只有 `module.exports` 的实例会被导出。

### 示例

`"module.exports"` 选项的**错误**代码示例：

```js
exports.foo = 1;
exports.bar = 2;
```

`"module.exports"` 选项的**正确**代码示例：

```js
module.exports = {
  foo: 1,
  bar: 2,
};
module.exports.baz = 3;
```

`"exports"` 选项的**错误**代码示例：

```js
module.exports = {
  foo: 1,
  bar: 2,
};
module.exports.baz = 3;
```

`"exports"` 选项的**正确**代码示例：

```js
exports.foo = 1;
exports.bar = 2;
```

## 配置

### 第 1 个选项

类型：`"module.exports" | "exports"`

#### `"module.exports"`

要求使用 `module.exports`，并禁止使用 `exports`

#### `"exports"`

要求使用 `exports`，并禁止使用 `module.exports`

### 第 2 个选项

此选项是一个包含以下属性的对象：

#### allowBatchAssign

类型：`boolean`

默认值：`false`

如果此选项设置为 `true`，则允许使用 `module.exports = exports = obj`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.76.0 中添加。

## 参考资料

<RuleReferences />
