---
title: "eslint/no-case-declarations | Oxlint"
rule: "eslint/no-case-declarations"
category: "Pedantic"
version: "0.0.4"
default: false
type_aware: false
fix: "fixable_suggestion"
upstream: "https://eslint.org/docs/latest/rules/no-case-declarations"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_case_declarations.rs`;
</script>

<RuleHeader />

### 作用

禁止在 case 子句中进行词法声明。

### 为什么不好？

原因是词法声明在整个 switch 块中都是可见的，但仅在被赋值时才会初始化，而这种情况只有在执行到定义它的 case 时才会发生。

### 示例

此规则 **错误** 代码示例：

```javascript
switch (foo) {
  case 1:
    let x = 1;
    break;
  case 2:
    const y = 2;
    break;
  case 3:
    function f() {}
    break;
  default:
    class C {}
}
```

此规则 **正确** 代码示例：

```javascript
switch (foo) {
  case 1: {
    let x = 1;
    break;
  }
  case 2: {
    const y = 2;
    break;
  }
  case 3: {
    function f() {}
    break;
  }
  default: {
    class C {}
  }
}
```

## 使用方法

<RuleHowToUse />

## 版本

此规则是在 v0.0.4 中添加的。

## 参考资料

<RuleReferences />
