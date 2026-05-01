---
title: "eslint/no-lonely-if"
category: "教条主义"
version: "0.16.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_lonely_if.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `else` 块中仅包含 `if` 语句。

### 为什么这不好？

当 `if` 语句是 `else` 块中的唯一语句时，通常使用 `else if` 会更清晰。

### 示例

此规则的**错误**代码示例：

```js
if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  }
}
```

```js
if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  } else {
    // ...
  }
}
```

此规则的**正确**代码示例：

```js
if (condition) {
  // ...
} else if (anotherCondition) {
  // ...
}
```

```js
if (condition) {
  // ...
} else if (anotherCondition) {
  // ...
} else {
  // ...
}
```

```js
if (condition) {
  // ...
} else {
  if (anotherCondition) {
    // ...
  }
  doSomething();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.16.0。

## 参考资料

<RuleReferences />
