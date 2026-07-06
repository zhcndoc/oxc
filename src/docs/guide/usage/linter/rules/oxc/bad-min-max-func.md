---
title: "oxc/bad-min-max-func | Oxlint"
rule: "oxc/bad-min-max-func"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/bad_min_max_func.rs`;
</script>

<RuleHeader />

### 功能说明

检查 clamp 函数 `Math.min(Math.max(x, y), z)` 是否会因为参数顺序错误而始终求得一个常量结果。

### 为什么这不好？

`Math.min(Math.max(x, y), z)` 函数用于将一个值限制在另外两个值之间。
如果参数顺序错误，该函数将始终计算出一个常量结果。

### 示例

以下是此规则的**错误**代码示例：

```javascript
Math.min(Math.max(100, x), 0);
Math.max(1000, Math.min(0, z));
```

以下是此规则的**正确**代码示例：

```javascript
Math.max(0, Math.min(100, x));
Math.min(1000, Math.max(0, z));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.3。

## 参考资料

<RuleReferences />
