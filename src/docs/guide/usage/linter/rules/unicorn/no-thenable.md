---
title: "unicorn/no-thenable | Oxlint"
rule: "unicorn/no-thenable"
category: "Correctness"
version: "0.0.13"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_thenable.rs`;
</script>

<RuleHeader />

### 它的作用

禁止定义 `then` 属性。

### 为什么这不好？

如果一个对象被定义为“thenable”，一旦它被意外地
用于 `await` 表达式中，可能会导致问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function example() {
  const foo = {
    unicorn: 1,
    then() {},
  };

  const { unicorn } = await foo;

  console.log("after"); // <- 这永远不会执行
}
```

以下是此规则的**正确**代码示例：

```javascript
async function example() {
  const foo = {
    unicorn: 1,
    bar() {},
  };

  const { unicorn } = await foo;

  console.log("after");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.13 中加入。

## 参考资料

<RuleReferences />
