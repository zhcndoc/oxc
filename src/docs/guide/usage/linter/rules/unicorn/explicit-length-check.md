---
title: "unicorn/显式长度检查"
category: "吹毛求疵"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/explicit_length_check.rs`;
</script>

<RuleHeader />

### 它的作用

强制显式比较值的 `length` 或 `size` 属性。

### 为什么这不好？

使用显式的 `length` 或 `size` 属性可以使代码更清晰、易于理解，因为它避免了依赖隐式的真值/假值判断。

### 示例

此规则的**错误**代码示例：

```javascript
const isEmpty = foo.length == 0;
const isEmpty = foo.length < 1;
const isEmpty = 0 === foo.length;
const isEmpty = 0 == foo.length;
const isEmpty = 1 > foo.length;

const isEmpty = !foo.length;
const isEmpty = !(foo.length > 0);
const isEmptySet = !foo.size;
```

此规则的**正确**代码示例：

```javascript
const isEmpty = foo.length === 0;

if (foo.length > 0 || bar.length > 0) {
}

const unicorn = foo.length > 0 ? 1 : 2;
```

## 配置

此规则接受一个带有以下属性的配置对象：

### non-zero

type: `"greater-than" | "not-equal"`

default: `"greater-than"`

用于指定如何强制检查非零长度的配置选项。

#### `"greater-than"`

强制使用 `foo.length > 0` 来检查非零。

#### `"not-equal"`

强制使用 `foo.length !== 0` 来检查非零。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
