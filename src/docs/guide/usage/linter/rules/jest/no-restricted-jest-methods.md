---
title: "jest/no-restricted-jest-methods"
category: "Style"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_restricted_jest_methods.rs`;
</script>

<RuleHeader />

### 它的作用

限制使用特定的 `jest` 和 `vi` 方法。

### 为什么这是坏的？

某些 Jest 或 Vitest 方法可能已被弃用、在特定
上下文中不建议使用，或者与你的测试环境不兼容。限制
它们有助于保持一致且可靠的测试实践。

默认情况下，此规则不限制任何方法。
你必须为该规则进行配置，才能禁用任何内容。

### 示例

以下是此规则的**错误**代码示例：

```javascript
jest.useFakeTimers();
it("在 1 秒后通过 advanceTimersByTime 调用回调", () => {
  // ...

  jest.advanceTimersByTime(1000);

  // ...
});

test("播放视频", () => {
  const spy = jest.spyOn(video, "play");

  // ...
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### restrictedJestMethods

type: `Record<string, string>`

default: `{}`

受限制的 Jest 方法名到自定义消息的映射；如果为 `null`，则使用通用消息。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.3 中添加。

## 参考

<RuleReferences />
