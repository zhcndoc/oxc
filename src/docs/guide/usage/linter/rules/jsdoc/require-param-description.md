---
title: "jsdoc/require-param-description"
category: "Pedantic"
version: "0.4.4"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_param_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求每个 `@param` 标签都有描述值。

### 为什么这不好？

参数的描述应该被记录下来。

### 示例

此规则的**错误**代码示例：

```javascript
/** @param foo */
function quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** @param foo Foo. */
function quux(foo) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中添加。

## 参考

<RuleReferences />
