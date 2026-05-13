---
title: "import/exports-last | Oxlint"
rule: "import/exports-last"
category: "Style"
version: "0.15.14"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/exports_last.rs`;
</script>

<RuleHeader />

### 作用

此规则强制要求所有导出都声明在文件底部。
此规则会报告任何出现在非导出语句之前的导出声明。

### 为什么这不好？

导出分散在文件各处会导致代码可读性变差，
并增加快速定位导出的成本

### 示例

此规则的**错误**代码示例：

```js
const bool = true;
export const foo = "bar";
const str = "foo";
```

此规则的**正确**代码示例：

```js
const arr = ["bar"];
export const bool = true;
export const str = "foo";
export function func() {
  console.log("Hello World");
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.15.14 中添加的。

## 参考资料

<RuleReferences />
