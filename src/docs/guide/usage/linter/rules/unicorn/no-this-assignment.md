---
title: "unicorn/no-this-assignment"
category: "迂腐"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_this_assignment.rs`;
</script>

<RuleHeader />

### 它的作用

禁止将 `this` 赋值给变量。

### 这为什么不好？

将 `this` 赋值给变量是不必要且令人困惑的。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const foo = this;
class Bar {
  method() {
    foo.baz();
  }
}

new Bar().method();
```

以下是此规则的**正确**代码示例：

```javascript
class Bar {
  constructor(fooInstance) {
    this.fooInstance = fooInstance;
  }
  method() {
    this.fooInstance.baz();
  }
}

new Bar(this).method();
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中添加。

## 参考资料

<RuleReferences />
