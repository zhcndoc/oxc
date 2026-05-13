---
title: "vue/prefer-import-from-vue | Oxlint"
rule: "vue/prefer-import-from-vue"
category: "Correctness"
version: "1.20.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vue/prefer_import_from_vue.rs`;
</script>

<RuleHeader />

### 作用

强制使用 `import from 'vue'`，而不是 `import from '@vue/*'`。

### 为什么这不好？

从以下模块导入几乎总是错误的。你应该改为从 vue 导入。

- `@vue/runtime-dom`
- `@vue/runtime-core`
- `@vue/reactivity`
- `@vue/shared`

### 示例

此规则的**错误**代码示例：

```js
import { createApp } from "@vue/runtime-dom";
import { Component } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
```

此规则的**正确**代码示例：

```js
import { createApp, ref, Component } from "vue";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.20.0 中添加。

## 参考资料

<RuleReferences />
