import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HeadConfig } from "vitepress";
import type { MarkdownEnv, UserConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import { ruleHowToUseMdPlugin } from "../plugins/ruleHowToUse";
import llmstxt from "vitepress-plugin-llms";
import BLOG_SIDEBAR from "../sidebar.blog.json" with { type: "json" };

type AsyncMarkdownRenderer = {
  renderAsync(src: string, env?: MarkdownEnv): Promise<string>;
};

const latestBlog = BLOG_SIDEBAR[0];
const bannerScript = `(() => {
  const saved = localStorage.getItem("oxc-banner-dismissed-${latestBlog.link}");
  if (saved === "true") {
    document.documentElement.classList.add("banner-dismissed");
  }
})();`;

const head: HeadConfig[] = [
  [
    "link",
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/logo-without-border.svg",
    },
  ],
  [
    "script",
    {
      src: "https://www.zhcndoc.com/js/common.js",
      defer: "",
    },
  ],
  // Open Graph
  ["meta", { property: "og:site_name", content: "Oxc" }],
  [
    "meta",
    {
      property: "og:image",
      content: "https://oxc.rs/og.jpg",
    },
  ],
  // Twitter (X)
  ["meta", { name: "twitter:site", content: "Oxc" }],
  ["meta", { name: "twitter:card", content: "summary_large_image" }],
  [
    "meta",
    {
      name: "twitter:image",
      content: "https://oxc.rs/og.jpg",
    },
  ],
  // banner
  ["script", {}, bannerScript],
  // Fathom Analytics
  [
    "script",
    {
      src: "https://cdn.usefathom.com/script.js",
      "data-site": "XPSGWNDW",
      "data-spa": "auto",
      defer: "",
    },
  ],
];

if (process.env.NODE_ENV === "production" && process.env.REDIRECT) {
  head.unshift(["meta", { "http-equiv": "refresh", content: "0; URL=https://oxc.rs" }]);
}

