---
title: "jest/valid-describe-callback | Oxlint"
rule: "jest/valid-describe-callback"
category: "Correctness"
version: "0.0.8"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/valid_describe_callback.rs`;
</script>

<RuleHeader />

### 作用

此规则用于验证 `describe()` 函数的第二个参数是否为回调函数。这个回调函数：

- 不应为
  [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- 不应包含任何参数
- 不应包含任何 `return` 语句

### 为什么这不好？

使用不正确的 `describe()` 回调函数可能会导致意外的测试
错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 不允许使用异步回调函数
describe("myFunction()", async () => {
  // ...
});

// 不允许使用回调函数参数
describe("myFunction()", (done) => {
  // ...
});

// 不允许从 describe 块中返回值
describe("myFunction", () =>
  it("returns a truthy value", () => {
    expect(myFunction()).toBeTruthy();
  }));
```

## How to use

<RuleHowToUse />

## 版本

此规则于 v0.0.8 中添加。

## 参考资料

<RuleReferences />
