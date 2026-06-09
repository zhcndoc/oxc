---
title: "vitest/prefer-lowercase-title | Oxlint"
rule: "vitest/prefer-lowercase-title"
category: "Style"
version: "0.15.9"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-lowercase-title.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_lowercase_title.rs`;
</script>

<RuleHeader />

### 作用

强制 `it`、`test`、`describe` 和 `bench` 的描述以小写字母开头。这能让测试失败信息更易读。

### 为什么这不好？

测试失败信息使用小写开头，通常会在测试失败时生成更符合语法的错误消息。

### 示例

以下是此规则的**错误**代码示例：

```javascript
it("Adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

以下是此规则的**正确**代码示例：

```javascript
it("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowedPrefixes

type: `string[]`

default: `[]`

此数组选项允许指定前缀，这些前缀中可以包含标题可开头的大写字母。当编写 API 端点测试时，这会很有用，因为你可能希望使用 HTTP 方法作为前缀。
默认情况下，不允许任何内容（等同于 `{ "allowedPrefixes": [] }`）。

选项 `{ "allowedPrefixes": ["GET"] }` 的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "allowedPrefixes": ["GET"] }] */
describe("GET /live");
```

### ignore

type: `string[]`

default: `[]`

此数组选项控制此规则会检查哪些 Jest 或 Vitest 函数。共有四种可能的值：

- `"describe"`
- `"test"`
- `"it"`
- `"bench"`

默认情况下，这些选项都未启用（等同于
`{ "ignore": [] }`）。

选项 `{ "ignore": ["describe"] }` 的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["describe"] }] */
describe("Uppercase description");
```

选项 `{ "ignore": ["test"] }` 的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["test"] }] */
test("Uppercase description");
```

选项 `{ "ignore": ["it"] }` 的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["it"] }] */
it("Uppercase description");
```

### ignoreTopLevelDescribe

type: `boolean`

default: `false`

此选项可设置为仅允许顶层的 `describe` 块使用以大写字母开头的标题。

选项 `{ "ignoreTopLevelDescribe": true }` 的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignoreTopLevelDescribe": true }] */
describe("MyClass", () => {
  describe("#myMethod", () => {
    it("does things", () => {
      //
    });
  });
});
```

### lowercaseFirstCharacterOnly

type: `boolean`

default: `true`

此选项可设置为仅验证测试名称的首个字符是否为小写。

选项 `{ "lowercaseFirstCharacterOnly": true }` 的**正确**代码示例：

```js
/* vitest/prefer-lowercase-title: ["error", { "lowercaseFirstCharacterOnly": true }] */
describe("myClass", () => {
  describe("myMethod", () => {
    it("does things", () => {
      //
    });
  });
});
```

选项 `{ "lowercaseFirstCharacterOnly": true }` 的**错误**代码示例：

```js
/* vitest/prefer-lowercase-title: ["error", { "lowercaseFirstCharacterOnly": true }] */
describe("MyClass", () => {
  describe("MyMethod", () => {
    it("does things", () => {
      //
    });
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.15.9 中新增。

## 参考资料

<RuleReferences />
