---
title: "typescript/prefer-enum-initializers"
category: "Pedantic"
version: "0.3.2"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/prefer_enum_initializers.rs`;
</script>

<RuleHeader />

### 其作用

要求每个枚举成员的值都必须显式初始化。

### 为什么这不好？

在枚举成员的值很重要的项目中，允许枚举使用隐式值可能会在枚举随时间修改时引发 bug。

### 示例

以下是此规则的**错误**代码示例：

```typescript
// 错误，`Close` 的值不是常量
enum Status {
  Open = 1,
  Close,
}
```

以下是此规则的**正确**代码示例：

```typescript
enum Status {
  Open = 1,
  Close = 2,
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.3.2 中添加。

## 参考资料

<RuleReferences />
