---
title: "行内忽略注释 | Oxfmt"
---

# 行内忽略注释

对于 JS/TS 文件，使用 `oxfmt-ignore` 跳过下一条语句的格式化：

<!-- prettier-ignore-start -->
```js
// oxfmt-ignore
const a    = 42;

/* oxfmt-ignore */
const x = () => { return 2; };

<>
  {/* oxfmt-ignore */}
  <span   ugly   format=""   />
</>;
```
<!-- prettier-ignore-end -->

对于 Vue 中的 JS，在 `<script>` 标签内使用 `oxfmt-ignore`：

<!-- prettier-ignore-start -->
```vue
<script>
// oxfmt-ignore
const a    = 42;
</script>
```
<!-- prettier-ignore-end -->

也支持行尾忽略注释：

<!-- prettier-ignore-start -->
```js
const a    = 42; // oxfmt-ignore
```
<!-- prettier-ignore-end -->

对于其他文件和 Vue 文件的非 JS 部分（例如 `<template>`、`<style>`），请使用 `prettier-ignore` 注释。另请参阅 Prettier 的 [忽略文档](https://prettier.io/docs/ignore#html)。

目前，TOML 文件不支持忽略注释。

## Prettier 兼容性

- 也支持 `prettier-ignore` 注释
