---
title: "react/no-clone-element"
category: "Restriction"
version: "1.53.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_clone_element.rs`;
</script>

<RuleHeader />

### 它的作用

阻止使用 `React.cloneElement`，在 React 中这被视为一种反模式。

### 为什么这不好？

建议不要使用 `React.cloneElement`，因为它可能会导致代码更难跟踪和理解。它通常不常见且脆弱，并且有多种替代方案，详见
[React 文档](https://react.dev/reference/react/cloneElement#alternatives)。

请注意，此规则基于 `@eslint-react` 中的 [`@eslint-react/no-clone-element`](https://www.eslint-react.xyz/docs/rules/no-clone-element)
，而不是来自 `eslint-plugin-react` 的规则。

### 示例

此规则的**错误**代码示例：

```jsx
import { cloneElement } from "react";

function List({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isHighlighted: index === selectedIndex,
        }),
      )}
    </div>
  );
}
```

此规则的**正确**代码示例：

```jsx
// 改为使用带有 `renderItem` 函数属性的 map。
function List({ items, renderItem }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {items.map((item, index) => {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
    </div>
  );
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.53.0 中添加。

## 参考资料

<RuleReferences />
