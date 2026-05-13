---
title: "jest/no-jasmine-globals | Oxlint"
rule: "jest/no-jasmine-globals"
category: "Style"
version: "0.0.13"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_jasmine_globals.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会报告任何对 Jasmine 全局变量的使用，这些用法并未迁移到
Jest，并会建议使用 Jest 自身 API 的替代方案。

### 为什么这不好？

从 Jasmine 迁移到 Jest 时，依赖 Jasmine 特有的全局变量
会造成兼容性问题，并阻碍你利用 Jest 改进后的测试功能和更好的错误报告。

### 示例

此规则的**错误**代码示例：

```javascript
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
test("my test", () => {
  pending();
});
test("my test", () => {
  jasmine.createSpy();
});
```

此规则的**正确**代码示例：

```javascript
jest.setTimeout(5000);
test("my test", () => {
  // 使用 test.skip() 代替 pending()
});
test.skip("my test", () => {
  // 跳过的测试
});
test("my test", () => {
  jest.fn(); // 使用 jest.fn() 代替 jasmine.createSpy()
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.13 中添加的。

## 参考资料

<RuleReferences />
