---
title: "unicorn/prefer-single-call | Oxlint"
rule: "unicorn/prefer-single-call"
category: "Pedantic"
version: "1.70.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-single-call.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_single_call.rs`;
</script>

<RuleHeader />

### 作用

强制将多个 `Array#{push,unshift}()`、
`Element#classList.{add,remove}()` 和 `importScripts()` 合并为一次调用。

取代已弃用的 `unicorn/no-array-push-push` 规则。

### 为什么这不好？

对同一个接收者连续多次调用同一个可变参数方法，
可以合并为一次调用，这样更简洁，
而且在性能上可能会略有提升。

### 示例

以下是此规则的**错误**代码示例：

```javascript
foo.push(1);
foo.push(2);

foo.unshift(1);
foo.unshift(2);

element.classList.add("foo");
element.classList.add("bar");

importScripts("foo.js");
importScripts("bar.js");
```

以下是此规则的**正确**代码示例：

```javascript
foo.push(1, 2);

foo.unshift(2, 1);

element.classList.add("foo", "bar");

importScripts("foo.js", "bar.js");
```

## 配置

此规则接受一个配置对象，包含以下属性：

### ignore

类型: `string[]`

默认值: `[]`

要忽略的方法。

## 如何使用

<RuleHowToUse />

## 版本

该规则在 v1.70.0 中添加。

## 参考资料

<RuleReferences />
