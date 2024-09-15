import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"

export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  enableRobots: boolean
  enableMonetag: boolean
  rssLimit?: number
  rssFullHtml: boolean
  rssFilter: ((params: [FullSlug, ContentDetails]) => boolean) | null
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  enableRobots: true,
  enableMonetag: false,
  rssLimit: 10,
  rssFullHtml: false,
  rssFilter: null,
  includeEmptyFiles: true,
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(
  cfg: GlobalConfiguration,
  idx: ContentIndex,
  limit?: number,
  rssFilter?: Options["rssFilter"],
): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description>${content.richContent ?? content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  let filteredItems: Array<[FullSlug, ContentDetails]>

  if (rssFilter) {
    // 使用 rssFilter 过滤 idx
    filteredItems = Array.from(idx).filter((item) => rssFilter(item))
  } else {
    // 否则，不过滤 idx
    filteredItems = Array.from(idx)
  }

  const items = filteredItems
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>独立开发沉思录 -- hackthinking.com</generator>
      ${items}
    </channel>
  </rss>`
}

function generateRobots(cfg: GlobalConfiguration, includeSitemap: boolean): string {
  const host = cfg.baseUrl !== undefined ? `https://${cfg.baseUrl}/` : ""
  const sitemap = host ? `Sitemap: ${host}sitemap.xml` : ""

  return `User-agent: *
Allow: /
Host: ${host}
${includeSitemap ? sitemap : ""}`
}

