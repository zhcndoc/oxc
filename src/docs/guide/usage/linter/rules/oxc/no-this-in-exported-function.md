---
title: "oxc/no-this-in-exported-function | Oxlint"
rule: "oxc/no-this-in-exported-function"
category: "Suspicious"
version: "1.33.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_this_in_exported_function.rs`;
</script>

<RuleHeader />

### 作用

禁止在导出的函数中使用 `this`。

### 为什么这不好？

在大多数打包器中，导出函数里的 `this` 值不会被保留。
当一个函数被导出并在另一个模块中导入时，`this` 通常会变成
`undefined`，而不是模块命名空间对象。这可能会导致
意外的运行时错误或不正确的行为。

### 示例

以下是此规则的**错误**代码示例：

```javascript
export function foo() {
  console.log(this);
}

export default function bar() {
  this.something();
}

function baz() {
  const self = this;
}
export { baz };
```

以下是此规则的**正确**代码示例：

```javascript
function foo() {
  console.log(this);
}

export const bar = () => {
  console.log(this);
};
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.33.0 中添加。

## 参考资料

<RuleReferences />
