---
title: "unicorn/no-document-cookie | Oxlint"
rule: "unicorn/no-document-cookie"
category: "Restriction"
version: "0.0.18"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/no_document_cookie.rs`;
</script>

<RuleHeader />

### 作用

禁止直接使用
[`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)。

### 为什么这不好？

不建议直接使用
[`document.cookie`](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)，
因为很容易把字符串写错。相反，你应该使用
[Cookie Store
API](https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API)
或 [cookie 库](https://npmx.dev/search?q=cookie)。

### 示例

以下是此规则的**错误**代码示例：

```javascript
document.cookie =
  "foo=bar" +
  "; Path=/" +
  "; Domain=example.com" +
  "; expires=Fri, 31 Dec 9999 23:59:59 GMT" +
  "; Secure";
```

以下是此规则的**正确**代码示例：

```javascript
async function storeCookies() {
  await cookieStore.set({
    name: "foo",
    value: "bar",
    expires: Date.now() + 24 * 60 * 60 * 1000,
    domain: "example.com",
  });
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.0.18 中加入。

## 参考资料

<RuleReferences />
