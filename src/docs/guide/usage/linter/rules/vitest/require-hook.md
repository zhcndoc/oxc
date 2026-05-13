---
title: "vitest/require-hook | Oxlint"
rule: "vitest/require-hook"
category: "Style"
version: "0.3.2"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/require_hook.rs`;
</script>

<RuleHeader />

### 作用

此规则会标记测试文件顶层或直接位于 `describe` 函数体内的任何表达式，_但不包括_ 以下内容：

- `import` 语句
- `const` 变量
- `let` _声明_，以及初始化为 `null` 或 `undefined` 的赋值
- 类
- 类型
- 对标准 Jest 全局对象的调用

### 为什么这不好？

将初始化和清理代码放在 hooks 之外可能会导致不可预测的测试行为。在顶层运行的代码会在测试文件加载时执行，而不是在测试运行时执行，这可能会导致测试隔离问题，并使测试依赖于执行顺序。使用 `beforeEach`、`beforeAll`、`afterEach` 和 `afterAll` 等适当的 hooks 可确保初始化和清理代码在正确的时间运行，并保持测试隔离。

### 示例

以下是此规则的**错误**代码示例：

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");

const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
};

const clearCityDatabase = () => {
  database.clear();
};

initializeCityDatabase();

test("that persists cities", () => {
  expect(database.cities.length).toHaveLength(3);
});
test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

describe("when loading cities from the api", () => {
  let consoleWarnSpy = jest.spyOn(console, "warn");
  loadCities.mockResolvedValue(["Wellington", "London"]);

  it("does not duplicate cities", async () => {
    await database.loadCities();
    expect(database.cities).toHaveLength(4);
  });
});
clearCityDatabase();
```

以下是此规则的**正确**代码示例：

```javascript
import { database, isCity } from "../database";
import { Logger } from "../../../src/Logger";
import { loadCities } from "../api";

jest.mock("../api");
const initializeCityDatabase = () => {
  database.addCity("Vienna");
  database.addCity("San Juan");
  database.addCity("Wellington");
};

const clearCityDatabase = () => {
  database.clear();
};

beforeEach(() => {
  initializeCityDatabase();
});

test("that persists cities", () => {
  expect(database.cities.length).toHaveLength(3);
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

describe("when loading cities from the api", () => {
  let consoleWarnSpy;
  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, "warn");
    loadCities.mockResolvedValue(["Wellington", "London"]);
  });

  it("does not duplicate cities", async () => {
    await database.loadCities();
    expect(database.cities).toHaveLength(4);
  });
});
afterEach(() => {
  clearCityDatabase();
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### allowedFunctionCalls

type: `string[]`

default: `[]`

允许在 hooks 之外调用的函数名数组。

## 使用方法

<RuleHowToUse />

## 版本

此规则于 v0.3.2 中添加。

## 参考资料

<RuleReferences />
