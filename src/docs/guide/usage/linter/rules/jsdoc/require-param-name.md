---
title: "jsdoc/require-param-name | Oxlint"
rule: "jsdoc/require-param-name"
category: "Pedantic"
version: "0.4.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_param_name.rs`;
</script>

<RuleHeader />

### 它的作用

要求所有 `@param` 标签都必须有名称。

### 为什么这不好？

应该记录参数的名称。

### 示例

此规则的**错误**代码示例：

```javascript
/** @param {SomeType} */
function quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** @param {SomeType} foo */
function quux(foo) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.4.3 中添加的。

## 参考资料

<RuleReferences />
