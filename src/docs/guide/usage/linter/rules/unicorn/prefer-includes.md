---
title: "unicorn/prefer-includes"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_includes.rs`;
</script>

<RuleHeader />

### 它的作用

在检查是否存在或不存在时，优先使用 `includes()` 而不是 `indexOf()`。
所有内置对象除了 `.indexOf()` 之外，也都有 `.includes()`。

### 为什么这不好？

与 `.indexOf()` 相比，`.includes()` 方法更易读，也更不容易出错。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (str.indexOf("foo") !== -1) {
}
```

以下是此规则的**正确**代码示例：

```javascript
if (str.includes("foo")) {
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中添加。

## 参考资料

<RuleReferences />
