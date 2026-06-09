---
title: "nextjs/inline-script-id | Oxlint"
rule: "nextjs/inline-script-id"
category: "正确性"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
upstream: "https://nextjs.org/docs/messages/inline-script-id"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/inline_script_id.rs`;
</script>

<RuleHeader />

### 作用

要求所有带有内联内容或 `dangerouslySetInnerHTML` 的 `next/script` 组件都必须具有 `id` 属性。

### 为什么这不好？

Next.js 需要为内联脚本提供唯一的 `id` 属性，以便在页面渲染期间正确去重。
如果没有 `id`，相同的内联脚本可能会被多次执行，从而导致意外行为
或性能问题。对于会修改全局状态或执行一次性初始化的脚本来说，这一点尤其重要。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import Script from 'next/script';

export default function Page() {
  return (
    <Script>
      {`console.log('Hello world');`}
    </Script>
  );
}

// 使用 dangerouslySetInnerHTML 时也错误
export default function Page() {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `console.log('Hello world');`
      }}
    />
  );
}
```

以下是此规则的**正确**代码示例：

```javascript
import Script from 'next/script';

export default function Page() {
  return (
    <Script id="my-script">
      {`console.log('Hello world');`}
    </Script>
  );
}

// 使用 dangerouslySetInnerHTML 时正确
export default function Page() {
  return (
    <Script
      id="my-script"
      dangerouslySetInnerHTML={{
        __html: `console.log('Hello world');`
      }}
    />
  );
}

// 外部脚本不需要 id
export default function Page() {
  return (
    <Script src="https://example.com/script.js" />
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v0.2.0 中添加的。

## 参考资料

<RuleReferences />
