---
title: "unicorn/prefer-node-protocol | Oxlint"
rule: "unicorn/prefer-node-protocol"
category: "Restriction"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_node_protocol.rs`;
</script>

<RuleHeader />

### 作用

在导入 Node.js 内置模块时，优先使用 `node:` 协议。

### 为什么这不好？

应使用 `node:` 协议导入 Node.js 内置模块，以避免与本地模块产生歧义。

### 示例

此规则的**错误**代码示例：

```javascript
import fs from "fs";
```

此规则的**正确**代码示例：

```javascript
import fs from "node:fs";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
