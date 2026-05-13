---
title: "oxc/const-comparisons | Oxlint"
rule: "oxc/const-comparisons"
category: "正确性"
version: "0.0.22"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/const_comparisons.rs`;
</script>

<RuleHeader />

### 它的作用

检查冗余或逻辑上不可能成立的比较。这包括：

- 与常量进行无效的双重比较。
- 涉及常量的不可能比较。
- 两个操作数相同的冗余比较（例如，a < a）。

### 为什么这不好？

此类比较可能会导致程序中的逻辑令人困惑或不正确。在许多情况下：

- 只有其中一个比较会对结果产生影响，这表明程序员可能犯了错误，例如调换了比较运算符，或使用了错误的变量。
- 像 a < a 或 a >= a 这样的比较分别总是 false 或 true，使逻辑显得多余且可能误导。

### 示例

以下是此规则的**错误**代码示例：

```javascript
status_code <= 400 && status_code > 500;
status_code < 200 && status_code <= 299;
status_code > 500 && status_code >= 500;
a < a; // 总是 false
a >= a; // 总是 true
```

以下是此规则的**正确**代码示例：

```javascript
status_code >= 400 && status_code < 500;
500 <= status_code && 600 > status_code;
500 <= status_code && status_code <= 600;
a < b;
a <= b;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.22 中添加。

## 参考资料

<RuleReferences />
