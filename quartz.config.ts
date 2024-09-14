import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "独立开发沉思录",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: "google", tagId: "G-7LYX0E3TKN" },
    locale: "zh-CN",
    baseUrl: "www.hackthinking.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fffefb",
          lightgray: "#f5f4f1",
          gray: "#cccbc8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#00668c",
          tertiary: "#71c4ef",
          highlight: "#f5f4f1",
        },
        darkMode: {
          light: "#1E1E1E",
          lightgray: "#2d2d2d",
          gray: "#454545",
          darkgray: "#9e9e9e",
          dark: "#ebebec",
          secondary: "#acc2ef",
          tertiary: "#4d648d",
          highlight: "#2d2d2d",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssFullHtml: true,
        rssFilter: ([slug]) =>
          slug.includes("weekly/") &&
          !slug.includes("weekly/home") &&
          !slug.includes("weekly/information-source"),
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
