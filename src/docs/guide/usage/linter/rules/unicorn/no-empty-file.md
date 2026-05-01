---
title: "unicorn/no-empty-file"
category: "Correctness"
version: "0.0.15"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_empty_file.rs`;
</script>

<RuleHeader />

### 它的作用

禁止不包含任何有意义代码的文件。

这包括仅由以下内容组成的文件：

- 空白字符
- 注释
- 指令（例如，`"use strict"`）
- 空语句（`;`）
- 空块（`{}`）
- Hashbang（`#!/usr/bin/env node`）

### 为什么这不好？

没有可执行或可导出内容的文件通常是无意产生的，或者是重构后遗留下来的。它们会让代码库显得杂乱，并且可能会误导工具或开发者，让人以为它们有作用，实际上并没有。

### 示例

以下是此规则的**错误**代码示例：

```js

```

```js
// 注释
```

```js
/* 注释 */
```

```js
"use strict";
```

```js

```

```js
{
}
```

```js
#!/usr/bin/env node
```

以下是此规则的**正确**代码示例：

```js
const x = 0;
```

```js
"use strict";
const x = 0;
```

```js
const x = 0;
```

```js
{
  const x = 0;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.15 中新增。

## 参考资料

<RuleReferences />
