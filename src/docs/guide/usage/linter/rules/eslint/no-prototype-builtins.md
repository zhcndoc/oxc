---
title: "eslint/no-prototype-builtins | Oxlint"
rule: "eslint/no-prototype-builtins"
category: "Pedantic"
version: "0.0.5"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.org/docs/latest/rules/no-prototype-builtins"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_prototype_builtins.rs`;
</script>

<RuleHeader />

### 作用

禁止直接在对象上调用某些 `Object.prototype` 方法。

### 为什么这不好？

在 ECMAScript 5.1 中，引入了 `Object.create`，它支持创建具有指定 [[Prototype]] 的对象。
`Object.create(null)` 是一种常见模式，用于创建将作为 Map 使用的对象。
当假设对象会拥有来自 `Object.prototype` 的属性时，这可能会导致错误。此规则可防止直接从对象调用某些 `Object.prototype` 方法。
此外，对象可以拥有会遮蔽 `Object.prototype` 上内置方法的属性，从而可能导致非预期行为或拒绝服务安全漏洞。
例如，Web 服务器如果解析来自客户端的 JSON 输入，并直接在结果对象上调用 `hasOwnProperty`，就会不安全，因为恶意客户端可以发送类似 {"hasOwnProperty": 1} 的 JSON 值，并导致服务器崩溃。

为了避免这类隐蔽的错误，最好始终从 `Object.prototype` 调用这些方法。例如，`foo.hasOwnProperty("bar")` 应替换为 `Object.prototype.hasOwnProperty.call(foo, "bar")`。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var hasBarProperty = foo.hasOwnProperty("bar");
var isPrototypeOfBar = foo.isPrototypeOf(bar);
var barIsEnumerable = foo.propertyIsEnumerable("bar");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.5 中添加的。

## 参考资料

<RuleReferences />
