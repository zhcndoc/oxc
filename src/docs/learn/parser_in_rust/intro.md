---
title: 简介
outline: deep
---

# 简介

我们正处于 [JavaScript 的第三时代](https://www.swyx.io/js-third-age/)，
目前的普遍趋势是使用 Rust 或 Go 来编写 JavaScript 工具，以获得性能提升。

但编写 JavaScript 工具本身就具有挑战性，更不用说用 Rust 编写了。
我在学习这些技术时遇到了很多困难，
我希望更少的人经历同样艰难的旅程。

我想通过编写这份指南为社区做出自己的贡献，
这样你就不必经历我曾经走过的同样的旅程。

Rust 阵营中的开发者屈指可数，我希望在这里见到你并加入我们，
这样我们就可以为所有人构建更好、更快的工具。

## 概述

在本指南中，将应用标准的编译器前端阶段：

```
Source Text --> Lexer --> Token --> Parser --> AST
```

编写 JavaScript 解析器相当容易，
它 10% 在于架构决策，90% 在于对细粒度细节的艰苦工作。

架构决策主要影响两类方面：

- 我们解析器的性能
- 消费我们的 AST 有多友好

在 Rust 中构建解析器之前了解所有的选项和权衡，将使我们的整个旅程更加顺畅。

## 性能

高性能 Rust 程序的关键在于 **分配更少的内存** 和 **使用更少的 CPU 周期**。

内存分配的位置大多是透明的，只需查找堆分配对象，如 `Vec`、`Box` 或 `String`。
分析它们的用法会让我们对程序的速度有个概念——分配得越多，程序就越慢。

Rust 赋予了我们零成本抽象的能力，我们不需要太担心抽象导致性能变慢。
注意我们的算法复杂度，我们就没问题了。

:::info
你还应该阅读 [Rust 性能手册](https://nnethercote.github.io/perf-book/introduction.html)。
:::

## Rust 源代码

每当无法推断函数调用的性能时，
不要害怕点击 Rust 文档上的 "source" 按钮并阅读源代码，
它们大多数时候都很容易理解。

:::info
在浏览 Rust 源代码时，搜索定义仅仅是查找
`fn function_name`, `struct struct_name`, `enum enum_name`, 等。
这是在 Rust 中拥有固定语法的一个优势（相比于 JavaScript 😉）。
:::
