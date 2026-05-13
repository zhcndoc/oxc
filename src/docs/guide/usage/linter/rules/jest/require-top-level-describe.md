---
title: "jest/require-top-level-describe | Oxlint"
rule: "jest/require-top-level-describe"
category: "Style"
version: "0.4.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/require_top_level_describe.rs`;
</script>

<RuleHeader />

### 它的作用

要求测试用例和钩子都位于顶层 `describe` 块中。

### 为什么这是不好的？

将测试和钩子组织在 `describe` 块中可以为测试套件提供更好的结构和分组。它能让测试输出更易读，并有助于测试组织，尤其是在较大的代码库中。

如果测试用例（`test` 和 `it`）或钩子（`beforeAll`、`beforeEach`、`afterEach`、`afterAll`）不位于顶层 `describe` 块中，此规则会触发警告。

### 示例

此规则的**错误**代码示例：

```javascript
// 在 describe 块上方
test("my test", () => {});
describe("test suite", () => {
  it("test", () => {});
});

// 在 describe 块下方
describe("test suite", () => {});
test("my test", () => {});

// 钩子同样适用
beforeAll("my beforeAll", () => {});
describe("test suite", () => {});
afterEach("my afterEach", () => {});
```

此规则的**正确**代码示例：

```javascript
// 在 describe 块上方
// 在 describe 块中
describe("test suite", () => {
  test("my test", () => {});
});

// 在嵌套的 describe 块中
describe("test suite", () => {
  test("my test", () => {});
  describe("another test suite", () => {
    test("my other test", () => {});
  });
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### maxNumberOfTopLevelDescribes

type: `integer`

default: `Infinity`

测试文件中允许的顶层 `describe` 块的最大数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.4.2 中添加。

## 参考资料

<RuleReferences />
