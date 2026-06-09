---
title: "jsdoc/require-throws-type | Oxlint"
rule: "jsdoc/require-throws-type"
category: "吹毛求疵"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireThrowsType.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_throws_type.rs`;
</script>

<RuleHeader />

### 作用

要求 `@throws` 标签带有类型。

### 为什么这不好？

`@throws` 标签应记录可能抛出的错误类型。

### 示例

此规则的 **错误** 代码示例：

```js
/** @throws */
function quux() {
  throw new Error("error");
}
```

此规则的 **正确** 代码示例：

```js
/** @throws {Error} */
function quux() {
  throw new Error("error");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.65.0 中添加。

## 参考资料

<RuleReferences />
