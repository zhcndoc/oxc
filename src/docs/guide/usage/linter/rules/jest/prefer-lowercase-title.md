---
title: "jest/prefer-lowercase-title | Oxlint"
rule: "jest/prefer-lowercase-title"
category: "Style"
version: "0.15.9"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_lowercase_title.rs`;
</script>

<RuleHeader />

### 作用

强制 `it`、`test`、`describe` 和 `bench` 的描述以小写字母开头。这样可以使测试失败信息更易读。

### 为什么这不好？

测试失败信息使用小写消息时，通常会让失败信息在语法上更正确，尤其是在测试失败时。

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

此规则接受一个具有以下属性的配置对象：

### allowedPrefixes

type: `string[]`

default: `[]`

此数组选项允许指定前缀，标题可以以这些包含大写字母的前缀开头。
这在编写 API 端点测试时可能很有用，例如你可能希望用 HTTP 方法作为前缀。
默认情况下，不允许任何内容（相当于 `{ "allowedPrefixes": [] }`）。

`{ "allowedPrefixes": ["GET"] }` 选项的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "allowedPrefixes": ["GET"] }] */
describe("GET /live");
```

### ignore

type: `string[]`

default: `[]`

此数组选项控制此规则会检查哪些 Jest 或 Vitest 函数。共有四个可能的值：

- `"describe"`
- `"test"`
- `"it"`
- `"bench"`

默认情况下，这些选项都未启用（相当于
`{ "ignore": [] }`）。

`{ "ignore": ["describe"] }` 选项的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["describe"] }] */
describe("Uppercase description");
```

`{ "ignore": ["test"] }` 选项的**正确**代码示例：

```js
```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["test"] }] */
test("Uppercase description");
```

`{ "ignore": ["it"] }` 选项的**正确**代码示例：

```js
/* jest/prefer-lowercase-title: ["error", { "ignore": ["it"] }] */
it("Uppercase description");
```

### ignoreTopLevelDescribe

type: `boolean`

default: `false`

此选项可设置为仅允许顶层 `describe` 块的标题以大写字母开头。

`{ "ignoreTopLevelDescribe": true }` 选项的**正确**代码示例：

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

此选项可设置为仅验证测试名称的第一个字符是否为小写。

`{ "lowercaseFirstCharacterOnly": true }` 选项的**正确**代码示例：

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

`{ "lowercaseFirstCharacterOnly": true }` 选项的**错误**代码示例：

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

此规则在 v0.15.9 中添加。

## 参考资料

<RuleReferences />
