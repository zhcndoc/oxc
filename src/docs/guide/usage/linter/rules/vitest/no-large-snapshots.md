---
title: "vitest/no-large-snapshots | Oxlint"
rule: "vitest/no-large-snapshots"
category: "Style"
version: "0.4.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-large-snapshots.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_large_snapshots.rs`;
</script>

<RuleHeader />

### 它的作用

禁止大型快照。

### 为什么这不好？

使用 Jest 的快照功能时，应该注意所创建快照的大小。作为一项通用最佳实践，快照应限制在较小的范围内，以便更易于管理和审查。存储的快照其价值取决于审查质量，因此保持其简短、精炼且可读非常重要，这样才能进行彻底的审查。

### 示例

以下是此规则的**错误**代码示例：

```javascript
exports[`a large snapshot 1`] = `
line 1
line 2
line 3
line 4
line 5
line 6
line 7
line 8
line 9
line 10
line 11
line 12
line 13
line 14
line 15
line 16
line 17
line 18
line 19
line 20
line 21
line 22
line 23
line 24
line 25
line 26
line 27
line 28
line 29
line 30
line 31
line 32
line 33
line 34
line 35
line 36
line 37
line 38
line 39
line 40
line 41
line 42
line 43
line 44
line 45
line 46
line 47
line 48
line 49
line 50
line 51
`;
```

以下是此规则的**错误**代码示例：

```js
exports[`a more manageable and readable snapshot 1`] = `
line 1
line 2
line 3
line 4
`;
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowedSnapshots

type: `Record<string, array>`

default: `{}`

一个快照文件路径到数组的映射，这些数组中的快照名称允许超过大小限制。
快照名称可以使用正则表达式指定。

### inlineMaxSize

type: `integer`

default: `50`

允许的行内快照最大行数。

### maxSize

type: `integer`

default: `50`

允许的外部快照文件最大行数。

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.4.3。

## 参考资料

<RuleReferences />
