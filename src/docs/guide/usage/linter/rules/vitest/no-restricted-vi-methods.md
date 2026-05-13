---
title: "vitest/no-restricted-vi-methods | Oxlint"
rule: "vitest/no-restricted-vi-methods"
category: "Style"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_restricted_vi_methods.rs`;
</script>

<RuleHeader />

### 它的作用

限制使用特定的 `jest` 和 `vi` 方法。

### 为什么这不好？

某些 Jest 或 Vitest 方法可能已被弃用、在特定上下文中不建议使用，或与您的测试环境不兼容。限制它们有助于保持一致且可靠的测试实践。

默认情况下，此规则不会限制任何方法。

您必须为该规则进行配置，才能让它禁用任何内容。

### 示例

以下是此规则的**错误**代码示例：

```javascript
jest.useFakeTimers();
it("在通过 advanceTimersByTime 调用后，1 秒后执行回调", () => {
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

受限制的 Jest 方法名称到自定义消息的映射——或者使用 `null`，以显示通用消息。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.2.3 中添加。

## 参考资料

<RuleReferences />
