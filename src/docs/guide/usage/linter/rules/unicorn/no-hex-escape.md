---
title: "unicorn/no-hex-escape | Oxlint"
rule: "unicorn/no-hex-escape"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_hex_escape.rs`;
</script>

<RuleHeader />

### 作用

强制使用 [Unicode 转义](https://mathiasbynens.be/notes/javascript-escapes#unicode)
而不是 [十六进制转义](https://mathiasbynens.be/notes/javascript-escapes#hexadecimal)，以保持
一致性和清晰度。

### 为什么这不好？

与 Unicode 转义相比，十六进制转义的可读性更差，也更难理解。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = "\x1B";
const foo = `\x1B${bar}`;
```

以下是此规则的**正确**代码示例：

```javascript
const foo = "\u001B";
const foo = `\u001B${bar}`;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.18 中添加的。

## 参考资料

<RuleReferences />
