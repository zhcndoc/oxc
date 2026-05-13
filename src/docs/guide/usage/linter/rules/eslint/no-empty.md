---
title: "eslint/no-empty | Oxlint"
rule: "eslint/no-empty"
category: "Restriction"
version: "0.0.3"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_empty.rs`;
</script>

<RuleHeader />

### 它的作用

禁止空的代码块语句。

### 为什么这不好？

空的代码块语句虽然从技术上说不算错误，但通常是由于重构未完成而出现的。
它们会让代码阅读时产生困惑。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (condition) {
}
```

以下是此规则的**正确**代码示例：

```javascript
if (condition) {
  throw new Error("condition should be false");
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowEmptyCatch

type: `boolean`

default: `false`

如果设置为 `true`，则允许空的 `catch` 块，而不会触发 linter。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
