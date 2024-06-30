import { QuartzComponentConstructor } from "./types"
import style from "./styles/linksHeader.scss"

interface Options {
  links: Record<string, string>
}

export default (() => {
  function LinksHeader() {
    return (
      <div>
        <div id="links-header">
          <span>
            <a href="/">主页</a>
          </span>
          <span>
            <a href="/weekly/home">周刊</a>
          </span>
          <span>
            <a href="/about">关于</a>
          </span>
        </div>
        <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin: 0.5rem 0 1.2rem 0;"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor
