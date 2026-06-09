---
title: "vitest/prefer-to-have-been-called-times | Oxlint"
rule: "vitest/prefer-to-have-been-called-times"
category: "Style"
version: "1.34.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-been-called-times.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_to_have_been_called_times.rs`;
</script>

<RuleHeader />

### 作用

为了获得更好的失败信息，应该使用 [`toHaveBeenCalledTimes`，而不是直接检查 `mock.calls` 的长度](https://github.com/jest-community/eslint-plugin-jest/blob/v29.5.0/docs/rules/prefer-to-have-been-called-times.md)。

### 为什么这不好？

当使用 `toHaveLength` 来断言 mock 被调用的次数时，此规则会触发警告。

### 示例

以下是此规则的**错误**代码示例：

```js
expect(someFunction.mock.calls).toHaveLength(1);
expect(someFunction.mock.calls).toHaveLength(0);
expect(someFunction.mock.calls).not.toHaveLength(1);
```

以下是此规则的**正确**代码示例：

```js
expect(someFunction).toHaveBeenCalledTimes(1);
expect(someFunction).toHaveBeenCalledTimes(0);
expect(someFunction).not.toHaveBeenCalledTimes(0);
expect(uncalledFunction).not.toBeCalled();
expect(method.mock.calls[0][0]).toStrictEqual(value);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.34.0 中添加。

## 参考资料

<RuleReferences />
