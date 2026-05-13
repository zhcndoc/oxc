---
title: "unicorn/no-useless-error-capture-stack-trace | Oxlint"
rule: "unicorn/no-useless-error-capture-stack-trace"
category: "Restriction"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_error_capture_stack_trace.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在错误构造函数中使用不必要的 `Error.captureStackTrace(…)`。

### 为什么这不好？

在内置 `Error` 子类的构造函数中调用 `Error.captureStackTrace(…)` 是不必要的，
因为 `Error` 构造函数会自动调用它。

### 示例

以下是此规则的**错误**代码示例：

```js
class MyError extends Error {
  constructor() {
    Error.captureStackTrace(this, MyError);
  }
}
```

以下是此规则的**正确**代码示例：

```js
class MyError extends Error {
  constructor() {
    // 无需调用 Error.captureStackTrace
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中添加。

## 参考资料

<RuleReferences />
