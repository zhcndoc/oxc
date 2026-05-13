---
title: "eslint/prefer-exponentiation-operator | Oxlint"
rule: "eslint/prefer-exponentiation-operator"
category: "Style"
version: "0.4.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_exponentiation_operator.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `Math.pow`，改为使用 `**` 运算符。

### 为什么这不好？

引入于 ES2016 的中缀幂运算符 `**` 是标准 `Math.pow` 函数的另一种写法。中缀表示法通常被认为更易读，因此也更受推荐。

### 示例

此规则的**错误**代码示例：

```javascript
Math.pow(a, b);
```

此规则的**正确**代码示例：

```javascript
a ** b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.4.0。

## 参考资料

<RuleReferences />
