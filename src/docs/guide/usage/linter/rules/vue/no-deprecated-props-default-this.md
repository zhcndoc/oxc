---
title: "vue/no-deprecated-props-default-this | Oxlint"
rule: "vue/no-deprecated-props-default-this"
category: "正确性"
version: "1.67.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_props_default_this.rs`;
</script>

<RuleHeader />

### 作用

禁止在 props 默认函数中使用已弃用的 `this` 访问（在 Vue.js 3.0.0+ 中）。

### 为什么这不好？

在 Vue.js 3.0.0+ 中，props 默认工厂函数不再能访问
`this`。它们在组件实例创建之前被调用，因此
`this` 是 `undefined`。工厂函数应改为依赖其第一个参数（即
由父组件传入的原始 props）。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  props: {
    a: String,
    b: {
      default() {
        return this.a;
      },
    },
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  props: {
    a: String,
    b: {
      default(props) {
        return props.a;
      },
    },
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.67.0 中添加。

## 参考资料

<RuleReferences />
