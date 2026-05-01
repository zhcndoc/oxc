---
title: "import/no-named-as-default-member"
category: "可疑"
version: "0.2.1"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_named_as_default_member.rs`;
</script>

<RuleHeader />

### 它的作用

报告将导出的名称（具名导出）作为默认导出的属性来使用的情况。当试图通过默认导出访问具名导出时，就会发生这种情况，这是不正确的。

### 为什么这不好？

通过默认导出访问具名导出是不正确的，并且不会按预期工作。具名导出应直接导入，而默认导出则不带属性地访问。这个错误可能会导致运行时错误或未定义行为。

### 示例

已知

```javascript
// ./bar.js
export function bar() {
  return null;
}
export default () => {
  return 1;
};
```

此规则的**错误**代码示例：

```javascript
// ./foo.js
import foo from "./bar";
const bar = foo.bar; // 错误：试图通过默认导出访问具名导出
```

此规则的**正确**代码示例：

```javascript
// ./foo.js
import { bar } from "./bar"; // 正确：直接访问具名导出
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.1 中添加。

## 参考资料

<RuleReferences />
