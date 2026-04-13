<script setup>
import RiveAnimation from "@voidzero-dev/vitepress-theme/src/components/shared/RiveAnimation.vue";
import minifierAnimation from "@voidzero-dev/vitepress-theme/src/assets/oxc/animations/560_x_260_minifier.riv";
</script>

<template>
  <section id="feature-minifier" class="wrapper border-t grid md:grid-cols-2">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-center gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide"
          >压缩器 <span class="text-aqua">（Alpha）</span></span
        >
        <h4 class="text-white">oxc-minify</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">压缩并优化</p>
        <ul class="checkmark-list">
          <li>死代码消除</li>
          <li>语法缩短与空白移除</li>
          <li>变量名混淆</li>
        </ul>
        <a href="/docs/guide/usage/minifier" class="button w-fit mt-6">使用指南</a>
      </div>
    </div>
    <div class="flex flex-col py-10">
      <RiveAnimation
        :desktop-src="minifierAnimation"
        :desktop-width="560"
        :desktop-height="260"
        canvas-class="w-full"
      />
    </div>
  </section>
</template>
