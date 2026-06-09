---
title: "import/no-amd | Oxlint"
rule: "import/no-amd"
category: "限制"
version: "0.0.16"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_amd.rs`;
</script>

<RuleHeader />

### 说明

禁止使用 AMD 的 `require` 和 `define` 调用。

### 为什么这不好？

AMD（异步模块定义）是一种较旧的模块格式，
在现代 JavaScript 开发中不太常见，尤其是在 Node.js 中
随着 ES modules 和 CommonJS 的广泛使用更是如此。
AMD 引入了不必要的复杂性，通常被认为已经过时。
此规则强制使用更现代的模块系统，以提高
整个代码库的可维护性和一致性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
require([a, b], function () {});
```

以下是此规则的**正确**代码示例：

```javascript
require("../name");
require(`../name`);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
