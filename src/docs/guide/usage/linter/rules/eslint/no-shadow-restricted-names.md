---
title: "eslint/no-shadow-restricted-names"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_shadow_restricted_names.rs`;
</script>

<RuleHeader />

### 它的作用

不允许重新定义诸如 `undefined`、`NaN`、`Infinity`、
`eval`、`globalThis` 和 `arguments` 之类的全局变量。

### 为什么这很糟糕？

全局对象 `NaN`、`Infinity`、`undefined`、`globalThis` 的值属性，以及严格
模式下受限标识符 `eval` 和 `arguments`，都被认为是 JavaScript 中的受限名称。
将它们定义为其他含义可能会带来意想不到的后果，并让阅读代码的其他人感到困惑。
例如，下面这样的写法并不会被阻止：

```javascript
var undefined = "foo";
```

之后，在同一作用域内使用的任何代码都不会获取全局的 `undefined`，而是会获取
具有完全不同含义的局部版本。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function NaN() {}

!function (Infinity) {};

var undefined = 5;

try {
} catch (eval) {}

const globalThis = "foo";
```

```javascript
import NaN from "foo";

import { undefined } from "bar";

class Infinity {}
```

以下是此规则的**正确**代码示例：

```javascript
var Object;

function f(a, b) {}

// 例外：如果变量从未被赋值，则 `undefined` 可以被遮蔽。
var undefined;
```

```javascript
import { undefined as undef } from "bar";
```

## 配置

此规则接受一个具有以下属性的配置对象：

### reportGlobalThis

type: `boolean`

default: `true`

如果为 true，也会报告对 `globalThis` 的遮蔽。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
