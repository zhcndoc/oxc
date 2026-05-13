---
title: "eslint/require-unicode-regexp | Oxlint"
rule: "eslint/require-unicode-regexp"
category: "死板"
version: "1.63.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/require_unicode_regexp.rs`;
</script>

<RuleHeader />

### 作用

强制在正则表达式中使用 `u` 或 `v` 标志。

### 为什么这不好？

RegExp `u` 标志有两个作用：

1.  正确处理 UTF-16 代理对。

```js
/^[👍]$/.test("👍") //→ false
/^[👍]$/u.test("👍") //→ true
```

2. 使正则表达式更早抛出语法错误，因为它会禁用 [Annex B 扩展](https://262.ecma-international.org/6.0/#sec-regular-expressions-patterns)。
   由于历史原因，JavaScript 正则表达式对语法错误是宽容的。
   例如，`/\w{1, 2/` 是一个语法错误，但 JavaScript 不会抛出该错误。它会匹配诸如 `"a{1, 2"` 之类的字符串。这种恢复逻辑定义在 Annex B 中。

ECMAScript 2024 中引入的 RegExp `v` 标志是 `u` 标志的超集，并提供了另外两个特性：

1. 字符串的 Unicode 属性

```js
const re = /^\p{RGI_Emoji}$/v;

// 匹配仅由 1 个码点组成的表情符号：
re.test("⚽"); // '\u26BD'
// → true ✅

// 匹配由多个码点组成的表情符号：
re.test("👨🏾‍⚕️"); // '\u{1F468}\u{1F3FE}\u200D\u2695\uFE0F'
// → true ✅
```

2. 集合表示法
   它允许在字符类之间进行集合运算：

```js
const re = /[\p{White_Space}&&\p{ASCII}]/v;
re.test("\n"); // → true
re.test("\u2028"); // → false
```

### 示例

以下是此规则的**错误**代码示例：

```js
const a = /aaa/;
const b = /bbb/gi;
const c = new RegExp("ccc");
const d = new RegExp("ddd", "gi");
```

以下是此规则的**正确**代码示例：

```js
const a = /aaa/u;
const b = /bbb/giu;
const c = new RegExp("ccc", "u");
const d = new RegExp("ddd", "giu");

const e = /aaa/v;
const f = /bbb/giv;
const g = new RegExp("ccc", "v");
const h = new RegExp("ddd", "gv");

// 如果标志无法被求值为静态值，此规则会忽略 RegExp 调用。
function i(flags) {
  return new RegExp("eee", flags);
}
```

## 配置

### requireFlag

type: `"u" | "v"`

default: `null`

对于不支持 `v` 标志的环境，可能更偏好使用 `u` 标志。

使用 `{ "requireFlag": "u" }` 选项时，以下是此规则的**错误**代码示例：

```js
const fooEmpty = /foo/;
const fooEmptyRegexp = new RegExp("foo");
const foo = /foo/v;
const fooRegexp = new RegExp("foo", "v");
```

使用 `{ "requireFlag": "u" }` 选项时，以下是此规则的**正确**代码示例：

```js
const foo = /foo/u;
const fooRegexp = new RegExp("foo", "u");
```

如果支持 `v` 标志，那么它可能是更好的选择，因为它比 `u` 标志具备更多特性（例如，测试字符串的 Unicode 属性的能力）。
不过，它的语法也更严格（例如，需要在字符类中转义某些字符）。

使用 `{ "requireFlag": "v" }` 选项时，以下是此规则的**错误**代码示例：

```js
const fooEmpty = /foo/;
const fooEmptyRegexp = new RegExp("foo");
const foo = /foo/u;
const fooRegexp = new RegExp("foo", "u");
```

使用 `{ "requireFlag": "v" }` 选项时，以下是此规则的**正确**代码示例：

```js
const foo = /foo/v;
const fooRegexp = new RegExp("foo", "v");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.63.0。

## 参考资料

<RuleReferences />
