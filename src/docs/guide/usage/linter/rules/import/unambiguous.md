---
title: "import/unambiguous"
category: "Restriction"
version: "0.11.1"
default: false
type_aware: false
fix: "none"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/unambiguous.rs`;
</script>

<RuleHeader />

### 它的作用

如果一个 `module` 可能会被误解析为 `script`，而不是作为一个纯粹的 [ES 模块](https://nodejs.org/api/esm.html#modules-ecmascript-modules)，则发出警告。

### 为什么这不好？

对于仅支持 ESM 的环境，含义不明确的文件可能会导致意外结果和问题。

### 示例

以下是此规则的**错误**代码示例：

```js
function x() {}

(function x() {
  return 42;
})();
```

以下是此规则的**正确**代码示例：

```js
import "foo";
function x() {
  return 42;
}

export function x() {
  return 42;
}

(function x() {
  return 42;
})();
export {}; // 将仅有副作用的文件标记为 'module' 的简单方法，无需任何 imports/exports
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.11.1 中添加的。

## 参考资料

<RuleReferences />
