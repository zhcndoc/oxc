---
title: "jest/valid-expect | Oxlint"
rule: "jest/valid-expect"
category: "正确性"
version: "0.0.14"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/valid_expect.rs`;
</script>

<RuleHeader />

### 作用

检查 `expect()` 是否被正确调用。

### 为什么这很糟糕？

`expect()` 是一个用于在测试中断言值的函数。
它应该只接收一个参数，也就是要测试的值。
如果你调用 `expect()` 时不传参数，或者传入多个参数，它将无法按预期工作。

### 示例

以下是此规则的**错误**代码示例：

```javascript
expect();
expect("something");
expect(true).toBeDefined;
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

以下是此规则的**正确**代码示例：

```javascript
expect("something").toEqual("something");
expect(true).toBeDefined();
expect(Promise.resolve("Hi!")).resolves.toBe("Hi!");
```

## 配置

此规则接受一个包含以下属性的配置对象：

### alwaysAwait

type: `boolean`

default: `false`

当为 `true` 时，异步断言在所有上下文中都必须 `await`（不只是返回语句中）。

### asyncMatchers

type: `string[]`

default: `["toResolve", "toReject"]`

被视为异步、因此需要等待的 matcher 列表（例如 `toResolve`、`toReject`）。

### maxArgs

type: `integer`

default: `1`

`expect` 最多应传入的参数数量。

### minArgs

type: `integer`

default: `1`

`expect` 至少应传入的参数数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.14 中添加。

## 参考资料

<RuleReferences />
