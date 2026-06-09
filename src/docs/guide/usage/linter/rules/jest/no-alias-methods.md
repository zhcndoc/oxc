---
title: "jest/no-alias-methods | Oxlint"
rule: "jest/no-alias-methods"
category: "Style"
version: "0.0.12"
default: false
type_aware: false
fix: "fixable_fix"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_alias_methods.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用 Jest 的规范 matcher 名称，而不是别名。

### 为什么这不好？

Jest matcher 别名已被弃用，并将在 Jest 的下一个大版本中移除。
更多信息请参见 [jestjs/jest#13164](https://github.com/jestjs/jest/issues/13164)。

此规则使查找某个 matcher 的所有出现位置更容易，并确保 matcher 名称之间保持一致。

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

此规则于 v0.0.12 中添加。

## 参考资料

<RuleReferences />
