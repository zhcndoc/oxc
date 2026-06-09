---
title: "typescript/prefer-find | Oxlint"
rule: "typescript/prefer-find"
category: "Style"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/prefer-find/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_find.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_find/prefer_find.go`;
</script>

<RuleHeader />

### 它的作用

优先使用 `.find(...)` 而不是 `.filter(...)[0]` 来获取单个元素。

### 这为什么不好？

`.filter(...)[0]` 会构建一个中间数组，而且不能清晰地表达意图。
`.find(...)` 直接表达只需要第一个匹配元素。

### 示例

以下是此规则的**错误**代码示例：

```ts
const first = list.filter((item) => item.active)[0];
```

以下是此规则的**正确**代码示例：

```ts
const first = list.find((item) => item.active);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.49.0 中添加。

## 参考资料

<RuleReferences />
