---
title: "jest/prefer-snapshot-hint"
category: "Correctness"
version: "1.59.0"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jest/prefer_snapshot_hint.rs`;
</script>

<RuleHeader />

### 它的作用

强制在快照匹配器（toMatchSnapshot 和 toThrowErrorMatchingSnapshot）中包含提示字符串。

### 为什么这不好？

自动编号的快照名称很脆弱——添加或重新排序断言会使后续所有编号发生偏移，导致无关的快照看起来像是发生了变化，并在代码评审中掩盖真正的差异。

### 示例

以下是配置为 `always` 时，此规则的**错误**代码示例：

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

以下是配置为 `multi` 时，此规则的**错误**代码示例：

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

以下是配置为 `always` 时，此规则的**正确**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "版本字符串",
        stderr: "空",
      });
    });
  });

  describe("--config flag", () => {
    it("reads the config", async () => {
      const { stdout } = await runCli(["--config", "jest.config.js"]);

      expect(stdout).toMatchSnapshot({}, "stdout: 配置设置");
    });

    it("prints nothing to stderr", async () => {
      const { stderr } = await runCli(["--config", "jest.config.js"]);

      expect(stderr).toMatchInlineSnapshot();
    });

    describe("when the file does not exist", () => {
      it("throws an error", async () => {
        await expect(
          runCli(["--config", "does-not-exist.js"]),
        ).rejects.toThrowErrorMatchingSnapshot("stderr: 配置错误");
      });
    });
  });
});
```

以下是配置为 `multi` 时，此规则的**正确**代码示例：

```js
const snapshotOutput = ({ stdout, stderr }, hints) => {
  expect(stdout).toMatchSnapshot({}, `stdout: ${hints.stdout}`);
  expect(stderr).toMatchSnapshot({}, `stderr: ${hints.stderr}`);
};

describe("cli", () => {
  describe("--version flag", () => {
    it("prints the version", async () => {
      snapshotOutput(await runCli(["--version"]), {
        stdout: "版本字符串",
        stderr: "空",
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

此规则与 [eslint-plugin-vitest](https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-snapshot-hint.md) 兼容，
如需使用，请将以下配置添加到你的 `.oxlintrc.json` 中：

```json
{
  "rules": {
    "vitest/prefer-snapshot-hint": "error"
  }
}
```

## 配置

此规则接受以下字符串值之一：

### `"always"`

在使用外部快照匹配器时，要求始终提供提示。

### `"multi"`

当作用域内存在多个外部快照匹配器时（即包含嵌套调用），要求提供提示。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v1.59.0 中添加。

## 参考资料

<RuleReferences />
