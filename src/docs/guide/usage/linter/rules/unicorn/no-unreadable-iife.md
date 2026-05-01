---
title: "unicorn/no-unreadable-iife"
category: "Pedantic"
version: "0.0.19"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_unreadable_iife.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止使用带有括号包裹的箭头函数主体的 IIFE。

### 为什么这不好？

带有括号包裹的箭头函数主体的 IIFE 不易阅读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = ((bar) => (bar ? bar.baz : baz))(getBar());

const foo = ((bar, baz) => ({ bar, baz }))(bar, baz);
```

以下是此规则的**正确**代码示例：

```javascript
const bar = getBar();
const foo = bar ? bar.baz : baz;

const getBaz = (bar) => (bar ? bar.baz : baz);
const foo = getBaz(getBar());

const foo = ((bar) => {
  return bar ? bar.baz : baz;
})(getBar());
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
