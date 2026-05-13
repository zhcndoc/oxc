---
title: "jest/valid-title | Oxlint"
rule: "jest/valid-title"
category: "正确性"
version: "0.0.14"
default: false
type_aware: false
fix: "conditional_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/valid_title.rs`;
</script>

<RuleHeader />

### 它的作用

检查 Jest 和 Vitest 块的标题是否有效。

标题必须：

- 不能为空，
- 是字符串，
- 不能以前缀形式包含其块名称，
- 不能有前导或尾随空格。

### 为什么这不好？

无效的标题可能会造成误导，并使测试目的更难理解。

### 示例

以下是此规则的**错误**代码示例：

```javascript
describe("", () => {});
describe("foo", () => {
  it("", () => {});
});
it("", () => {});
test("", () => {});
xdescribe("", () => {});
xit("", () => {});
xtest("", () => {});
```

以下是此规则的**正确**代码示例：

```javascript
describe("foo", () => {});
it("bar", () => {});
test("baz", () => {});
```

### 选项

```typescript
interface Options {
  ignoreSpaces?: boolean;
  ignoreTypeOfTestName?: boolean;
  ignoreTypeOfDescribeName?: boolean;
  allowArguments?: boolean;
  disallowedWords?: string[];
  mustNotMatch?: Partial<Record<"describe" | "test" | "it", string>> | string;
  mustMatch?: Partial<Record<"describe" | "test" | "it", string>> | string;
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.0.14 中添加的。

## 参考资料

<RuleReferences />
