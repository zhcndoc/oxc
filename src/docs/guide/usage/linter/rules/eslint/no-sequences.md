---
title: "eslint/no-sequences"
category: "Restriction"
version: "1.33.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_sequences.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用逗号运算符。

### 为什么这不好？

逗号运算符会依次计算其每个操作数（从左到右），并返回最后一个操作数的值。不过，这经常会掩盖副作用，而且它的使用往往是无意的。

### 选项

- `allowInParentheses`（默认：`true`）：如果设置为 `false`，即使使用括号包裹，也不允许使用逗号运算符。

### 示例

以下是此规则的 **错误** 代码示例：

```javascript
((foo = doSomething()), val);

(0, eval("doSomething();"));

// 箭头函数体需要双括号
const fn = () => (doSomething(), val);

// 当 allowInParentheses: false 时
foo = (doSomething(), val);
```

以下是此规则的 **正确** 代码示例：

```javascript
foo = (doSomething(), val);

(0, eval)("doSomething();");

// 条件语句只需要额外的一层括号即可
do {} while ((doSomething(), !!test));

for (i = 0, j = 10; i < j; i++, j--) {}

// 箭头函数体需要双括号
const fn = () => (doSomething(), val);
```

## 配置

此规则接受一个带有以下属性的配置对象：

### allowInParentheses

type: `boolean`

default: `true`

如果将此选项设置为 `false`，则即使表达式序列显式地用括号包裹起来，此规则也不允许使用逗号运算符。
默认值为 `true`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.33.0 中添加。

## 参考资料

<RuleReferences />
