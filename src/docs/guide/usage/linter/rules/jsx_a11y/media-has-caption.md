---
title: "jsx-a11y/media-has-caption | Oxlint"
rule: "jsx-a11y/media-has-caption"
category: "正确性"
version: "0.1.1"
default: false
type_aware: false
fix: "none"
upstream: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/jsx_a11y/media_has_caption.rs`;
</script>

<RuleHeader />

### 作用

检查 `<audio>` 和 `<video>` 元素是否包含用于字幕的 `<track>` 元素。
这可确保媒体内容对所有用户都是可访问的，包括听力受损者。

### 为什么这不好？

如果没有字幕，音频和视频内容对聋人或听力不佳的用户就不可访问。
字幕对于身处嘈杂环境或无法使用音频的用户也很有用。

### 示例

此规则的**错误**代码示例：

```jsx
<audio></audio>
<video></video>
```

此规则的**正确**代码示例：

```jsx
<audio><track kind="captions" src="caption_file.vtt" /></audio>
<video><track kind="captions" src="caption_file.vtt" /></video>
```

## 配置

此规则接受一个包含以下属性的配置对象：

### audio

type: `string[]`

default: `["audio"]`

要视为 `<audio>` 元素的元素名称

### track

type: `string[]`

default: `["track"]`

要视为 `<track>` 元素的元素名称

### video

type: `string[]`

default: `["video"]`

要视为 `<video>` 元素的元素名称

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.1.1 中添加。

## 参考资料

<RuleReferences />