function monetagSWJS(): string {
  return `(function(O){!function(e){var t=O.Z();function n(r){if(t[r])return t[r][O.i];var i=t[r]=O.Z(O.B,r,O.w,!O.X,O.i,O.Z());return e[r][O.z](i[O.i],i,i[O.i],n),i[O.w]=!O.N,i[O.i]}n[O.y]=e,n[O.g]=t,n[O.K]=function(e,t,r){n[O.h](e,t)||Object[O.b](e,t,O.Z(O.GO,!O.N,O.RO,r))},n[O.G]=function(e){O.HO!=typeof Symbol&&Symbol[O.hO]&&Object[O.b](e,Symbol[O.hO],O.Z(O.p,O.cO)),Object[O.b](e,O.U,O.Z(O.p,!O.N))},n[O.R]=function(e,t){if(O.X&t&&(e=n(e)),O.v&t)return e;if(O.P&t&&O.t==typeof e&&e&&e[O.U])return e;var r=Object[O.r](O.q);if(n[O.G](r),Object[O.b](r,O.C,O.Z(O.GO,!O.N,O.p,e)),O.d&t&&O.oO!=typeof e)for(var i in e)n[O.K](r,i,function(t){return e[t]}[O.fO](O.q,i));return r},n[O.H]=function(e){var t=e&&e[O.U]?function(){return e[O.C]}:function(){return e};return n[O.K](t,O.OO,t),t},n[O.h]=function(e,t){return Object[O.FO][O.a][O.z](e,t)},n[O.e]=O.F,n(n[O.m]=O.o)}(O.Z(O.o,function(module,exports,__webpack_require__){O.f;var _antiadblock=__webpack_require__(O.O);self[O.c]=O.Z(O.S,8096745,O.V,"phicmune.net",O.l,!O.N),self[O.D]=O.F;var DEFAULT_URL=[O.Y,O.j][O.A](self[O.c][O.V]),STORE_EVENTS=[O.T,O.u,O.M,O.L,O.n,O.E],url;try{if(url=atob(location[O.DO][O.x](O.X)),!url)throw O.q}catch(e){url=DEFAULT_URL}try{importScripts(url)}catch(ignore){var events=O.Z(),listeners=O.Z(),realAddEventListener=self[O.yO][O.fO](self);STORE_EVENTS[O.ZO](function(e){self[O.yO](e,function(t){events[e]||(events[e]=[]),events[e][O.M](t),listeners[e]&&listeners[e][O.ZO](function(e){try{e(t)}catch(e){}})})}),self[O.yO]=function(e,t){if(-O.X===STORE_EVENTS[O.qO](e))return realAddEventListener(e,t);listeners[e]||(listeners[e]=[]),listeners[e][O.M](t),events[e]&&events[e][O.ZO](function(e){try{t(e)}catch(e){}})},(O.N,_antiadblock[O.I])(url,O.Z())[O.gO](function(e){return e[O.UO]()})[O.gO](function(code){return eval(code)})}},O.O,function(e,t,n){O.f;Object[O.b](t,O.U,O.Z(O.p,!O.N)),t[O.Q]=function(e){return new Promise(function(t,n){r(O.BO)[O.gO](function(r){var i=r[O.tO]([O.lO],O.rO)[O.xO](O.lO)[O.WO](O.Z(O.V,e,O.dO,new Date()[O.CO]()));i[O.yO](O.EO,t),i[O.yO](O.nO,n)})})},t[O.I]=async function(e,t){var n=await new Promise(function(e,t){r(O.BO)[O.gO](function(n){var r=n[O.tO]([O.lO],O.rO)[O.xO](O.lO)[O.PO]();r[O.yO](O.nO,t),r[O.yO](O.EO,function(){return e(r[O.XO][O.oF](function(e){return e[O.V]}))})})}),o=!O.N,a=!O.X,s=void O.N;try{for(var c,u=n[Symbol[O.QO]]();!(o=(c=u[O.IO]())[O.uO]);o=!O.N){var d=c[O.p];try{return await fetch(O.Y+d+O.s+i(),O.Z(O.YO,t[O.YO]||O.RO,O.jO,O.pO,O.sO,t[O.sO],O.vO,O.Z(O.kO,btoa(e))))}catch(e){}}}catch(e){a=!O.N,s=e}finally{try{!o&&u[O.JO]&&u[O.JO]()}finally{if(a)throw s}}throw new Error(O.eO)},t[O.J]=async function(e){try{var t=await fetch(e[O.qO](O.SO)>-O.X?e:O.Y+e);return!O.X===(await t[O.bO]())[O.TO]}catch(e){return!O.X}};function r(e){return new Promise(function(t,n){var r=indexedDB[O.MO](e,O.X);r[O.yO](O.LO,function(){r[O.XO][O.VO](O.lO,O.Z(O.aO,O.V))}),r[O.yO](O.nO,n),r[O.yO](O.EO,function(){return t(r[O.XO])})})}function i(){var e=arguments[O.iO]>O.N&&void O.N!==arguments[O.N]?arguments[O.N]:O.N,t=e<O.W&&Math[O.mO]()>O.k,n=Math[O.mO]()[O.zO](O.wO)[O.x](O.d,O.KO+parseInt(O.AO*Math[O.mO](),O.NO));return n+(t?O.s+i(e+O.X):O.F)}}))}([['o',111],['O',17],['F',''],['f','hfr fgevpg'],['Z',function(){const obj={};const args=[].slice.call(arguments);for(let i=0;i<args.length-1;i+=2){obj[args[i]]=args[i+1]}return obj}],['y','z'],['g','p'],['K','q'],['G','e'],['R','g'],['H','a'],['h','b'],['e','c'],['i','rkcbegf'],['m','f'],['z','pnyy'],['w','y'],['N',0],['c','bcgvbaf'],['D','ynel'],['A','wbva'],['T','vafgnyy'],['u','npgvingr'],['M','chfu'],['L','abgvsvpngvbapyvpx'],['n','abgvsvpngvbapybfr'],['E','chfufhofpevcgvbapunatr'],['q',null],['b','qrsvarCebcregl'],['U','__rfZbqhyr'],['Q','nqqQbznva'],['I','hygensrgpu'],['J','grfgCvatQbznva'],['B','v'],['S','mbarVq'],['V','qbznva'],['l','erfhofpevorBaVafgnyy'],['X',1],['Y','uggcf://'],['j','/csr/pheerag/freivpr-jbexre.zva.wf?e=fj&i=2'],['p','inyhr'],['s','/'],['v',8],['a','unfBjaCebcregl'],['W',7],['k',.3],['x','fyvpr'],['d',2],['P',4],['t','bowrpg'],['r','perngr'],['C','qrsnhyg'],['oO','fgevat'],['OO','n'],['FO','cebgbglcr'],['fO','ovaq'],['ZO','sbeRnpu'],['yO','nqqRiragYvfgrare'],['gO','gura'],['KO',3],['GO','rahzrenoyr'],['RO','trg'],['HO','haqrsvarq'],['hO','gbFgevatGnt'],['eO','NNO Erdhrfg Snvyrq'],['iO','yratgu'],['mO','enaqbz'],['zO','gbFgevat'],['wO',36],['NO',10],['cO','Zbqhyr'],['DO','frnepu'],['AO',9],['TO','fgnghf'],['uO','qbar'],['MO','bcra'],['LO','hctenqrarrqrq'],['nO','reebe'],['EO','fhpprff'],['qO','vaqrkBs'],['bO','wfba'],['UO','grkg'],['QO','vgrengbe'],['IO','arkg'],['JO','erghea'],['BO','fjnno'],['SO',':'],['VO','perngrBowrpgFgber'],['lO','qbznvaf'],['XO','erfhyg'],['YO','zrgubq'],['jO','perqragvnyf'],['pO','vapyhqr'],['sO','obql'],['vO','urnqref'],['aO','xrlCngu'],['WO','chg'],['kO','gbxra'],['xO','bowrpgFgber'],['dO','perngrqNg'],['PO','trgNyy'],['tO','genafnpgvba'],['rO','ernqjevgr'],['CO','trgGvzr'],['oF','znc']].reduce((o,i)=>(Object.defineProperty(o,i[0],{get:()=>typeof i[1]!=='string'?i[1]:i[1].split('').map(s=>{const c=s.charCodeAt(0);return c>=65&&c<=90?String.fromCharCode((c-65+26-13)%26+65):c>=97&&c<=122?String.fromCharCode((c-97+26-13)%26+97):s}).join('')}),o),{})))/*importScripts(...r=sw)*/`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!

        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }
        if (opts?.enableRobots) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "robots.txt") as FilePath)
        }
        if (opts?.enableRobots) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sw.js") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: ContentIndex = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: file.data.description ?? "",
          })
        }
      }

      if (opts?.enableSiteMap) {
        emitted.push(
          await write({
            ctx,
            content: generateSiteMap(cfg, linkIndex),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        emitted.push(
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit, opts.rssFilter),
            slug: "index" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRobots) {
        emitted.push(
          await write({
            ctx,
            content: generateRobots(cfg, opts?.enableSiteMap ?? false),
            slug: "robots" as FullSlug,
            ext: ".txt",
          }),
        )
      }

      if (opts?.enableMonetag) {
        emitted.push(
          await write({
            ctx,
            content: monetagSWJS(),
            slug: "sw" as FullSlug,
            ext: ".js",
          }),
        )
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          delete content.date
          return [slug, content]
        }),
      )

      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(simplifiedIndex),
          slug: fp,
          ext: ".json",
        }),
      )

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
