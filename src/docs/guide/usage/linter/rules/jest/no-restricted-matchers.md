---
title: "jest/no-restricted-matchers"
category: "样式"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/no_restricted_matchers.rs`;
</script>

<RuleHeader />

### 它的作用

禁止使用特定的 matcher 和修饰符，并且可以给出替代建议。

### 为什么这不好？

由于各种原因，你的代码库中可能不建议使用某些 matcher 或修饰符：
它们可能已被弃用、容易造成混淆、会带来性能影响，或者
存在更好的替代方案。此规则允许你通过限制某些 Jest matcher 并提供
推荐替代方案的指导，来强制执行一致的测试模式。

### 示例

禁用项以映射的形式表达，其值可以是字符串消息（将显示出来），
如果只使用默认规则消息，则为 null。禁用项会针对 expect 链的开头进行检查——这意味着要完全禁用某个特定的 matcher，你必须指定全部
六种排列组合，但这也允许你同时禁用修饰符。默认情况下，这个映射为空，表示
没有 matcher 或修饰符被禁用。

示例配置：

```json
{
  "jest/no-restricted-matchers": [
    "error",
    {
      "toBeFalsy": null,
      "resolves": "使用 `expect(await promise)` 替代。",
      "toHaveBeenCalledWith": null,
      "not.toHaveBeenCalledWith": null,
      "resolves.toHaveBeenCalledWith": null,
      "rejects.toHaveBeenCalledWith": null,
      "resolves.not.toHaveBeenCalledWith": null,
      "rejects.not.toHaveBeenCalledWith": null
    }
  ]
}
```

在上述配置下，此规则的**错误**代码示例：

```javascript
it("is false", () => {
  // 如果这里有修饰符（即 `not.toBeFalsy`），则会被视为没问题
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // 禁止所有对此修饰符的使用，无论 matcher 是什么
  await expect(myPromise()).resolves.toBe(true);
});

describe("when an error happens", () => {
  it("does not upload the file", async () => {
    // 禁止所有对此 matcher 的使用
    expect(uploadFileMock).not.toHaveBeenCalledWith("file.name");
  });
});
```

## 配置

此规则接受一个带有以下属性的配置对象：

### restrictedMatchers

type: `Record<string, string>`

default: `{}`

一个用于限制 matcher/修饰符并提供自定义消息的映射。
键是 matcher/修饰符名称（例如 `"toBeFalsy"`、`"resolves"`、`"not.toHaveBeenCalledWith"`）。
值是在使用该 matcher/修饰符时显示的可选自定义消息。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.3 中添加。

## 参考资料

<RuleReferences />
