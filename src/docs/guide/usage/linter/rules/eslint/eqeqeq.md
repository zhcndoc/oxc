---
title: "eslint/eqeqeq | Oxlint"
rule: "eslint/eqeqeq"
category: "Pedantic"
version: "0.0.3"
default: false
type_aware: false
fix: "conditional_dangerous_fix"
upstream: "https://eslint.org/docs/latest/rules/eqeqeq"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。不要手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/eslint/eqeqeq.rs`;
</script>

<RuleHeader />

### Purpose

Require the use of `===` and `!==` operators, and disallow `==` and `!=`.

### Why is this bad?

Using non-strict equality operators can lead to unexpected behavior due to type coercion, causing hard-to-find bugs.

### Examples

JSON configuration example:

```json
{
  "eqeqeq": ["error", "always", { "null": "ignore" }]
}
```

#### `"always"` (default)

Incorrect code examples for this rule:

```js
/* eqeqeq: "error" */

if (x == 42) {
}
if ("" == text) {
}
if (obj.getStuff() != undefined) {
}
```

Correct code examples for this rule:

```js
/* eqeqeq: "error" */

if (x === 42) {
}
if ("" === text) {
}
if (obj.getStuff() !== undefined) {
}
```

#### `"smart"`

With the `"smart"` option, incorrect code examples for this rule:

```js
/* eqeqeq: ["error", "smart"] */

if (x == 42) {
}
if ("" == text) {
}
```

With the `"smart"` option, correct code examples for this rule:

```js
/* eqeqeq: ["error", "smart"] */

if (typeof foo == "undefined") {
}
if (foo == null) {
}
if (foo != null) {
}
```

#### `{"null": "ignore"}`（when the first option is `"always"`）

With the `{ "null": "ignore" }` option, incorrect code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "ignore" }] */
if (x == 42) {
}
if ("" == text) {
}
```

With the `{ "null": "ignore" }` option, correct code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "ignore" }] */
if (foo == null) {
}
if (foo != null) {
}
```

#### `{"null": "always"}`（default - when the first option is `"always"`）

With the `{ "null": "always" }` option, incorrect code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "always" }] */

if (foo == null) {
}
if (foo != null) {
}
```

With the `{ "null": "always" }` option, correct code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "always" }] */

if (foo === null) {
}
if (foo !== null) {
}
```

#### `{"null": "never"}`（when the first option is `"always"`）

With the `{ "null": "never" }` option, incorrect code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "never" }] */

if (x == 42) {
}
if ("" == text) {
}
if (foo === null) {
}
if (foo !== null) {
}
```

With the `{ "null": "never" }` option, correct code examples for this rule:

```js
/* eqeqeq: ["error", "always", { "null": "never" }] */

if (x === 42) {
}
if ("" === text) {
}
if (foo == null) {
}
if (foo != null) {
}
```

## Configuration

### 1st option

Type: `"always" | "smart"`

#### `"always"`

Always require triple-equals comparisons, `===`/`!==`.
This is the default.

#### `"smart"`

Allow some safe comparisons to use `==`/`!=` (`typeof`, literals, nullish values).

### 2nd option

This option is an object containing the following properties:

#### null

Type: `"always" | "never" | "ignore"`

Configuration for whether comparisons with `null` are allowed/forbidden,
for example `foo == null` or `foo != null`

##### `"always"`

Always require triple-equals when comparing with null, `=== null`/`!== null`.
This is the default.

##### `"never"`

Never require triple-equals when comparing with null; always use `== null`/`!= null`.

##### `"ignore"`

Ignore null comparisons and allow either `== null`/`!= null` or `=== null`/`!== null`.

## How to use

<RuleHowToUse />

## Version

This rule was added in v0.0.3.

## References

<RuleReferences />
