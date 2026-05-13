---
title: "eslint/prefer-regex-literals | Oxlint"
rule: "eslint/prefer-regex-literals"
category: "样式"
version: "next"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_regex_literals.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 RegExp 构造函数，优先使用正则表达式字面量。

### 为什么这不好？

创建正则表达式有两种方式：

- 正则表达式字面量，例如 `/abc/u`。
- `RegExp` 构造函数，例如 `new RegExp("abc", "u")` 或 `RegExp("abc", "u")`。

当你想动态生成模式时，构造函数尤其有用，
因为它接受字符串参数。

当使用构造函数并传入字符串字面量时，不要忘记字符串转义规则仍然适用。
如果你想在模式中放入反斜杠，需要在字符串字面量中对它进行转义。
因此，下面两者是等价的：

```js
new RegExp("^\\d\\.$");

/^\d\.$/;

// 匹配 "0."、"1."、"2." ... "9."
```

在上面的例子中，正则表达式字面量更容易阅读和理解。
另外，在字符串字面量中遗漏额外的 `\` 是一个常见错误，这会生成一个完全不同的正则表达式：

```js
new RegExp("^\d\.$");

// 等价于 /^d.$/，匹配 "d1"、"d2"、"da"、"db" ...
```

当正则表达式是已知的时，最佳实践是避免在正则表达式表示法之上再套一层字符串字面量表示法，
而是使用正则表达式字面量代替构造函数。

### 示例

以下是此规则的**错误**代码示例：

```js
new RegExp("abc");
new RegExp("abc", "u");
RegExp("abc");
RegExp("abc", "u");
new RegExp("\\d\\d\\.\\d\\d\\.\\d\\d\\d\\d");
RegExp(`^\\d\\.$`);
new RegExp(String.raw`^\d\.$`);
```

以下是此规则的**正确**代码示例：

```js
/abc/;
/abc/u;
/\d\d\.\d\d\.\d\d\d\d/;
/^\d\.$/;
// 允许对动态生成的正则表达式使用 RegExp 构造函数
new RegExp(pattern);
RegExp("abc", flags);
new RegExp(prefix + "abc");
RegExp(`${prefix}abc`);
new RegExp(String.raw`^\d\. ${suffix}`);
```

## 配置

### disallowRedundantWrapping

type: `boolean`

default: `false`

默认情况下，此规则不会检查正则表达式字面量是否被不必要地包裹在 `RegExp` 构造函数调用中。
当选项 `disallowRedundantWrapping` 设置为 `true` 时，该规则也会禁止此类不必要的模式。

以下是 `{ "disallowRedundantWrapping": true }` 的**错误**代码示例：

```js
new RegExp(/abc/);
new RegExp(/abc/, "u");
```

以下是 `{ "disallowRedundantWrapping": true }` 的**正确**代码示例：

```js
/abc/;
/abc/u;
new RegExp(/abc/, flags);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 vnext 中添加的。

## 参考

<RuleReferences />
