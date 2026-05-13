import BLOG_SIDEBAR from "../sidebar.blog.json" with { type: "json" };
import { defineLocaleConfig } from "./utils";

const TITLE = "Oxc 中文文档";
const DESCRIPTION = "使用 Rust 编写的高性能 JavaScript 工具集";

export const enConfig = defineLocaleConfig("root", {
  label: "简体中文",
  lang: "zh-CN",
  title: TITLE,
  titleTemplate: `:title - ${TITLE}`,
  description: DESCRIPTION,
  themeConfig: {
    nav: [
      { text: "指南", link: "/docs/guide/introduction" },
      {
        text: "工具",
        items: [
          { text: "代码检查器（Oxlint）", link: "/docs/guide/usage/linter" },
          { text: "格式化器（Oxfmt）", link: "/docs/guide/usage/formatter" },
          { text: "解析器", link: "/docs/guide/usage/parser" },
          { text: "转换器", link: "/docs/guide/usage/transformer" },
          { text: "压缩器", link: "/docs/guide/usage/minifier" },
          { text: "模块解析器", link: "/docs/guide/usage/resolver" },
        ],
      },
      { text: "参与贡献", link: "/docs/contribute/introduction" },
      {
        text: "Playground",
        target: "_blank",
        link: "https://playground.oxc.rs",
      },
      { text: "赞助", link: "/sponsor" },
      {
        text: "资源",
        items: [
          { text: "发布博客", link: BLOG_SIDEBAR[0].link },
          { text: "兼容性", link: "/compatibility" },
          { text: "认可", link: "/endorsements" },
          { text: "学习", link: "/docs/learn/parser_in_rust/intro" },
          { text: "团队", link: "/team" },
          { text: "版本发布", link: "https://github.com/oxc-project/oxc/releases" },
          { text: "网站 GitHub", link: "https://github.com/oxc-project/website" },
        ],
      },
    ],
    sidebar: {
      "/docs/guide/": [
        {
          text: "简介",
          collapsed: false,
          items: [
            { text: "什么是 Oxc？", link: "/docs/guide/what-is-oxc" },
            { text: "快速开始", link: "/docs/guide/introduction" },
          ],
        },
        {
          text: "Oxlint",
          collapsed: true,
          link: "/docs/guide/usage/linter",
          items: [
            { text: "概览", link: "/docs/guide/usage/linter" },
            {
              text: "配置与集成",
              items: [
                { text: "快速上手", link: "/docs/guide/usage/linter/quickstart" },
                { text: "配置", link: "/docs/guide/usage/linter/config" },
                { text: "编辑器设置", link: "/docs/guide/usage/linter/editors" },
                { text: "CI 与其他设置", link: "/docs/guide/usage/linter/ci" },
                {
                  text: "嵌套配置",
                  link: "/docs/guide/usage/linter/nested-config",
                },
              ],
            },
            {
              text: "功能",
              items: [
                { text: "内置插件", link: "/docs/guide/usage/linter/plugins" },
                { text: "自动修复", link: "/docs/guide/usage/linter/automatic-fixes" },
                { text: "忽略文件", link: "/docs/guide/usage/linter/ignore-files" },
                {
                  text: "行内忽略注释",
                  link: "/docs/guide/usage/linter/ignore-comments",
                },
                {
                  text: "多文件分析",
                  link: "/docs/guide/usage/linter/multi-file-analysis",
                },
                {
                  text: "输出格式",
                  link: "/docs/guide/usage/linter/output-formats",
                },
                { text: "类型感知检查", link: "/docs/guide/usage/linter/type-aware" },
                { text: "JS 插件", link: "/docs/guide/usage/linter/js-plugins" },
                { text: "编写 JS 插件", link: "/docs/guide/usage/linter/writing-js-plugins" },
              ],
            },
            {
              text: "迁移",
              items: [
                { text: "从 ESLint 迁移", link: "/docs/guide/usage/linter/migrate-from-eslint" },
                // { text: "From Biome", link: "/docs/guide/usage/linter/migrate-from-biome" },
              ],
            },
            {
              text: "参考",
              items: [
                { text: "规则参考", link: "/docs/guide/usage/linter/rules" },
                { text: "CLI 参考", link: "/docs/guide/usage/linter/cli" },
                {
                  text: "配置文件参考",
                  link: "/docs/guide/usage/linter/config-file-reference",
                },
                {
                  text: "LSP 配置参考",
                  link: "/docs/guide/usage/linter/lsp-config-reference",
                },
                { text: "版本管理", link: "/docs/guide/usage/linter/versioning" },
              ],
            },
          ],
        },
        {
          text: "Oxfmt",
          collapsed: true,
          link: "/docs/guide/usage/formatter",
          items: [
            {
              text: "概览",
              link: "/docs/guide/usage/formatter",
            },
            {
              text: "配置与集成",
              items: [
                {
                  text: "快速上手",
                  link: "/docs/guide/usage/formatter/quickstart",
                },
                {
                  text: "配置",
                  link: "/docs/guide/usage/formatter/config",
                },
                { text: "编辑器设置", link: "/docs/guide/usage/formatter/editors" },
                { text: "CI 与其他设置", link: "/docs/guide/usage/formatter/ci" },
              ],
            },
            {
              text: "功能",
              items: [
                {
                  text: "忽略文件",
                  link: "/docs/guide/usage/formatter/ignore-files",
                },
                {
                  text: "行内忽略注释",
                  link: "/docs/guide/usage/formatter/ignore-comments",
                },
                {
                  text: "排序",
                  link: "/docs/guide/usage/formatter/sorting",
                },
                {
                  text: "嵌入式格式化",
                  link: "/docs/guide/usage/formatter/embedded-formatting",
                },
              ],
            },
            {
              text: "迁移",
              items: [
                {
                  text: "从 Prettier 迁移",
                  link: "/docs/guide/usage/formatter/migrate-from-prettier",
                },
              ],
            },
            {
              text: "参考",
              items: [
                {
                  text: "CLI 参考",
                  link: "/docs/guide/usage/formatter/cli",
                },
                {
                  text: "配置文件参考",
                  link: "/docs/guide/usage/formatter/config-file-reference",
                },
                {
                  text: "不支持的特性",
                  link: "/docs/guide/usage/formatter/unsupported-features",
                },
              ],
            },
          ],
        },
        {
          text: "解析器",
          collapsed: true,
          link: "/docs/guide/usage/parser",
          items: [{ text: "概览", link: "/docs/guide/usage/parser" }],
        },
        {
          text: "转换器",
          collapsed: true,
          link: "/docs/guide/usage/transformer",
          items: [
            { text: "概览", link: "/docs/guide/usage/transformer" },
            {
              text: "降级转换",
              link: "/docs/guide/usage/transformer/lowering",
            },
            {
              text: "TypeScript",
              link: "/docs/guide/usage/transformer/typescript",
            },
            {
              text: "JSX",
              link: "/docs/guide/usage/transformer/jsx",
            },
            {
              text: "插件",
              link: "/docs/guide/usage/transformer/plugins",
            },
            {
              text: "全局变量替换",
              link: "/docs/guide/usage/transformer/global-variable-replacement",
            },
            {
              text: "独立声明",
              link: "/docs/guide/usage/transformer/isolated-declarations",
            },
          ],
        },
        {
          text: "压缩器",
          collapsed: true,
          link: "/docs/guide/usage/minifier",
          items: [
            {
              text: "概览",
              link: "/docs/guide/usage/minifier",
            },
            {
              text: "死代码消除",
              link: "/docs/guide/usage/minifier/dead-code-elimination",
            },
            {
              text: "语法规范化",
              link: "/docs/guide/usage/minifier/syntax-normalization",
            },
            {
              text: "名称混淆",
              link: "/docs/guide/usage/minifier/mangling",
            },
            {
              text: "空白压缩",
              link: "/docs/guide/usage/minifier/whitespace-stripping",
            },
            {
              text: "常见问题",
              link: "/docs/guide/usage/minifier/faq",
            },
          ],
        },
        {
          text: "模块解析器",
          collapsed: true,
          link: "/docs/guide/usage/resolver",
          items: [{ text: "概览", link: "/docs/guide/usage/resolver" }],
        },
        {
          text: "资源",
          collapsed: false,
          items: [
            { text: "故障排查", link: "/docs/guide/troubleshooting" },
            { text: "基准测试", link: "/docs/guide/benchmarks" },
            { text: "使用 Oxc 的项目", link: "/docs/guide/projects" },
            { text: "演讲与媒体", link: "/docs/guide/media" },
          ],
        },
      ],
      "/docs/learn/": [
        {
          text: "Rust 中的 JavaScript 解析器",
          items: [
            { text: "简介", link: "/docs/learn/parser_in_rust/intro" },
            { text: "词法分析器", link: "/docs/learn/parser_in_rust/lexer" },
            { text: "AST", link: "/docs/learn/parser_in_rust/ast" },
            { text: "解析器", link: "/docs/learn/parser_in_rust/parser" },
            { text: "错误", link: "/docs/learn/parser_in_rust/errors" },
            { text: "语义分析", link: "/docs/learn/parser_in_rust/semantic_analysis" },
          ],
        },
        {
          text: "架构",
          items: [
            {
              text: "解析器",
              link: "/docs/learn/architecture/parser",
            },
            {
              text: "代码检查",
              link: "/docs/learn/architecture/linter",
            },
            {
              text: "测试基础设施",
              link: "/docs/learn/architecture/test",
            },
            {
              text: "AST 工具",
              link: "/docs/learn/architecture/ast-tools",
            },
          ],
        },
        {
          text: "ECMAScript",
          items: [
            { text: "规范", link: "/docs/learn/ecmascript/spec" },
            {
              text: "语法",
              link: "/docs/learn/ecmascript/grammar",
            },
          ],
        },
        { text: "性能", link: "/docs/learn/performance" },
        { text: "术语", link: "/docs/learn/terminology" },
        { text: "参考资料", link: "/docs/learn/references" },
      ],
      "/docs/contribute/": [
        {
          text: "参与贡献",
          items: [
            { text: "简介", link: "/docs/contribute/introduction" },
            { text: "快速开始", link: "/docs/contribute/development" },
          ],
        },
        {
          text: "工具",
          items: [
            {
              text: "解析器",
              link: "/docs/contribute/parser",
              items: [
                {
                  text: "AST",
                  link: "/docs/contribute/parser/ast",
                },
              ],
            },
            {
              text: "代码检查",
              link: "/docs/contribute/linter",
              items: [{ text: "添加规则", link: "/docs/contribute/linter/adding-rules" }],
            },
            { text: "格式化器", link: "/docs/contribute/formatter" },
            { text: "模块解析器", link: "/docs/contribute/resolver" },
            {
              text: "转换器",
              link: "/docs/contribute/transformer",
            },
            { text: "压缩器", link: "/docs/contribute/minifier" },
            { text: "语言服务器", link: "/docs/contribute/language_server" },
            { text: "VS Code", link: "/docs/contribute/vscode" },
          ],
        },
        { text: "调试", link: "/docs/contribute/debugging" },
        { text: "性能分析", link: "/docs/contribute/profiling" },
        { text: "PR 规则与策略", link: "/docs/contribute/rules" },
        { text: "安全策略", link: "/docs/contribute/security" },
      ],
      "/blog/": BLOG_SIDEBAR,
    },
    outline: {
      level: [2, 3],
    },
    editLink: {
      pattern({ filePath }) {
        // Auto-generated rule pages should link to the Rust source in the oxc repo
        const m = filePath.match(
          /^docs\/guide\/usage\/linter\/rules\/(?<plugin>[^/]+)\/(?<rule>[^/]+)\.md$/,
        );
        if (m) {
          const plugin = m.groups!.plugin;
          const rule = m.groups!.rule.replaceAll("-", "_");
          return `https://github.com/oxc-project/oxc/edit/main/crates/oxc_linter/src/rules/${plugin}/${rule}.rs`;
        }

        return `https://github.com/oxc-project/website/edit/main/src/${filePath}`;
      },
      text: "在 GitHub 上编辑此页",
    },
  },
});
