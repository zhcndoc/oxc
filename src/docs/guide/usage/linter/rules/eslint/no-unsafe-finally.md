---
title: "eslint/no-unsafe-finally"
category: "正确性"
version: "0.0.5"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unsafe_finally.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 `finally` 块中使用控制流语句。

### 为什么这不好？

JavaScript 会暂停 `try` 和 `catch`
块中的控制流语句，直到 `finally` 块执行完毕。

因此，当在 `finally` 中使用 `return`、`throw`、`break` 或 `continue` 时，
`try` 和 `catch` 中的控制流语句会被覆盖。
这可能是开发者意料之外的行为。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 我们期望这个函数返回 1；
(() => {
  try {
    return 1; // 返回 1，但会被挂起，直到 finally 块结束
  } catch (err) {
    return 2;
  } finally {
    return 3; // 3 会先于 1 返回，这不是我们预期的
  }
})();

// > 3
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.5 中添加。

## 参考资料

<RuleReferences />
