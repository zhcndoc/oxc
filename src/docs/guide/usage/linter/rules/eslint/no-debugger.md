---
title: "eslint/no-debugger"
category: "正确性"
default: true
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_debugger.rs`;
</script>

<RuleHeader />

### 作用

检查 `debugger` 语句的使用。

### 为什么不好？

当未连接调试器时，`debugger` 语句不会影响功能。
它们通常是无意的调试残留代码。

### 示例

此规则 **错误** 代码示例：

```javascript
async function main() {
  const data = await getData();
  const result = complexCalculation(data);
  debugger;
}
```

此规则 **正确** 代码示例：

```javascript
async function main() {
  const data = await getData();
  const result = complexCalculation(data);
}
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
