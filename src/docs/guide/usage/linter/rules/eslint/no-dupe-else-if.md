---
title: "eslint/no-dupe-else-if | Oxlint"
rule: "eslint/no-dupe-else-if"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "无"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_dupe_else_if.rs`;
</script>

<RuleHeader />

### 作用

禁止在 if-else-if 链中出现重复的条件。

### 为什么不好？

当需要根据特定条件仅执行多个可能分支中的一个（或最多一个）分支时，通常使用 if-else-if 链。
同一链中两个相同的测试条件几乎总是代码错误。除非表达式中有副作用，
否则重复项的求值结果将与链中较早的相同表达式一样（同为真或同为假），这意味着其分支永远无法执行。

### 示例

此规则的 **错误** 代码示例：

```javascript
if (a) {
  foo();
} else if (b) {
  bar();
} else if (b) {
  baz();
}
```

```javascript
if (a || b) {
  foo();
} else if (a) {
  bar();
}
```

```javascript
if (n === 1) {
  foo();
} else if (n === 2) {
  bar();
} else if (n === 3) {
  baz();
} else if (n === 2) {
  quux();
} else if (n === 5) {
  quuux();
}
```

此规则的 **正确** 代码示例：

```javascript
if (a) {
  foo();
} else if (b) {
  bar();
} else if (c) {
  baz();
}
```

```javascript
if (a || b) {
  foo();
} else if (c) {
  bar();
}
```

```javascript
if (n === 1) {
  foo();
} else if (n === 2) {
  bar();
} else if (n === 3) {
  baz();
} else if (n === 4) {
  quux();
} else if (n === 5) {
  quuux();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.5 中添加。

## 参考资料

<RuleReferences />
