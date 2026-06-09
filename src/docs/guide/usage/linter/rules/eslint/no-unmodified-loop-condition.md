---
title: "eslint/no-unmodified-loop-condition | Oxlint"
rule: "eslint/no-unmodified-loop-condition"
category: "可疑"
version: "1.48.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-unmodified-loop-condition"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unmodified_loop_condition.rs`;
</script>

<RuleHeader />

### 它的作用

禁止循环条件中引用那些在循环内部从未被修改的值。

### 为什么这不好？

依赖于循环体内从不改变的值的循环条件
可能会导致无限循环或逻辑错误。

### 示例

此规则的**错误**代码示例：

```js
let done = false;
while (!done) {
  work();
}
```

此规则的**正确**代码示例：

```js
let done = false;
while (!done) {
  done = checkDone();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.48.0 中新增。

## 参考资料

<RuleReferences />
