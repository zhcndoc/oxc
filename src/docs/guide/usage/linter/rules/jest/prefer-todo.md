---
title: "jest/prefer-todo | Oxlint"
rule: "jest/prefer-todo"
category: "Style"
version: "0.0.16"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-todo.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_todo.rs`;
</script>

<RuleHeader />

### 它的作用

当测试用例为空时，最好将其标记为 `test.todo`，因为它会在汇总输出中被高亮显示。

### 为什么这不好？

当使用空测试用例而不使用 `test.todo` 时，此规则会触发警告。

### 示例

以下是此规则的**错误**代码示例：

```javascript
test("我需要写这个测试"); // 无效
test("我需要写这个测试", () => {}); // 无效
test.skip("我需要写这个测试", () => {}); // 无效
```

以下是此规则的**正确**代码示例：

```javascript
test.todo("我需要写这个测试");
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.16 中添加。

## 参考资料

<RuleReferences />
