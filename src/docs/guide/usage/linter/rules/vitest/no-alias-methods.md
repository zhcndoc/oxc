---
title: "vitest/no-alias-methods"
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

此规则确保代码中仅使用 Jest 文档中使用的规范名称。

### 为什么这很糟糕？

这些别名将在 Jest 的下一个重大版本中被移除 - 更多信息请参见 [jestjs/jest#13164](https://github.com/jestjs/jest/issues/13164)。
此规则将使在代码中搜索该方法的所有出现位置更加容易，并确保所使用的方法名称保持一致。

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

针对 vitest 的此规则**错误**代码示例：

```javascript
expect(a).toBeCalled();
expect(a).toBeCalledTimes();
expect(a).not["toThrowError"]();
```

针对 vitest 的此规则**正确**代码示例：

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
expect(a).rejects;
expect(a);
```

## 如何使用

<RuleHowToUse />

## 版本

此规则添加于 v0.0.12。

## 参考资料

<RuleReferences />
