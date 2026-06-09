---
title: "eslint/no-await-in-loop | Oxlint"
rule: "eslint/no-await-in-loop"
category: "Perf"
version: "0.3.2"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-await-in-loop"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_await_in_loop.rs`;
</script>

<RuleHeader />

### 作用

此规则禁止在循环体内使用 `await`。（for、for-in、for-of、while、do-while）。

### 为什么不好？

这可能表明异步操作未被有效并行化。
相反，它们是串行运行的，这可能导致性能较差。

### 示例

此规则**错误**代码的示例：

```javascript
async function bad() {
  for (const user of users) {
    const userRecord = await getUserRecord(user);
  }
}
```

此规则**正确**代码的示例：

```javascript
async function good() {
  await Promise.all(users.map((user) => getUserRecord(user)));
}
```

## 如何使用

<RuleHowToUse />

## 版本

该规则于 v0.3.2 中添加。

## 参考资料

<RuleReferences />
