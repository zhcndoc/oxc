---
title: "unicorn/no-abusive-eslint-disable | Oxlint"
rule: "unicorn/no-abusive-eslint-disable"
category: "限制"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_abusive_eslint_disable.rs`;
</script>

<RuleHeader />

### 作用

不允许在未指定规则的情况下使用 `oxlint-disable` 或 `eslint-disable` 注释。

### 为什么这不好？

通用的 `oxlint-disable` 或 `eslint-disable` 注释会屏蔽所有 lint 错误，而不仅仅是预期的那个，
这可能会隐藏有用的警告，并使调试更困难。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/* eslint-disable */
console.log(message);

console.log(message); // eslint-disable-line

// eslint-disable-next-line
console.log(message);
```

```javascript
/* oxlint-disable */
console.log(message);

console.log(message); // oxlint-disable-line

// oxlint-disable-next-line
console.log(message);
```

以下是此规则的**正确**代码示例：

```javascript
/* eslint-disable no-console */
console.log(message);

console.log(message); // eslint-disable-line no-console

// eslint-disable-next-line no-console
console.log(message);
```

```javascript
/* oxlint-disable no-console */
console.log(message);

console.log(message); // oxlint-disable-line no-console

// oxlint-disable-next-line no-console
console.log(message);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.18。

## 参考

<RuleReferences />
