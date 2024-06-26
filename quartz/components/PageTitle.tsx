import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <image class="page-icon" src="/static/icon.png" alt={title} />
      <a href={baseDir}>{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.page-title {
  display: flex;
  align-items: center;
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
