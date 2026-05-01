---
title: "eslint/default-case"
category: "Restriction"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/default_case.rs`;
</script>

<RuleHeader />

### 作用

强制所有 `switch` 语句包含 `default` 分支，
除非显式标记了配置过的注释。

### 为什么不好？

如果没有 `default` 分支，不清楚省略是
故意的还是疏忽。添加 `default` 或特殊注释
使代码更明确并减少错误。

如果没有 default 分支，你可以选择在最后一个 case 后包含 `// no default`。注释可以是任意大小写，例如 `// No Default`。

示例配置：

```json
{
  "default-case": ["error", { "commentPattern": "^skip\\sdefault" }]
}
```

### 示例

此规则**错误**代码示例：

```js
switch (foo) {
  case 1:
    break;
}
```

此规则**正确**代码示例：

```js
switch (a) {
  case 1:
    break;
  default:
    break;
}

switch (a) {
  case 1:
    break;
  // no default
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### commentPattern

类型：`string`

用于检测标记缺少 `default` 分支为故意的注释的正则模式。

默认值：`no default`。

使用 `{ "commentPattern": "^skip\\sdefault" }` 选项时，此规则**错误**代码示例：

```js
switch (a) {
  case 1:
    break;
  // no default
}
```

使用 `{ "commentPattern": "^skip\\sdefault" }` 选项时，此规则**正确**代码示例：

```js
switch (a) {
  case 1:
    break;
  // skip default
}
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v0.4.0 中添加。

## 参考资料

<RuleReferences />
