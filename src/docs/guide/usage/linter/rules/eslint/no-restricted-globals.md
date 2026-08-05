---
title: "eslint/no-restricted-globals | Oxlint"
rule: "eslint/no-restricted-globals"
category: "限制"
version: "0.4.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-restricted-globals"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_restricted_globals.rs`;
</script>

<RuleHeader />

### 它的作用

指定在应用程序中不应使用的全局变量名称。

### 为什么这不好？

如果你想通过启用某个环境来允许一组全局变量，但仍然想禁止其中的一些，那么禁止使用特定的全局变量会很有用。

例如，早期 Internet Explorer 版本会将当前 DOM 事件暴露为全局变量 `event`，但长期以来，使用这个变量一直被认为是不好的做法。限制它可以确保在浏览器代码中不会使用这个变量。

### 示例

如果我们有如下选项：

```json
"no-restricted-globals": ["error", "event"]
```

以下模式被视为问题：

```javascript
function onClick() {
  console.log(event); // 意外的全局变量 'event'。请改用局部参数。
}
```

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v0.4.0 中添加。

## 参考资料

<RuleReferences />
