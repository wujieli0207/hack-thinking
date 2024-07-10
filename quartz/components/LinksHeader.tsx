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
            <a href="/" title="主页">
              主页
            </a>
          </span>
          <span>
            <a href="/weekly/home" title="周刊">
              周刊
            </a>
          </span>
          <span>
            <a href="/about" title="关于">
              关于
            </a>
          </span>
        </div>
        <hr style="background-color: var(--gray); border-top: 1px var(--gray) solid; margin: 0.5rem 0 1.2rem 0;"></hr>
      </div>
    )
  }

  LinksHeader.css = style
  return LinksHeader
}) satisfies QuartzComponentConstructor
