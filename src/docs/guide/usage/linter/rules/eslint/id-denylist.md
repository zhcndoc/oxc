---
title: "eslint/id-denylist | Oxlint"
rule: "eslint/id-denylist"
category: "风格"
version: "1.76.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/id-denylist"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/id_denylist.rs`;
</script>

<RuleHeader />

### 功能

禁止使用指定的标识符

### 为什么这是不好的？

通用名称可能导致代码难以理解。此规则允许你指定不允许使用的标识符名称列表，以避免这种情况。

### 示例

此规则的**错误**代码示例：

```js
/*eslint id-denylist: ["error", "data", "callback"] */

const data = { ...values };
function callback() {
  // ...
}
element.callback = function () {
  // ...
};
const itemSet = {
  data: [...values],
};
class Foo {
  data = [];
}
class Bar {
  #data = [];
}
class Baz {
  callback() {}
}
class Qux {
  #callback() {}
}
```

此规则的**正确**代码示例：

```js
/*eslint id-denylist: ["error", "data", "callback"] */

const encodingOptions = { ...values };
function processFileResult() {
  // ...
}
element.successHandler = function () {
  // ...
};
const itemSet = {
  entities: [...values],
};
callback(); // 所有函数调用都会被忽略
foo.callback(); // 所有函数调用都会被忽略
foo.data; // 所有非赋值的属性名都会被忽略
class Foo {
  items = [];
}
class Bar {
  #items = [];
}
class Baz {
  method() {}
}
class Qux {
  #method() {}
}
```

## 配置

类型：`array`

默认值：`[]`

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.76.0 中新增。

## 参考资料

<RuleReferences />
