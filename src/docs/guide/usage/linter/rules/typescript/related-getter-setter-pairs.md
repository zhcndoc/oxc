---
title: "typescript/related-getter-setter-pairs | Oxlint"
rule: "typescript/related-getter-setter-pairs"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/related_getter_setter_pairs.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/related_getter_setter_pairs/related_getter_setter_pairs.go`;
</script>

<RuleHeader />

### 功能说明

此规则要求同一属性的 getter 和 setter 必须一起定义，并且类型相关联。

### 为什么这不好？

当你为同一属性定义 getter 和 setter 时，它们通常应当一起定义，并且使用兼容的类型。类型不匹配，或者将它们分别定义，可能会导致混淆以及潜在的运行时错误。

### 示例

此规则的**错误**代码示例如下：

```ts
class Example {
  // Getter 和 setter 的类型不兼容
  get value(): string {
    return this._value.toString();
  }

  set value(val: number) {
    // 与 getter 不兼容
    this._value = val;
  }

  private _value: number = 0;
}

// Getter 没有对应的 setter，或者反之，可能会被标记
class IncompleteProperty {
  get readOnlyValue(): string {
    return "constant";
  }
  // 缺少 setter——这可能是有意为之，但应保持一致
}
```

此规则的**正确**代码示例如下：

```ts
class Example {
  // Getter 和 setter 的类型兼容
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
  }

  private _value: string = "";
}

// 只有 getter 的只读属性
class ReadOnlyProperty {
  get constant(): string {
    return "constant value";
  }
}

// 只有 setter 的只写属性（较少见，但有效）
class WriteOnlyProperty {
  set logger(message: string) {
    console.log(message);
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则新增于 v1.12.0。

## 参考资料

<RuleReferences />
