---
title: "unicorn/no-invalid-fetch-options | Oxlint"
rule: "unicorn/no-invalid-fetch-options"
category: "正确性"
version: "0.15.12"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_invalid_fetch_options.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `fetch()` 和 `new Request()` 中使用无效选项。具体来说，此规则确保当方法为 `GET` 或 `HEAD` 时不会提供 body，因为这会导致 `TypeError`。

### 为什么这不好？

当方法为 `GET` 或 `HEAD` 且提供了 body 时，`fetch()` 函数会抛出 `TypeError`。
这可能会导致代码中出现意外行为和错误。通过禁止此类无效选项，该规则可确保请求配置正确，并防止不必要的错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const response = await fetch("/", { method: "GET", body: "foo=bar" });

const request = new Request("/", { method: "GET", body: "foo=bar" });
```

以下是此规则的**正确**代码示例：

```javascript
const response = await fetch("/", { method: "POST", body: "foo=bar" });

const request = new Request("/", { method: "POST", body: "foo=bar" });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.12。

## 参考资料

<RuleReferences />
