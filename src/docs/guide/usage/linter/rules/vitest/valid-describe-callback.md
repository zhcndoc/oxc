---
title: "vitest/valid-describe-callback | Oxlint"
rule: "vitest/valid-describe-callback"
category: "Correctness"
version: "0.0.8"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/valid_describe_callback.rs`;
</script>

<RuleHeader />

### 作用

此规则验证 `describe()` 函数的第二个参数是否为一个
回调函数。该回调函数：

- 不应包含任何参数
- 不应包含任何 `return` 语句

Vitest 支持异步 `describe()` 回调，因此此规则允许它们。

### 为什么这很糟糕？

使用不正确的 `describe()` 回调函数可能会导致意外的测试
错误。

### 示例

此规则的 **错误** 代码示例如下：

```javascript
// 不允许回调函数参数
describe("myFunction()", (done) => {
  // ...
});

// 不允许在 describe 块中返回值
describe("myFunction", () =>
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  }));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
