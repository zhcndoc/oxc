---
title: "vitest/prefer-called-exactly-once-with | Oxlint"
rule: "vitest/prefer-called-exactly-once-with"
category: "Style"
version: "1.58.0"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_called_exactly_once_with.rs`;
</script>

<RuleHeader />

### 作用

它会检查目标是否同时使用了 `toHaveBeenCalledOnce` 和 `toHaveBeenCalledWith` 来断言，而不是使用
`toHaveBeenCalledExactlyOnceWith`。

### 为什么这不好？

读者必须从这两个期望中推断出 spy 函数只被调用了一次，并且使用了特定参数。

### 示例

以下是此规则的**错误**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toHaveBeenCalledOnce();
  expect(mock).toHaveBeenCalledWith("foo");
});
```

以下是此规则的**正确**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toHaveBeenCalledExactlyOnceWith("foo");
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.58.0 中添加。

## 参考资料

<RuleReferences />
