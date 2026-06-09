---
title: "typescript/no-unnecessary-type-conversion | Oxlint"
rule: "typescript/no-unnecessary-type-conversion"
category: "Suspicious"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/no-unnecessary-type-conversion/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_type_conversion.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_type_conversion/no_unnecessary_type_conversion.go`;
</script>

<RuleHeader />

### 它的作用

禁止不必要的类型转换表达式。

### 为什么这不好？

不会改变值的类型或运行时行为的类型转换会增加噪音，并可能掩盖意图。

### 示例

此规则的**错误**代码示例：

```ts
const value = String("asdf");
```

此规则的**正确**代码示例：

```ts
const value = "asdf";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.49.0 中添加。

## 参考资料

<RuleReferences />
