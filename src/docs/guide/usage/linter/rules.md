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

::: details 规则类别

类别按意图对规则进行分组，并且可以在配置中一起启用。详情请参见 [使用类别启用规则组](/docs/guide/usage/linter/config.html#enable-groups-of-rules-with-categories)。

:::

::: details “可修复？”列图例

- 🛠️：此规则提供自动修复
- 💡：此规则提供建议
- ⚠️🛠️：此规则提供危险的自动修复
- ⚠️💡：此规则提供危险的建议
- 🚧：可能提供自动修复或建议，但当前尚未实现

:::

---

<RulesTable />
