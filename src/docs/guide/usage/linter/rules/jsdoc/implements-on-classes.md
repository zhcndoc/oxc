---
title: "jsdoc/implements-on-classes"
category: "正确性"
version: "0.3.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/implements_on_classes.rs`;
</script>

<RuleHeader />

### 它的作用

报告任何使用 `@implements` 的非构造函数问题。

### 为什么这不好？

构造函数应该是
无论是标记了 `@class`、`@constructs`，还是作为类构造函数。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/**
 * @implements {SomeClass}
 */
function quux() {}
```

以下是此规则的**正确**代码示例：

```javascript
class Foo {
  /**
   * @implements {SomeClass}
   */
  constructor() {}
}
/**
 * @implements {SomeClass}
 * @class
 */
function quux() {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.3.2 中添加。

## 参考资料

<RuleReferences />
