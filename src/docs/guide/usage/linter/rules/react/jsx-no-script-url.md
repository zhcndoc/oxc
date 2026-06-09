---
title: "react/jsx-no-script-url | Oxlint"
rule: "react/jsx-no-script-url"
category: "Suspicious"
version: "0.13.2"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/jsx_no_script_url.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `javascript:` URL。

### 为什么这不好？

以 `javascript:` 开头的 URL 是一个危险的攻击面，因为很容易不小心
将未经过清理的输出包含到像 `<a href>` 这样的标签中，从而造成安全漏洞。

从 React 16.9 开始，任何以 `javascript:` 开头的 URL 都会记录警告。

在 React 19 中，`javascript:` URL 会被
[完全禁止](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#other-breaking-changes)。

### 示例

此规则的**错误**代码示例：

```jsx
<a href="javascript:void(0)">测试</a>
```

此规则的**正确**代码示例：

```jsx
<Foo test="javascript:void(0)" />
```

## 配置

此规则接受一个包含以下属性的配置对象：

### components

type: `Record<string, array>`

default: `{}`

要额外检查的组件。

### includeFromSettings

type: `boolean`

default: `false`

是否包含来自设置中的组件。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.13.2 中添加。

## 参考资料

<RuleReferences />
