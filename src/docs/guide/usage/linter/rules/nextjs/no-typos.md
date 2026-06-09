---
title: "nextjs/no-typos | Oxlint"
rule: "nextjs/no-typos"
category: "Correctness"
version: "0.2.1"
default: false
type_aware: false
fix: "pending"
upstream: "https://nextjs.org/docs/messages/no-typos"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_typos.rs`;
</script>

<RuleHeader />

### 它的作用

检测 Next.js 数据获取函数名中的常见拼写错误。

### 为什么这很糟糕？

Next.js 不会调用名称错误的数据获取函数，导致页面渲染时缺少预期的数据。

### 示例

以下是此规则的**错误**代码示例：

```javascript
export default function Page() {
  return <div></div>;
}
export async function getServurSideProps() {}
```

以下是此规则的**正确**代码示例：

```javascript
export default function Page() {
  return <div></div>;
}
export async function getServerSideProps() {}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.1 中添加。

## 参考资料

<RuleReferences />
