---
title: "vue/no-side-effects-in-computed-properties | Oxlint"
rule: "vue/no-side-effects-in-computed-properties"
category: "Correctness"
version: "1.70.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_side_effects_in_computed_properties.rs`;
</script>

<RuleHeader />

### 作用

禁止在计算属性中产生副作用。

### 为什么这不好？

在计算属性中引入副作用被认为是非常糟糕的做法。
这会使代码变得不可预测且难以理解。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  computed: {
    fullName() {
      this.firstName = "lorem"; // 副作用
      return `${this.firstName} ${this.lastName}`;
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
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.70.0 中添加。

## 参考文献

<RuleReferences />
