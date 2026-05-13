---
title: "vue/no-multiple-slot-args | Oxlint"
rule: "vue/no-multiple-slot-args"
category: "Restriction"
version: "1.15.0"
default: false
type_aware: false
fix: "待定"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_multiple_slot_args.rs`;
</script>

<RuleHeader />

### 它是做什么的

禁止向具名作用域插槽传递多个参数。

### 为什么这不好？

用户必须按固定顺序使用这些参数，且不能省略不需要的参数。
例如，如果某个插槽传入了 5 个参数，但用户实际上只需要最后 2 个，
他们就必须声明全部 5 个参数，才能使用最后 2 个。

更多信息可见 [vuejs/vue#9468](https://github.com/vuejs/vue/issues/9468#issuecomment-462210146)

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
export default {
  render(h) {
    var children = this.$scopedSlots.default(foo, bar);
    var children = this.$scopedSlots.default(...foo);
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
export default {
  render(h) {
    var children = this.$scopedSlots.default();
    var children = this.$scopedSlots.default(foo);
    var children = this.$scopedSlots.default({ foo, bar });
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.15.0 中添加。

## 参考资料

<RuleReferences />
