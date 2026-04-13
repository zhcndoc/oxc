<template>
  <section id="feature-linter" class="wrapper grid md:grid-cols-2">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-center gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">代码检查</span>
        <h4 class="text-white">Oxlint：兼容 ESLint 的代码检查器</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          在问题进入生产环境之前提前拦截
        </p>
        <ul class="checkmark-list">
          <li>
            比 <code class="mx-1 outline-none bg-nickel/50 text-aqua">ESLint</code> 快 50~100 倍
          </li>
          <li>700+ 条规则，并持续增长</li>
          <li>
            由
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">tsgo</code>
            提供支持的真正类型感知检查
          </li>
          <li>支持 <code class="mx-1 outline-none bg-nickel/50 text-aqua">ESLint</code> JS 插件</li>
        </ul>
        <a href="/docs/guide/usage/linter" class="button w-fit mt-6">使用指南</a>
      </div>
    </div>
    <div class="flex flex-col">
      <div
        class="card-bg h-full overflow-clip flex justify-end items-center py-20 px-5 md:pl-10 md:pr-0"
      >
        <img
          loading="lazy"
          src="@assets/oxc/oxc-linter-terminal.png"
          alt="代码检查器"
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
