---
title: "jest/prefer-ending-with-an-expect | Oxlint"
rule: "jest/prefer-ending-with-an-expect"
category: "Style"
version: "1.60.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_ending_with_an_expect.rs`;
</script>

<RuleHeader />

### 作用

强制测试块以断言（`expect` 或配置的断言函数）结尾。

### 为什么这很糟糕？

一个没有以断言结尾的测试，可能会在最后一次检查之后继续执行副作用或进行设置，这会让测试更难理解，并且可能掩盖失败。以断言结尾可以确保测试的最后一个动作是在验证行为。

### 示例

以下是此规则在默认值下的**错误**代码示例：

```js
it("lets me change the selected option", () => {
  const container = render(MySelect, {
    props: { options: [1, 2, 3], selected: 1 },
  });

  expect(container).toBeDefined();
  expect(container.toHTML()).toContain('<option value="1" selected>');

  container.setProp("selected", 2);
});
```

以下是此规则在默认值下的**正确**代码示例：

```js
it("lets me change the selected option", () => {
  const container = render(MySelect, {
    props: { options: [1, 2, 3], selected: 1 },
  });

  expect(container).toBeDefined();
  expect(container.toHTML()).toContain('<option value="1" selected>');

  container.setProp("selected", 2);

  expect(container.toHTML()).not.toContain('<option value="1" selected>');
  expect(container.toHTML()).toContain('<option value="2" selected>');
});
```

以下是此规则在 `{ "assertFunctionNames": ["expect"] }` 下的**错误**代码示例：

```js
import { expectSaga } from "redux-saga-test-plan";
import { addSaga } from "../src/sagas";

test("returns sum", () => {
  expectSaga(addSaga, 1, 1).returns(2).run();
});
```

以下是此规则在 `{ "assertFunctionNames": ["expect"] }` 下的**正确**代码示例：

```js
import { expectSaga } from "redux-saga-test-plan";
import { addSaga } from "../src/sagas";

test("returns sum", () => {
  expectSaga(addSaga, 1, 1).returns(2).run();
});
```

以下是此规则在 `{ "additionalTestBlockFunctions": ["each.test"] }` 下的**正确**代码示例：

```js
each([
  [2, 3],
  [1, 3],
]).test("the selection can change from %d to %d", (firstSelection, secondSelection) => {
  const container = render(MySelect, {
    props: { options: [1, 2, 3], selected: firstSelection },
  });

  expect(container).toBeDefined();
  expect(container.toHTML()).toContain(`<option value="${firstSelection}" selected>`);

  container.setProp("selected", secondSelection);

  expect(container.toHTML()).not.toContain(`<option value="${firstSelection}" selected>`);
  expect(container.toHTML()).toContain(`<option value="${secondSelection}" selected>`);
});
```

## 配置

此规则接受一个配置对象，包含以下属性：

### additionalTestBlockFunctions

type: `string[]`

default: `[]`

应当也被视为测试块的函数名数组。

### assertFunctionNames

type: `string[]`

default: `["expect"]`

应当被视为断言函数的函数名列表。

## 如何使用

<RuleHowToUse />

## Version

此规则在 v1.60.0 中添加。

## References

<RuleReferences />
