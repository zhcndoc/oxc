---
title: "规则 | Oxlint"
editLink: false
---

<script setup>
import rules from '@data/rules.json' with { type: 'json' };

const hasFix = (fix) => {
  if (fix === "none" || fix === "pending") {
    return false;
  }
  return true;
}

const rulesCount = rules.length;
const defaultCount = rules.filter((r) => r.default).length;
const fixableCount = rules.filter((r) => hasFix(r.fix)).length;
</script>

# 规则

所有规则实现的进度在 [此处](https://github.com/oxc-project/oxc/issues/481) 跟踪。

- 规则总数：{{ rulesCount }}
- 默认启用的规则：{{ defaultCount }}
- 提供修复的规则：{{ fixableCount }}

::: details '可修复？' 列图例

- 🛠️: 此规则提供自动修复
- 💡: 此规则提供建议
- ⚠️🛠️: 此规则提供危险的自动修复
- ⚠️💡: 此规则提供危险的建议
- 🚧: 可能提供自动修复或建议，但当前尚未实现

:::

---

<RulesTable />
