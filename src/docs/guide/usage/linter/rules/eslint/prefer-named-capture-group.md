---
title: "eslint/prefer-named-capture-group | Oxlint"
rule: "eslint/prefer-named-capture-group"
category: "Style"
version: "1.68.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/prefer-named-capture-group"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_named_capture_group.rs`;
</script>

<RuleHeader />

### 作用

强制在正则表达式中使用具名捕获组。

### 为什么这不好？

未命名的捕获组（`(...)`）只能按位置引用，这会让正则更难阅读和维护。模式发生变化时，基于索引的引用会静默失效。具名分组（`(?<name>...)`）能明确表达意图，并允许按名称引用（例如 `match.groups.year`），因此更稳健。

### 示例

此规则的**错误**代码示例：

```js
const re = /([0-9]{4})-([0-9]{2})/;
const match = re.exec(str);
const year = match[1]; // 脆弱的索引
```

此规则的**正确**代码示例：

```js
const re = /(?<year>[0-9]{4})-(?<month>[0-9]{2})/;
const match = re.exec(str);
const year = match.groups.year; // 显式名称

// 非捕获组始终没问题
const parts = /(?:[0-9]{4})/;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.68.0 中添加。

## 参考资料

<RuleReferences />
