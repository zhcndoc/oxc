---
title: "unicorn/no-console-spaces | Oxlint"
rule: "unicorn/no-console-spaces"
category: "Style"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_console_spaces.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `console.log()` 和类似方法中出现前导/尾随空格。

### 为什么这不好？

`console.log()` 方法和类似方法会用空格连接参数，
因此如果给参数添加前导/尾随空格，
就会额外插入两个空格。

### 示例

以下是此规则的**错误**代码示例：

```javascript
console.log("abc ", "def");
```

以下是此规则的**正确**代码示例：

```javascript
console.log("abc", "def");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
