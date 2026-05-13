---
title: "jest/no-test-prefixes | Oxlint"
rule: "jest/no-test-prefixes"
category: "Style"
version: "0.0.7"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_test_prefixes.rs`;
</script>

<RuleHeader />

### 作用

要求使用 `.only` 和 `.skip`，而不是 `f` 和 `x`。

### 为什么这不好？

Jest 允许你选择如何定义聚焦测试和跳过测试，
并且每种方式都有多种组合：

- only & skip: it.only, test.only, describe.only, it.skip, test.skip, describe.skip.
- 'f' & 'x': fit, fdescribe, xit, xtest, xdescribe.

此规则强制使用 only & skip 列表中的用法。

### 示例

以下是此规则的**错误**代码示例：

```javascript
fit("foo"); // 无效
fdescribe("foo"); // 无效
xit("foo"); // 无效
xtest("foo"); // 无效
xdescribe("foo"); // 无效
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.7 中添加。

## 参考资料

<RuleReferences />
