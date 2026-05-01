---
title: "eslint/complexity"
category: "Restriction"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/complexity.rs`;
</script>

<RuleHeader />

### 作用

强制规定程序中的最大 [圈复杂度](https://en.wikipedia.org/wiki/Cyclomatic_complexity)，即程序中线性独立路径的数量。

### 为什么不好？

代码复杂度过高会降低代码可读性。此规则旨在通过减少程序中的分支数量，使代码更易于遵循。

### 示例

此规则在 `{ "max": 2 }` 配置下的 **错误** 代码示例

```js
function foo() {
  if (foo1) {
    return x1; // 第 1 条路径
  } else if (foo2) {
    return x2; // 第 2 条路径
  } else {
    return x3; // 第 3 条路径
  }
}

function bar() {
  // 有 2 条路径 - 当 bar1 为假值时，以及当 bar1 为真值时，此时 bar1 = bar1 && bar2;
  bar1 &&= bar2;
  // 有 2 条路径 - 当 bar3 为真值时，以及当 bar3 为假值时，此时 bar3 = 4;
  bar3 ||= 4;
}

// 有 2 条路径 - 当 baz1 已定义时，以及当 baz1 未定义并被赋值为 'a' 时
function baz(baz1 = "a") {
  const { baz2 = "b" } = baz3; // 有 2 条额外路径 - 当 baz2 已定义时和当 baz2 未定义时
}

function d() {
  d1 = d2?.d3?.(); // 可选链各自创建 2 条路径 - 当对象已定义时和当它未定义时
}
```

此规则在 `{ "max": 2 }` 配置下的 **正确** 代码示例

```js
// 此示例直接取自 ESLint 文档
function foo() {
  // 此函数复杂度 = 1
  class C {
    x = a + b; // 此初始化器复杂度 = 1
    y = c || d; // 此初始化器复杂度 = 2
    z = e && f; // 此初始化器复杂度 = 2

    static p = g || h; // 此初始化器复杂度 = 2
    static q = i ? j : k; // 此初始化器复杂度 = 2

    static {
      // 此静态块复杂度 = 2
      if (foo) {
        baz = bar;
      }
    }

    static {
      // 此静态块复杂度 = 2
      qux = baz || quux;
    }
  }
}
```

## 配置

此规则接受一个具有以下属性的配置对象：

### max

type: `integer`

default: `20`

圈复杂度的最大数量

### variant

type: `"classic" | "modified"`

default: `"classic"`

要使用的圈复杂度变体

#### `"classic"`

Classic 表示 McCabe 圈复杂度

#### `"modified"`

Modified 表示经典圈复杂度，但 switch 语句会增加复杂度 1，无论 `case` 语句的数量如何

## 如何使用

<RuleHowToUse />

## Version

此规则已在 v1.37.0 中添加。

## References

<RuleReferences />
