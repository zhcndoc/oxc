---
title: "eslint/no-proto | Oxlint"
rule: "eslint/no-proto"
category: "Restriction"
version: "0.2.14"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_proto.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 `__proto__` 属性。

### 为什么这不好？

`__proto__` 属性自 ECMAScript 3.1 起已被弃用，
不应在新代码中使用。请改用 `Object.getPrototypeOf` 和
`Object.setPrototypeOf`。

有关更多信息，请参阅
[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var a = obj.__proto__;

var a = obj["__proto__"];

obj.__proto__ = b;

obj["__proto__"] = b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考资料

<RuleReferences />
