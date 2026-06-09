---
title: "unicorn/no-new-buffer | Oxlint"
rule: "unicorn/no-new-buffer"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_new_buffer.rs`;
</script>

<RuleHeader />

### 作用

禁止使用已弃用的 `new Buffer()` 构造函数。

### 为什么这不好？

强制使用 [Buffer.from](https://nodejs.org/api/buffer.html#static-method-bufferfromarray) 和 [Buffer.alloc()](https://nodejs.org/api/buffer.html#static-method-bufferallocsize-fill-encoding) 代替 [new Buffer()](https://nodejs.org/api/buffer.html#new-bufferarray)，后者自 Node.js 4 起已被弃用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const buffer = new Buffer(10);
```

以下是此规则的**正确**代码示例：

```javascript
const buffer = Buffer.alloc(10);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.16 中添加的。

## 参考资料

<RuleReferences />
