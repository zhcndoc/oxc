---
title: "import/default | Oxlint"
rule: "import/default"
category: "Correctness"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/default.rs`;
</script>

<RuleHeader />

### 作用

如果请求的是默认导入，而被导入的模块中没有默认导出，则此规则会报告。

### 为什么这不好？

在没有默认导出的情况下使用默认导入可能会导致
混淆和运行时错误。这会使代码更难理解和维护，因为它可能暗示
某个模块有默认导出，而实际上并没有，从而导致意外行为。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// ./bar.js
export function bar() {
  return null;
}

// ./foo.js
import bar from "./bar"; // 未在 ./bar 中找到默认导出
```

以下是此规则的**正确**代码示例：

```javascript
// ./bar.js
export default function bar() {
  return null;
}

// ./foo.js
import { bar } from "./bar"; // 命名导入的正确用法
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.13 中添加。

## 参考

<RuleReferences />
