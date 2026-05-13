---
title: "eslint/no-extra-boolean-cast | Oxlint"
rule: "eslint/no-extra-boolean-cast"
category: "正确性"
version: "0.0.8"
default: true
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_extra_boolean_cast.rs`;
</script>

<RuleHeader />

### 作用

此规则不允许不必要的布尔类型转换。

### 为什么这不好？

在诸如 if 语句的测试表达式等上下文中，表达式的结果本来就会被强制转换为布尔值，
因此通过双重否定（`!!`）或 `Boolean` 调用来转换为布尔值是多余的。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var foo = !!!bar;
var foo = Boolean(!!bar);

if (!!foo) {
}
if (Boolean(foo)) {
}

// 启用 "enforceForInnerExpressions" 选项
if (!!foo || bar) {
}
```

以下是此规则的**正确**代码示例：

```javascript
var foo = !bar;
var foo = Boolean(bar);

if (foo) {
}
if (foo) {
}

// 启用 "enforceForInnerExpressions" 选项
if (foo || bar) {
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### enforceForInnerExpressions

type: `boolean`

default: `false`

当设置为 `true` 时，除了检查默认上下文之外，还会检查
结果用于布尔上下文的表达式中是否存在额外的布尔类型转换。见下方示例。
默认值为 `false`，这意味着此规则默认不会警告内层表达式中的额外布尔类型
转换。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考

<RuleReferences />
