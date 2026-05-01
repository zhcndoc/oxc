---
title: "nextjs/no-async-client-component"
category: "Correctness"
version: "0.2.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/nextjs/no_async_client_component.rs`;
</script>

<RuleHeader />

### 作用

阻止在 Next.js 应用程序中将 async 函数用于客户端组件。
此规则会检查任何满足以下条件的 async 函数：

- 标记了 "use client" 指令
- 名称以大写字母开头（表示它是一个组件）
- 要么被导出为默认导出，要么被赋值给一个变量

### 为什么这不好？

在客户端组件中使用 async 函数可能会导致服务端与客户端之间的 hydration 不匹配，
可能会破坏组件渲染生命周期，并且可能会在 React 的并发特性下引发意外行为。

### 示例

以下是此规则的**错误**代码示例：

```javascript
"use client"

// 带默认导出的 async 组件
export default async function MyComponent() {
  return <></>
}

// 带命名导出的 async 组件
async function MyComponent() {
  return <></>
}
export default MyComponent

// async 箭头函数组件
const MyComponent = async () => {
  return <></>
}
export default MyComponent
```

以下是此规则的**正确**代码示例：

```javascript
"use client"

// 常规同步组件
export default function MyComponent() {
  return <></>
}

// 在 effects 中处理 async 操作
export default function MyComponent() {
  useEffect(() => {
    async function fetchData() {
      // 此处为 async 操作
    }
    fetchData();
  }, []);
  return <></>
}

// 在事件处理器中处理 async 操作
export default function MyComponent() {
  const handleClick = async () => {
    // 此处为 async 操作
  }
  return <button onClick={handleClick}>Click me</button>
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.2.0 中添加。

## 参考资料

<RuleReferences />
