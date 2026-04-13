<template>
  <section id="feature-resolver" class="wrapper border-t grid md:grid-cols-2">
    <div class="px-5 py-6 md:p-10 flex flex-col justify-center gap-15">
      <div class="flex flex-col gap-5">
        <span class="text-grey text-xs font-mono uppercase tracking-wide">模块解析</span>
        <h4 class="text-white">oxc-resolver</h4>
        <p class="text-white/70 text-base max-w-[25rem] text-pretty">
          兼容 Node.js 的 CJS 与 ESM 模块解析
        </p>
        <ul class="checkmark-list">
          <li>
            行为与
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">enhanced-resolve</code>
            保持一致
          </li>
          <li>
            比
            <code class="mx-1 outline-none bg-nickel/50 text-aqua">enhanced-resolve</code>
            快 28 倍
          </li>
          <li>高度可定制</li>
        </ul>
        <a href="/docs/guide/usage/resolver" class="button w-fit mt-6">使用指南</a>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="h-full overflow-clip flex justify-end items-center py-16 px-5 md:px-10">
        <img
          loading="lazy"
          src="@assets/oxc/oxc-resolver-terminal.png"
          alt="模块解析"
          class="w-full md:w-auto"
        />
      </div>
    </div>
  </section>
</template>
