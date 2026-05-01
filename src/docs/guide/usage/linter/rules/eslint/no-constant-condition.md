---
title: "eslint/no-constant-condition"
category: "正确性"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_constant_condition.rs`;
</script>

<RuleHeader />

### 作用

禁止在条件中使用常量表达式。

### 为什么不好？

在测试条件中使用常量表达式（例如，字面量）可能是拼写错误，或者是为了特定行为而设置的开发触发器。

此规则禁止在以下内容的测试条件中使用常量表达式：

- `if`、`for`、`while` 或 `do...while` 语句
- `?`：三元表达式

### 示例

此规则 **错误** 代码的示例：

```js
if (false) {
  doSomethingUnfinished();
}

if (new Boolean(x)) {
  doSomethingAlways();
}
if ((x ||= true)) {
  doSomethingAlways();
}

do {
  doSomethingForever();
} while ((x = -1));
```

此规则 **正确** 代码的示例：

```js
if (x === 0) {
  doSomething();
}

while (typeof x === "undefined") {
  doSomething();
}
```

## 配置

此规则接受具有以下属性的配置对象：

### checkLoops

类型：`"all" | "allExceptWhileTrue" | "none"`

默认值：`"allExceptWhileTrue"`

配置选项，用于指定是否检查循环中的常量条件。

- `"all"` 或 `true` 禁止循环中的常量表达式
- `"allExceptWhileTrue"` 禁止循环中的常量表达式，但表达式为 `true` 的 while 循环除外
- `"none"` 或 `false` 允许循环中的常量表达式

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中添加。

## 参考资料

<RuleReferences />
