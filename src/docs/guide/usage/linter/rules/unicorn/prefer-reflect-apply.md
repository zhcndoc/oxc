---
title: "unicorn/prefer-reflect-apply"
category: "Style"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_reflect_apply.rs`;
</script>

<RuleHeader />

### 作用

不允许使用 `Function.prototype.apply()`，并建议改用 `Reflect.apply()`。

### 为什么这不好？

`Reflect.apply()` 可以说更简洁，也更容易理解。
此外，当你接受任意方法时，
不能安全地假设 `.apply()` 一定存在或没有被重写。

### 示例

此规则的**错误**代码示例：

```javascript
foo.apply(null, [42]);
```

此规则的**正确**代码示例：

```javascript
Reflect.apply(foo, null);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.19 中添加的。

## 参考资料

<RuleReferences />
