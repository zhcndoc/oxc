---
title: "typescript/class-literal-property-style | Oxlint"
rule: "typescript/class-literal-property-style"
category: "Style"
version: "1.47.0"
default: false
type_aware: false
fix: "pending"
upstream: "https://typescript-eslint.io/rules/class-literal-property-style/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/class_literal_property_style.rs`;
</script>

<RuleHeader />

### 作用

强制以一致的风格在类中暴露字面量值。

### 为什么这不好？

将 readonly 字段和用于同类值的简单字面量 getter 混用，
会使类的 API 不一致，也更难快速浏览。

### 示例

以下是此规则的**错误**代码示例（默认 `"fields"`）：

```ts
class C {
  get name() {
    return "oxc";
  }
}
```

以下是此规则的**正确**代码示例：

```ts
class C {
  readonly name = "oxc";
}
```

## 配置

此规则接受以下字符串值之一：

### `"fields"`

强制对字面量值使用 readonly 字段。

使用此选项时的**错误**代码示例：

```ts
class C {
  get name() {
    return "oxc";
  }
}
```

使用此选项时的**正确**代码示例：

```ts
class C {
  readonly name = "oxc";
}
```

### `"getters"`

强制对字面量值使用 getter。

使用此选项时的**错误**代码示例：

```ts
class C {
  readonly name = "oxc";
}
```

使用此选项时的**正确**代码示例：

```ts
class C {
  get name() {
    return "oxc";
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.47.0 中添加。

## 参考资料

<RuleReferences />
