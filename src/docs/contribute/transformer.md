---
title: 转换器
outline: deep
---

# 转换器

Oxc 转换器负责将较高版本的 ECMAScript 和 TypeScript 转换为可在旧版浏览器和环境中运行的较低版本。

### 仓库结构

```
crates/oxc_transformer/
├── src/
│   ├── lib.rs                    # 主转换器接口
│   ├── transformer.rs            # 核心转换逻辑
│   ├── typescript/               # TypeScript 转换
│   ├── jsx/                      # JSX 转换
│   ├── es2015/                   # ES2015+ 转换
│   ├── isolated_declarations/    # .d.ts 生成
│   └── helpers/                  # 工具函数
├── tests/                        # 集成测试
├── examples/                     # 使用示例
└── benches/                      # 性能基准测试
```
