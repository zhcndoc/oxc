---
title: "eslint/no-else-return"
category: "Pedantic"
version: "0.9.10"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_else_return.rs`;
</script>

<RuleHeader />

### 作用

禁止在 `if` 语句中的 `return` 语句后使用 `else` 块。

### 为什么不好？

如果 `if` 块包含 `return` 语句，则 `else` 块变得不必要。其内容可以放在块外面。

```javascript
function foo() {
  if (x) {
    return y;
  } else {
    return z;
  }
}
```

此规则旨在突出显示包含 return 语句的 `if` 之后不必要的代码块。因此，当它遇到一系列 `if` 之后的 `else`，且它们都包含 `return` 语句时，它将发出警告。

### 示例

#### `allowElseIf: true`

此规则**错误**代码示例：

```javascript
function foo1() {
  if (x) {
    return y;
  } else {
    return z;
  }
}

function foo2() {
  if (x) {
    return y;
  } else if (z) {
    return w;
  } else {
    return t;
  }
}

function foo3() {
  if (x) {
    return y;
  } else {
    var t = "foo";
  }

  return t;
}

function foo4() {
  if (error) {
    return "It failed";
  } else {
    if (loading) {
      return "It's still loading";
    }
  }
}

// 嵌套出现的情况会有两个警告
function foo5() {
  if (x) {
    if (y) {
      return y;
    } else {
      return x;
    }
  } else {
    return z;
  }
}
```

此规则**正确**代码示例：

```javascript
function foo1() {
  if (x) {
    return y;
  }

  return z;
}

function foo2() {
  if (x) {
    return y;
  } else if (z) {
    var t = "foo";
  } else {
    return w;
  }
}

function foo3() {
  if (x) {
    if (z) {
      return y;
    }
  } else {
    return z;
  }
}

function foo4() {
  if (error) {
    return "It failed";
  } else if (loading) {
    return "It's still loading";
  }
}
```

## 配置

此规则接受具有以下属性的配置对象：

### allowElseIf

类型：`boolean`

默认值：`true`

是否允许在 return 语句后使用 `else if` 块。

当 `allowElseIf: false` 时，此规则**错误**代码示例：

```javascript
function foo() {
  if (error) {
    return "It failed";
  } else if (loading) {
    return "It's still loading";
  }
}
```

当 `allowElseIf: false` 时，此规则**正确**代码示例：

```javascript
function foo() {
  if (error) {
    return "It failed";
  }

  if (loading) {
    return "It's still loading";
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.9.10。

## 参考资料

<RuleReferences />
