---
title: "jest/valid-expect-in-promise | Oxlint"
rule: "jest/valid-expect-in-promise"
category: "正确性"
version: "1.60.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect-in-promise.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/valid_expect_in_promise.rs`;
</script>

<RuleHeader />

### 作用

确保 promise 链（`.then()`、`.catch()`、`.finally()`）中的 `expect` 调用被正确地 `await` 或从测试中返回。

### 这为什么不好？

当在一个没有被 `await` 或返回的 promise 回调中调用 `expect` 时，即使断言失败，测试也可能通过，因为在 promise 解析之前测试就已经结束了。这会导致带有错误断言的测试静默通过。

### 示例

以下是此规则的**错误**示例：

```javascript
test("promise test", async () => {
  something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
  const twoPromise = something().then((value) => {
    expect(value).toBe("blue");
  });

  return Promise.any([onePromise, twoPromise]);
});
```

以下是此规则的**正确**示例：

```javascript
test("promise test", async () => {
  await something().then((value) => {
    expect(value).toBe("red");
  });
});

test("promises test", () => {
  const onePromise = something().then((value) => {
    expect(value).toBe("red");
  });
  const twoPromise = something().then((value) => {
    expect(value).toBe("blue");
  });

  return Promise.all([onePromise, twoPromise]);
});
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.60.0 中添加。

## 参考资料

<RuleReferences />
