---
title: "import/no-self-import | Oxlint"
rule: "import/no-self-import"
category: "Suspicious"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_self_import.rs`;
</script>

<RuleHeader />

### 作用

禁止模块导入自身。这种情况有时会无意中发生，
尤其是在重构期间。

### 为什么这不好？

将模块导入自身会创建循环依赖，这可能会导致
运行时问题，包括无限循环、无法解析的导入或 `undefined` 值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// foo.js
import foo from "./foo.js"; // 错误：模块导入自身
const foo = require("./foo"); // 错误：模块导入自身
```

以下是此规则的**正确**代码示例：

```javascript
// foo.js
import bar from "./bar.js"; // 正确：模块导入另一个模块
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.13 中添加。

## 参考资料

<RuleReferences />
