---
title: "vue/valid-next-tick | Oxlint"
rule: "vue/valid-next-tick"
category: "Correctness"
version: "1.67.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.vuejs.org/rules/valid-next-tick.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/valid_next_tick.rs`;
</script>

<RuleHeader />

### 它的作用

强制有效的 `nextTick` 函数调用。

### 为什么这不好？

`nextTick` 是一个函数，它要么接受一个回调，要么返回一个 Promise。
误用（将其当作值访问、传入额外参数、同时 `await` 并传入回调）几乎总是一个 bug。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
import { nextTick } from "vue";
export default {
  async mounted() {
    nextTick(); // 缺少 await 或回调
    this.$nextTick; // 未调用
    this.$nextTick(a, b); // 参数过多
    await this.$nextTick(callback); // 同时使用 await 和回调
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
import { nextTick } from "vue";
export default {
  async mounted() {
    await nextTick();
    this.$nextTick(callback);
    this.$nextTick().then(callback);
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.67.0。

## 参考资料

<RuleReferences />
