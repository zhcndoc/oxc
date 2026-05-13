---
title: "eslint/max-classes-per-file | Oxlint"
rule: "eslint/max-classes-per-file"
category: "Pedantic"
version: "0.3.4"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_classes_per_file.rs`;
</script>

<RuleHeader />

### 作用

强制限制每个文件中的类数量上限。

### 为什么不好？

包含多个类的文件通常会导致代码库难以导航且结构糟糕。最佳实践是将每个文件限制为单一职责。

### 示例

此规则 **错误** 代码示例：

```javascript
class Foo {}
class Bar {}
```

此规则 **正确** 代码示例：

```js
function foo() {
  var bar = 1;
  let baz = 2;
  const qux = 3;
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreExpressions

type: `boolean`

default: `false`

计数类时是否忽略类表达式。

### max

type: `integer`

default: `1`

每个文件允许的最大类数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.4 中添加。

## 参考资料

<RuleReferences />
