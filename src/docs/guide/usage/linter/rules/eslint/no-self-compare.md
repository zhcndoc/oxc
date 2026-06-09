---
title: "eslint/no-self-compare | Oxlint"
rule: "eslint/no-self-compare"
category: "Pedantic"
version: "0.0.3"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-self-compare"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_self_compare.rs`;
</script>

<RuleHeader />

### 作用

禁止将值与其自身进行比较。

### 为什么这不好？

将变量与自身进行比较通常是错误，可能是拼写错误或重构错误。
这会让读者感到困惑，并且可能引入运行时错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var x = 10;
if (x === x) {
  x = 20;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中添加。

## 参考资料

<RuleReferences />
