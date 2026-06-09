---
title: "unicorn/relative-url-style | Oxlint"
rule: "unicorn/relative-url-style"
category: "Style"
version: "1.44.0"
default: false
type_aware: false
fix: "fixable_safe_fix_or_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/relative_url_style.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用一致的相对 URL 风格。

### 为什么这不好？

在 `new URL()` 中使用相对 URL 时，URL 应该始终使用 `./` 前缀，或者始终不使用，并保持一致。

### 示例

以下是此规则在默认 `"never"` 选项下的**错误**代码示例：

```js
new URL("./foo", base);
```

以下是此规则在默认 `"never"` 选项下的**正确**代码示例：

```js
new URL("foo", base);
```

以下是此规则在 `"always"` 选项下的**错误**代码示例：

```js
new URL("foo", base);
```

以下是此规则在 `"always"` 选项下的**正确**代码示例：

```js
new URL("./foo", base);
```

## 配置

此规则接受以下字符串值之一：

### `"never"`

绝不使用 `./` 前缀。

### `"always"`

在可能的情况下，总是为相对 URL 添加 `./` 前缀。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.44.0 中添加。

## 参考资料

<RuleReferences />
