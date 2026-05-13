---
title: "typescript/prefer-regexp-exec | Oxlint"
rule: "typescript/prefer-regexp-exec"
category: "Style"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_regexp_exec.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_regexp_exec/prefer_regexp_exec.go`;
</script>

<RuleHeader />

### 它的作用

在提取正则表达式匹配结果时，优先使用 `RegExp#exec()` 而不是 `String#match()`。

### 为什么这不好？

`exec()` 对正则表达式匹配的表达方式更明确，并且避免了 `String#match()` 的重载行为。

### 示例

以下是此规则的**错误**代码示例：

```ts
const text = "value";
text.match(/v/);
```

以下是此规则的**正确**代码示例：

```ts
const text = "value";
/v/.exec(text);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.49.0。

## 参考资料

<RuleReferences />
