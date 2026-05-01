---
title: "unicorn/no-object-as-default-parameter"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_object_as_default_parameter.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将对象字面量用作参数的默认值。

### 为什么这不好？

默认参数不应通过对象字面量传递给函数。`foo = {a: false}` 这种参数在只使用一个选项时没有问题。一旦添加额外选项，当你只传入一个选项：`{a: true}` 时，就有可能把整个 `foo = {a: false, b: true}` 对象替换掉。因此，应改用对象解构。

### 示例

以下是此规则的**错误**代码示例：

```javascript
function foo(foo = { a: false }) {}
```

以下是此规则的**正确**代码示例：

```javascript
function foo({ a = false } = {}) {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中加入。

## 参考资料

<RuleReferences />
