---
title: "typescript/no-unnecessary-condition"
category: "Nursery"
version: "1.48.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_condition.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_condition/no_unnecessary_condition.go`;
</script>

<RuleHeader />

### 它的作用

禁止始终为真、始终为假或始终为 nullish 的条件，
基于 TypeScript 的类型信息。

### 为什么这很糟糕？

没有任何运行时变化可能性的条件会让代码更难阅读，并且可能
隐藏逻辑错误。它们通常会留下死分支，并暗示声明的
类型与预期行为不匹配。

### 示例

以下是此规则的**错误**代码示例：

```ts
declare const value: null;
if (value) {
  doWork();
}

const items: string[] = [];
if (items) {
  doWork();
}

declare const status: "ready";
if (!status) {
  reportError();
}
```

以下是此规则的**正确**代码示例：

```ts
declare const maybeUser: User | undefined;
if (maybeUser) {
  doWork(maybeUser);
}

const items: string[] = [];
if (items.length > 0) {
  doWork();
}

declare const status: "ready" | "";
if (!status) {
  reportError();
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowConstantLoopConditions

type: `boolean | "never" | "always" | "only-allowed-literals"`

表示可以在 JSON 中指定 `allowConstantLoopConditions` 的不同方式。
可以是：

- `true` 或 `false`
- 一个字符串枚举（`"never"`、`"always"`、`"only-allowed-literals"`）

### checkTypePredicates

type: `boolean`

default: `false`

是否检查类型谓词函数。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.48.0 中添加。

## 参考资料

<RuleReferences />
