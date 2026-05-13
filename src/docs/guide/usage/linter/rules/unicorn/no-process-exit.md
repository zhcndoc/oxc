---
title: "unicorn/no-process-exit | Oxlint"
rule: "unicorn/no-process-exit"
category: "Restriction"
version: "0.2.9"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_process_exit.rs`;
</script>

<RuleHeader />

### 它的作用

禁止对 `process.exit()` 的所有使用。

### 为什么这不好？

`process.exit()` 通常只应在命令行工具中使用。在所有其他
类型的应用程序中，代码应该改为抛出错误。

### 示例

以下是此规则的**错误**代码示例：

```javascript
if (problem) {
  process.exit(1);
}
```

以下是此规则的**正确**代码示例：

```javascript
if (problem) {
  throw new Error("message");
}
```

```
#!/usr/bin/env node
if (problem) {
  process.exit(1);
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.9 中添加。

## 参考资料

<RuleReferences />
