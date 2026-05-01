---
title: "eslint/no-script-url"
category: "Style"
version: "0.2.15"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_script_url.rs`;
</script>

<RuleHeader />

### 它的作用

禁止 `javascript:` URL。

### 为什么这不好？

使用 `javascript:` URL 被一些人视为一种 `eval` 形式。通过 `javascript:` URL 传入的代码必须像处理 `eval` 一样，由浏览器进行解析和求值。这可能会导致安全和性能问题。

### 示例

此规则的**错误**代码示例：

```javascript
location.href = "javascript:void(0)";

location.href = `javascript:void(0)`;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.15 中添加。

## 参考资料

<RuleReferences />
