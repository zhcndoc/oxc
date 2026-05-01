---
title: "vitest/max-nested-describe"
category: "样式"
version: "0.4.4"
default: false
type_aware: false
fix: "none"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/vitest/max_nested_describe.rs`;
</script>

<RuleHeader />

### 作用

此规则会限制嵌套 `describe()` 调用的最大深度。

### 为什么这不好？

过深地嵌套 `describe()` 块会使测试套件难以阅读和理解。

### 示例

以下模式会被视为警告（默认选项为
`{ "max": 5 } `）：

以下是此规则的**错误**代码示例：

```javascript
describe("foo", () => {
  describe("bar", () => {
    describe("baz", () => {
      describe("qux", () => {
        describe("quxx", () => {
          describe("too many", () => {
            it("should get something", () => {
              expect(getSomething()).toBe("Something");
            });
          });
        });
      });
    });
  });
});

describe("foo", function () {
  describe("bar", function () {
    describe("baz", function () {
      describe("qux", function () {
        describe("quxx", function () {
          describe("too many", function () {
            it("should get something", () => {
              expect(getSomething()).toBe("Something");
            });
          });
        });
      });
    });
  });
});
```

以下是此规则的**正确**代码示例：

```ts
describe("foo", () => {
  describe("bar", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
  describe("qux", () => {
    it("should get something", () => {
      expect(getSomething()).toBe("Something");
    });
  });
});

describe("foo2", function () {
  it("should get something", () => {
    expect(getSomething()).toBe("Something");
  });
});

describe("foo", function () {
  describe("bar", function () {
    describe("baz", function () {
      describe("qux", function () {
        describe("this is the limit", function () {
          it("should get something", () => {
            expect(getSomething()).toBe("Something");
          });
        });
      });
    });
  });
});
```

## 配置

此规则接受一个包含以下属性的配置对象：

### max

type: `integer`

default: `5`

允许的嵌套 describe 调用最大深度。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.4.4 中加入。

## 参考资料

<RuleReferences />
