---
title: "unicorn/prefer-import-meta-properties | Oxlint"
rule: "unicorn/prefer-import-meta-properties"
category: "Pedantic"
version: "1.59.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_import_meta_properties.rs`;
</script>

<RuleHeader />

### 作用

优先使用 `import.meta.{dirname,filename}`，而不是使用传统
方式来获取文件路径。

### 为什么这不好？

从 Node.js 20.11 开始，`import.meta.dirname` 和 `import.meta.filename`
已在 ES 模块中引入。
`import.meta.filename` 等价于 `url.fileURLToPath(import.meta.url)`。
`import.meta.dirname` 等价于 `path.dirname(import.meta.filename)`。
此规则会用 `import.meta.dirname` 和 `import.meta.filename` 替换传统模式。

### 示例

以下是此规则的**错误**代码示例：

```js
import path from "node:path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileURLToPath(import.meta.url));
const dirname = path.dirname(import.meta.filename);
const dirname = fileURLToPath(new URL(".", import.meta.url));
```

以下是此规则的**正确**代码示例：

```js
const filename = import.meta.filename;
const dirname = import.meta.dirname;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.59.0 中添加。

## 参考资料

<RuleReferences />
