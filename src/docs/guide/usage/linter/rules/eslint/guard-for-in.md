---
title: "eslint/guard-for-in | Oxlint"
rule: "eslint/guard-for-in"
category: "样式"
version: "0.2.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/guard_for_in.rs`;
</script>

<RuleHeader />

### 作用

要求 for-in 循环包含 if 语句。

### 为什么不好？

使用 `for in` 循环遍历对象将包含通过原型链继承的属性。在循环中不对结果进行过滤而使用 `for in` 循环可能会导致循环中出现意外项，进而导致意外行为。

### 示例

此规则的 **错误** 代码示例：

```javascript
for (key in foo) {
  doSomething(key);
}
```

此规则的 **正确** 代码示例：

```javascript
for (key in foo) {
  if (Object.hasOwn(foo, key)) {
    doSomething(key);
  }
}
```

```javascript
for (key in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

```javascript
for (key in foo) {
  if ({}.hasOwnProperty.call(foo, key)) {
    doSomething(key);
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.14 中添加。

## 参考资料

<RuleReferences />
