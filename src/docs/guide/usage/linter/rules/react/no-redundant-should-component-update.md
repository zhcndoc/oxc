---
title: "react/no-redundant-should-component-update | Oxlint"
rule: "react/no-redundant-should-component-update"
category: "Style"
version: "1.33.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/react/no_redundant_should_component_update.rs`;
</script>

<RuleHeader />

### 作用

当继承 `React.PureComponent` 时，禁止使用 `shouldComponentUpdate`。

请注意，使用 `PureComponent`
[在现代 React 中不推荐](https://react.dev/reference/react/PureComponent)。

### 为什么这不好？

`React.PureComponent` 会自动实现 `shouldComponentUpdate`，并对 props 和 state 进行浅比较。
在继承 `React.PureComponent` 的类中定义 `shouldComponentUpdate` 是多余的，并且违背了使用 `React.PureComponent` 的目的。如果你需要自定义比较逻辑，请改为继承 `React.Component`。

### 示例

以下是此规则的**错误**代码示例：

```jsx
class Foo extends React.PureComponent {
  shouldComponentUpdate() {
    // 执行检查
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends React.PureComponent {
    shouldComponentUpdate() {
      // 执行检查
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}
```

以下是此规则的**正确**代码示例：

```jsx
class Foo extends React.Component {
  shouldComponentUpdate() {
    // 执行检查
  }

  render() {
    return <div>Radical!</div>;
  }
}

function Bar() {
  return class Baz extends React.Component {
    shouldComponentUpdate() {
      // 执行检查
    }

    render() {
      return <div>Groovy!</div>;
    }
  };
}

class Qux extends React.PureComponent {
  render() {
    return <div>Tubular!</div>;
  }
}
```

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v1.33.0 中添加。

## 参考资料

<RuleReferences />
