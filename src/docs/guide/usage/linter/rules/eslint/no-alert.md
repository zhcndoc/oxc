---
title: "eslint/no-alert"
category: "Restriction"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_alert.rs`;
</script>

<RuleHeader />

### 作用

禁止使用 `alert`、`confirm` 和 `prompt`。

### 为什么不好？

JavaScript 的 `alert`、`confirm` 和 `prompt` 函数被广泛认为是侵入性的 UI 元素，应该被更合适的自定义 UI 实现所取代。
此外，`alert` 常用于调试代码，在生产环境部署前应将其移除。

### 示例

此规则的 **不正确** 代码示例：

```js
alert("here!");

confirm("Are you sure?");

prompt("What's your name?", "John Doe");
```

此规则的 **正确** 代码示例：

```js
customAlert("Something happened!");

customConfirm("Are you sure?");

customPrompt("Who are you?");

function foo() {
  var alert = myCustomLib.customAlert;
  alert();
}
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
