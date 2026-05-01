---
title: "eslint/no-useless-call"
category: "Perf"
version: "0.15.9"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_call.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对 `.call()` 和 `.apply()` 的不必要调用

### 为什么这不好？

`Function.prototype.call()` 和 `Function.prototype.apply()` 比普通的函数调用更慢。

此规则会静态比较代码，以检查 thisArg 是否发生了变化。
因此，如果关于 thisArg 的代码是动态表达式，此规则就无法正确判断。

### 示例

此规则的**错误**代码示例：

```js
// 这些与 `foo(1, 2, 3);` 相同
foo.call(undefined, 1, 2, 3);
foo.apply(undefined, [1, 2, 3]);
foo.call(null, 1, 2, 3);
foo.apply(null, [1, 2, 3]);

// 这些与 `obj.foo(1, 2, 3);` 相同
obj.foo.call(obj, 1, 2, 3);
obj.foo.apply(obj, [1, 2, 3]);
```

此规则的**正确**代码示例：

```js
// `this` 绑定不同。
foo.call(obj, 1, 2, 3);
foo.apply(obj, [1, 2, 3]);
obj.foo.call(null, 1, 2, 3);
obj.foo.apply(null, [1, 2, 3]);
obj.foo.call(otherObj, 1, 2, 3);
obj.foo.apply(otherObj, [1, 2, 3]);

// 参数列表是可变参数。
// 这些会被 `prefer-spread` 规则警告。
foo.apply(undefined, args);
foo.apply(null, args);
obj.foo.apply(obj, args);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.15.9 中添加的。

## 参考

<RuleReferences />
