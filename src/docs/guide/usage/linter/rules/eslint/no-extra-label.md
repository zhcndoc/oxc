---
title: "eslint/no-extra-label | Oxlint"
rule: "eslint/no-extra-label"
category: "样式"
version: "0.15.4"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://eslint.org/docs/latest/rules/no-extra-label"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_extra_label.rs`;
</script>

<RuleHeader />

### 作用

禁止不必要的标签。

### 为什么这不好？

如果一个循环不包含嵌套循环或 switch，那么给该循环添加标签就是不必要的。

```js
A: while (a) {
  break A;
}
```

通过移除标签并使用不带标签的 `break` 或 `continue`，可以达到相同的结果。
这些标签可能会让开发者感到困惑，因为他们通常期望标签用于跳转到更远的地方。

### 示例

以下是此规则的**错误**代码示例：

```js
A: while (a) {
  break A;
}

B: for (let i = 0; i < 10; ++i) {
  break B;
}

C: switch (a) {
  case 0:
    break C;
}
```

以下是此规则的**正确**代码示例：

```js
while (a) {
  break;
}

for (let i = 0; i < 10; ++i) {
  break;
}

switch (a) {
  case 0:
    break;
}

A: {
  break A;
}

B: while (a) {
  while (b) {
    break B;
  }
}

C: switch (a) {
  case 0:
    while (b) {
      break C;
    }
    break;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.15.4。

## 参考资料

<RuleReferences />
