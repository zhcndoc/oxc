---
title: "vue/no-expose-after-await | Oxlint"
rule: "vue/no-expose-after-await"
category: "正确性"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-expose-after-await.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_expose_after_await.rs`;
</script>

<RuleHeader />

### 它的作用

禁止异步注册 `expose`。

### 为什么这很糟糕？

在 `<script setup>` 或 `setup()` 中，位于 `await`
表达式之后注册的 `defineExpose` 和 `context.expose()` 可能无法按预期工作，
因为它们是在组件实例完成设置之后才注册的。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script setup>
await doSomething();
defineExpose({
  /* ... */
}); // 错误
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script setup>
defineExpose({
  /* ... */
}); // 正确
await doSomething();
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.67.0 中添加。

## 参考资料

<RuleReferences />
