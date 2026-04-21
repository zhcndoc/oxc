---
title: "typescript/prefer-string-starts-ends-with"
category: "样式"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_string_starts_ends_with.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_string_starts_ends_with/prefer_string_starts_ends_with.go`;
</script>

<RuleHeader />

### 它的作用

优先使用 `startsWith` 和 `endsWith`，而不是手动进行字符串边界检查。

### 为什么这不好？

使用 `slice`、`indexOf`、正则锚点或手动索引编写的边界检查，
比 `startsWith`/`endsWith` 更难阅读和维护。

### 示例

以下是此规则的**错误**代码示例：

```ts
value.slice(0, 3) === "foo";
value.slice(-3) === "bar";
```

以下是此规则的**正确**代码示例：

```ts
value.startsWith("foo");
value.endsWith("bar");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowSingleElementEquality

type: `"always" | "never"`

default: `"never"`

是否允许对第一个/最后一个字符进行相等性检查。

#### `"always"`

始终允许对第一个或最后一个字符进行相等性检查。

#### `"never"`

从不允许对第一个或最后一个字符进行相等性检查。

## 如何使用

<RuleHowToUse />

## 参考资料

<RuleReferences />
