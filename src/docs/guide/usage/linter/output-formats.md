---
title: "输出格式 | Oxlint"
description: 以多种格式输出 lint 结果，便于 CI 或人工查看
---

# 输出格式

Oxlint 支持多种用于输出 lint 结果的格式。这些格式可用于与各种 CI 系统或其他工具集成。

在从 CLI 运行 Oxlint 时，您可以使用 `--format`（或 `-f`）选项指定所需的格式。

## 可用格式

### `--format=default`

如果未指定任何格式，这是默认的输出格式。

```
  x eslint(no-debugger): `debugger` 语句不允许
    ╭─[test.js:5:1]
  4 │
  5 │ debugger;
    · ─────────
  6 │
    ╰────
  help: 移除 debugger 语句

Found 0 warnings and 1 error.
Finished in 6ms on 1 file with 2 rules using 1 threads.
```

### `--format=agent`

输出一种简洁的格式，供 AI 代理及类似工具使用。

```
test.js:5:1: error eslint(no-debugger): `debugger` 语句不允许 help: 移除 debugger 语句
test.js:1:10: warning eslint(no-unused-vars): 函数 'foo' 已声明但从未使用。 help: 考虑移除此声明。
test.js:1:17: warning eslint(no-unused-vars): 参数 'b' 已声明但从未使用。未使用的参数应以 '_' 开头。 help: 考虑移除此参数。
```

### `--format=checkstyle`

输出 Checkstyle XML 格式，可被某些 CI 工具解析。

```xml
<?xml version="1.0" encoding="utf-8"?>
<checkstyle version="4.3">
  <file name="test.js">
    <error line="5" column="1" severity="error" message="`debugger` 语句不允许" source="eslint(no-debugger)" />
  </file>
</checkstyle>
```

### `--format=github`

此格式旨在与 GitHub Actions 和 GitHub 的 [注释功能](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands#setting-an-error-message) 配合使用。

```
::error file=test.js,line=5,endLine=5,col=1,endColumn=10,title=eslint(no-debugger)::`debugger` 语句不允许
```

如果 Oxlint 检测到其运行在 GitHub Actions 环境中，将默认启用此格式；你可以在 CI 配置中通过提供不同的 `--format` 选项来覆盖此行为。

### `--format=gitlab`

此格式旨在与 GitLab CI 和 [GitLab 的代码质量功能](https://docs.gitlab.com/ci/testing/code_quality/#code-quality-report-format) 配合使用。

```json
[
  {
    "description": "`debugger` 语句不允许",
    "check_name": "eslint(no-debugger)",
    "fingerprint": "9333a3278325994",
    "severity": "critical",
    "location": {
      "path": "test.js",
      "lines": {
        "begin": 5,
        "end": 5
      }
    }
  }
]
```

### `--format=json`

一种通用的 JSON 输出格式，也可与 `--rules` 配合使用，以 JSON 格式获取所有 Oxlint 规则的列表。

```json
{
  "diagnostics": [
    {
      "message": "`debugger` 语句不允许",
      "code": "eslint(no-debugger)",
      "severity": "error",
      "causes": [],
      "url": "https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger.html",
      "help": "移除 debugger 语句",
      "filename": "test.js",
      "labels": [
        {
          "span": {
            "offset": 38,
            "length": 9,
            "line": 5,
            "column": 1
          }
        }
      ],
      "related": []
    }
  ],
  "number_of_files": 1,
  "number_of_rules": 2,
  "threads_count": 1,
  "start_time": 0.018611917
}
```

### `--format=junit`

输出 JUnit XML 格式，适用于支持 JUnit 报告的 CI 系统，例如 [GitLab CI](https://docs.gitlab.com/ci/testing/unit_test_reports/#junit-xml-format-specification) 或 [Bitbucket Pipelines](https://support.atlassian.com/bitbucket-cloud/docs/test-reporting-in-pipelines/)。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Oxlint" tests="1" failures="0" errors="1">
  <testsuite name="test.js" tests="1" disabled="0" errors="1" failures="0">
    <testcase name="eslint(no-debugger)">
      <error message="`debugger` 语句不允许">第 5 行，第 1 列，`debugger` 语句不允许</error>
    </testcase>
  </testsuite>
</testsuites>
```

### `--format=sarif`

输出 [SARIF](https://sarifweb.azurewebsites.net/) v2.1.0 格式，这是一种标准化格式，可被各种代码扫描工具接收，包括 [GitHub Code Scanning](https://docs.github.com/en/code-security/concepts/code-scanning/sarif-files)、[GitLab](https://docs.gitlab.com/user/application_security/detect/sarif/) 和 [SonarQube](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/importing-external-issues/importing-issues-from-sarif-reports)。

```json
{
  "version": "2.1.0",
  "$schema": "https://docs.oasis-open.org/sarif/sarif/v2.1.0/errata01/os/schemas/sarif-schema-2.1.0.json",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "oxlint",
          "version": "1.66.0",
          "semanticVersion": "1.66.0",
          "informationUri": "https://oxc.rs/docs/guide/usage/linter.html",
          "rules": [
            {
              "id": "eslint(no-debugger)",
              "name": "no-debugger",
              "helpUri": "https://oxc.rs/docs/guide/usage/linter/rules/eslint/no-debugger.html",
              "properties": {
                "category": "correctness",
                "plugin": "eslint",
                "fix": "fixable_suggestion"
              }
            }
          ]
        }
      },
      "artifacts": [
        {
          "location": {
            "uri": "test.js"
          }
        }
      ],
      "results": [
        {
          "ruleId": "eslint(no-debugger)",
          "ruleIndex": 0,
          "level": "error",
          "message": {
            "text": "`debugger` 语句不允许"
          },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "test.js",
                  "index": 0
                },
                "region": {
                  "startLine": 5,
                  "startColumn": 1,
                  "endLine": 5,
                  "endColumn": 10
                }
              }
            }
          ]
        }
      ],
      "columnKind": "unicodeCodePoints"
    }
  ]
}
```

### `--format=stylish`

Stylish 是 ESLint 的默认输出格式，适用于紧凑的人类可读输出。

```
test.js
5:1   error `debugger` 语句不允许  eslint(no-debugger)

✖ 1 problem (1 error, 0 warnings)
```

### `--format=unix`

一种基本的单行格式。

```
test.js:5:1: `debugger` 语句不允许 [Error/eslint(no-debugger)]

1 problem
```
