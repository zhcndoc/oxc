---
title: "unicorn/no-lonely-if"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_lonely_if.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在没有 `else` 的 `if` 块中，将 `if` 语句作为唯一语句。

### 为什么这不好？

在一个 `if` 块中，只有一个没有 `else` 子句的 `if` 语句会让人感到困惑。

### 示例

此规则的**错误**代码示例：

```javascript
if (foo) {
  if (bar) {
  }
}
if (foo) if (bar) baz();
```

此规则的**正确**代码示例：

```javascript
if (foo && bar) {
}
if (foo && bar) baz();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中加入。

## 参考资料

<RuleReferences />
