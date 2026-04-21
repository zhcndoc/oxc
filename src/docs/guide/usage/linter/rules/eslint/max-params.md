---
title: "eslint/max-params"
category: "样式"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_params.rs`;
</script>

<RuleHeader />

### 作用

强制函数定义中的参数数量不超过最大值，默认为三个。

### 为什么不好？

接受过多参数的函数难以阅读和编写，因为需要记忆每个参数的含义、类型以及它们应该出现的顺序。因此，许多开发者遵循一个约定，限制函数可接受的参数数量。

### 示例

此规则 **错误** 代码示例：

```javascript
function foo(bar, baz, qux, qxx) {
  doSomething();
}
```

```javascript
let foo = (bar, baz, qux, qxx) => {
  doSomething();
};
```

此规则 **正确** 代码示例：

```javascript
function foo(bar, baz, qux) {
  doSomething();
}
```

```javascript
let foo = (bar, baz, qux) => {
  doSomething();
};
```

## 配置

此规则接受一个具有以下属性的配置对象：

### countThis

type: `"always" | "never" | "except-void"`

此选项控制何时统计 `this` 参数。

- "always": 始终统计 `this`
- "never": 从不统计 `this`
- "except-void": 仅当 `this` 类型不是 `void` 时统计

### countVoidThis

type: `boolean`

default: `false`

`countThis` 的已弃用别名。

例如 `{ "countVoidThis": true }` 意味着函数接受类型为 `void` 的 `this` 参数将被计入最大参数数量。

### max

type: `integer`

default: `3`

函数定义中允许的最大参数数量。

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
