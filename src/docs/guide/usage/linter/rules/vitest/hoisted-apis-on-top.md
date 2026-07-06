---
title: "vitest/hoisted-apis-on-top | Oxlint"
rule: "vitest/hoisted-apis-on-top"
category: "Correctness"
version: "1.39.0"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/hoisted-apis-on-top.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/hoisted_apis_on_top.rs`;
</script>

<RuleHeader />

### 作用

要求将 [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) 的 Vitest API
（`vi.mock`、`vi.unmock` 和 `vi.hoisted`）放在文件顶层。

### 为什么这不好？

Vitest 在转换期间会将某些 API 提升到文件顶部，因此它们总是会在任何导入之前
运行——无论它们在源码中的什么位置。将它们写在条件语句、测试主体或其他运行时位置中，
可能会造成误导和困惑。

代码看起来像是在运行时执行，但实际上它会最先运行。此规则确保这些被提升的 API
不会出现在令人困惑的上下文中。

### 示例

<!-- TODO: 为这些示例代码片段添加注释，说明它们的问题。 -->

此规则的**错误**代码示例：

```js
if (condition) {
  vi.mock("some-module", () => {});
}
```

```js
if (condition) {
  vi.unmock("some-module", () => {});
}
```

```js
if (condition) {
  vi.hoisted(() => {});
}
```

```js
describe("suite", () => {
  it("test", async () => {
    vi.mock("some-module", () => {});

    const sm = await import("some-module");
  });
});
```

此规则的**正确**代码示例：

```js
if (condition) {
  vi.doMock("some-module", () => {});
}
```

```js
vi.mock("some-module", () => {});
if (condition) {
}
```

```js
vi.unmock("some-module", () => {});
if (condition) {
}
```

```js
vi.hoisted(() => {});
if (condition) {
}
```

```js
vi.mock("some-module", () => {});

describe("suite", () => {
  it("test", async () => {
    const sm = await import("some-module");
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.39.0 中添加。

## 参考资料

<RuleReferences />
