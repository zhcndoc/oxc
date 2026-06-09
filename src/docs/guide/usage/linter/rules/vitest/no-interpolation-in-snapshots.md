---
title: "vitest/no-interpolation-in-snapshots | Oxlint"
rule: "vitest/no-interpolation-in-snapshots"
category: "Style"
version: "0.0.13"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-interpolation-in-snapshots.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_interpolation_in_snapshots.rs`;
</script>

<RuleHeader />

### 作用

禁止在快照中使用字符串插值。

### 为什么这不好？

插值会阻止快照被更新。相反，应当通过使用
[属性匹配器](https://jestjs.io/docs/en/snapshot-testing#property-matchers)
来用匹配器覆盖属性。

### 示例

以下是此规则的**错误**代码示例：

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
