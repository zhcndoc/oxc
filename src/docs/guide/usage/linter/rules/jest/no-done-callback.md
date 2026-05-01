---
title: "jest/no-done-callback"
category: "样式"
version: "0.0.13"
default: false
type_aware: false
fix: "待定"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_done_callback.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会检查 hooks 和 tests 的函数参数中是否使用了 done 参数，并建议改为返回一个 promise。

### 为什么这不好？

在 hooks 和 tests 中调用异步代码时，jest 需要知道异步工作何时完成，才能继续当前运行。
最初，实现这一点最常见的模式是使用回调：

```javascript
test("the data is peanut butter", (done) => {
  function callback(data) {
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

不过，这很容易出错，因为它要求对断言在测试中的工作方式有细致的理解，否则测试将不会按预期运行。

### 示例

以下是此规则的**错误**代码示例：

```javascript
beforeEach((done) => {
  // ...
});

test("myFunction()", (done) => {
  // ...
});

test("myFunction()", function (done) {
  // ...
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.13 中添加的。

## 参考

<RuleReferences />
