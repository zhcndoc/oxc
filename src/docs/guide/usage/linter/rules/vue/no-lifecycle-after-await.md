---
title: "vue/no-lifecycle-after-await | Oxlint"
rule: "vue/no-lifecycle-after-await"
category: "Correctness"
version: "1.39.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-lifecycle-after-await.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_lifecycle_after_await.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `await` 之后注册生命周期钩子。

### 为什么这不好？

生命周期钩子必须在 `setup()` 执行期间同步注册。
如果在 `await` 语句之后调用生命周期钩子，可能注册得太晚，
并且可能无法按预期工作。

### 示例

以下是此规则的**错误**代码示例：

```vue
<script>
import { onMounted } from "vue";
export default {
  async setup() {
    await doSomething();
    onMounted(() => {
      /* ... */
    }); // 错误
  },
};
</script>
```

以下是此规则的**正确**代码示例：

```vue
<script>
import { onMounted } from "vue";
export default {
  async setup() {
    onMounted(() => {
      /* ... */
    }); // 正确
    await doSomething();
  },
};
</script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.39.0 中添加。

## 参考资料

<RuleReferences />
