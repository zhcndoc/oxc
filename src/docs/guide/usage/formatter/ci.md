---
title: 设置 CI 和其他集成
description: 在 CI 中运行 Oxfmt 或作为 git hook 运行。
---

# 设置 CI 和其他集成

你可以——并且应该——设置你的 CI 流水线来运行 Oxfmt，并在格式存在差异时使构建失败。

本页还涵盖了你可能想要包含的其他集成，例如 git 预提交钩子。

## CI

### GitHub Actions

首先，如果你还没有的话，在你的 `package.json` 中添加一个 `fmt:check` 脚本：

```json [package.json]
{
  "scripts": {
    "fmt:check": "oxfmt --check"
  }
}
```

然后将一个 job 添加到你的 GitHub Actions 工作流中：

```yaml [.github/workflows/ci.yml]
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions: {}

jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: pnpm

      # 或者 yarn, npm 等。
      - run: pnpm install --frozen-lockfile
      - run: pnpm run fmt:check
```

#### 自动修复格式问题

如果你发现自己在打开 PR 之前经常忘记运行 Oxfmt，并且没有或无法使用预提交钩子，你可以使用 [autofix.ci](https://autofix.ci) 在你的 CI 工作流中添加一个自动修复步骤。

详见 [https://autofix.ci/setup](https://autofix.ci/setup)，你还需要安装相关的 GitHub App。

下面是一个你可以使用的 GitHub Actions 工作流示例：

```yaml [.github/workflows/autofix.yml]
name: autofix.ci # 需要使用此名称

on:
  pull_request:
  push:
    branches: ["main"]

permissions:
  contents: read

jobs:
  autofix:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - uses: pnpm/action-setup@v4

      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: pnpm

      # 或者 yarn, npm 等。
      - run: pnpm install --frozen-lockfile

      # 运行 oxfmt 以写入更改，如果存在任何差异，autofix.ci 将提交它们。
      # 如果你还没有的话，确保在你的 `package.json` 中添加一个 `fmt` 脚本。
      - run: pnpm run fmt

      # 注意：强烈建议使用此 action 的最新 SHA 哈希值而不是版本号。（详见 https://autofix.ci/setup）
      - uses: autofix-ci/action@1.3.2
```

### GitLab CI

如果你使用 GitLab CI，你可以设置 Oxfmt 作为 CI 流水线的一部分来强制代码格式化。

首先，如果你还没有的话，在你的 `package.json` 中添加一个 `fmt:check` 脚本：

```json [package.json]
{
  "scripts": {
    "fmt:check": "oxfmt --check"
  }
}
```

然后将一个 job 添加到你的 `.gitlab-ci.yml` 中，以检查所有代码是否格式正确：

```yml [.gitlab-ci.yml]
oxfmt:
  image: node:lts
  stage: test
  before_script:
    # 或者 pnpm, yarn 等。
    - npm install
  script:
    - npm run fmt:check
```

你可能还希望为你的包管理器添加缓存以加速安装。

## 预提交钩子

要自动格式化暂存的文件，使用 `oxfmt --no-error-on-unmatched-pattern`。这会格式化所有支持的文件，并在没有文件匹配时避免错误（例如，只暂存了 Ruby 文件）。

使用 `--check` 来验证格式而不写入文件。

对于 [lint-staged](https://npmx.dev/package/lint-staged)，添加到 `package.json`：

```json [package.json]
{
  "lint-staged": {
    "*": "oxfmt --no-error-on-unmatched-pattern"
  }
}
```

要在安装依赖时自动安装 git hook，考虑也使用 [husky](https://typicode.github.io/husky/get-started.html)。
