---
title: "eslint/capitalized-comments | Oxlint"
rule: "eslint/capitalized-comments"
category: "Style"
version: "1.34.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/capitalized_comments.rs`;
</script>

<RuleHeader />

### 作用

强制或禁止注释首字母大写。

### 为什么不好？

注释的大小写不一致会使代码更难阅读。
此规则有助于在整个代码库中强制执行一致的风格。

### 示例

使用默认 `"always"` 选项时，此规则 **不正确** 代码的示例：

```js
// 小写注释
/* 小写块注释 */
```

使用默认 `"always"` 选项时，此规则 **正确** 代码的示例：

```js
// 大写注释
/* 大写块注释 */
// 123 - 以非字母开头的注释将被忽略
```

## 配置

capitalized-comments 规则的配置。

第一个元素指定注释是否应该 `"always"`（总是）或 `"never"`（从不）以大写字母开头。第二个元素是一个包含附加选项的可选对象。

### 第 1 个选项

类型：`"always" | "never"`

### 第 2 个选项

此选项是一个具有以下属性的对象：

#### block

类型：`object`

特定于块注释的配置选项。

##### block.ignoreConsecutiveComments

类型：`boolean`

如果为 true，第一个注释之后的连续注释将被忽略。

##### block.ignoreInlineComments

类型：`boolean`

如果为 true，行内注释（代码中间的注释）将被忽略。

##### block.ignorePattern

类型：`string`

一个正则表达式模式。匹配该模式的注释不会导致违规。

#### ignoreConsecutiveComments

类型：`boolean`

如果为 true，第一个注释之后的连续注释将被忽略。

#### ignoreInlineComments

类型：`boolean`

如果为 true，行内注释（代码中间的注释）将被忽略。

#### ignorePattern

类型：`string`

一个正则表达式模式。匹配该模式的注释不会导致违规。

#### line

类型：`object`

特定于行注释的配置选项。

##### line.ignoreConsecutiveComments

类型：`boolean`

如果为 true，第一个注释之后的连续注释将被忽略。

##### line.ignoreInlineComments

类型：`boolean`

如果为 true，行内注释（代码中间的注释）将被忽略。

##### line.ignorePattern

类型：`string`

一个正则表达式模式。匹配该模式的注释不会导致违规。

## 如何使用

<RuleHowToUse />

## Version

此规则于 v1.34.0 中添加。

## References

<RuleReferences />
