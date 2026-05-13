---
title: "eslint/no-promise-executor-return | Oxlint"
rule: "eslint/no-promise-executor-return"
category: "Pedantic"
version: "1.33.0"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/no_promise_executor_return.rs`;
</script>

<RuleHeader />

### 作用

禁止在 Promise 执行器函数中返回值。

### 为什么这不好？

`new Promise` 构造函数接受一个执行器函数作为参数，
它包含 `resolve` 和 `reject` 参数，可用于控制
所创建 Promise 的状态。

执行器的返回值会被忽略。在执行器函数中返回一个值
可能是一个错误，因为返回的值无法被使用，并且它
不会以任何方式影响 Promise。

### 示例

此规则的**错误**代码示例：

```javascript
new Promise((resolve, reject) => {
  if (someCondition) {
    return defaultResult;
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

new Promise((resolve, reject) =>
  getSomething((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }),
);

new Promise(() => {
  return 1;
});
```

此规则的**正确**代码示例：

```javascript
new Promise((resolve, reject) => {
  if (someCondition) {
    resolve(defaultResult);
    return;
  }
  getSomething((err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
});

new Promise((resolve, reject) => {
  getSomething((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

new Promise((r) => {
  r(1);
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowVoid

type: `boolean`

default: `false`

如果为 `true`，允许返回 `void` 表达式（例如，`return void resolve()`）。

## 使用方法

<RuleHowToUse />

## 版本

此规则在 v1.33.0 中添加。

## 参考资料

<RuleReferences />
