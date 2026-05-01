---
title: "eslint/no-delete-var"
category: "Correctness"
version: "0.0.4"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_delete_var.rs`;
</script>

<RuleHeader />

### 作用

`delete` 操作符的作用是从对象中移除属性。

### 为什么不好？

对变量使用 `delete` 操作符可能会导致意外行为。

### 示例

此规则的 **错误** 代码示例：

```javascript
var x;
delete x;
```

此规则的 **正确** 代码示例：

```javascript
var x;

var y;
delete y.prop;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.4 中添加。

## 参考资料

<RuleReferences />
