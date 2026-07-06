---
title: "eslint/no-useless-assignment | Oxlint"
rule: "eslint/no-useless-assignment"
category: "Nursery"
version: "1.59.0"
default: false
type_aware: false
fix: "none"
upstream: "https://eslint.org/docs/latest/rules/no-useless-assignment"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_useless_assignment.rs`;
</script>

<RuleHeader />

### 它的作用

标记那些新赋值的值之后从未被读取的赋值（“死存储”）。这有助于发现无用的工作或意外的错误。

### 这为什么不好？

死存储会增加噪音，并且可能掩盖真正的 bug（例如，你本来想使用那个值，或者写到了错误的变量上）。移除它们可以提升清晰度和性能。

### 示例

以下是此规则的**错误**代码示例：

```js
function fn1() {
  let v = "used";
  doSomething(v);
  v = "unused"; // 已赋值但从未被读取
}

function fn2() {
  let v = "used";
  if (condition) {
    v = "unused"; // 提前返回；这次写入从未被观察到
    return;
  }
  doSomething(v);
}

function fn3() {
  let v = "used";
  if (condition) {
    doSomething(v);
  } else {
    v = "unused"; // 该分支中后续未使用该值
  }
}
```

以下是此规则的**正确**代码示例：

```js
function fn1() {
  let v = "used";
  doSomething(v);
  v = "used-2";
  doSomething(v); // 重新赋值后的值被读取了
}

function fn2() {
  let v = "used";
  if (condition) {
    v = "used-2";
    doSomething(v); // 返回前观察到了这次重新赋值
    return;
  }
  doSomething(v);
}

function fn3() {
  let v = "used";
  for (let i = 0; i < 10; i++) {
    doSomething(v);
    v = "used in next iteration"; // 在下一次循环中使用
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.59.0 中添加的。

## 参考资料

<RuleReferences />
