---
title: "eslint/no-unused-labels | Oxlint"
rule: "eslint/no-unused-labels"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-unused-labels"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unused_labels.rs`;
</script>

<RuleHeader />

### 它的作用

禁止未使用的标签。

### 这为什么不好？

声明了但在代码中任何地方都未使用的标签，很可能是由于重构不完整导致的错误。

### 示例

此规则的**错误**代码示例：

```javascript
OUTER_LOOP: for (const student of students) {
  if (checkScores(student.scores)) {
    continue;
  }
  doSomething(student);
}
```

此规则的**正确**代码示例：

```javascript
for (const student of students) {
  if (checkScores(student.scores)) {
    continue;
  }
  doSomething(student);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.3 中添加。

## 参考资料

<RuleReferences />
