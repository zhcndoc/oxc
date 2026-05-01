---
title: "jsdoc/empty-tags"
category: "Restriction"
version: "0.2.16"
default: false
type_aware: false
fix: "pending"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/empty_tags.rs`;
</script>

<RuleHeader />

### 作用

期望以下标签不包含任何内容：

- `@abstract`
- `@async`
- `@generator`
- `@global`
- `@hideconstructor`
- `@ignore`
- `@inner`
- `@instance`
- `@override`
- `@readonly`
- `@inheritDoc`
- `@internal`
- `@overload`
- `@package`
- `@private`
- `@protected`
- `@public`
- `@static`

### 为什么这不好？

这些空标签应该为空。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @async foo */

/** @private bar */
```

以下是此规则的**正确**代码示例：

```javascript
/** @async */

/** @private */
```

## 配置

此规则接受一个包含以下属性的配置对象：

### tags

type: `string[]`

default: `[]`

要检查其描述的额外标签。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.16 中添加的。

## 参考资料

<RuleReferences />
