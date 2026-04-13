---
title: 性能分析
outline: deep
---

# 性能分析

## 在启用调试信息的情况下以 release 模式编译 `oxlint`

为了进行性能分析，你需要在启用调试信息的情况下以 release 模式编译 `oxlint` 二进制文件。你可以通过向 `cargo build` 传递 `--profile release-with-debug` 来实现：

```bash
cargo build --profile release-with-debug --bin oxlint
```

构建完成后，二进制文件位于 `./target/release-with-debug/oxlint`。这就是应该用于性能分析的二进制文件。

## CPU - Samply

[Samply](https://github.com/mstange/samply) 是一个命令行 CPU 性能分析工具，它使用 Firefox 性能分析器作为其用户界面。适用于 macOS 和 Linux。

要将 Samply 与 `oxlint` 一起使用，运行 `samply record`，后跟 `oxlint` 命令和参数：

```bash
samply record ./target/release-with-debug/oxlint .
```

为了改善性能分析体验，你可以考虑以下一些选项：

- `oxlint`: `--silent` 将抑制诊断输出并使性能分析更聚焦。
- `oxlint`: `--threads 1` 将以单线程运行 linter，速度较慢，但更容易分析单线程性能的性能分析文件。
- `samply record`: `--rate <number>` 将以更高的速率采样性能分析文件。默认值是 1000Hz (1ms)，但增加此值将提供更详细的信息，代价是性能分析文件更大。

例如，以 0.1ms 采样率单线程运行 `oxlint`：

```bash
samply record --rate 10000 ./target/release-with-debug/oxlint --silent --threads 1 .
```

## CPU - Mac Xcode Instruments

[`cargo instruments`](https://github.com/cmyr/cargo-instruments) 是连接 Mac Xcode instruments 的首选工具。

以下说明复制了 `cargo instruments` 的过程。

首先，安装 Xcode Instruments 命令行工具：

```bash
xcode-select --install
```

然后，如果你还没有这样做，[确保 `oxlint` 二进制文件已编译](#compiling-oxlint-in-release-mode-with-debug-information)。

在底层，`cargo instruments` 调用 `xcrun xctrace` 命令，相当于

```bash
xcrun xctrace record --template 'Time Profile' --output . --launch -- /path/to/oxc/target/release-with-debug/oxlint
```

运行上述命令会产生以下输出

```
Starting recording with the Time Profiler template. Launching process: oxlint.
Ctrl-C to stop the recording
Target app exited, ending recording...
Recording completed. Saving output file...
Output file saved as: Launch_oxlint_2023-09-03_4.41.45 PM_EB179B85.trace
```

打开跟踪文件 `open Launch_oxlint_2023-09-03_4.41.45\ PM_EB179B85.trace`。

要查看自上而下的跟踪：

1. 在顶部面板上，点击 CPUs
2. 在左侧输入框中，点击 `x` 然后选择 `Time Profiler`
3. 在底部面板上，点击 "Call Tree"，打开 "Invert Call Tree" 并关闭按线程分离。

对于内存和磁盘操作，使用 `--template 'Allocations'` 和 `--template 'File Activity'`。

对于更详细的 CPU 性能分析，例如 L1/L2 缓存未命中、周期和指令计数以及分支预测信息，你需要使用自定义的 "CPU Counters" 模板：

1. 打开 Instruments 并选择 "CPU Counters" 模板。
2. 在 "CPU Counters" 设置中：
   1. 打开 "High Frequency Sampling" 选项。
   2. 在 "High Frequency Sampling" 选项下方，点击加号图标并选择一个事件类型。一些建议的事件类型：
      - Cycles - 用于大致了解每个函数花费了多少 CPU 周期。
      - Instructions - 用于大致了解每个函数执行了多少 CPU 指令以及花费了多少周期
      - `L1D_CACHE_MISS_LD` - 从内存加载数据时的 L1 缓存未命中计数
3. 一旦你启用了感兴趣的事件，在 "File > Save as Template ..." 中保存模板并给它一个名称。
4. 现在你可以将此与 `xctrace` 一起使用，方法是将模板名称传递给 `--template` 选项：`xcrun xctrace record --template 'My Custom CPU Counters' --output . --launch -- /path/to/oxc/target/release-with-debug/oxlint`

## 堆分配 - dhat

[dhat](https://docs.rs/dhat/latest/dhat) 是一个堆性能分析工具，可以帮助识别内存泄漏和分析堆分配模式。

### 设置

将 dhat 作为依赖项添加到你的 `Cargo.toml`：

```toml
[dependencies]
dhat = "0.3"
```

然后在你的二进制 crate 顶部添加一个全局分配器：

```rust
#[global_allocator]
static ALLOC: dhat::Alloc = dhat::Alloc;
```

### 性能分析

在你想要分析的作用域中创建一个分析器。分析器将跟踪从创建到丢弃期间的分配：

```rust
fn main() {
    let _profiler = dhat::Profiler::new_heap();
    // 你的代码在这里 - 所有堆分配都将被跟踪
}
```

你也可以将 `_profiler` 添加到任何函数中，以仅跟踪该特定函数的内存：

```rust
fn my_function() {
    let _profiler = dhat::Profiler::new_heap();
    // 仅在此函数作用域内的分配将被跟踪
}
```

当分析器被丢弃时，它将自动生成一个 `dhat-heap.json` 文件。

### 加载和读取性能分析文件

运行你的程序后，一个 `dhat-heap.json` 文件将在你的工作目录中创建。

要分析性能分析文件：

1. 在 https://nnethercote.github.io/dh_view/dh_view.html 打开 dhat 查看器
2. 加载 `dhat-heap.json` 文件
3. 在 "Sort metrics" 中选择一个指标以分析内存使用的不同方面：
   - **"At t-gmax (bytes)"**: 显示内存使用峰值时的分配。用于识别当程序达到最大堆大小时什么消耗了最多内存。
   - **"At t-end (bytes)"**: 显示在分析器销毁之前未丢弃的内存。这对于识别内存泄漏特别有用，因为它揭示了在分析作用域结束时仍然存在的分配。
   - **"Total (bytes)"**: 显示整个执行过程中分配的总字节数。用于识别代码的哪些部分执行了最多的分配，即使内存后来被释放。

### 高级：控制分析器生命周期

为了更好地控制性能分析何时停止，你可以显式管理分析器的生命周期。例如，仅分析核心逻辑并排除清理：

```rust
struct MyApp {
    profiler: Option<dhat::Profiler>,
    // 其他字段
}

impl MyApp {
    fn close(&mut self) {
        // 在此处丢弃分析器以捕获清理前的堆状态
        self.profiler = None;
        // 清理代码
    }
}
```

此模式有助于识别在程序执行的特定时刻哪些数据结构正在持有内存。
