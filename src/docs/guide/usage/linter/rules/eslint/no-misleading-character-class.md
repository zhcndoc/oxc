---
title: "eslint/no-misleading-character-class | Oxlint"
rule: "eslint/no-misleading-character-class"
category: "正确性"
version: "1.17.0"
default: true
type_aware: false
fix: "fixable_suggestion"
upstream: "https://eslint.org/docs/latest/rules/no-misleading-character-class"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_misleading_character_class.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会报告在字符类语法中包含多个码点字符的正则表达式。这包括：

- 带组合附加符号的字符（例如 `Á`，其中 `A` 后跟一个组合尖音符）
- 带 emoji 修饰符的字符（例如 `👶🏻`）
- 区域指示符符号对（例如 `🇯🇵`）
- 通过零宽连接符（ZWJ）连接的字符（例如 `👨‍👩‍👦`）
- 没有 Unicode 标志的代理对（例如 `/^[👍]$/`）

### 为什么这很糟糕？

Unicode 包含由多个码点组成的字符。
RegExp 字符类语法（`/[abc]/`）无法将由多个码点组成的字符
作为一个字符处理；
这些字符会被拆分为各个码点。
例如，`❇️` 由 `❇`（`U+2747`）和 VARIATION SELECTOR-16（`U+FE0F`）组成。
如果这个字符出现在 RegExp 字符类中，
它匹配的将是 `❇`（`U+2747`）或 VARIATION SELECTOR-16（`U+FE0F`），而不是 `❇️`。

这可能会导致正则表达式与作者的意图不符，
尤其是对于 emoji、区域指示符以及带组合附加符号的字符。

#### 示例

此规则的**错误**代码示例：

```javascript
/^[Á]$/u;
/^[❇️]$/u;
/^[👶🏻]$/u;
/^[🇯🇵]$/u;
/^[👨‍👩‍👦]$/u;
/^[👍]$/;
new RegExp("[🎵]");
```

此规则的**正确**代码示例：

```javascript
/^[abc]$/;
/^[👍]$/u;
/[\u00B7\u0300-\u036F]/u;
new RegExp("^[\u{1F1EF}\u{1F1F5}]", "u");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowEscape

type: `boolean`

default: `false`

当设置为 `true` 时，只要使用转义序列书写，
此规则允许字符类内任意码点的组合。

使用 `{ "allowEscape": true }` 时，此规则的**错误**代码示例：

```javascript
/[\uD83D]/; // 反斜杠可以省略
new RegExp("[\ud83d" + "\udc4d]");
```

使用 `{ "allowEscape": true }` 时，此规则的**正确**代码示例：

```javascript
/[\ud83d\udc4d]/;
/[\u00B7\u0300-\u036F]/u;
/[👨\u200d👩]/u;
new RegExp("[\x41\u0301]");
new RegExp(`[\u{1F1EF}\u{1F1F5}]`, "u");
new RegExp("[\\u{1F1EF}\\u{1F1F5}]", "u");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.17.0 中添加。

## 参考资料

<RuleReferences />
