---
search: false
---

这些选项可以为每个工作区文件夹分别定义。
选项中的文件引用（例如 `configPath`、`tsConfigPath`）会相对于工作区文件夹进行解析。

它们可以由客户端在 `initialize` 或 `workspace/didChangeConfiguration` 请求中发送。
如果客户端支持 `workspace/configuration`，服务器将向客户端请求这些选项。

`initialize` 请求示例：

```json
{
  "processId": 123,
  "rootUri": null,
  "workspaceFolders": [],
  "capabilities": {},
  "initializationOptions": [
    {
      "workspaceUri": "file:///home/user/project",
      "options": {
        "unusedDisableDirectives": "deny",
        "typeAware": true
      }
    }
  ]
}
```

`workspace/didChangeConfiguration` 请求示例：

```json
{
  "settings": [
    {
      "workspaceUri": "file:///home/user/project",
      "options": {
        "unusedDisableDirectives": "deny",
        "disableNestedConfig": true
      }
    }
  ]
}
```

## configPath

类型：`string`

配置文件的路径。类似于 `--config` CLI 选项。
如果设置了该项，则会禁用对配置文件的搜索。

## disableNestedConfig

类型：`boolean`

是否禁用嵌套配置支持。类似于 `--disable-nested-config` CLI 选项。
当设置了 `configPath` 时，它会自动启用。

## fixKind

类型：`"safe_fix" | "safe_fix_or_suggestion" | "dangerous_fix" | "dangerous_fix_or_suggestion" | "none" | "all"`

为代码操作生成哪类修复。

## rulesCustomization

类型：`Record<string, object>`

针对单个规则的自定义，允许覆盖 linter 的诊断和自动修复。
例如将 `"no-unused-vars"` 规则的严重程度降低为 `"hint"`，并为其禁用自动修复：

```json
{
  "rulesCustomization": {
    "no-unused-vars": {
      "severity": "hint",
      "autofix": false
    }
  }
}
```

## run

类型：`"onSave" | "onType"`

如果你的编辑器不支持 `textDocument/diagnostic`，
此选项用于处理何时将诊断发送给客户端。

## tsConfigPath

类型：`string`

tsconfig 文件的路径。类似于 `--tsconfig` CLI 选项。
如果设置了该项，则会禁用对 tsconfig 文件的自动发现。

## typeAware

类型：`boolean`

是否启用/禁用类型感知的 linting。
如果设置了该项，它将覆盖根配置中的 `typeAware` 选项。

## unusedDisableDirectives

类型：`"allow" | "warn" | "deny"`

如何处理未使用的禁用指令。默认情况下，它们被允许并忽略。
