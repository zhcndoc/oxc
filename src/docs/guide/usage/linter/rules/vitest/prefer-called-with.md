---
title: "vitest/prefer-called-with | Oxlint"
rule: "vitest/prefer-called-with"
category: "样式"
version: "0.2.5"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-with.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_called_with.rs`;
</script>

<RuleHeader />

### 作用

建议使用 `toBeCalledWith()` 或 `toHaveBeenCalledWith()`

### 为什么这不好？

在测试函数调用时，通常更有价值的是同时断言
函数是否被调用，以及它被调用时传入了哪些参数。
使用 `toBeCalled()` 或 `toHaveBeenCalled()` 只能验证函数
被调用了，但不能验证参数，这可能会遗漏
函数以错误参数被调用的 bug。

### 示例

以下是此规则下**错误**代码的示例：

```javascript
expect(someFunction).toBeCalled();
expect(someFunction).toHaveBeenCalled();
```

以下是此规则下**正确**代码的示例：

```javascript
expect(noArgsFunction).toBeCalledWith();
expect(roughArgsFunction).toBeCalledWith(expect.anything(), expect.any(Date));
expect(anyArgsFunction).toBeCalledTimes(1);
expect(uncalledFunction).not.toBeCalled();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.2.5。

## 参考资料

<RuleReferences />
