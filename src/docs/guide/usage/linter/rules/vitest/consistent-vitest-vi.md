---
title: "vitest/consistent-vitest-vi | Oxlint"
rule: "vitest/consistent-vitest-vi"
category: "Style"
version: "1.37.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/consistent_vitest_vi.rs`;
</script>

<RuleHeader />

### 它的作用

当使用了意外的 vitest 访问器时，此规则会触发错误。

### 为什么这不好？

如果 `vi` 和 `vitest` 交替使用，未保持一致的 vitest 访问器会导致混淆。

### 示例

此规则的**错误**代码示例：

```js
vitest.mock("./src/calculator.ts", { spy: true });

vi.stubEnv("NODE_ENV", "production");
```

此规则的**正确**代码示例：

```js
vi.mock("./src/calculator.ts", { spy: true });

vi.stubEnv("NODE_ENV", "production");
```

## 配置

此规则接受一个具有以下属性的配置对象：

### fn

type: `"vi" | "vitest"`

default: `"vi"`

决定是否优先使用 vitest 函数访问器

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.37.0 中添加。

## 参考资料

<RuleReferences />
