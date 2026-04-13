---
title: Oxc Minifier Alpha 版
outline: deep
authors:
  - boshen
---

<AppBlogPostHeader />

<br />

我们很高兴宣布 [`oxc-minify`](https://npmx.dev/package/oxc-minify) 的 Alpha 版本发布。

虽然缺少一些高级压缩技术，
但当前版本在性能和压缩大小方面已经优于 `esbuild`，
正如 [minification-benchmarks](https://github.com/privatenumber/minification-benchmarks) 所示。

在 `typescript.js` 上对比广泛使用的压缩器：

<div align="center">

| 产物                                                                                                                            |                        原始大小 |                         Gzip 大小 |                                   |
| :------------------------------------------------------------------------------------------------------------------------------ | ------------------------------: | --------------------------------: | --------------------------------: |
| [typescript v4.9.5](https://npmx.dev/package/typescript/v/4.9.5) ([源码](https://unpkg.com/typescript@4.9.5/lib/typescript.js)) |                      `10.95 MB` |                         `1.88 MB` |                                   |
| **压缩器**                                                                                                                      |                  **压缩后大小** |               **Gzip 压缩后大小** |                          **时间** |
| [@swc/core](packages/minifiers/minifiers/swc.ts)                                                                                | **<sup>🏆-70% </sup>`3.32 MB`** | **<sup>🏆-54% </sup>`858.29 kB`** |        <sup>_5x_ </sup>`2,179 ms` |
| [oxc-minify](packages/minifiers/minifiers/oxc-minify.ts)                                                                        |       <sup>-69% </sup>`3.35 MB` |       <sup>-54% </sup>`860.67 kB` |                       🏆 `444 ms` |
| [terser (不压缩)](packages/minifiers/minifiers/terser.ts)                                                                       |       <sup>-68% </sup>`3.53 MB` |       <sup>-53% </sup>`879.30 kB` |       <sup>_14x_ </sup>`6,433 ms` |
| [esbuild](packages/minifiers/minifiers/esbuild.ts)                                                                              |       <sup>-68% </sup>`3.49 MB` |       <sup>-51% </sup>`915.55 kB` |          <sup>_1x_ </sup>`492 ms` |
| [terser](packages/minifiers/minifiers/terser.ts) <sub title="失败：超时">❌ 超时</sub>                                          |                               - |                                 - | <sup>:warning:</sup> `+10,000 ms` |

</div>

## [`oxc-minify`](https://npmx.dev/package/oxc-minify) 使用示例

```typescript
import { minify } from "oxc-minify";

const filename = "test.js";
const code = "const x = 'a' + 'b'; console.log(x);";
const options = {
  compress: {
    target: "esnext",
  },
  mangle: {
    toplevel: false,
  },
  codegen: {
    removeWhitespace: true,
  },
  sourcemap: true,
};
const result = minify(filename, code, options);

console.log(result.code);
console.log(result.map);
```

## 下一步发布计划

`oxc-minify` 正在被集成到 [Rolldown](https://rolldown.rs) 中作为其内置压缩器，
而 Rolldown 注定要 [成为 Vite 的未来](https://voidzero.dev/posts/announcing-voidzero-inc)。

因此，对我们来说至关重要的一点是：

- 继续实现高级压缩技术，例如常量内联和死代码消除。
- 加强和扩展我们的测试基础设施，以确保其准备好投入生产使用。

## 致谢

感谢 [@sapphi-red](https://github.com/sapphi-red) 改进了压缩器，
尤其是 `esbuild` 所缺乏的高级符号压缩算法。
