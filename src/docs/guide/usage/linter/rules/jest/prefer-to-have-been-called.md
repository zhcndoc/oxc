---
title: "jest/prefer-to-have-been-called | Oxlint"
rule: "jest/prefer-to-have-been-called"
category: "Style"
version: "1.34.0"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-been-called.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_to_have_been_called.rs`;
</script>

<RuleHeader />

### 作用

建议使用 `toHaveBeenCalled()` 或 `not.toHaveBeenCalled()`，而不是 `toHaveBeenCalledTimes(0)` 或 `toBeCalledTimes(0)`。

### 为什么这不好？

`toHaveBeenCalled()` 比 `toHaveBeenCalledTimes(0)` 更明确、可读性更强。

### 示例

以下是此规则的**错误**代码示例：

```js
expect(mock).toHaveBeenCalledTimes(0);
expect(mock).toBeCalledTimes(0);
expect(mock).not.toHaveBeenCalledTimes(0);
```

以下是此规则的**正确**代码示例：

```js
expect(mock).not.toHaveBeenCalled();
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(1);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.34.0 中添加。

## 参考资料

<RuleReferences />
