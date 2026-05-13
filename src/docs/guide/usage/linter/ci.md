---
title: "设置 CI 和其他集成 | Oxlint"
description: 在 CI 中或作为 git hook 运行 Oxlint。
---

# 设置 CI 和其他集成

你可以——并且应该——设置你的 CI 流水线来运行 Oxlint，并在 lint 错误时使构建失败。

本页还涵盖了你可能想要包含的其他集成，例如 git pre-commit hooks。

## CI

这些说明假设你已经在项目中设置了 Oxlint，即将 `oxlint` 添加到 `package.json` 的 devDependencies 中，并且仓库中已存在 oxlint 配置文件。

### GitHub Actions

首先，如果你还没有 `lint` 脚本，请将其添加到 `package.json` 中：

```json [package.json]
{
  "scripts": {
    "lint": "oxlint"
  }
}
```

然后创建 `.github/workflows/oxlint.yml`：

```yaml [.github/workflows/oxlint.yml]
name: Lint

on:
  pull_request:
  push:
    branches: [main]

permissions: {}

jobs:
  oxlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: pnpm

      # 或者在这里使用 npm install / yarn install
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint
```

或者，你可以使用 github 格式选项输出，以获得 [更好的警告/错误注释](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-error-message)：

```json [package.json]
{
  "scripts": {
    "lint:github": "oxlint --format=github"
  }
}
```

### GitLab CI

如果你使用 GitLab CI，你可以使用 `--format=gitlab` 设置 Oxlint，并结合 [GitLab 的代码质量功能](https://docs.gitlab.com/ci/testing/code_quality/#code-quality-report-format)，在合并请求中获取 lint 违规的内联注释。

要设置此功能，你可以在 `package.json` 中添加一个脚本来输出 gitlab 格式并将其保存到文件，如下所示：

```json [package.json]
{
  "scripts": {
    "lint:gitlab": "oxlint --format=gitlab > gitlab-oxlint-report.json"
  }
}
```

然后向你的 `.gitlab-ci.yml` 添加一个作业，以运行脚本并将报告作为代码质量工件上传：

```yml [.gitlab-ci.yml]
oxlint:
  image: node:lts
  stage: test
  before_script:
    # 或者在这里使用 pnpm install / yarn install
    - npm install
  script:
    - npm run lint:gitlab
  artifacts:
    reports:
      codequality:
        # 这是相对于你的仓库根目录的，所以如果你的仓库结构不同或将报告放在不同位置，请进行调整
        - gitlab-oxlint-report.json
```

如果你不想使用代码质量功能，你可以直接在 CI 作业中运行 oxlint 而不使用 `--format=gitlab`。

如果你想使用类型感知规则，请确保启用了它们，并考虑缓存 `node_modules` 以加快依赖项的安装速度。

## Git hooks

### lint-staged

对于使用 [lint-staged](https://npmx.dev/package/lint-staged) 的 JS/TS 项目，你可以按以下方式设置 oxlint 作为 pre-commit 钩子运行：

```json [package.json]
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": "pnpm run lint"
  }
}
```

为了在安装依赖时自动安装 git 钩子，考虑同时使用 [husky](https://typicode.github.io/husky/get-started.html)。

### pre-commit

如果你使用 [pre-commit](https://pre-commit.com/) 来管理 git 钩子，你可以按以下方式设置 Oxlint：

```yaml [.pre-commit-config.yaml]
repos:
  - repo: https://github.com/oxc-project/mirrors-oxlint
    rev: v0.0.0
    hooks:
      - id: oxlint
        verbose: true
```

将 `v0.0.0` 替换为最新版本。

## 其他集成

### Unplugin

Unplugin 通过 [第三方包](https://npmx.dev/package/unplugin-oxlint) 支持

### Vite plugin

Vite plugin 通过 [第三方包](https://npmx.dev/package/vite-plugin-oxlint) 支持
