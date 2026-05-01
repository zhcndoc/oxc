---
title: "oxc/bad-bitwise-operator"
category: "Restriction"
version: "0.0.3"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_bitwise_operator.rs`;
</script>

<RuleHeader />

### 作用

当使用按位运算符而预期应使用逻辑运算符时，此规则会生效。

### 为什么这很糟糕？

按位运算符与逻辑运算符的结果不同，而且由于没有应用短路求值，可能会抛出 `TypeError` 异常。
（短路求值中，会根据左操作数的值跳过右操作数的求值，例如在 `x && y` 中，`x` 为 `false`。）

在以下代码模式中，很明显应当使用逻辑运算符：

```javascript
e && e.x;
e || {};
e || "";
```

### 示例

此规则的**错误**代码示例：

```javascript
if (obj & obj.prop) {
  console.log(obj.prop);
}
options = options | {};
input |= "";
```

此规则的**正确**代码示例：

```javascript
if (obj && obj.prop) {
  console.log(obj.prop);
}
options = options || {};
input ||= "";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.3。

## 参考资料

<RuleReferences />
