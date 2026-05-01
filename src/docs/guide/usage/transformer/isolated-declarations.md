# 隔离声明输出

Oxc transformer 支持在启用 [isolated declarations](https://www.typescriptlang.org/tsconfig/#isolatedDeclarations) 的项目中，且无需使用 TypeScript 编译器即可输出 TypeScript 声明。

## 示例

**输入**：

```ts
export function foo(a: number, b: string): number {
  return a + Number(b);
}

export enum Bar {
  a,
  b,
}
```

**输出**：

```ts
export declare function foo(a: number, b: string): number;
export declare enum Bar {
  a = 0,
  b = 1,
}
```

## 用法

```ts
import { isolatedDeclaration } from "oxc-transform";

const result = await isolatedDeclaration("lib.ts", sourceCode, {
  sourcemap: false,
  stripInternal: false,
});

console.log(result.code); // .d.ts 内容
console.log(result.map); // 源映射（如果启用了 sourcemap）
console.log(result.errors); // 解析和转换错误
```

还提供一个同步版本 `isolatedDeclarationSync`，其签名相同。
