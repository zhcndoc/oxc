---
title: "oxc/no-barrel-file | Oxlint"
rule: "oxc/no-barrel-file"
category: "Restriction"
version: "0.3.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_barrel_file.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用桶文件，其中文件包含 `export *` 语句，
并且模块总数超过阈值。

默认阈值为 100。

### 为什么这不好？

重新导出许多模块的桶文件会显著减慢
应用程序和打包器的速度。当一个桶文件导出大量
模块时，从中导入会迫使运行时或打包器处理所有
已导出的模块，即使实际上只使用了其中少数几个。这会导致
更慢的启动时间和更大的 bundle 体积。

参考：

- <https://github.com/thepassle/eslint-plugin-barrel-files>
- <https://marvinh.dev/blog/speeding-up-javascript-ecosystem-part-7>

### 示例

无效：

```javascript
export * from "foo"; // 其中 `foo` 加载了一个包含 100 个模块的子树
import * as ns from "foo"; // 其中 `foo` 加载了一个包含 100 个模块的子树
```

有效：

```javascript
export { foo } from "foo";
```

## 配置

此规则接受一个包含以下属性的配置对象：

### threshold

类型：`integer`

默认值：`100`

通过 `export *` 可以重新导出的最大模块数量，
超过该数量后将触发此规则。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.0 中新增。

## 参考

<RuleReferences />
