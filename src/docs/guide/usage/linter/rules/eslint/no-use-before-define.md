---
title: "eslint/no-use-before-define | Oxlint"
rule: "eslint/no-use-before-define"
category: "Restriction"
version: "1.49.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-use-before-define"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_use_before_define.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在变量定义之前使用它们。

### 为什么这不好？

在声明之前引用标识符会隐藏 bug，并且
使代码顺序相关，难以推理。

### 示例

此规则的**错误**代码示例：

```ts
new A();
var A = class {};
```

此规则的**正确**代码示例：

```ts
var A = class {};
new A();
```

## 配置

### allowNamedExports

type: `boolean`

default: `false`

允许在声明之前出现的命名导出。

### classes

type: `boolean`

default: `true`

检查类声明。

### enums

type: `boolean`

default: `true`

检查枚举声明。

### functions

type: `boolean`

default: `true`

检查函数声明。

### ignoreTypeReferences

type: `boolean`

default: `true`

忽略仅作为类型引用的用法。

### typedefs

type: `boolean`

default: `true`

检查类型别名、接口和类型参数。

### variables

type: `boolean`

default: `true`

检查变量声明。

## How to Use

<RuleHowToUse />

## 版本

此规则于 v1.49.0 中添加。

## 参考资料

<RuleReferences />
