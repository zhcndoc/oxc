---
title: PR 规则与政策
outline: deep
---

# PR 规则与政策

## PR 规则

- 我们 [倾向于较小的 PR](https://graphite.dev/blog/how-large-prs-slow-down-development)。
- 如果您有写入权限，请尝试使用 [graphite](https://graphite.dev) 进行堆叠式 PR，当您贡献较多时将会获得该权限。
- 如果 PR 包含架构变更，请创建 issue 或 discussion。

## 开发政策

- 拥抱面向数据的设计。
- 保持 API 简单且文档完善。
- 如果实现来自另一个项目，请始终提供来源参考。

### 性能

- 本项目中所有性能问题均被视为 bug，这包括所有运行时和编译性能问题。
  - 遵循 [Rust 性能书籍](https://nnethercote.github.io/perf-book/introduction.html) 中的指导。
  - 尽量减少使用 `regex` crate。使用 Rust 迭代器和字符串方法以获得更好的性能。
- 必须最小化编译时间，以减少对开发工作流和下游工具的影响。
  - 尽量减少第三方依赖，以减少编译耗时并降低项目复杂度。
  - 避免使用重型宏、泛型或任何会减慢编译或增加二进制大小的 Rust 技术。
  - 我们的 [CI 运行](https://github.com/oxc-project/oxc/actions/workflows/ci.yml?query=branch%3Amain) 在 3 分钟内完成，任何回归都需要修复。

## 维护政策

- 监控代码覆盖率以发现未使用的代码。目标是 99% 的代码覆盖率。
- 积极监控并致力于减少 CI 时间以加快 PR 合并速度。目前 GitHub Actions 上的 CI 时间约为 3 分钟。
- 文档优先 - 文档应作为事实来源。保持文档更新并分享链接，而不是反复回答相同的问题。参见 GitLab 的 [手册优先](https://handbook.gitlab.com/handbook/company/culture/all-remote/handbook-first) 方法。
- 一致的导入顺序：“最远”到“最近”。
  - `std`
  - 外部 crate
  - Oxc crate
  - 本地 crate (`crate`)
  - `super`
  - `mod`

## 约定式提交

我们遵循 [约定式提交](https://www.conventionalcommits.org/en/v1.0.0/)：

提交包含以下结构元素，以向使用者传达意图：

- `fix`: 类型为 fix 的提交修补了代码库中的 bug。
- `feat`: 类型为 feat 的提交向代码库引入了新功能。
- BREAKING CHANGE: 在类型/范围后附加 `!`，引入破坏性 API 变更，例如 `feat(parser)!: new feature`。
- 范围是 crate 名称。
- 类型包括 `feat:`, `fix:`, `chore:`, `ci:`, `docs:`, `style:`, `refactor:`, `perf:` 和 `test:`。

## 行动政策

摘自 [Astral 的价值观](https://astral-sh.notion.site/Astral-s-Values-0ed6a642bcc84e91af6836b2373572f5)：

> 我们倾向于行动，即使面对不确定性。我们偏爱 _务实的去做_ 而不是 **漫长的辩论**；我们偏爱请求 _原谅_ 而不是 _许可_。我们重视 **果断——尤其是** 当决定不明确时，以及 **尤其是** 当决定可逆时。
>
> 倾向于行动 _不_ 等同于鲁莽。相反，它倾向于做出 _负责任的_ 决定并 _紧急_ 付诸行动，即使我们仍留有挥之不去的模糊性或已知的未知数。
