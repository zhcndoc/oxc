---
title: "vue/require-typed-ref | Oxlint"
rule: "vue/require-typed-ref"
category: "Style"
version: "1.17.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/require_typed_ref.rs`;
</script>

<RuleHeader />

### 作用

要求 `ref` 和 `shallowRef` 函数具有明确的类型。

### 为什么这不好？

使用 TypeScript 时，可以通过 `noImplicitAny` 很容易地防止使用 `any`。
不幸的是，这条规则很容易被 Vue 的 `ref()` 函数绕过。
在没有泛型参数或初始值的情况下调用 `ref()` 函数，会导致 ref 的类型为 `Ref<any>`。

### 示例

以下是此规则的**错误**代码示例：

```typescript
const count = ref();
const name = shallowRef();
```

以下是此规则的**正确**代码示例：

```typescript
const count = ref<number>();
const a = ref(0);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.17.0 中添加。

## 参考资料

<RuleReferences />
