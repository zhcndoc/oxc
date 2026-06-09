---
title: "vitest/consistent-test-it | Oxlint"
rule: "vitest/consistent-test-it"
category: "Style"
version: "0.5.3"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/consistent_test_it.rs`;
</script>

<RuleHeader />

### 它的作用

Vitest 允许你选择如何定义测试，使用 `it`
或 `test` 关键字，并且每种都有多种变体：

- **it:** `it`、`it.only`、`it.skip`、`it.concurrent`、`it.each`。
- **test:** `test`、`test.only`、`test.skip`、`test.concurrent`、`test.each`。

### 为什么这不好？

在测试套件中保持一致是一种良好的实践，这样所有测试都可以用相同的方式编写。

## 配置

此规则接受一个包含以下属性的配置对象：

### fn

type: `"it" | "test"`

default: `"test"`

决定使用 `test` 还是 `it`。

Examples of **incorrect** code for `{ "fn": "test" }`:

```javascript
it("foo");
it.only("foo");
```

Examples of **correct** code for `{ "fn": "test" }`:

```javascript
test("foo");
test.only("foo");
```

Examples of **incorrect** code for `{ "fn": "it" }`:

```javascript
test("foo");
test.only("foo");
```

Examples of **correct** code for `{ "fn": "it" }`:

```javascript
it("foo");
it.only("foo");
```

### withinDescribe

type: `"it" | "test"`

default: `"it"`

决定在 `describe` 作用域内使用 `test` 还是 `it`。
如果只提供了 `fn`，此项将默认使用 `fn` 的值。

Examples of **incorrect** code for `{ "withinDescribe": "test" }`:

```javascript
describe("foo", function () {
  it("bar");
});
```

Examples of **correct** code for `{ "withinDescribe": "test" }`:

```javascript
describe("foo", function () {
  test("bar");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.5.3 中添加。

## 参考资料

<RuleReferences />
