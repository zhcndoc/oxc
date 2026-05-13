---
title: "oxc/branches-sharing-code | Oxlint"
rule: "oxc/branches-sharing-code"
category: "Pedantic"
version: "1.22.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/branches_sharing_code.rs`;
</script>

<RuleHeader />

### 它的作用

检查 `if` 和 `else` 代码块中是否包含可以移出这些代码块的共享代码。

### 为什么这不好？

重复代码的可维护性较差。从分支中提取公共代码可以使代码更加 DRY（不要重复自己）
并且更易于维护。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (condition) {
  console.log("Hello");
  return 13;
} else {
  console.log("Hello");
  return 42;
}

if (condition) {
  doSomething();
  cleanup();
} else {
  doSomethingElse();
  cleanup();
}
```

以下是此规则的**正确**代码示例：

```javascript
console.log("Hello");
if (condition) {
  return 13;
} else {
  return 42;
}

if (condition) {
  doSomething();
} else {
  doSomethingElse();
}
cleanup();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.22.0 中加入。

## 参考资料

<RuleReferences />
