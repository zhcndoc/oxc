---
title: "unicorn/max-nested-calls | Oxlint"
rule: "unicorn/max-nested-calls"
category: "Style"
version: "1.71.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/max-nested-calls.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/max_nested_calls.rs`;
</script>

<RuleHeader />

### 作用

限制嵌套调用的深度。

此规则会统计传入其他调用或构造函数中的调用和构造函数调用。
流式接收者链和 JSX 包装器会被忽略。

### 为什么这不好？

过深的嵌套调用会使代码难以阅读。将中间结果提取到具名变量中可以提高可读性。

### 示例

以下是此规则的**错误**代码示例：

```js
foo(bar(baz(qux())));
```

以下是此规则的**正确**代码示例：

```js
const value = baz(qux());
foo(bar(value));

// 流式链会被忽略。
query().filter().map().toArray();
```

## 配置

此规则接受一个配置对象，包含以下属性：

### max

类型：`integer`

默认值：`3`

允许的最大嵌套调用深度。

## 如何使用

<RuleHowToUse />

## 版本

此规则已在 v1.71.0 中添加。

## 参考文献

<RuleReferences />
