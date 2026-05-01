---
title: "vitest/no-conditional-tests"
category: "正确性"
version: "0.8.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_conditional_tests.rs`;
</script>

<RuleHeader />

### 作用

该规则禁止在测试用例中使用条件语句，以确保测试具有确定性并且易于阅读。

### 为什么这不好？

测试用例中的条件语句会使测试变得不可预测，并且更难理解。测试应当保持一致且直接，以确保结果可靠并便于维护。

### 示例

以下是此规则的**错误**代码示例：

```js
describe("my tests", () => {
  if (true) {
    it("is awesome", () => {
      doTheThing();
    });
  }
});
```

以下是此规则的**正确**代码示例：

```js
describe("my tests", () => {
  it("is awesome", () => {
    doTheThing();
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.8.0 中添加。

## 参考资料

<RuleReferences />
