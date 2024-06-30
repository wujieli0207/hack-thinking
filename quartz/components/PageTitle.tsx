import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h1 class={classNames(displayClass, "page-title")}>
      <image class="page-title__icon" src="/static/icon.png" alt={title} />
      <a href={baseDir} title={title} class="page-title__content">
        {title}
      </a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  display: flex;
  align-items: center;
  margin: 0;
}

.page-title__icon {
  width: 28px;
  height: 28px;
  margin: 0 8px 0 0;
}

@media (max-width: 640px) {
  .page-title__icon {
    width: 18px;
    height: 18px;
    margin: 0 4px 0 0;
  }
  .page-title__content {
    font-size: 20px;
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
