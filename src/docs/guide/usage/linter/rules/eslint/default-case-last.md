---
title: "eslint/default-case-last"
category: "风格"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/default_case_last.rs`;
</script>

<RuleHeader />

### 作用

要求 `switch` 语句中的 `default` 子句位于最后。

### 为什么不好？

按照惯例且为了可读性，`default` 子句应该是 `switch` 中的最后一个。
虽然将其放在 `case` 子句之前或之间是合法的，但这样做令人困惑，并且可能
导致意外的“穿透”行为。

### 示例

此规则**不正确**代码的示例：

```js
/* default-case-last: "error" */

switch (foo) {
  default:
    bar();
    break;
  case "a":
    baz();
    break;
}

switch (foo) {
  case 1:
    bar();
    break;
  default:
    baz();
    break;
  case 2:
    qux();
    break;
}
```

此规则**正确**代码的示例：

```js
/* default-case-last: "error" */

switch (foo) {
  case 1:
    bar();
    break;
  case 2:
    qux();
    break;
  default:
    baz();
    break;
}

switch (foo) {
  case "x":
    bar();
    break;
  case "y":
  default:
    baz();
    break;
}
```

## 如何使用

<RuleHowToUse />

## 参考

<RuleReferences />
