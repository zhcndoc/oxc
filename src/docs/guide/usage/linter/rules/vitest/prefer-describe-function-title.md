---
title: "vitest/prefer-describe-function-title"
category: "Style"
version: "1.39.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_describe_function_title.rs`;
</script>

<RuleHeader />

### 作用

在测试某个特定函数时，此规则旨在强制向 `describe()` 传入一个命名函数，
而不是使用等价的硬编码字符串。

### 为什么这不好？

对于与某个特定函数相关的测试，如果被测试的函数被重命名，
describe 标题将不再匹配，并且将来可能会造成混淆。直接使用函数
即使函数被重命名，也能确保一致性。

### 示例

以下是此规则的**错误**代码示例：

```js
// myFunction.test.js
import { myFunction } from "./myFunction";

describe("myFunction", () => {
  // ...
});
```

以下是此规则的**正确**代码示例：

```js
// myFunction.test.js
import { myFunction } from "./myFunction";

describe(myFunction, () => {
  // ...
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.39.0 中添加。

## 参考资料

<RuleReferences />
