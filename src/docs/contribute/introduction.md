---
title: 简介
outline: deep
---

# 为 Oxc 做贡献

感谢您有兴趣为 Oxc 做贡献！我们正在构建下一代 JavaScript 工具链，我们需要您的帮助。

## 快速开始

最快的开始方式是通过我们的 [good first issues](https://github.com/oxc-project/oxc/contribute)。这些都是精心挑选的任务，非常适合新贡献者。

需要指导？加入我们的 [Discord 社区](https://discord.gg/9uXCAwqQZW)，我们的团队和社区成员很乐意提供帮助。

## 贡献方式

我们欢迎并感谢任何形式的贡献：

### 🐛 错误报告

- 报告解析错误或错误的 lint 行为
- 分享性能问题或回归
- 记录我们尚未考虑的边界情况

### 🚀 功能开发

- 添加新的 lint 规则
- 提高解析器兼容性
- 增强转换器能力
- 在 Oxc 生态中构建新工具

### 📚 文档

- 改进入门指南
- 添加示例和教程
- 记录架构决策
- 将内容翻译成其他语言

### 🧪 测试

- 添加来自真实代码库的测试用例
- 提高测试覆盖率
- 创建性能基准测试
- 针对生态系统项目进行测试

### 🔧 基础设施

- 改进构建和 CI 系统
- 增强开发工具
- 优化性能关键路径
- 保持与其他工具的兼容性

### 了解代码库

Oxc 组织为几个 crate 模块：

- **`oxc_parser`**: 高性能 JavaScript/TypeScript 解析器
- **`oxc_linter`**: 拥有 650+ 规则的快速 lint 引擎
- **`oxc_transformer`**: TypeScript 和 JSX 转换
- **`oxc_minifier`**: JavaScript 压缩（开发中）
- **`oxc_formatter`**: 代码格式化，与 Prettier 兼容

### 您的第一次贡献

1. **浏览 Issues**：查找标记为 [`good first issue`](https://github.com/oxc-project/oxc/labels/good%20first%20issue) 的问题
2. **提问**：不要犹豫，在 Discord 或 GitHub 上寻求澄清
3. **从小处着手**：从文档改进或小错误修复开始
4. **学习模式**：研究现有代码以了解我们的约定

## 社区

### 沟通渠道

- **GitHub Discussions**：用于设计讨论和提问
- **Discord**：与团队和社区的实时聊天
- **GitHub Issues**：错误报告和功能请求
- **Twitter**：关注 [@boshen_c](https://twitter.com/boshen_c) 获取更新

### 行为准则

我们致力于为大家提供友好和包容的体验。在参与之前，请阅读我们的 [行为准则](https://github.com/oxc-project/oxc?tab=coc-ov-file#readme)。

### AI 使用政策

当使用 AI 工具（包括像 ChatGPT、Claude、Copilot 等 LLM）为 Oxc 做贡献时：

- **请披露 AI 使用情况** 以减少维护者的疲劳
- **您需负责** 您提交的所有由 AI 生成的问题或 PR
- **低质量或未经审查的 AI 内容将立即被关闭**
- **提交重复低质量（"slop"）PR 的贡献者将被直接封禁，恕不事先警告。** 如果您承诺按照本政策为 Oxc 做贡献，封禁可能会被解除。您可以通过我们的 [Discord](https://discord.gg/9uXCAwqQZW) 请求解除封禁。

我们鼓励使用 AI 工具辅助开发，但在提交之前，所有贡献必须由贡献者彻底审查和测试。AI 生成的代码应被理解、验证并调整以满足 Oxc 的标准。

## 下一步

准备好贡献了吗？以下是一些很好的起点：

- 📖 **了解更多**：查看我们的 [开发指南](./development.md)
- 🔍 **查找 Issue**：浏览我们的 [good first issues](https://github.com/oxc-project/oxc/contribute)
- 💬 **加入社区**：在 [Discord](https://discord.gg/9uXCAwqQZW) 上与我们联系
- 🛠️ **选择工具**：深入了解 [解析器](./parser.md)、[linter](./linter.md)、[转换器](./transformer.md) 或 [其他工具](./formatter.md)
- ⚡️ **发起 Pull Request**：查看我们的 [PR 规则和政策](./rules.md) 以开始。

我们迫不及待地想看到您与我们一起构建什么！🚀
