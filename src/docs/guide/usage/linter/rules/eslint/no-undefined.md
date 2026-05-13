---
title: "eslint/no-undefined | Oxlint"
rule: "eslint/no-undefined"
category: "Restriction"
version: "0.5.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_undefined.rs`;
</script>

<RuleHeader />

### 作用

禁止将 `undefined` 作为标识符使用。

### 为什么这不好？

直接使用 `undefined` 可能会导致 bug，因为在 JavaScript 中它可能被遮蔽或被覆盖。
更安全、更明确的做法是使用 `null`，或者依赖隐式的 `undefined`（例如，没有返回值）来避免意外问题。

### 示例

以下是此规则的**错误**代码示例：

```javascript
var foo = undefined;

var undefined = "foo";

if (foo === undefined) {
  // ...
}

function baz(undefined) {
  // ...
}

bar(undefined, "lorem");
```

以下是此规则的**正确**代码示例：

```javascript
var foo = void 0;

var Undefined = "foo";

if (typeof foo === "undefined") {
  // ...
}

global.undefined = "foo";

bar(void 0, "lorem");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.5.3 中添加。

## 参考资料

<RuleReferences />
