---
title: "unicorn/no-useless-switch-case | Oxlint"
rule: "unicorn/no-useless-switch-case"
category: "Pedantic"
version: "0.0.18"
default: false
type_aware: false
fix: "pending"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_useless_switch_case.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `switch` 语句中出现无用的 `default` 分支。

### 为什么这很糟糕？

最后一个 `default` 分支前面的空分支是无用的，因为
无论如何，`default` 分支都会匹配到它。

### 示例

以下是此规则的**错误**代码示例：

```javascript
switch (foo) {
  case 1:
  default:
    handleDefaultCase();
    break;
}
```

以下是此规则的**正确**代码示例：

```javascript
switch (foo) {
  case 1:
  case 2:
    handleCase1And2();
    break;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.18 中添加的。

## 参考资料

<RuleReferences />
