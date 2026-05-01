---
title: "eslint/no-obj-calls"
category: "正确性"
version: "0.0.7"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_obj_calls.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将某些全局对象作为函数调用。

对于 TypeScript 代码，此规则可以禁用，因为 TypeScript 编译器会强制执行此检查。

### 为什么这不好？

某些全局对象并不应被当作函数调用。
将它们作为函数调用通常会抛出 TypeError。

### 示例

以下是此规则的**错误**代码示例：

```javascript
let math = Math();
let newMath = new Math();

let json = JSON();
let newJson = new JSON();

let atomics = Atomics();
let newAtomics = new Atomics();

let intl = Intl();
let newIntl = new Intl();

let reflect = Reflect();
let newReflect = new Reflect();
```

以下是此规则的**正确**代码示例：

```javascript
let area = (r) => 2 * Math.PI * r * r;
let object = JSON.parse("{}");
let first = Atomics.load(sharedArray, 0);
let segmenterFrom = Intl.Segmenter("fr", { granularity: "word" });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.7 中添加。

## 参考资料

<RuleReferences />
