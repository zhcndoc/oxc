---
title: "typescript/use-unknown-in-catch-callback-variable"
category: "Restriction"
version: "1.12.0"
default: false
type_aware: true
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/use_unknown_in_catch_callback_variable.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/use_unknown_in_catch_callback_variable/use_unknown_in_catch_callback_variable.go`;
</script>

<RuleHeader />

### 作用

此规则强制在 catch 子句变量中使用 `unknown`，而不是 `any`。

### 为什么这不好？

在 TypeScript 4.0+ 中，catch 子句变量可以被类型标注为 `unknown`，而不是 `any`。使用 `unknown` 更安全，因为它会迫使你在使用错误对象之前先进行类型检查，从而防止潜在的运行时错误。

### 示例

此规则的**错误**代码示例：

```ts
try {
  somethingRisky();
} catch (error: any) {
  // 应使用 'unknown'
  console.log(error.message); // 不安全的访问
  error.someMethod(); // 不安全的调用
}

// 在旧版 TypeScript 中，默认的 catch 变量是 'any'
try {
  somethingRisky();
} catch (error) {
  // 隐式为 'any'
  console.log(error.message); // 不安全的访问
}
```

此规则的**正确**代码示例：

```ts
try {
  somethingRisky();
} catch (error: unknown) {
  // 为 Error 对象设置类型守卫
  if (error instanceof Error) {
    console.log(error.message); // 安全的访问
    console.log(error.stack);
  } else {
    console.log("未知错误：", error);
  }
}

// 更全面的错误处理
try {
  somethingRisky();
} catch (error: unknown) {
  if (error instanceof Error) {
    // 处理 Error 对象
    console.error("错误：", error.message);
  } else if (typeof error === "string") {
    // 处理字符串错误
    console.error("字符串错误：", error);
  } else {
    // 处理未知错误类型
    console.error("未知错误类型：", error);
  }
}

// 错误处理辅助函数
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

try {
  somethingRisky();
} catch (error: unknown) {
  if (isError(error)) {
    console.log(error.message);
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.12.0 中添加。

## 参考资料

<RuleReferences />
