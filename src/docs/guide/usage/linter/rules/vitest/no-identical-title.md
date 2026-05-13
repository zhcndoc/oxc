---
title: "vitest/no-identical-title | Oxlint"
rule: "vitest/no-identical-title"
category: "Style"
version: "0.0.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_identical_title.rs`;
</script>

<RuleHeader />

### 它的作用

这条规则会检查每个测试和测试套件的标题。
当同一测试套件层级下的两个测试套件或两个测试用例具有相同标题时，它会报告问题。

### 为什么这不好？

两个不同的测试或测试套件使用相同的标题可能会造成混淆。
例如，当某个测试与同一测试套件中的另一个测试具有相同标题并失败时，就更难知道到底是哪个失败了，因此也更难修复。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("baz", () => {
  //...
});

describe("baz", () => {
  // 与前一个测试套件具有相同的标题
  // ...
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.14 中加入。

## 参考资料

<RuleReferences />
