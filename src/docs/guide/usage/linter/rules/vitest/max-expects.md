---
title: "vitest/max-expects | Oxlint"
rule: "vitest/max-expects"
category: "Style"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/max_expects.rs`;
</script>

<RuleHeader />

### 作用

此规则强制限制单个测试中 `expect()` 调用的最大数量。

### 为什么这不好？

包含许多不同断言的测试，很可能混合了多个目标。
通常更好的是让每个测试只对应一个目标，这样当测试失败时，
就更容易定位问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
test("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});

it("should not pass", () => {
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
  expect(true).toBeDefined();
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### max

type: `integer`

default: `5`

单个测试中允许的 `expect()` 断言调用最大数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.18 中添加。

## 参考资料

<RuleReferences />
