---
title: "typescript/unbound-method | Oxlint"
rule: "typescript/unbound-method"
category: "正确性"
version: "1.12.0"
default: true
type_aware: true
fix: "none"
upstream: "https://typescript-eslint.io/rules/unbound-method/"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/unbound_method.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/unbound_method/unbound_method.go`;
</script>

<RuleHeader />

### 它的作用

此规则强制未绑定的方法以其预期的作用域调用。

### 为什么这很糟糕？

当你从对象中提取一个方法并单独调用它时，`this` 上下文会丢失。这可能导致运行时错误或意外行为，尤其是当方法依赖 `this` 来访问实例属性或其他方法时。

### 示例

以下是此规则的 **错误** 代码示例：

```ts
class MyClass {
  private value = 42;

  getValue() {
    return this.value;
  }

  processValue() {
    return this.value * 2;
  }
}

const instance = new MyClass();

// 未绑定的方法 - 会丢失 'this' 上下文
const getValue = instance.getValue;
getValue(); // 运行时错误：无法读取 undefined 的 'value' 属性

// 将未绑定的方法作为回调传递
[1, 2, 3].map(instance.processValue); // 'this' 将是 undefined

// 解构方法
const { getValue: unboundGetValue } = instance;
unboundGetValue(); // 运行时错误
```

以下是此规则的 **正确** 代码示例：

```ts
class MyClass {
  private value = 42;

  getValue() {
    return this.value;
  }

  processValue() {
    return this.value * 2;
  }
}

const instance = new MyClass();

// 在实例上调用该方法
const value = instance.getValue(); // 正确

// 绑定方法以保留上下文
const boundGetValue = instance.getValue.bind(instance);
boundGetValue(); // 正确

// 使用箭头函数保留上下文
[1, 2, 3].map(() => instance.processValue()); // 正确

// 在类中使用箭头函数以自动绑定
class MyClassWithArrow {
  private value = 42;

  getValue = () => {
    return this.value;
  };
}

const instance2 = new MyClassWithArrow();
const getValue = instance2.getValue; // 安全 - 箭头函数会保留 'this'
getValue(); // 正确
```

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreStatic

type: `boolean`

default: `false`

是否忽略静态未绑定方法。
当为 true 时，静态方法可以在不绑定的情况下被引用。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考资料

<RuleReferences />
