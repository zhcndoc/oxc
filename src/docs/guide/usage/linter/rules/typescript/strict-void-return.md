---
title: "typescript/strict-void-return | Oxlint"
rule: "typescript/strict-void-return"
category: "Pedantic"
version: "0.0.8"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/strict_void_return.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/strict_void_return/strict_void_return.go`;
</script>

<RuleHeader />

### 作用

禁止在期望返回 `void` 的位置返回非 `void` 值。

### 为什么这不好？

在 `void` 上下文中返回值会掩盖逻辑错误，并使回调 API 的行为出乎意料。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare function run(cb: () => void): void;

run(() => "value");
run(async () => 123);
```

以下是此规则的**正确**代码示例：

```ts
declare function run(cb: () => void): void;

run(() => {
  doWork();
});

run(() => undefined);
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowReturnAny

类型：`boolean`

默认值：`false`

允许在期望 `void` 回调的位置返回 `any` 的回调。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v0.0.8 中添加。

## 参考资料

<RuleReferences />
