---
title: "eslint/no-void"
category: "Restriction"
version: "0.2.5"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_void.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `void` 运算符。

### 为什么这不好？

`void` 运算符通常用于获取 `undefined`，但这是不必要的，因为可以直接使用 `undefined`。

### 示例

以下是此规则的**错误**代码示例：

```ts
void 0;
var foo = void 0;
```

以下是此规则的**正确**代码示例：

```ts
"var foo = bar()";
"foo.void()";
"foo.void = bar";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAsStatement

type: `boolean`

default: `false`

如果设置为 `true`，则允许将 `void` 作为独立语句使用。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.5 中新增。

## 参考

<RuleReferences />
