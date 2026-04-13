---
layout: page
title: 认识团队
sidebar: false
aside: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from '@voidzero-dev/vitepress-theme'
import { CORE_TEAM_MEMBERS, CONSULTANTS, EMERITI } from '@constants/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>认识团队</template>
  </VPTeamPageTitle>

<VPTeamMembers :members="CORE_TEAM_MEMBERS" />

<VPTeamPageSection>
    <template #title>顾问</template>
    <template #members>
      <VPTeamMembers size="small" :members="CONSULTANTS" />
    </template>
  </VPTeamPageSection>

<VPTeamPageSection>
    <template #title>荣誉成员</template>
    <template #members>
      <VPTeamMembers size="small" :members="EMERITI" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
