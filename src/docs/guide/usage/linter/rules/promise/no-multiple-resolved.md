---
title: "promise/no-multiple-resolved"
category: "可疑"
version: "1.19.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/promise/no_multiple_resolved.rs`;
</script>

<RuleHeader />

### 它的作用

此规则会警告在作为 Promise 构造函数执行器的函数中，存在多次 resolve 的路径。

### 为什么这很糟糕？

多次 resolve/reject 调用：

- 违反 Promise/A+ 规范
- 对 Promise 的行为没有任何影响
- 使代码意图不清晰
- 可能表明实现中存在逻辑错误

### 示例

以下是此规则的**错误**代码示例：

```javascript
new Promise((resolve, reject) => {
  fn((error, value) => {
    if (error) {
      reject(error);
    }

    resolve(value); // `reject` 和 `resolve` 都可能被调用。
  });
});
```

以下是此规则的**正确**代码示例：

```javascript
new Promise((resolve, reject) => {
  fn((error, value) => {
    if (error) {
      reject(error);
    } else {
      resolve(value);
    }
  });
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.19.0 中添加。

## 参考资料

<RuleReferences />
