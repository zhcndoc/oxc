---
title: "node/no-sync | Oxlint"
rule: "node/no-sync"
category: "样式"
version: "1.71.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-sync.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_sync.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在 Node.js 代码中调用同步方法。

### 为什么这不好？

在 Node.js 中，大多数 I/O 都是通过异步方法完成的。不过，异步方法通常也有同步版本。例如，`fs.exists()` 和 `fs.existsSync()`。在某些场景下，使用同步操作是可以接受的（如果像 ESLint 一样，你编写的是一个命令行工具）。然而，在其他场景中，使用同步操作被认为是不好的实践，应当避免。

### 示例

此规则的**错误**代码示例：

```js
fs.existsSync(somePath);

function foo() {
  var contents = fs.readFileSync(somePath).toString();
}
```

此规则的**正确**代码示例：

```js
obj.sync();

async(function () {
  // ...
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowAtRootLevel

类型：`boolean`

默认值：`false`

是否应允许在文件顶层使用同步方法。

### ignores

类型：`string[]`

默认值：`[]`

要忽略的函数名。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.71.0 中添加。

## 参考资料

<RuleReferences />
