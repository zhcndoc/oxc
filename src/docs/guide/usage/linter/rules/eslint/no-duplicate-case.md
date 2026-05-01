---
title: "eslint/no-duplicate-case"
category: "Correctness"
version: "0.0.3"
default: true
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_duplicate_case.rs`;
</script>

<RuleHeader />

### 作用

禁止重复的 case 标签。

### 为什么不好？

如果 switch 语句在 case 子句中有重复的测试表达式，
很可能是程序员复制了 case 子句但忘记更改测试表达式。

### 示例

此规则 **错误** 代码示例：

```js
var a = 1,
  one = 1;
switch (a) {
  case 1:
    break;
  case 2:
    break;
  case 1: // 重复的测试表达式
    break;
  default:
    break;
}

switch (a) {
  case one:
    break;
  case 2:
    break;
  case one: // 重复的测试表达式
    break;
  default:
    break;
}
```

此规则 **正确** 代码示例：

```js
var a = 1,
  one = 1;
switch (a) {
  case 1:
    break;
  case 2:
    break;
  default:
    break;
}

switch (a) {
  case "1":
    break;
  case "2":
    break;
  default:
    break;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.0.3 中新增。

## 参考资料

<RuleReferences />
