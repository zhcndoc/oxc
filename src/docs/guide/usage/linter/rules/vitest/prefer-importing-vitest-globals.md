---
title: "vitest/prefer-importing-vitest-globals | Oxlint"
rule: "vitest/prefer-importing-vitest-globals"
category: "Style"
version: "1.59.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-importing-vitest-globals.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_importing_vitest_globals.rs`;
</script>

<RuleHeader />

### 说明

强制从 'vitest' 显式导入，而不是使用 Vitest 全局变量。

### 为什么这不好？

在不导入的情况下使用 Vitest 全局变量，会依赖隐式的全局配置
（vitest 配置中的 `globals: true`）。显式导入能让依赖关系更清晰，
提升 IDE 支持，并确保在不同设置下的兼容性。

### 示例

以下是此规则的**错误**代码示例：

```js
describe("suite", () => {
  it("test", () => {
    expect(true).toBe(true);
  });
});
```

以下是此规则的**正确**代码示例：

```js
import { describe, it, expect } from "vitest";

describe("suite", () => {
  it("test", () => {
    expect(true).toBe(true);
  });
});
```

## How to use

<RuleHowToUse />

## 版本

此规则在 v1.59.0 中添加。

## 参考资料

<RuleReferences />
