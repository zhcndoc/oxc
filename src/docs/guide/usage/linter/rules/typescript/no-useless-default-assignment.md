---
title: "typescript/no-useless-default-assignment | Oxlint"
rule: "typescript/no-useless-default-assignment"
category: "Correctness"
version: "1.49.0"
default: true
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_useless_default_assignment.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_useless_default_assignment/no_useless_default_assignment.go`;
</script>

<RuleHeader />

### 它的作用

禁止永远不会被使用的默认赋值。

### 为什么这不好？

当值永远不可能是 `undefined` 时，默认赋值就是多余的。
这会增加运行时逻辑和噪音，而不会改变行为。

### 示例

以下是此规则的**错误**代码示例：

```ts
[1, 2, 3].map((a = 0) => a + 1);
```

以下是此规则的**正确**代码示例：

```ts
[1, 2, 3].map((a) => a + 1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.49.0 中添加。

## 参考资料

<RuleReferences />
