---
title: "unicorn/no-invalid-remove-event-listener | Oxlint"
rule: "unicorn/no-invalid-remove-event-listener"
category: "Correctness"
version: "0.0.16"
default: true
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_invalid_remove_event_listener.rs`;
</script>

<RuleHeader />

### 作用

当你将非函数值作为 `removeEventListener` 的第二个参数时，它会发出警告。

### 为什么这不好？

[`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) 函数必须使用与传给 [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 的同一个函数的引用来调用。使用内联函数或内联 `.bind()` 调用的结果来调用 `removeEventListener` 通常表示存在错误，并且实际上不会移除监听器。

### 示例

此规则的**错误**代码示例：

```javascript
el.removeEventListener("click", () => {});
el.removeEventListener("click", function () {});
```

此规则的**正确**代码示例：

```javascript
el.removeEventListener("click", handler);
el.removeEventListener("click", handler.bind(this));
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
