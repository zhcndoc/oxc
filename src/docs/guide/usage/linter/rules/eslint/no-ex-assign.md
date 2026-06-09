---
title: "eslint/no-ex-assign | Oxlint"
rule: "eslint/no-ex-assign"
category: "正确性"
version: "0.0.4"
default: true
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-ex-assign"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_ex_assign.rs`;
</script>

<RuleHeader />

### 作用

禁止在 catch 子句中重新赋值异常。

### 为什么这很糟糕？

如果 try 语句中的 catch 子句意外地
（或故意地）给异常参数赋予另一个值，
从那一刻起就无法再引用该错误。
由于没有 arguments 对象来提供访问这些数据的其他方式，
对该参数的赋值会造成彻底破坏。

### 示例

以下是此规则的**错误**代码示例：

```javascript
try {
  // 代码
} catch (e) {
  e = 10;
}
```

以下是此规则的**正确**代码示例：

```javascript
try {
  // 代码
} catch (e) {
  let val = 10;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.4 中添加。

## 参考资料

<RuleReferences />
