---
title: "unicorn/prefer-keyboard-event-key | Oxlint"
rule: "unicorn/prefer-keyboard-event-key"
category: "Style"
version: "1.33.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_keyboard_event_key.rs`;
</script>

<RuleHeader />

### 作用

强制使用 [`KeyboardEvent#key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
而不是 [`KeyboardEvent#keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)，
因为后者已被弃用。

`.key` 属性也更具语义性，并且更易读。

### 为什么这不好？

`keyCode`、`which` 和 `charCode` 属性已被弃用，
应当避免使用，转而使用 `key` 属性。

### 示例

以下是此规则的**错误**代码示例：

```js
window.addEventListener("keydown", (event) => {
  if (event.keyCode === 8) {
    console.log("Backspace 被按下了");
  }
});

window.addEventListener("keydown", (event) => {
  console.log(event.keyCode);
});
```

以下是此规则的**正确**代码示例：

```js
window.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    console.log("Backspace 被按下了");
  }
});

window.addEventListener("click", (event) => {
  console.log(event.key);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v1.33.0。

## 参考资料

<RuleReferences />
