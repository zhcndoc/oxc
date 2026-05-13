---
title: "nextjs/no-unwanted-polyfillio | Oxlint"
rule: "nextjs/no-unwanted-polyfillio"
category: "Correctness"
version: "0.2.7"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_unwanted_polyfillio.rs`;
</script>

<RuleHeader />

### 作用

阻止使用不安全的 polyfill.io 域名以及重复的 polyfill。

### 为什么这不好？

**安全风险：**
域名 `cdn.polyfill.io` 和 `polyfill.io` 在 2024 年的一次供应链攻击中被攻破，
该域名被恶意行为者收购，并开始向网站注入有害代码。
超过 380,000 个网站受到了影响。无论在任何情况下都不应使用这些域名。

**性能问题：**
对于像 `cdnjs.cloudflare.com/polyfill/` 这样的安全替代方案，包含已经随
Next.js 一起提供的 polyfill 会不必要地增加页面体积，从而影响加载性能。

### 示例

以下是此规则的**错误**代码示例：

```javascript
// 安全风险 - 被攻破的域名
<script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
<script src='https://polyfill.io/v3/polyfill.min.js'></script>

// 重复的 polyfill
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=Array.prototype.copyWithin'></script>
<script src='https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=WeakSet%2CPromise'></script>
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.7 中添加。

## 参考资料

<RuleReferences />
