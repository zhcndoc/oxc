---
title: "版本控制策略 | Oxlint"
editLink: false
---

# 版本控制策略

Oxlint 遵循语义化版本控制，目标是在你升级时提供清晰性和可预测性。

以下内容被视为 **破坏性** 变更：

- 会破坏现有工作流的 CLI 接口变更。
- 会破坏现有配置的配置文件（`.oxlintrc.json`）变更。
- 重命名或移除某条规则。

以下内容被视为 **非破坏性** 变更：

- 添加新的 lint 规则。
- 更改某条规则的默认配置。
- 改进规则描述或诊断消息。
- 为现有规则添加新的配置选项。
- 使规则行为更改以更好地与原始 ESLint 规则的行为保持一致的修复。
- 向配置文件添加新字段。

## 不受语义化版本控制约束的特性

以下特性不受语义化版本控制约束。它们可能会在任何时候引入破坏性变更，即使是在补丁版本或次要版本中：

- **JavaScript 自定义插件** - 插件 API 和行为可能会在不通知的情况下发生变化。
- **类型感知 linting** - 类型感知规则及其行为可能会随着该特性的发展而变化。

## 新的 Lint 错误算作破坏性变更吗？

如果 Oxlint 的新版本报告了代码中的额外问题，这是预期行为。这意味着 Oxlint 变得更好了，而不是你的项目出了问题。新的错误反映的是更强的分析能力，而不是升级失败。

## 对新版本的预期

- **补丁版本**（1.0.x）：错误修复、性能改进、内部重构。升级这些版本始终是安全的。
- **次要版本**（1.x.0）：新规则、更好的诊断、新特性。即使它们导致代码库中出现新的错误，也不被视为破坏性变更。
- **主要版本**（x.0.0）：保留用于 CLI 或配置格式的破坏性变更。

## 使用 Renovate Bot

将下面的片段添加到你的 Renovate 配置中，以便让它自动保持 Oxlint 为最新版本。

```json [renovate.json]
{
  "extends": ["config:recommended"],
  "packageRules": [
    {
      "matchPackageNames": ["oxlint"],
      "groupName": "oxlint",
      "automergeType": "branch",
      "stabilityDays": 1
    }
  ]
}
```

如果你使用 [eslint-plugin-oxlint](https://npmx.dev/package/eslint-plugin-oxlint)，请确保它也与 Oxlint 一起更新，以避免兼容性问题。

## 使用 Dependabot

将下面的片段添加到你的 Dependabot 配置中，以便让它自动保持 Oxlint 为最新版本。

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/" # package.json 的位置
    schedule:
      interval: "daily"
    groups: # 将所有 Oxlint 更新分组到一起
      oxlint:
        patterns:
          - "oxlint"
    commit-message: # 保持提交历史整洁
      prefix: "chore"
      include: "scope"
    ignore: # 可选：忽略未来的大版本
      - dependency-name: "oxlint"
        update-types: ["version-update:semver-major"]
    open-pull-requests-limit: 1 # 一次一个 PR
```

如果你使用 [eslint-plugin-oxlint](https://npmx.dev/package/eslint-plugin-oxlint)，请确保它也与 Oxlint 一起更新，以避免兼容性问题。
