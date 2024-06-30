import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const META_CONFIG = {
  title: "独立开发沉思录",
  description:
    "分享关于独立开发技术、产品、设计、营销、个人成长的内容，同时每周发布一篇独立开发沉思录周刊",
  keywords: ["独立开发", "技术", "产品", "设计", "营销", "个人成长"],
  ogImage: {
    type: "website",
  },
  twitterImate: {
    card: "summary_large_image",
  },
}

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const title = `${fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title} - ${META_CONFIG.title}`
    const description =
      fileData.description && fileData.description?.trim() !== "..."
        ? fileData.description?.trim()
        : META_CONFIG.description
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={META_CONFIG.ogImage.type} />
        <meta property="og:url" content={url.toString()} />
        {cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
        <meta property="og:width" content="1200" />
        <meta property="og:height" content="675" />

        <meta property="twitter:site" content={url.toString()} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImagePath} />
        <meta property="twitter:card" content={META_CONFIG.twitterImate.card} />

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="keywords" content={META_CONFIG.keywords.join(",")} />
        <meta name="generator" content="Quartz" />
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
