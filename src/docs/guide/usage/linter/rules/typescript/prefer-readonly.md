---
title: "typescript/prefer-readonly | Oxlint"
rule: "typescript/prefer-readonly"
category: "Style"
version: "0.0.8"
default: false
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/prefer-readonly/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_readonly.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/prefer_readonly/prefer_readonly.go`;
</script>

<RuleHeader />

### 它的作用

要求永不被重新赋值的类成员标记为 `readonly`。

### 为什么这不好？

永不变化的成员应声明为 `readonly`，以明确类的不变式并
防止意外修改。

### 示例

以下是此规则的**错误**代码示例：

```ts
class Counter {
  private value = 0;

  getValue() {
    return this.value;
  }
}
```

以下是此规则的**正确**代码示例：

```ts
class Counter {
  private readonly value = 0;

  getValue() {
    return this.value;
  }
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### onlyInlineLambdas

type: `boolean`

default: `false`

将检查限制为立即使用内联 lambda 值初始化的成员。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.8 中加入。

## 参考资料

<RuleReferences />
