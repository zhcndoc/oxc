---
title: "vitest/consistent-each-for | Oxlint"
rule: "vitest/consistent-each-for"
category: "Correctness"
version: "1.39.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-each-for.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/consistent_each_for.rs`;
</script>

<RuleHeader />

### 它的作用

此规则强制用于创建参数化测试的方法保持一致。
此配置会影响不同的测试函数类型（`test`、`it`、`describe`、`suite`）。

### 为什么这不好？

如果没有一种一致的方式来创建参数化测试，我们就不得不依赖开发者记住：
`.for` 会将这些值作为不同的参数展开，而 `.each` 会将数组作为单个参数传递。

### 示例

以下是此规则的**错误**代码示例：

```js
// { test: 'for' }
test.each([[1, 1, 2]])("test", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

// { describe: 'for' }
describe.each([[1], [2]])("suite %s", (n) => {
  test("test", () => {});
});
```

以下是此规则的**正确**代码示例：

```js
// { test: 'for' }
test.for([[1, 1, 2]])("test", ([a, b, expected]) => {
  expect(a + b).toBe(expected);
});

// { describe: 'for' }
describe.for([[1], [2]])("suite %s", ([n]) => {
  test("test", () => {});
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### describe

type: `"for" | "each"`

用于为 `describe` 块创建参数化测试的首选方法。

### it

type: `"for" | "each"`

用于为 `it` 块创建参数化测试的首选方法。

### suite

type: `"for" | "each"`

用于为 `suite` 块创建参数化测试的首选方法。

### test

type: `"for" | "each"`

用于为 `test` 块创建参数化测试的首选方法。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.39.0 中添加。

## 参考资料

<RuleReferences />
