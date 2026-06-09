---
title: "jsdoc/require-throws-description | Oxlint"
rule: "jsdoc/require-throws-description"
category: "样式"
version: "1.65.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireThrowsDescription.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_throws_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求 `@throws` 标签提供描述。

### 为什么这不好？

`@throws` 标签应说明可能抛出错误的条件或原因。

### 示例

此规则的**错误**代码示例：

```js
/**
 * @throws {Error}
 */
function quux() {
  throw new Error("error");
}
```

此规则的**正确**代码示例：

```js
/**
 * @throws {Error} 有描述
 */
function quux() {
  throw new Error("error");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.65.0 中加入。

## 参考资料

<RuleReferences />
