---
title: "jsdoc/check-tag-names | Oxlint"
rule: "jsdoc/check-tag-names"
category: "正确性"
version: "0.3.2"
default: false
type_aware: false
fix: "pending"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsdoc/check_tag_names.rs`;
</script>

<RuleHeader />

### 它的作用

报告无效的块标签名。
此外，在使用 TypeScript 等类型检查器时，还会检查那些多余的标签名。

### 这为什么不好？

使用无效标签会导致混淆，并使文档更难阅读。

### 示例

以下是此规则的**错误**代码示例：

```javascript
/** @Param */
/** @foo */

/**
 * 当使用类型时，这里是多余的。
 * @type {string}
 */
```

以下是此规则的**正确**代码示例：

```javascript
/** @param */
```

### 设置

允许的标签通过 [`settings.jsdoc.tagNamePreference`](/docs/guide/usage/linter/config-file-reference.html#settings-jsdoc-tagnamepreference) 进行配置。
此规则没有仅限 CLI 的参数。

你可以通过添加一个键值对来添加自定义标签，其中键和值都与要添加的标签名称匹配，如下所示：

::: code-group

```json [Config (.oxlintrc.json)]
{
  "plugins": ["jsdoc"],
  "rules": {
    "jsdoc/check-tag-names": "error"
  },
  "settings": {
    // [!code highlight:7]
    "jsdoc": {
      "tagNamePreference": {
        "customTagName": "customTagName"
      }
    }
  }
}
```

:::

在上述配置下，添加 `customTagName` 标签时，此规则的正确代码示例如下：

```js
/**
 * @customTagName
 */
```

## 配置

此规则接受一个包含以下属性的配置对象：

### definedTags

type: `string[]`

default: `[]`

允许的额外标签名。

### jsxTags

type: `boolean`

default: `false`

是否允许与 JSX 相关的标签：

- `jsx`
- `jsxFrag`
- `jsxImportSource`
- `jsxRuntime`

### typed

type: `boolean`

default: `false`

如果 `typed` 为 `true`，则不允许那些不必要或与 TypeScript 功能重复的标签。

## 如何使用

<RuleHowToUse />

## 版本

此规则在 v0.3.2 中添加。

## 参考资料

<RuleReferences />
