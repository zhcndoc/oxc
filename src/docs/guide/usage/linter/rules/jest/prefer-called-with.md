---
title: "jest/prefer-called-with | Oxlint"
rule: "jest/prefer-called-with"
category: "样式"
version: "0.2.5"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-called-with.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_called_with.rs`;
</script>

<RuleHeader />

### 它的作用

建议使用 `toBeCalledWith()` 或 `toHaveBeenCalledWith()`

### 为什么这不好？

在测试函数调用时，通常更有价值的是同时断言：
函数已被调用，以及它被调用时传入了哪些参数。
使用 `toBeCalled()` 或 `toHaveBeenCalled()` 只能验证函数
已被调用，但不能验证参数，可能会漏掉
函数以错误参数被调用的 bug。

### 示例

以下是此规则的**不正确**代码示例：

```javascript
expect(someFunction).toBeCalled();
expect(someFunction).toHaveBeenCalled();
```

以下是此规则的**正确**代码示例：

```javascript
expect(noArgsFunction).toBeCalledWith();
expect(roughArgsFunction).toBeCalledWith(expect.anything(), expect.any(Date));
expect(anyArgsFunction).toBeCalledTimes(1);
expect(uncalledFunction).not.toBeCalled();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.5 中添加。

## 参考资料

<RuleReferences />
