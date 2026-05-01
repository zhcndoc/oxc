---
title: "vitest/no-hooks"
category: "风格"
version: "0.0.16"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_hooks.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 Jest 的 setup 和 teardown 钩子，例如 `beforeAll`。

### 这为什么不好？

Jest 提供了用于 setup 和 teardown 任务的全局函数，这些函数会在每个测试用例和每个测试套件之前/之后调用。使用这些钩子会促进测试之间共享状态。

此规则会报告以下函数调用：

- `beforeAll`
- `beforeEach`
- `afterAll`
- `afterEach`

### 示例

以下是此规则的**错误**代码示例：

```javascript
function setupFoo(options) {
  /* ... */
}
function setupBar(options) {
  /* ... */
}

describe("foo", () => {
  let foo;
  beforeEach(() => {
    foo = setupFoo();
  });
  afterEach(() => {
    foo = null;
  });
  it("does something", () => {
    expect(foo.doesSomething()).toBe(true);
  });
  describe("with bar", () => {
    let bar;
    beforeEach(() => {
      bar = setupBar();
    });
    afterEach(() => {
      bar = null;
    });
    it("does something with bar", () => {
      expect(foo.doesSomething(bar)).toBe(true);
    });
  });
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allow

type: `string[]`

default: `[]`

一个允许使用的钩子函数名称数组。

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v0.0.16。

## 参考资料

<RuleReferences />
