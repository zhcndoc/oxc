---
title: 自动修复
description: 使用 Oxlint 应用安全、建议和危险的修复。
---

# 自动修复

Oxlint 可以自动修复某些 lint 违规。只有在传递相关的 CLI 标志时才会应用自动修复。您可以选择何时应用它们。

在代码编辑器集成（如 VS Code、Zed 等）中，自动修复作为“代码操作”暴露出来，您可以在编辑器中应用它们。

您可以在 [规则列表](/docs/guide/usage/linter/rules) 中查看所有具有修复器的规则。

## 安全修复

安全修复是不会改变程序行为的更改。

应用安全修复：

```bash
oxlint --fix
```

## 建议

建议是可能改变行为或可能不符合您意图的更改。

应用建议：

```bash
oxlint --fix-suggestions
```

## 危险修复

危险修复是可能破坏代码的激进更改。

应用危险修复：

```bash
oxlint --fix-dangerously
```

## 组合修复模式

您可以组合安全修复和建议：

```bash
oxlint --fix --fix-suggestions
```

您也可以包含危险修复：

```bash
oxlint --fix --fix-suggestions --fix-dangerously
```

## 规则支持

并非所有规则都提供修复。某些规则支持安全修复，某些提供建议，还有一些尚未提供修复。
对于某些规则，修复器实际上是不可能的，不能也不应该添加。

如果某个规则缺少修复器并且您认为它值得拥有一个，欢迎贡献。

## 类型感知 linting 和修复

修复器也可以与 [类型感知 lint 规则](/docs/guide/usage/linter/type-aware) 一起应用。

您可以像这样在启用类型感知 linting 的情况下应用安全修复：

```bash
oxlint --type-aware --fix
```

或者，如果您已通过配置文件启用了类型感知 linting，则只需使用 `oxlint --fix`。

## JS 插件

提供修复器或建议的 [JS 插件](/docs/guide/usage/linter/js-plugins) 也可以由 Oxlint 应用。
