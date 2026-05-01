---
title: "unicorn/switch-case-break-position"
category: "Style"
version: "1.59.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/switch_case_break_position.rs`;
</script>

<RuleHeader />

### 作用

强制在 `case` 子句中统一 `break`/`return`/`continue`/`throw` 的位置。

### 为什么这不好？

要求终止语句（`break`、`return`、`continue`、`throw`）出现在 `case` 子句的块语句内部，而不是放在其后。
这通常会在重构时发生——例如，移除了 `if` 包裹层，但把 `break` 留在了大括号外面。

### 示例

以下是此规则的**错误**代码示例：

```js
switch (foo) {
  case 1:
    {
      doStuff();
    }
    break;
}
```

以下是此规则的**正确**代码示例：

```js
switch (foo) {
  case 1: {
    doStuff();
    break;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v1.59.0。

## 参考资料

<RuleReferences />
