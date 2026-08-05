---
title: "eslint/no-unreachable-loop | Oxlint"
rule: "eslint/no-unreachable-loop"
category: "Nursery"
version: "next"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-unreachable-loop"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_unreachable_loop.rs`;
</script>

<RuleHeader />

### 功能

禁止循环体只允许执行一次迭代的循环。

### 为什么这不好？

如果循环总是在第二次迭代之前退出，通常是意外情况，
可以使用更简单的控制流替代。

### 示例

此规则的**错误**代码示例：

```js
for (const item of items) {
  console.log(item);
  break;
}
```

此规则的**正确**代码示例：

```js
for (const item of items) {
  console.log(item);
}
```

## 配置

### 忽略

类型：`array`

#### 忽略[n]

类型：`"WhileStatement" | "DoWhileStatement" | "ForStatement" | "ForInStatement" | "ForOfStatement"`

## 使用方法

<RuleHowToUse />

## 版本

此规则已在 vnext 中添加。

## 参考资料

<RuleReferences />
