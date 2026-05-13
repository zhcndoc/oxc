---
title: "eslint/no-new | Oxlint"
rule: "eslint/no-new"
category: "Suspicious"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_new.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在赋值或比较之外使用 new 运算符。

### 为什么这不好？

在不进行赋值或比较的情况下调用 new，会使其引用被丢弃，并且在许多
情况下构造函数可以被函数替代。

### 示例

以下是此规则的**错误**代码示例：

```javascript
new Person();

() => {
  new Date();
};
```

以下是此规则的**正确**代码示例：

```javascript
var a = new Date()(() => new Date());
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.4.0 中添加。

## 参考资料

<RuleReferences />
