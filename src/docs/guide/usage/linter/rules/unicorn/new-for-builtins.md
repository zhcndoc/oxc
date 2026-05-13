---
title: "unicorn/new-for-builtins | Oxlint"
rule: "unicorn/new-for-builtins"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/new_for_builtins.rs`;
</script>

<RuleHeader />

### 作用

强制对以下内置对象使用 `new`：`Object`、`Array`、`ArrayBuffer`、`BigInt64Array`、
`BigUint64Array`、`DataView`、`Date`、`Error`、`Float32Array`、`Float64Array`、`Function`、`Int8Array`、
`Int16Array`、`Int32Array`、`Map`、`WeakMap`、`Set`、`WeakSet`、`Promise`、`RegExp`、`Uint8Array`、
`Uint16Array`、`Uint32Array`、`Uint8ClampedArray`、`SharedArrayBuffer`、`Proxy`、`WeakRef`、`FinalizationRegistry`。

禁止对以下内置对象使用 `new`：`String`、`Number`、`Boolean`、`Symbol`、`BigInt`。

### 为什么这不好？

不一致地使用 `new` 可能会造成混淆。像 `Array` 和 `RegExp` 这样的构造函数应始终使用 `new`，
以确保得到预期的实例类型。与此同时，`String`、`Number`、`Boolean`、`Symbol` 和 `BigInt` 不应使用 `new`，
因为它们创建的是对象包装器，而不是原始值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = new String("hello world");
const bar = Array(1, 2, 3);
```

以下是此规则的**正确**代码示例：

```javascript
const foo = String("hello world");
const bar = new Array(1, 2, 3);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v0.0.16 中添加。

## 参考资料

<RuleReferences />
