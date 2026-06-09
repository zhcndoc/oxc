---
title: "jest/no-interpolation-in-snapshots | Oxlint"
rule: "jest/no-interpolation-in-snapshots"
category: "样式"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-interpolation-in-snapshots.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_interpolation_in_snapshots.rs`;
</script>

<RuleHeader />

### 作用

禁止在快照中使用字符串插值。

### 为什么这不好？

插值会阻止快照被更新。相反，应使用
[属性匹配器](https://jestjs.io/docs/en/snapshot-testing#property-matchers)
通过 matcher 来重载属性。

### 示例

以下是此规则的**不正确**代码示例：

```javascript
expect(something).toMatchInlineSnapshot(
  `Object {
    property: ${interpolated}
  }`,
);

expect(something).toMatchInlineSnapshot(
  { other: expect.any(Number) },
  `Object {
    other: Any<Number>,
    property: ${interpolated}
  }`,
);

expect(errorThrowingFunction).toThrowErrorMatchingInlineSnapshot(`${interpolated}`);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.13 中添加。

## 参考资料

<RuleReferences />
