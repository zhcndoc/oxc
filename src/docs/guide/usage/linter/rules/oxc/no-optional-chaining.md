---
title: "oxc/no-optional-chaining"
category: "限制"
version: "0.5.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_optional_chaining.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用 [可选链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)。

### 为什么这不好？

如果你需要维护与较旧环境的兼容性，你可能会想使用这条规则。
不过，自 2020 年以来，所有主流浏览器都已支持可选链，
而且如今通常可以安全使用。

在某些情况下，将可选链转译后会生成冗长的辅助代码，
从而影响打包体积和性能。当你需要避免转译后的可选链带来的开销时，这条规则很有用。
这仅在你通过 polyfill 以支持 2020 年之前的浏览器时才相关。

在目前的大多数代码库中，你不应该使用这条规则。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = obj?.foo;
obj.fn?.();
```

## 配置

此规则接受一个包含以下属性的配置对象：

### message

type: `string`

default: `""`

当检测到可选链时显示的自定义帮助消息。
例如："我们的输出目标是 ES2016，而可选链会产生冗长的
辅助代码，因此应避免使用。"

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.0 中加入。

## 参考资料

<RuleReferences />