export const sharedConfig = {
  srcDir: "src",
  srcExclude: [],
  outDir: "build",
  base: "/",
  head,
  lastUpdated: false,
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];

    if (pageData.frontmatter.canonical) {
      pageData.frontmatter.head.push([
        "link",
        {
          rel: "canonical",
          href: pageData.frontmatter.canonical,
        },
      ]);
    }

    // Add page-specific Open Graph and Twitter meta tags
    const title = pageData.frontmatter.title || pageData.title;
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      "A collection of high-performance JavaScript tools written in Rust";

    // Construct the canonical URL for the page
    let url = "https://oxc.rs";
    if (pageData.relativePath !== "index.md") {
      const path = pageData.relativePath.replace(/\.md$/, ".html").replace(/\/index\.html$/, "/");
      if (path !== "index.html") {
        url += "/" + path.replace(/^\/+/, "");
      }
    }

    if (title) {
      pageData.frontmatter.head.push(["meta", { property: "og:title", content: title }]);
      pageData.frontmatter.head.push(["meta", { name: "twitter:title", content: title }]);
    }

    if (description) {
      pageData.frontmatter.head.push([
        "meta",
        { property: "og:description", content: description },
      ]);
      pageData.frontmatter.head.push([
        "meta",
        { name: "twitter:description", content: description },
      ]);
    }

    pageData.frontmatter.head.push(["meta", { property: "og:url", content: url }]);
  },
  themeConfig: {
    variant: "oxc",

    // TEMPORARY CHANGE TO VITE+ ALPHA ANNOUNCEMENT
    // banner: {
    //   id: latestBlog.link,
    //   text: `Announcing ${latestBlog.text}`,
    //   url: latestBlog.link,
    // },
    banner: {
      id: "rainyun",
      text: "雨云 RainYun - 企业级云计算服务提供商：新用户注册立享五折！",
      url: "https://www.rainyun.com/mm_?s=zhcndoc",
    },

    siteTitle: "Oxc 中文文档",
    logo: "https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets/round.svg",
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "搜索",
          },
          modal: {
            displayDetails: "显示详细列表",
            resetButtonTitle: "重置搜索",
            backButtonTitle: "关闭搜索",
            noResultsText: "没有结果：",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "回车",
              navigateText: "导航",
              navigateUpKeyAriaLabel: "上箭头",
              navigateDownKeyAriaLabel: "下箭头",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc",
            },
          },
        },
        async _render(src: string, env: MarkdownEnv, md: AsyncMarkdownRenderer) {
          let html = await md.renderAsync(src, env);
          // Filter out pages with `search: false` in the frontmatter.
          if (env.frontmatter?.search === false) {
            return "";
          }

          // Always prefer `frontmatter.title` as the H1 in the search index when set,
          // so the breadcrumb reflects the canonical page title (including product context).
          if (env.frontmatter?.title) {
            const title = (env.frontmatter as any).title;
            // Pages without a markdown H1 (e.g., auto-generated rule pages): inject one.
            if (!env.title) {
              return (await md.renderAsync(`# ${title}`)) + html;
            }
            // Pages with their own H1: replace it in the indexed source so the
            // search section title comes from frontmatter.title.
            const prepared = src.replace(/^# .+$/m, `# ${title}`);
            return await md.renderAsync(prepared, env);
          }
          return html;
        },
      },
    },
    socialLinks: [
      { icon: "x", link: "https://x.com/OxcProject" },
      { icon: "bluesky", link: "https://bsky.app/profile/boshen.github.io" },
      { icon: "discord", link: "https://discord.gg/9uXCAwqQZW" },
      { icon: "github", link: "https://github.com/oxc-project/oxc" },
    ],
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "full",
      },
    },
    outline: {
      label: "目录",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    editLink: {
      text: "在 GitHub 上编辑此页",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} VoidZero Inc. and Oxc contributors.`,
      nav: [
        {
          title: "Oxc",
          items: [
            { text: "指南", link: "/docs/guide/introduction" },
            { text: "学习", link: "/docs/learn/parser_in_rust/intro" },
            { text: "参与贡献", link: "/docs/contribute/introduction" },
            { text: "Playground", link: "https://playground.oxc.rs" },
            { text: "赞助", link: "/sponsor" },
          ],
        },
        {
          title: "工具",
          items: [
            { text: "代码检查器", link: "/docs/guide/usage/linter" },
            { text: "格式化器", link: "/docs/guide/usage/formatter" },
            { text: "解析器", link: "/docs/guide/usage/parser" },
            { text: "转换器", link: "/docs/guide/usage/transformer" },
            { text: "压缩器", link: "/docs/guide/usage/minifier" },
            { text: "模块解析器", link: "/docs/guide/usage/resolver" },
          ],
        },
        {
          title: "资源",
          items: [
            { text: "博客", link: BLOG_SIDEBAR[0].link },
            { text: "团队", link: "/team" },
          ],
        },
        /*{
          title: "Legal",
          items: [
            { text: "Terms & Conditions", link: "https://voidzero.dev/terms" },
            { text: "Privacy Policy", link: "https://voidzero.dev/privacy" },
            { text: "Cookie Policy", link: "https://voidzero.dev/cookies" },
          ],
        },*/
      ],
      social: [
        { icon: "github", link: "https://github.com/oxc-project/oxc" },
        { icon: "discord", link: "https://discord.gg/9uXCAwqQZW" },
        { icon: "x", link: "https://x.com/OxcProject" },
        { icon: "bluesky", link: "https://bsky.app/profile/boshen.github.io" },
      ],
    },
  },
  markdown: {
    config(md) {
      md.use(ruleHowToUseMdPlugin);
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    publicDir: resolve(dirname(fileURLToPath(import.meta.url)), "../../public"),
    build: {
      chunkSizeWarningLimit: 3000,
    },
    optimizeDeps: {
      exclude: ["@docsearch/css"],
    },
    plugins: [groupIconVitePlugin(), llmstxt()],
    resolve: {
      alias: [
        {
          find: "@constants",
          replacement: resolve(dirname(fileURLToPath(import.meta.url)), "../theme/constants"),
        },
        {
          find: "@data",
          replacement: resolve(dirname(fileURLToPath(import.meta.url)), "../data"),
        },
      ],
    },
  },
} as UserConfig;
