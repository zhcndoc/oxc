---
title: "vitest/warn-todo | Oxlint"
rule: "vitest/warn-todo"
category: "Correctness"
version: "1.37.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/warn_todo.rs`;
</script>

<RuleHeader />

### 作用

此规则会警告在 `describe`、`it` 或 `test` 函数中使用 `.todo`。

### 为什么这不好？

你提交的测试应该是完整的。任何未完成的/`TODO` 代码都不应被提交。

### 示例

以下是此规则的**错误**代码示例：

```js
describe.todo("foo", () => {});
it.todo("foo", () => {});
test.todo("foo", () => {});
```

以下是此规则的**正确**代码示例：

```js
describe([])("foo", () => {});
it([])("foo", () => {});
test([])("foo", () => {});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.37.0 中添加。

## 参考资料

<RuleReferences />
