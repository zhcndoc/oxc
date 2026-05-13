---
title: "eslint/no-useless-backreference | Oxlint"
rule: "eslint/no-useless-backreference"
category: "Correctness"
version: "0.16.10"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_backreference.rs`;
</script>

<RuleHeader />

### 它的作用

禁止正则表达式中那些会始终被忽略的反向引用，
因为它们所引用的捕获组在反向引用被求值时尚未匹配，
并且当时也不可能匹配。

### 为什么这不好？

无用的反向引用会导致正则表达式令人困惑或产生误导。
它们可能让人以为某个组的值正在被复用，但由于
模式的结构（例如求值顺序、分支或否定
环视），该组并没有匹配到任何内容——因此该引用总会
解析为空字符串。这几乎总是一个错误，也会使模式
更难理解和维护。

### 示例

以下是此规则的**错误**代码示例：

```js
/\1(a)/; // 反向引用出现在组之前
/(a|\1b)/; // 组和引用位于不同的分支中
/(?<=\1(a))b/; // 在后顾中先于组使用反向引用
/\1(?!(a))/; // 组位于负向先行断言中
/(a\1)/; // 反向引用位于其自身的组内
```

以下是此规则的**正确**代码示例：

```js
/(a)\1/; // 有效 — 反向引用跟在已完成的组之后
/(?<name>a)\k<name>/; // 正确使用命名组
/(?:a|(b))\1/; // 只有在组匹配时才使用反向引用
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.16.10 中添加。

## 参考资料

<RuleReferences />
