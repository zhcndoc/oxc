---
title: "vue/return-in-computed-property | Oxlint"
rule: "vue/return-in-computed-property"
category: "Correctness"
version: "1.63.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/return-in-computed-property.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/return_in_computed_property.rs`;
</script>

<RuleHeader />

### 它的作用

强制每个计算属性中都存在一个 `return` 语句。

### 为什么这很糟糕？

Vue 的计算属性是一个必须生成值的 getter。忘记返回会使值变成 `undefined`，从而悄无声息地破坏依赖该计算属性的模板和响应式代码。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  computed: {
    foo() {
      // 缺少 return
    },
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  computed: {
    foo() {
      return this.bar;
    },
  },
};
</script>
```

## 配置

### treatUndefinedAsUnspecified

type: `boolean`

default: `true`

当为 `true`（默认值）时，`return;`（不带返回值）会被视为缺少返回。
将其设置为 `false` 可允许单独的 `return;`，将其视为返回了一个值。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.63.0 中添加。

## 参考资料

<RuleReferences />
