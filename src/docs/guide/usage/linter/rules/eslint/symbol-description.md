---
title: "eslint/symbol-description | Oxlint"
rule: "eslint/symbol-description"
category: "Pedantic"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/symbol_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求符号描述。

### 为什么这不好？

Symbol 函数可以带有可选的描述。

```js
var foo = Symbol("some description");

var someString = "some description";
var bar = Symbol(someString);
```

使用 `description` 可以更轻松地调试：当输出一个 symbol 时，会使用该描述：

```js
var foo = Symbol("some description");

console.log(foo);
// 输出 - Symbol(some description)
```

### 示例

以下是此规则的**错误**代码示例：

```javascript
var foo = Symbol();
```

以下是此规则的**正确**代码示例：

```javascript
var foo = Symbol("some description");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.0 中添加。

## 参考资料

<RuleReferences />
