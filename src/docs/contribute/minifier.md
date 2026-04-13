---
title: 压缩器
outline: deep
---

# 压缩器

JavaScript 压缩在优化网站性能方面起着至关重要的作用，因为它减少了发送给用户的数据量，
从而实现了更快的页面加载速度。
这具有巨大的经济价值，特别是对于电子商务网站而言，每一秒都可能相当于数百万美元。

然而，现有的压缩器通常需要在压缩质量和速度之间做出权衡。
你必须在压缩效果最好但速度最慢，和速度最快但压缩效果较差之间做出选择。
但是，如果我们能开发出一个在不牺牲压缩效果的情况下更快的压缩器呢？

## 项目目标

我们正积极致力于实现这一目标的原型开发，
方法是从知名的压缩器（如 [google-closure-compiler]、[terser]、[esbuild] 和 [tdewolff-minify]）移植所有测试用例。

初步结果表明，我们正朝着目标稳步前进。
使用 Oxc 压缩器，你可以期待更快的压缩时间，同时不牺牲压缩质量。

### 目标性能

- **速度**：比 Terser 更快，与 esbuild 相当
- **压缩率**：达到或超过 Terser 的压缩率
- **正确性**：通过所有主要压缩器测试套件

## 架构概述

### 设计原则

Oxc 压缩器围绕以下几个关键原则构建：

1. **语义感知**：利用语义分析实现安全优化
2. **增量式**：专为增量编译工作流设计
3. **可配置**：支持各种优化级别和目标
4. **正确性**：优先考虑正确性而非激进优化

## 当前状态

### 已实现功能

- ✅ **死代码消除**：移除无法到达的代码
- ✅ **常量折叠**：评估常量表达式
- ✅ **摇树优化**：移除未使用的导出（基础）
- ✅ **变量合并**：合并变量声明
- ✅ **语句合并**：合并兼容的语句
- ✅ **名称混淆**：缩短变量和函数名
- ✅ **控制流优化**：简化控制结构
- ✅ **函数内联**：内联小型函数
- ✅ **高级摇树优化**：跨模块优化

### 性能优化

保持性能的关键策略：

1. **最小化 AST 遍历**：在单次遍历中结合多种优化
2. **高效数据结构**：使用区域分配和紧凑表示
3. **早期终止**：当无法获得收益时跳过优化

## 资源

### 文档

- [压缩器 API 文档](https://docs.rs/oxc_minifier)

### 外部参考

- [Google Closure Compiler 优化](https://github.com/google/closure-compiler/wiki/JS-Modules)
- [Terser 选项](https://github.com/terser/terser#minify-options)
- [esbuild 压缩](https://esbuild.github.io/api/#minification)

#### 在线 Playground

- esbuild: https://esbuild.github.io/try
- rollup: https://rollupjs.org/repl
- swc: https://play.swc.rs
- terser: https://try.terser.org
- closure compiler: https://jscompressor.treblereel.dev
  - 官方网站已不再可用：[Closure Compiler Webservice Turndown - 2025](https://github.com/google/closure-compiler/issues/4199)

[google-closure-compiler]: https://github.com/google/closure-compiler
[terser]: https://github.com/terser/terser
[esbuild]: https://github.com/evanw/esbuild
[tdewolff-minify]: https://github.com/tdewolff/minify
