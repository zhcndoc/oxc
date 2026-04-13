<template>
  <section id="feature-transformer" class="wrapper border-t grid md:grid-cols-2">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-center gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">转换器</span>
        <h4 class="text-white">oxc-transform</h4>
        <p class="text-white/70 text-base max-w-100 text-pretty">以接近思维的速度转换源代码</p>
        <ul class="checkmark-list">
          <li>
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">TypeScript</code> &
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">JSX</code>
          </li>
          <li>语法降级到 ES2015</li>
          <li>独立声明 DTS 输出</li>
          <li>React Fast Refresh、styled-components 等</li>
        </ul>
        <a href="/docs/guide/usage/transformer" class="button w-fit mt-6">使用指南</a>
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="card-bg h-full overflow-clip flex justify-end items-center py-5 md:py-10 px-5 md:px-25"
      >
        <img
          loading="lazy"
          src="@assets/oxc/oxc-transformer-terminal.png"
          alt="转换器"
          class="w-full md:w-auto"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-bg {
  background-image: url("@assets/oxc/oxc-feature-background.jpg");
  background-size: cover;
  background-position: center;
}
</style>
