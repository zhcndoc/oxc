---
title: "vitest/prefer-called-once | Oxlint"
rule: "vitest/prefer-called-once"
category: "Style"
version: "1.39.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_called_once.rs`;
</script>

<RuleHeader />

### 它的作用

将 `toBeCalledTimes(1)` 和 `toHaveBeenCalledTimes(1)` 分别替换为
`toBeCalledOnce()` 和 `toHaveBeenCalledOnce()`。

### 为什么这不好？

`*Times` 匹配器需要读取参数，才能知道一个 spy 预期会被调用多少次。
大多数情况下，你期望一个方法只被调用一次。

### 示例

以下是此规则的**错误**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledTimes(1);
  expect(mock).toHaveBeenCalledTimes(1);
});
```

以下是此规则的**正确**代码示例：

```js
test("foo", () => {
  const mock = vi.fn();
  mock("foo");
  expect(mock).toBeCalledOnce();
  expect(mock).toHaveBeenCalledOnce();
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.39.0 中添加。

## 参考资料

<RuleReferences />
