---
title: "eslint/no-warning-comments | Oxlint"
rule: "eslint/no-warning-comments"
category: "Pedantic"
version: "1.24.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_warning_comments.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在代码中使用 TODO、FIXME、XXX 之类的警告注释。

### 为什么这不好？

开发者经常会添加像 TODO 或 FIXME 这样的注释来标记未完成的工作或需要关注的地方。虽然这些注释在开发过程中很有用，但它们可能表明代码尚未完成，不应直接发布到生产环境。此规则有助于在这些注释进入生产代码之前将其捕获。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// TODO: 实现此功能
function doSomething() {}

// FIXME: 这里有问题
const x = 1;

/* XXX: 变通处理 */
let y = 2;
```

以下是此规则的**正确**代码示例：

```javascript
// 这是一条普通注释
function doSomething() {}

// 注意：这里解释了一些内容
const x = 1;
```

### 选项

此规则有一个包含以下默认值的选项对象：

```json
{
  "terms": ["todo", "fixme", "xxx"],
  "location": "start",
  "decoration": []
}
```

#### `terms`

要匹配的术语数组。匹配不区分大小写。

#### `location`

在哪里检查这些术语：

- `"start"`（默认）：术语必须出现在注释开头（在任何装饰字符之后）
- `"anywhere"`：术语可以出现在注释中的任意位置

#### `decoration`

当 `location` 为 `"start"` 时，在注释开头需要忽略的字符数组。
可用于忽略 JSDoc 风格注释中常见的注释装饰字符，例如 `*`。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.24.0 中添加。

## 参考资料

<RuleReferences />
