---
title: "eslint/prefer-spread"
category: "Style"
version: "0.0.17"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/prefer_spread.rs`;
</script>

<RuleHeader />

### 作用

要求使用展开运算符，而不是 `.apply()`

### 为什么这不好？

在 ES2015 之前，必须使用 `Function.prototype.apply()` 来调用可变参数函数。

```javascript
var args = [1, 2, 3, 4];
Math.max.apply(Math, args);
```

在 ES2015 中，可以使用展开语法来调用可变参数函数。

```javascript
var args = [1, 2, 3, 4];
Math.max(...args);
```

### 示例

以下是此规则的**错误**代码示例：

```javascript
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

以下是此规则的**正确**代码示例：

```javascript
// 使用展开语法
foo(...args);
obj.foo(...args);

// `this` 绑定不同。
foo.apply(obj, args);
obj.foo.apply(null, args);
obj.foo.apply(otherObj, args);

// 参数列表不是可变参数。
// 这些会被 `no-useless-call` 规则警告。
foo.apply(undefined, [1, 2, 3]);
foo.apply(null, [1, 2, 3]);
obj.foo.apply(obj, [1, 2, 3]);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.17 中添加的。

## 参考

<RuleReferences />
