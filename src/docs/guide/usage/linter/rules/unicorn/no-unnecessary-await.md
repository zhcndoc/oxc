---
title: "unicorn/no-unnecessary-await | Oxlint"
rule: "unicorn/no-unnecessary-await"
category: "正确性"
version: "0.0.12"
default: true
type_aware: false
fix: "conditional_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unnecessary_await.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对非 Promise 值使用 await。

### 为什么这不好？

`await` 操作符应仅用于 `Promise` 值。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function bad() {
  await await promise;
}
```

以下是此规则的**正确**代码示例：

```javascript
async function bad() {
  await promise;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.12。

## 参考资料

<RuleReferences />
