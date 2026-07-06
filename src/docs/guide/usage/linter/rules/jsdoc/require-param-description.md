---
title: "jsdoc/require-param-description | Oxlint"
rule: "jsdoc/require-param-description"
category: "Pedantic"
version: "0.4.4"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireParamDescription.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_param_description.rs`;
</script>

<RuleHeader />

### 它的作用

要求每个 `@param` 标签都包含描述。

### 为什么这不好？

参数的描述应该被记录下来。

### 示例

此规则的**错误**代码示例：

```javascript
/** @param foo */
function quux(foo) {}
```

此规则的**正确**代码示例：

```javascript
/** @param foo Foo. */
function quux(foo) {}
```

## 配置

此规则接受一个配置对象，包含以下属性：

### defaultDestructuredRootDescription

type: `string`

default: `"根对象"`

用于默认设置解构根的描述字符串。默认为“根对象”。

### setDefaultDestructuredRootDescription

type: `boolean`

default: `false`

是否设置默认的解构根描述。
例如，您可能希望避免手动为与解构根对象对应的 @param 设置描述，因为它始终应是同一类型的对象。
使用 `defaultDestructuredRootDescription` 作为描述字符串。默认为 `false`。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中添加。

## 参考

<RuleReferences />
