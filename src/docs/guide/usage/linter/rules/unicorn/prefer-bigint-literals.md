---
title: "unicorn/prefer-bigint-literals | Oxlint"
rule: "unicorn/prefer-bigint-literals"
category: "Style"
version: "1.30.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-bigint-literals.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_bigint_literals.rs`;
</script>

<RuleHeader />

### 作用

要求使用 BigInt 字面量（例如 `123n`），而不是调用 `BigInt()` 构造函数并传入字面量参数，例如数字或数字字符串。

### 为什么这不好？

对字面量值使用 `BigInt(…)` 过于冗长，也不如使用 BigInt 字面量符合习惯。

### 示例

以下是此规则的**错误**代码示例：

```js
BigInt(0);
BigInt(123);
BigInt(0xff);
BigInt(1e3);
BigInt("42");
BigInt("0x10");
```

以下是此规则的**正确**代码示例：

```js
0n;
123n;
0xffn;
1000n;
// 非整数、动态或非字面量输入：
BigInt(x);
BigInt("not-a-number");
BigInt("1.23");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.30.0 中添加的。

## 参考资料

<RuleReferences />
