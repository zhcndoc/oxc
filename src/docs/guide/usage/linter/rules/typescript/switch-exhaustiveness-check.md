---
title: "typescript/switch-exhaustiveness-check | Oxlint"
rule: "typescript/switch-exhaustiveness-check"
category: "Pedantic"
version: "1.12.0"
default: false
type_aware: true
fix: "conditional_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/typescript/switch_exhaustiveness_check.rs`;
const tsgolintSource = `https://github.com/oxc-project/tsgolint/blob/main/internal/rules/switch_exhaustiveness_check/switch_exhaustiveness_check.go`;
</script>

<RuleHeader />

### 作用

此规则要求在对联合类型进行 switch 判断时，switch 语句必须穷尽所有分支。

### 为什么这不好？

当对联合类型进行 switch 判断时，处理所有可能的情况非常重要，以避免运行时错误。TypeScript 可以帮助确保穷尽性，但前提是 switch 语句结构正确，并带有一个可供 TypeScript 分析的 default 分支。

### 示例

此规则的**错误**代码示例：

```ts
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "等待审批";
    case "approved":
      return "请求已批准";
    // 缺少 'rejected' 分支
  }
}

enum Color {
  Red,
  Green,
  Blue,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "红色";
    case Color.Green:
      return "绿色";
    // 缺少 Color.Blue 分支
  }
}
```

此规则的**正确**代码示例：

```ts
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "等待审批";
    case "approved":
      return "请求已批准";
    case "rejected":
      return "请求已拒绝";
  }
}

// 或者使用 default 分支进行穷尽性检查
function handleStatusWithDefault(status: Status) {
  switch (status) {
    case "pending":
      return "等待审批";
    case "approved":
      return "请求已批准";
    case "rejected":
      return "请求已拒绝";
    default:
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
}

enum Color {
  Red,
  Green,
  Blue,
}

function getColorName(color: Color) {
  switch (color) {
    case Color.Red:
      return "红色";
    case Color.Green:
      return "绿色";
    case Color.Blue:
      return "蓝色";
    default:
      const _exhaustiveCheck: never = color;
      return _exhaustiveCheck;
  }
}
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowDefaultCaseForExhaustiveSwitch

type: `boolean`

default: `true`

是否允许在非穷尽的 switch 中使用 default 分支。
当为 false 时，要求 switch 语句必须穷尽所有分支且不能有 default 分支。

### considerDefaultExhaustiveForUnions

type: `boolean`

default: `false`

是否将 `default` 分支视为联合类型的穷尽分支。
当为 true 时，带有 `default` 分支的 switch 语句会被视为穷尽，
即使并未显式处理所有联合成员。

### defaultCaseCommentPattern

type: `string`

当 default 分支注释匹配到该正则表达式模式时，
将抑制穷尽性检查。
例如：`"@skip-exhaustive-check"` 允许 `default: // @skip-exhaustive-check`

### requireDefaultForNonUnion

type: `boolean`

default: `false`

是否要求对非穷尽的联合类型 switch 使用 default 分支。
当为 true 时，针对非穷尽联合类型的 switch 必须包含 default 分支。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.12.0 中添加。

## 参考

<RuleReferences />
