---
title: "unicorn/prefer-string-raw | Oxlint"
rule: "unicorn/prefer-string-raw"
category: "Style"
version: "0.12.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_string_raw.rs`;
</script>

<RuleHeader />

### 它的作用

倾向于使用 `String.raw` 来避免转义 `\`。

### 为什么这不好？

过多的反斜杠会降低字符串值的可读性，而使用 `String.raw` 可以避免这一点。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const file = "C:\\windows\\style\\path\\to\\file.js";
const regexp = new RegExp("foo\\.bar");
```

以下是此规则的**正确**代码示例：

```javascript
const file = String.raw`C:\windows\style\path\to\file.js`;
const regexp = new RegExp(String.raw`foo\.bar`);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.12.0 中添加的。

## 参考资料

<RuleReferences />
