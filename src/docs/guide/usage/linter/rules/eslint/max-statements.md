---
title: "eslint/max-statements | Oxlint"
rule: "eslint/max-statements"
category: "Style"
version: "1.35.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/max-statements"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/max_statements.rs`;
</script>

<RuleHeader />

### 作用

强制限制函数中的最大语句数量。此规则确保函数不超过指定的语句计数，提倡更小、更专注的函数，使其更易于维护和理解。

### 为什么不好？

有些人认为大型函数是代码异味。大型函数倾向于做很多事情，并且可能难以跟踪正在发生的事情。此规则有助于避免大型函数。

### 示例

此规则在默认 `{ "max": 10 }` 选项下的 **错误** 代码示例：

```js
function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;

  const foo11 = 11; // 太多了。
}

const bar = () => {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;

  const foo11 = 11; // 太多了。
};
```

此规则在默认 `{ "max": 10 }` 选项下的 **正确** 代码示例：

```js
function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  return function () {
    // 10

    // 内部函数中的语句数量不计入
    // 语句最大值。

    let bar;
    let baz;
    return 42;
  };
}

const bar = () => {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  return function () {
    // 10

    // 内部函数中的语句数量不计入
    // 语句最大值。

    let bar;
    let baz;
    return 42;
  };
};
```

请注意，此规则不适用于类静态块，并且类静态块中的语句不计入外围函数中的语句。

此规则在 `{ "max": 2 }` 选项下的 **正确** 代码示例：

```js
function foo() {
  let one;
  let two = class {
    static {
      let three;
      let four;
      let five;
      if (six) {
        let seven;
        let eight;
        let nine;
      }
    }
  };
}
```

此规则在 `{ "max": 10 }, { "ignoreTopLevelFunctions": true }` 选项下的其他 **正确** 代码示例：

```js
function foo() {
  const foo1 = 1;
  const foo2 = 2;
  const foo3 = 3;
  const foo4 = 4;
  const foo5 = 5;
  const foo6 = 6;
  const foo7 = 7;
  const foo8 = 8;
  const foo9 = 9;
  const foo10 = 10;
  const foo11 = 11;
}
```

## 配置

### ignoreTopLevelFunctions

类型：`boolean`

默认值：`false`

是否忽略顶层函数。

### max

类型：`integer`

默认值：`10`

每个函数允许的最大语句数量。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.35.0 中添加。

## 参考资料

<RuleReferences />
