---
title: "jest/consistent-test-it | Oxlint"
rule: "jest/consistent-test-it"
category: "样式"
version: "0.5.3"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/consistent-test-it.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/consistent_test_it.rs`;
</script>

<RuleHeader />

### 作用

Jest 允许你选择如何定义测试，可以使用 `it` 或
`test` 关键字，并且每种都有多种变体：

- **it:** `it`, `xit`, `fit`, `it.only`, `it.skip`.
- **test:** `test`, `xtest`, `test.only`, `test.skip`.

### 为什么这不好？

在测试套件中保持一致是个好习惯，这样所有测试都会以相同的方式编写。

## 配置

此规则接受一个包含以下属性的配置对象：

### fn

type: `"it" | "test"`

default: `"test"`

决定使用 `test` 还是 `it`。

**`{ "fn": "test" }` 的错误代码示例：**

```javascript
it("foo");
it.only("foo");
```

**`{ "fn": "test" }` 的正确代码示例：**

```javascript
test("foo");
test.only("foo");
```

**`{ "fn": "it" }` 的错误代码示例：**

```javascript
test("foo");
test.only("foo");
```

**`{ "fn": "it" }` 的正确代码示例：**

```javascript
it("foo");
it.only("foo");
```

### withinDescribe

type: `"it" | "test"`

default: `"it"`

决定在 `describe` 作用域内使用 `test` 还是 `it`。
如果只提供了 `fn`，此项默认使用 `fn` 的值。

**`{ "withinDescribe": "test" }` 的错误代码示例：**

```javascript
describe("foo", function () {
  it("bar");
});
```

**`{ "withinDescribe": "test" }` 的正确代码示例：**

```javascript
describe("foo", function () {
  test("bar");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.3 中添加。

## 参考资料

<RuleReferences />
