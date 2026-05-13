---
title: "eslint/no-control-regex | Oxlint"
rule: "eslint/no-control-regex"
category: "正确性"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_control_regex.rs`;
</script>

<RuleHeader />

### 作用

禁止在正则表达式中使用控制字符和一些匹配控制字符的转义序列。

### 为什么不好？

控制字符是 ASCII 范围 0-31 内的特殊不可见字符。这些字符在 JavaScript 字符串中很少使用，因此包含明确匹配这些字符的元素的正则表达式很可能是一个错误。

### 示例

此规则**错误**代码示例：

```javascript
var pattern1 = /\x00/;
var pattern2 = /\x0C/;
var pattern3 = /\x1F/;
var pattern4 = /\u000C/;
var pattern5 = /\u{C}/u;
var pattern6 = new RegExp("\x0C"); // 模式中的原始 U+000C 字符
var pattern7 = new RegExp("\\x0C"); // \x0C 模式
```

此规则**正确**代码示例：

```javascript
var pattern1 = /\x20/;
var pattern2 = /\u0020/;
var pattern3 = /\u{20}/u;
var pattern4 = /\t/;
var pattern5 = /\n/;
var pattern6 = new RegExp("\x20");
var pattern7 = new RegExp("\\t");
var pattern8 = new RegExp("\\n");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.7 中添加。

## 参考资料

<RuleReferences />
