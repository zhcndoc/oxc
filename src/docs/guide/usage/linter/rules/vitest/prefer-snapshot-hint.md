---
title: "vitest/prefer-snapshot-hint | Oxlint"
rule: "vitest/prefer-snapshot-hint"
category: "Correctness"
version: "1.59.0"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-snapshot-hint.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/prefer_snapshot_hint.rs`;
</script>

<RuleHeader />

### 它的作用

强制在快照匹配器（`toMatchSnapshot` 和 `toThrowErrorMatchingSnapshot`）中包含提示字符串。

### 为什么这很糟糕？

自动编号的快照名称很脆弱——添加或重新排序断言会导致后续所有编号发生偏移，使无关的快照看起来像是发生了变化，并在代码审查中掩盖真正的差异。

### 示例

以下是此规则配置为 `always` 时的**错误**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }) => {
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]));
    });
  });

  describe("--config flag", () => {
    it("reads the config", async () => {
      const { stdout, parsedConfig } = await runCli(["--config", "jest.config.js"]);

      expect(stdout).toMatchSnapshot();
      expect(parsedConfig).toMatchSnapshot();
    });

    it("prints nothing to stderr", async () => {
      const { stderr } = await runCli(["--config", "jest.config.js"]);

      expect(stderr).toMatchSnapshot();
    });

    describe("when the file does not exist", () => {
      it("throws an error", async () => {
        await expect(
          runCli(["--config", "does-not-exist.js"]),
        ).rejects.toThrowErrorMatchingSnapshot();
      });
    });
  });
});
```

以下是此规则配置为 `multi` 时的**错误**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }) => {
  expect(stdout).toMatchSnapshot();
  expect(stderr).toMatchSnapshot();
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]));
    });
  });

  describe("--config flag", () => {
    it("reads the config", async () => {
      const { stdout, parsedConfig } = await runCli(["--config", "jest.config.js"]);

      expect(stdout).toMatchSnapshot();
      expect(parsedConfig).toMatchSnapshot();
    });

    it("prints nothing to stderr", async () => {
      const { stderr } = await runCli(["--config", "jest.config.js"]);

      expect(stderr).toMatchSnapshot();
    });
  });
});
```

以下是此规则配置为 `always` 时的**正确**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "version string",
        stderr: "empty",
      });
    });
  });

  describe("--config flag", () => {
    it("reads the config", async () => {
      const { stdout } = await runCli(["--config", "jest.config.js"]);

      expect(stdout).toMatchSnapshot({}, "stdout: config settings");
    });

    it("prints nothing to stderr", async () => {
      const { stderr } = await runCli(["--config", "jest.config.js"]);

      expect(stderr).toMatchInlineSnapshot();
    });

    describe("when the file does not exist", () => {
      it("throws an error", async () => {
        await expect(
          runCli(["--config", "does-not-exist.js"]),
        ).rejects.toThrowErrorMatchingSnapshot("stderr: config error");
      });
    });
  });
});
```

以下是此规则配置为 `multi` 时的**正确**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "version string",
        stderr: "empty",
      });
    });
  });

  describe("--config flag", () => {
    it("reads the config", async () => {
      const { stdout } = await runCli(["--config", "jest.config.js"]);

      expect(stdout).toMatchSnapshot();
    });

    it("prints nothing to stderr", async () => {
      const { stderr } = await runCli(["--config", "jest.config.js"]);

      expect(stderr).toMatchInlineSnapshot();
    });

    describe("when the file does not exist", () => {
      it("throws an error", async () => {
        await expect(
          runCli(["--config", "does-not-exist.js"]),
        ).rejects.toThrowErrorMatchingSnapshot();
      });
    });
  });
});
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

在使用外部快照匹配器时，要求始终提供提示。

### `"multi"`

当作用域内有多个外部快照匹配器时，要求提供提示（这意味着它包括嵌套调用）。

## 如何使用

<RuleHowToUse />

## 版本

此规则是在 v1.59.0 中添加的。

## 参考资料

<RuleReferences />
