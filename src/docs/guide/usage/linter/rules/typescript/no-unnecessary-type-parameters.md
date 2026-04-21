---
title: "typescript/no-unnecessary-type-parameters"
category: "可疑"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_unnecessary_type_parameters.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/no_unnecessary_type_parameters/no_unnecessary_type_parameters.go`;
</script>

<RuleHeader />

### 它的作用

禁止声明了但并未被有意义地使用的类型参数。

### 为什么这不好？

不必要的类型参数会让签名更冗长、更难理解，而且它们
往往会掩盖简化 API 的机会。

### 示例

以下是此规则的**错误**代码示例：

```ts
function parseYAML<T>(input: string): T {
  return input as any as T;
}
```

以下是此规则的**正确**代码示例：

```ts
function parseYAML(input: string): unknown {
  return input;
}

function identity<T>(value: T): T {
  return value;
}
```

## 如何使用

<RuleHowToUse />

## 参考资料

<RuleReferences />
