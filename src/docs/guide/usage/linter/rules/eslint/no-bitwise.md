---
title: "eslint/no-bitwise"
category: "Restriction"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_bitwise.rs`;
</script>

<RuleHeader />

### 作用

禁止使用位运算符。

### 为什么不好？

在 JavaScript 中使用位运算符非常罕见，通常 `&` 或 `|` 只是误输入的 `&&` 或 `||`，这将导致意外行为。

### 示例

此规则 **错误** 代码示例：

```javascript
var x = y | z;
```

```javascript
var x = y ^ z;
```

```javascript
var x = y >> z;
```

此规则 **正确** 代码示例：

```javascript
var x = y || z;
```

```javascript
var x = y && z;
```

```javascript
var x = y > z;
```

## 配置

此规则接受一个具有以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

`allow` 选项允许将给定的位运算符列表用作此规则的例外。

例如 `{ "allow": ["~"] }` 将允许无限制地使用位运算符 `~`。如下所示：

```javascript
~[1, 2, 3].indexOf(1) === -1;
```

### int32Hint

type: `boolean`

default: `false`

当设置为 `true` 时，`int32Hint` 选项允许在 |0 模式中使用位运算 OR 进行类型转换。

例如使用 `{ "int32Hint": true }` 时，允许以下代码：

```javascript
const b = a | 0;
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
