---
title: "typescript/no-unnecessary-qualifier | Oxlint"
rule: "typescript/no-unnecessary-qualifier"
category: "Style"
version: "1.49.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_qualifier.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_qualifier/no_unnecessary_qualifier.go`;
</script>

<RuleHeader />

### 它的作用

当引用的名称已经在作用域内时，禁止使用命名空间限定符。

### 为什么这很糟糕？

多余的限定符会增加噪音，并使类型引用更难阅读。

### 示例

以下是此规则的**不正确**代码示例：

```ts
namespace A {
  export type B = number;
  const value: A.B = 1;
}
```

以下是此规则的**正确**代码示例：

```ts
namespace A {
  export type B = number;
  const value: B = 1;
}
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v1.49.0 中添加。

## 参考资料

<RuleReferences />
