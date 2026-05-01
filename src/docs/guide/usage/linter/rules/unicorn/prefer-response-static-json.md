---
title: "unicorn/prefer-response-static-json"
category: "样式"
version: "1.29.0"
default: false
type_aware: false
fix: "fixable_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/unicorn/prefer_response_static_json.rs`;
</script>

<RuleHeader />

### 它的作用

强制使用 `Response.json()`，而不是 `new Response(JSON.stringify())`。

### 这为什么不好？

`Response.json()` 是一种更简洁且语义更清晰的创建 JSON 响应的方式。
它会自动设置正确的 `Content-Type` 标头（`application/json`）并处理序列化，
从而使代码更易维护，也更不容易出错。

### 示例

以下是此规则的**错误**代码示例：

```javascript
const response = new Response(JSON.stringify(data));
const response = new Response(JSON.stringify(data), { status: 200 });
```

以下是此规则的**正确**代码示例：

```javascript
const response = Response.json(data);
const response = Response.json(data, { status: 200 });
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.29.0 添加。

## 参考资料

<RuleReferences />
