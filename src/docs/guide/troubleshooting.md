# 故障排除

## 找不到原生绑定。npm 有一个与可选依赖相关的 bug

这是一个 npm (< v11.3.0) 的 bug，你可以尝试以下方法：

- 使用最新版的 npm
- 使用 pnpm
- `rm -rf node_modules; npm i`
- 在你的 package.json 中显式安装以下绑定之一，因为包管理器没有识别到可选依赖：

```
@{app}/binding-win32-x64-msvc
@{app}/binding-win32-arm64-msvc
@{app}/binding-linux-x64-gnu
@{app}/binding-linux-x64-musl
@{app}/binding-freebsd-x64
@{app}/binding-linux-arm64-gnu
@{app}/binding-linux-arm64-musl
@{app}/binding-linux-arm-gnueabihf
@{app}/binding-linux-arm-musleabihf
@{app}/binding-linux-s390x-gnu
@{app}/binding-linux-riscv64-gnu
@{app}/binding-darwin-x64
@{app}/binding-darwin-arm64
@{app}/binding-android-arm64
@{app}/binding-wasm32-wasi
```

其中 app 是 `oxlint`、`oxfmt`、`oxc-parser`、`oxc-transform`、`oxc-minify`、`oxc-resolver`
