---
title: "vue/no-deprecated-vue-config-keycodes | Oxlint"
rule: "vue/no-deprecated-vue-config-keycodes"
category: "Correctness"
version: "1.62.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/no_deprecated_vue_config_keycodes.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用已弃用的 `Vue.config.keyCodes`（在 Vue.js 3.0.0+ 中）。

### 为什么这不好？

`Vue.config.keyCodes` 已在 Vue 3 中移除。依赖它的代码在升级时会静默停止工作。

### 示例

此规则的**错误**代码示例：

```js
Vue.config.keyCodes = { enter: 13 };
```

此规则的**正确**代码示例：

```js
Vue.config.silent = true;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.62.0 中添加。

## 参考资料

<RuleReferences />
