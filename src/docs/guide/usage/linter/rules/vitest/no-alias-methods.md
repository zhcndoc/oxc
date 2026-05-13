---
title: "vitest/no-alias-methods | Oxlint"
rule: "vitest/no-alias-methods"
category: "Style"
version: "0.0.12"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_alias_methods.rs`;
</script>

<RuleHeader />

### 作用

强制使用 Vitest 的标准匹配器名称，而不是别名。

### 为什么这很糟糕？

不建议使用 Vitest 匹配器别名，因为它们会导致匹配器用法不一致。
此规则便于搜索某个匹配器的所有出现位置，并确保匹配器名称保持一致。

### 示例

此规则的**错误**代码示例：

```javascript
expect(a).toBeCalled();
expect(a).toBeCalledTimes();
expect(a).toBeCalledWith();
expect(a).lastCalledWith();
expect(a).nthCalledWith();
expect(a).toReturn();
expect(a).toReturnTimes();
expect(a).toReturnWith();
expect(a).lastReturnedWith();
expect(a).nthReturnedWith();
expect(a).toThrowError();
```

此规则的**正确**代码示例：

```javascript
expect(a).toHaveBeenCalled();
expect(a).toHaveBeenCalledTimes();
expect(a).toHaveBeenCalledWith();
expect(a).toHaveBeenLastCalledWith();
expect(a).toHaveBeenNthCalledWith();
expect(a).toHaveReturned();
expect(a).toHaveReturnedTimes();
expect(a).toHaveReturnedWith();
expect(a).toHaveLastReturnedWith();
expect(a).toHaveNthReturnedWith();
expect(a).toThrow();
```

## How to use

<RuleHowToUse />

## 版本

此规则添加于 v0.0.12。

## 参考资料

<RuleReferences />
