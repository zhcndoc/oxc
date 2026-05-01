---
title: "jest/prefer-mock-return-shorthand"
category: "Style"
version: "1.49.0"
default: false
type_aware: false
fix: "fixable_fix"
---

<!-- 该文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_mock_return_shorthand.rs`;
</script>

<RuleHeader />

### 作用

在处理返回简单值的函数 mock 时，Jest 提供了一些 API 语法糖函数，用于减少你需要编写的样板代码量。

### 为什么这不好？

不使用 Jest 的 API 语法糖函数会增加不必要的样板代码，并使测试更难阅读。这些辅助方法能够清晰表达意图，
减少错误，使测试保持简单且易于维护。

### 示例

以下是此规则的**错误**代码示例：

```js
jest.fn().mockImplementation(() => "hello world");

jest
  .spyOn(fs.promises, "readFile")
  .mockImplementationOnce(() => Promise.reject(new Error("oh noes!")));

myFunction
  .mockImplementationOnce(() => 42)
  .mockImplementationOnce(() => Promise.resolve(42))
  .mockReturnValue(0);
```

以下是此规则的**正确**代码示例：

```js
jest.fn().mockResolvedValue(123);

jest.spyOn(fs.promises, "readFile").mockReturnValue(Promise.reject(new Error("oh noes!")));
jest.spyOn(fs.promises, "readFile").mockRejectedValue(new Error("oh noes!"));

jest.spyOn(fs, "readFileSync").mockImplementationOnce(() => {
  throw new Error("oh noes!");
});

myFunction.mockResolvedValueOnce(42).mockResolvedValueOnce(42).mockReturnValue(0);
```

此规则兼容 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-return-shorthand.md)，
要使用它，请将以下配置添加到你的 `.oxlintrc.json` 中：

```json
{
  "rules": {
    "vitest/prefer-mock-return-shorthand": "error"
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.49.0 中添加。

## 参考

<RuleReferences />
