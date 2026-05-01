---
title: "jest/no-large-snapshots"
category: "样式"
version: "0.4.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_large_snapshots.rs`;
</script>

<RuleHeader />

### 它的作用

禁止过大的快照。

### 这为什么不好？

使用 Jest 的快照功能时，应当注意所创建快照的大小。作为一般最佳实践，快照应限制在较小的体积内，以便更易于管理和审查。一个存储的快照，其价值只取决于它被审查得有多充分，因此保持其简短、精炼且可读，对于进行彻底审查非常重要。

### 示例

此规则的**错误**代码示例：

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

此规则的**错误**代码示例：

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

一个从快照文件路径到允许超过大小限制的快照名称数组的映射。
快照名称可以指定为正则表达式。

### inlineMaxSize

type: `integer`

default: `50`

内联快照允许的最大行数。

### maxSize

type: `integer`

default: `50`

外部快照文件允许的最大行数。

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.4.3。

## 参考资料

<RuleReferences />
