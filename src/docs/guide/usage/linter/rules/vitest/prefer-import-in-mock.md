---
title: "vitest/prefer-import-in-mock"
category: "Style"
version: "1.49.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_import_in_mock.rs`;
</script>

<RuleHeader />

### 作用

此规则强制在 `vi.mock()` 或 `vi.doMock()` 中使用动态 `import()`，这可以提升被模拟模块的类型信息和 IntelliSense。

### 为什么这不好？

缺少类型信息和 IntelliSense 会增加真实模块与其模拟版本不匹配的风险。

### 示例

以下是此规则的**错误**代码示例：

```js
vi.mock("./path/to/module");
vi.doMock("./path/to/module");
```

以下是此规则的**正确**代码示例：

```js
vi.mock(import("./path/to/module"));
vi.doMock(import("./path/to/module"));
```

## 配置

此规则接受一个包含以下属性的配置对象：

### fixable

类型：`boolean`

默认值：`true`

表示该规则是否应生成修复。

## 如何使用

<RuleHowToUse />

## Version

此规则在 v1.49.0 中添加。

## References

<RuleReferences />
