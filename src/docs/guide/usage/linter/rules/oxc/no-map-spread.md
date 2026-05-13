---
title: "oxc/no-map-spread | Oxlint"
rule: "oxc/no-map-spread"
category: "Perf"
version: "0.11.0"
default: false
type_aware: false
fix: "conditional_safe_fix_or_suggestion"
---

<!-- 此文件由 tasks/website_linter/src/rules/doc_page.rs 自动生成。请勿手动编辑。 -->

<script setup>
import { data } from '../version.data.js';
const source = `https://github.com/oxc-project/oxc/blob/${ data }/crates/oxc_linter/src/rules/oxc/no_map_spread.rs`;
</script>

<RuleHeader />

### 它的作用

禁止在
[`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
和
[`Array.prototype.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
中使用对象或数组展开语法来为数组项添加属性/元素。

此规则只会尝试报告使用展开运算符合并对象或数组的情况，而不会报告仅用于复制它们的情况。

### 为什么这不好？

展开语法常用于向数组中的对象添加属性，或将多个对象组合在一起。不幸的是，展开会为新对象触发一次重新分配，并带来 `O(n)` 的内存拷贝。

```ts
// `scores` 中的每个对象都会被浅拷贝。由于 `scores` 从未
// 被复用，因此展开是低效的。
function getDisplayData() {
  const scores: Array<{ username: string; score: number }> = getScores();
  const displayData = scores.map((score) => ({ ...score, rank: getRank(score) }));
  return displayData;
}
```

除非你预期映射后的数组中的对象之后还会被修改，否则最好使用 [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。

```ts
// `score` 会在原地被修改，因此性能更好。
function getDisplayData() {
  const scores: Array<{ username: string; score: number }> = getScores();
  const displayData = scores.map((score) => Object.assign(score, { rank: getRank(score) }));
  return displayData;
}
```

### 防止被修改

在 `map` 调用中展开对象有一些合理的使用场景，特别是当你希望返回数组的使用者能够修改它们而不影响原始数据时。此规则会尽最大努力避免报告这些情况。

类实例属性上的展开会被完全忽略：

```ts
class AuthorsDb {
  #authors = [];
  public getAuthorsWithBooks() {
    return this.#authors.map((author) => ({
      // 防止被修改，为被调用方提供作者对象自身的
      // 深度（近似）副本。
      ...author,
      books: getBooks(author),
    }));
  }
}
```

默认情况下，在 `map` 调用之后又被重新读取的数组上的展开也会被忽略。可以使用 `ignoreRereads` 选项来配置此行为。

```
/* "oxc/no-map-spread": ["error", { "ignoreRereads": true }] */
const scores = getScores();
const displayData = scores.map(score => ({ ...score, rank: getRank(score) }));
console.log(scores); // 在 map 调用后重新读取了 `scores`
```

#### 数组

对于数组展开，尽可能应使用
[`Array.prototype.concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
或
[`Array.prototype.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)。
它们与数组展开的语义略有不同，因为展开适用于可迭代对象，而 `concat`
和 `push` 只适用于数组。

```ts
let arr = [1, 2, 3];
let set = new Set([4]);

let a = [...arr, ...set]; // [1, 2, 3, 4]
let b = arr.concat(set); // [1, 2, 3, Set(1)]

// 这种替代方案比展开更高性能，但语义仍然相同。
// 不过，它更为冗长。
let c = arr.concat(Array.from(set)); // [1, 2, 3, 4]

// 你也可以使用 `Symbol.isConcatSpreadable`
set[Symbol.isConcatSpreadable] = true;
let d = arr.concat(set); // [1, 2, 3, 4]
```

### 自动修复

此规则可以自动修复由对象展开引起的违规，但不会修复数组。对象展开将被替换为
[`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。未来可能会添加数组修复。

只有包含单个元素（展开项）的对象表达式不会被修复。

```js
arr.map((x) => ({ ...x })); // 不修复
```

当展开之前存在“普通”元素时，可以使用 `fix`（通过 `--fix`）。由于 `Object.apply` 会修改第一个参数，并且这些元素会在新对象中创建，因此展开标识符不会被修改。实际上，展开语义得以保留

```js
// before
arr.map(({ x, y }) => ({ x, ...y }));

// after
arr.map(({ x, y }) => Object.assign({ x }, y));
```

当展开是对象中的第一个属性时，会提供一个建议（通过 `--fix-suggestions`）。此修复会修改展开标识符，这意味着它可能会带来意外的副作用。

```js
// before
arr.map(({ x, y }) => ({ ...x, y }));
arr.map(({ x, y }) => ({ ...x, y }));

// after
arr.map(({ x, y }) => Object.assign(x, { y }));
arr.map(({ x, y }) => Object.assign(x, y));
```

### 示例

此规则的**错误**代码示例如下：

```js
const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
const arr2 = arr.map((obj) => ({ ...obj, b: obj.a * 2 }));
```

此规则的**正确**代码示例如下：

```ts
const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
arr.map((obj) => Object.assign(obj, { b: obj.a * 2 }));

// 实例属性会被忽略
class UsersDb {
  #users = [];
  public get users() {
    // 克隆 `users`，为调用方提供其自身的深度（近似）副本。
    return this.#users.map((user) => ({ ...user }));
  }
}
```

```tsx
function UsersTable({ users }) {
  const usersWithRoles = users.map((user) => ({ ...user, role: getRole(user) }));

  return (
    <table>
      {usersWithRoles.map((user) => (
        <tr>
          <td>{user.name}</td>
          <td>{user.role}</td>
        </tr>
      ))}
      <tfoot>
        <tr>
          {/* 重新读取 `users` */}
          <td>用户总数：{users.length}</td>
        </tr>
      </tfoot>
    </table>
  );
}
```

### 参考

- [ECMA262 - 对象展开求值语义](https://262.ecma-international.org/15.0/index.html#sec-runtime-semantics-propertydefinitionevaluation)
- [JSPerf - `concat` 与数组展开的性能对比](https://jsperf.app/pihevu)

## 配置

此规则接受一个包含以下属性的配置对象：

### ignoreArgs

type: `boolean`

default: `true`

忽略传递给函数作为参数的数组上的 map。

默认启用此选项，以更好地避免误报。代价是可能会漏掉一些低效的展开。
我们建议在你的 `.oxlintrc.json` 文件中关闭此选项。

#### 示例

当 `ignoreArgs` 为 `true` 时，此规则的**错误**代码示例如下：

```ts
/* "oxc/no-map-spread": ["error", { "ignoreArgs": true }] */
function foo(arr) {
  let arr2 = arr.filter((x) => x.a > 0);
  return arr2.map((x) => ({ ...x }));
}
```

当 `ignoreArgs` 为 `true` 时，此规则的**正确**代码示例如下：

```ts
/* "oxc/no-map-spread": ["error", { "ignoreArgs": true }] */
function foo(arr) {
  return arr.map((x) => ({ ...x }));
}
```

### ignoreRereads

type: `boolean`

default: `true`

忽略在 `map` 调用之后又被重新读取的映射数组。

被复用的数组可能依赖浅拷贝行为来避免修改。
在这些情况下，`Object.assign` 实际上并不会比展开更高性能。

## 如何使用

<RuleHowToUse />

## 版本

此规则于 v0.11.0 中添加。

## 参考

<RuleReferences />
