---
title: "unicorn/prefer-blob-reading-methods"
category: "Pedantic"
version: "0.0.16"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_blob_reading_methods.rs`;
</script>

<RuleHeader />

### 它的作用

建议使用 `Blob#text()` 和 `Blob#arrayBuffer()`，而不是 `FileReader#readAsText()` 和 `FileReader#readAsArrayBuffer()`。

### 为什么这不好？

`FileReader` 早于 Promise 出现，而更新的 [`Blob#arrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer) 和 [`Blob#text()`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/text) 方法更加简洁，也更易于使用。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function bad() {
  const arrayBuffer = await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      resolve(fileReader.result);
    });
    fileReader.addEventListener("error", () => {
      reject(fileReader.error);
    });
    fileReader.readAsArrayBuffer(blob);
  });
}
```

以下是此规则的**正确**代码示例：

```javascript
async function good() {
  const arrayBuffer = await blob.arrayBuffer();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
