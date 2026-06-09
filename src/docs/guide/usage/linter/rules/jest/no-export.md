---
title: "jest/no-export | Oxlint"
rule: "jest/no-export"
category: "正确性"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_export.rs`;
</script>

<RuleHeader />

### 作用

如果文件中包含一个或多个测试，则禁止使用导出。

### 为什么这不好？

此规则旨在通过从测试文件中导出内容来消除测试的重复运行。
如果你从测试文件中导入，那么该文件中的所有测试都会在每个导入的实例中运行。
因此，总而言之，不要从测试中导出，而是在需要在测试之间共享时将辅助函数移到单独的文件中。

### 示例

以下是此规则的**错误**代码示例：

```javascript
export function myHelper() {}
describe("a test", () => {
  expect(1).toBe(1);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.13 中添加。

## 参考资料

<RuleReferences />
