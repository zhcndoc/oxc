---
title: "vue/no-watch-after-await | Oxlint"
rule: "vue/no-watch-after-await"
category: "正确性"
version: "1.67.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-watch-after-await.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_watch_after_await.rs`;
</script>

<RuleHeader />

### 作用

禁止异步注册的 `watch`。

### 为什么这不好？

在 `setup()` 中，`await` 表达式之后注册的 `watch` 和 `watchEffect` 可能无法按预期工作，因为它们是在组件实例完成设置之后才注册的。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
import { watch } from "vue";
export default {
  async setup() {
    await doSomething();
    watch(foo, () => {
      /* ... */
    }); // 错误
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
import { watch } from "vue";
export default {
  async setup() {
    watch(foo, () => {
      /* ... */
    }); // 正确
    await doSomething();
  },
};
</script>
```

## How to Use

<RuleHowToUse />

## 版本

此规则于 v1.67.0 添加。

## 参考资料

<RuleReferences />
