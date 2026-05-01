---
title: "typescript/no-import-type-side-effects"
category: "限制"
version: "0.5.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/no_import_type_side_effects.rs`;
</script>

<RuleHeader />

### 它的作用

当一个 import 仅包含带有内联类型限定符的导入项时，强制使用顶层的 `import type` 限定符。

### 为什么这不好？

`--verbatimModuleSyntax` 编译器选项会让 TypeScript 对 import 声明进行简单且可预测的转译。具体来说，它会完全移除带有顶层类型限定符的 import 声明，并移除任何带有内联类型限定符的 import 导入项。

后一种行为在某些情况下确实会带来一个可能令人意外的影响：TS 可能会在运行时保留一个“副作用” import：

```ts
import { type A, type B } from "mod";
```

会被转译为

```ts
import {} from "mod";
// 这与以下内容相同
import "mod";
```

对于极少数需要仅因副作用而导入的情况，这样做可能是可取的——但在大多数情况下，你不会希望留下一个不必要的副作用 import。

### 示例

此规则的**错误**代码示例：

```ts
import { type A } from "mod";
import { type A as AA } from "mod";
import { type A, type B } from "mod";
import { type A as AA, type B as BB } from "mod";
```

此规则的**正确**代码示例：

```ts
import type { A } from "mod";
import type { A as AA } from "mod";
import type { A, B } from "mod";
import type { A as AA, B as BB } from "mod";
```

## 如何使用

<RuleHowToUse />

## 版本

此规则自 v0.5.0 起新增。

## 参考资料

<RuleReferences />
