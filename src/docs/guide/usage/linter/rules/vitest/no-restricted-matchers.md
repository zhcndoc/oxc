---
title: "vitest/no-restricted-matchers | Oxlint"
rule: "vitest/no-restricted-matchers"
category: "Style"
version: "0.2.3"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-restricted-matchers.md"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/no_restricted_matchers.rs`;
</script>

<RuleHeader />

### 作用

禁止使用特定的 matchers 和修饰符，并且可以给出替代建议。

### 为什么这很糟糕？

出于各种原因，你的代码库中可能会不鼓励使用某些 matchers 或修饰符：
它们可能已被弃用、造成混淆、带来性能影响，或者可能有更好的替代方案可用。
此规则允许你通过限制某些 Jest matchers 并提供首选替代方案的指导，来强制统一测试模式。

### 示例

禁止项以映射的形式表达，其值可以是一个要显示的字符串消息，
如果只应使用默认规则消息，则为 null。禁止项会在 expect 链的开头进行检查——这意味着如果要完全禁止某个特定 matcher，必须指定全部
六种排列组合，但这也允许你同时禁止修饰符。默认情况下，此映射为空，表示
没有任何 matcher 或修饰符被禁止。

示例配置：

```json
{
  "jest/no-restricted-matchers": [
    "error",
    {
      "toBeFalsy": null,
      "resolves": "请改用 `expect(await promise)`。",
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

以下是该规则在上述配置下的**错误**代码示例：

```javascript
it("is false", () => {
  // 如果这里有一个修饰符（即 `not.toBeFalsy`），则会被视为没有问题
  expect(a).toBeFalsy();
});

it("resolves", async () => {
  // 该修饰符的所有用法都被禁止，不论 matcher 是什么
  await expect(myPromise()).resolves.toBe(true);
});

describe("when an error happens", () => {
  it("does not upload the file", async () => {
    // 该 matcher 的所有用法都被禁止
    expect(uploadFileMock).not.toHaveBeenCalledWith("file.name");
  });
});
```

## 配置

此规则接受一个带有以下属性的配置对象：

type: `object`

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.2.3 中添加。

## 参考

<RuleReferences />
