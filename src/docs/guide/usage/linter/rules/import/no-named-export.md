---
title: "import/no-named-export | Oxlint"
rule: "import/no-named-export"
category: "Style"
version: "1.19.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/import/no_named_export.rs`;
</script>

<RuleHeader />

### 它的作用

禁止命名导出。

### 为什么这不好？

命名导出要求严格的标识符匹配，容易导致脆弱的导入，
而默认导出会强制使用单一、一致的模块入口点。

### 示例

以下是此规则的**错误**代码示例：

```js
export const foo = "foo";

const bar = "bar";
export { bar };
```

以下是此规则的**正确**代码示例：

```js
export default 'bar';

const foo = 'foo';
export { foo as default }
```

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.19.0 中添加。

## 参考资料

<RuleReferences />
