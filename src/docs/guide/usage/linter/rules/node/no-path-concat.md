---
title: "node/no-path-concat | Oxlint"
rule: "node/no-path-concat"
category: "Restriction"
version: "1.49.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/node/no_path_concat.rs`;
</script>

<RuleHeader />

### 作用

禁止将 `__dirname` 和 `__filename` 进行字符串拼接。

### 为什么这不好？

在 Node.js 中，`__dirname` 和 `__filename` 全局变量分别包含当前正在执行的脚本文件所在目录路径和文件路径。
有时，开发者会尝试使用这些变量来创建其他文件的路径，例如：

```js
var fullPath = __dirname + "/foo.js";
```

然而，这种做法容易出错，因为它没有考虑不同的
操作系统，而不同操作系统使用不同的路径分隔符。使用 `path.join()`
或 `path.resolve()` 才是创建跨平台文件路径的正确方式。

### 示例

此规则的**错误**代码示例：

```js
const fullPath1 = __dirname + "/foo.js";
const fullPath2 = __filename + "/foo.js";
const fullPath3 = `${__dirname}/foo.js`;
const fullPath4 = `${__filename}/foo.js`;
```

此规则的**正确**代码示例：

```js
const fullPath1 = path.join(__dirname, "foo.js");
const fullPath2 = path.join(__filename, "foo.js");
const fullPath3 = __dirname + ".js";
const fullPath4 = __filename + ".map";
const fullPath5 = `${__dirname}_foo.js`;
const fullPath6 = `${__filename}.test.js`;
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.49.0 中添加。

## 参考资料

<RuleReferences />
