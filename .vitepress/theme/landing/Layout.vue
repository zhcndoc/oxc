<script setup>
import { sponsors } from "./sponsors";

import Hero from "./Hero.vue";
// import TrustedBy from '@components/oss/TrustedBy.vue'
import HeadingSection from "@voidzero-dev/vitepress-theme/src/components/oss/HeadingSection.vue";
import FeatureToolbar from "./FeatureToolbar.vue";
import FeatureLinter from "./FeatureLinter.vue";
import FeatureFormatter from "./FeatureFormatter.vue";
import FeatureParser from "./FeatureParser.vue";
import FeatureResolver from "./FeatureResolver.vue";
import FeatureTransformer from "./FeatureTransformer.vue";
import FeatureMinifier from "./FeatureMinifier.vue";
import Sponsors from "@voidzero-dev/vitepress-theme/src/components/oss/Sponsors.vue";
import Footer from "@voidzero-dev/vitepress-theme/src/components/oss/Footer.vue";
</script>

<template>
  <Hero />
  <!-- 'shopify' requires public/trusted-by/shopify.svg -->
  <!-- <TrustedBy :logos="['shopify', 'airbnb', 'atlassian']" /> -->
  <HeadingSection heading="现代 JavaScript 工具链的基础" />
  <section id="features">
    <FeatureToolbar />
    <FeatureLinter />
    <FeatureFormatter />
    <FeatureParser />
    <FeatureTransformer />
    <FeatureResolver />
    <FeatureMinifier />
  </section>
  <Sponsors
    description="Oxc 是自由开源项目，由慷慨的赞助者共同支持。"
    sponsorLink="/sponsor"
    :sponsors="sponsors"
    :side-by-side-tiers="['青铜赞助商', '支持者']"
    logo-style="opencollective"
  />
  <Footer
    heading="探索 Oxc 生态"
    subheading="以极快速度完成 JavaScript 的检查、格式化、解析、压缩、转换和模块解析"
    button-text="开始使用"
    button-link="/docs/guide/introduction"
  />
</template>
