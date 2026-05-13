---
title: "eslint/no-continue | Oxlint"
rule: "eslint/no-continue"
category: "Style"
version: "0.2.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_continue.rs`;
</script>

<RuleHeader />

### 作用

禁止 `continue` 语句。

### 为什么不好？

`continue` 语句会终止当前循环或标记循环的当前迭代中的语句执行，并继续执行循环的下一次迭代。如果不正确使用，会导致代码的可测试性、可读性和可维护性降低。应该使用结构化控制流语句（例如 if）来代替。

### 示例

此规则 **不正确** 的代码示例：

```javascript
var sum = 0,
  i;

for (i = 0; i < 10; i++) {
  if (i >= 5) {
    continue;
  }

  sum += i;
}
```

此规则 **正确** 的代码示例：

```javascript
var sum = 0,
  i;
for (i = 0; i < 10; i++) {
  if (i < 5) {
    sum += i;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.14 中添加。

## 参考资料

<RuleReferences />
