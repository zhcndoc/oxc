---
title: "jsdoc/require-param | Oxlint"
rule: "jsdoc/require-param"
category: "Pedantic"
version: "0.4.3"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/requireParam.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/require_param.rs`;
</script>

<RuleHeader />

### 它的作用

要求所有函数参数都使用 JSDoc `@param` 标签进行文档说明。

### 这为什么不好？

该规则旨在通过要求为所有函数参数编写文档来强化代码质量和可维护性。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @param foo */
function quux(foo, bar) {}
```

以下是此规则的**正确**代码示例：

```javascript
/** @param foo */
function quux(foo) {}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### checkConstructors

类型：`boolean`

默认值：`false`

是否检查构造函数方法。

### checkDestructured

类型：`boolean`

默认值：`true`

是否检查解构参数。

### checkDestructuredRoots

类型：`boolean`

默认值：`true`

是否在存在如下代码时检查解构参数：
`function doSomething({ a, b }) { ... }`。由于在此示例中没有命名
参数，当此选项为 `true` 时，你必须
有一个与 `{a, b}` 对应的 `@param` 标签。

### checkGetters

类型：`boolean`

默认值：`true`

是否检查 getter 方法。

### checkRestProperty

类型：`boolean`

默认值：`false`

是否检查剩余属性。

### checkSetters

类型：`boolean`

默认值：`true`

是否检查 setter 方法。

### checkTypesPattern

类型：`string`

默认值：`"^(?:[oO]bject|[aA]rray|PlainObject|Generic(?:Object|Array))$"`

用于匹配可免于检查的类型的正则表达式模式。

### exemptedBy

类型：`string[]`

默认值：`["inheritdoc"]`

免于 `@param` 检查的 JSDoc 标签列表。

### ignoreWhenAllParamsMissing

类型：`boolean`

默认值：`false`

设置为 `true` 时，如果所有参数均缺失，则忽略报告。默认为 `false`。

### interfaceExemptsParamsCheck

类型：`boolean`

默认值：`false`

如果希望 TypeScript 接口免于检查 `@param` 是否存在，请设置此选项。
将检查用于定义函数本身的类型（在变量声明中），或检查是否存在带有类型的单个解构对象。默认为 `false`。

### useDefaultObjectProperties

类型：`boolean`

默认值：`false`

如果希望检查作为默认值提供的对象中的属性是否有文档说明，请设置为 `true`。默认为 `false`。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.4.3 中添加的。

## 参考

<RuleReferences />
