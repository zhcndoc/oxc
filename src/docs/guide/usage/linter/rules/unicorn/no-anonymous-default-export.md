---
title: "unicorn/no-anonymous-default-export | Oxlint"
rule: "unicorn/no-anonymous-default-export"
category: "Restriction"
version: "0.3.3"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_anonymous_default_export.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将匿名函数和类作为默认导出。

### 为什么这不好？

为默认导出命名可以提高可搜索性，并确保模块默认导出的标识符在声明和导入时保持一致。

### 示例

以下是此规则的**错误**代码示例：

```javascript
export default class {}
export default function () {}
export default () => {};
module.exports = class {};
module.exports = function () {};
module.exports = () => {};
```

以下是此规则的**正确**代码示例：

```javascript
export default class Foo {}
export default function foo () {}

const foo = () => {};
export default foo;

module.exports = class Foo {};
module.exports = function foo () {};

const foo = () => {};
module.exports = foo;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.3.3 中添加的。

## 参考资料

<RuleReferences />
