---
title: "unicorn/no-await-expression-member | Oxlint"
rule: "unicorn/no-await-expression-member"
category: "Style"
version: "0.0.19"
default: false
type_aware: false
fix: "fixable_dangerous_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_await_expression_member.rs`;
</script>

<RuleHeader />

### 功能说明

不允许从 `await` 表达式中访问成员。

### 为什么这不好？

当从 `await` 表达式中访问成员时，
`await` 表达式必须加括号，这样不利于阅读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
async function bad() {
  const secondElement = (await getArray())[1];
}
```

以下是此规则的**正确**代码示例：

```javascript
async function good() {
  const [, secondElement] = await getArray();
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.19 中添加。

## 参考资料

<RuleReferences />
