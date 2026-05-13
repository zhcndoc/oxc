---
title: "unicorn/no-unreadable-array-destructuring | Oxlint"
rule: "unicorn/no-unreadable-array-destructuring"
category: "Style"
version: "0.0.19"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unreadable_array_destructuring.rs`;
</script>

<RuleHeader />

### 它的作用

禁止以难以阅读的方式从数组中解构值。

### 为什么这不好？

解构非常有用，但它也可能让某些代码更难阅读。
此规则会阻止在从数组解构时忽略连续值（例如 `let [,,foo] = array`）。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const [, , foo] = parts;
const [, , ...rest] = parts;
```

以下是此规则的**正确**代码示例：

```javascript
const [foo] = parts;
const foo = parts[3];
const rest = parts.slice(2);

// 一个可以接受
const [, foo] = parts;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.19 中加入。

## 参考资料

<RuleReferences />
