import {
  e as createComponent,
  k as renderComponent,
  r as renderTemplate,
  h as createAstro,
  m as maybeRenderHead,
  g as addAttribute,
} from '../../chunks/astro/server_C9p18JK-.mjs';
import {
  l as localeFromPath,
  $ as $$BaseLayout,
  t as tFor,
  a as localizedHref,
} from '../../chunks/ui-strings_DZppwvaA.mjs';
import { c as createContentAdapter } from '../../chunks/content-adapter_CZzLdwLk.mjs';
import { p as pickLocale } from '../../chunks/index_fNwO7Lh0.mjs';
import { b as fixtureArticles } from '../../chunks/fixtures_D8syZZm_.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$Index;
    const adapter = createContentAdapter({
      strapiUrl: '',
      strapiToken: '',
    });
    const articles = await adapter.fetchArticles();
    const articlesForLocale = articles.length > 0 ? articles : fixtureArticles;
    const locale = localeFromPath(Astro2.url.pathname);
    const t = tFor(locale);
    const formatter = new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    function visualFor(index) {
      return ['cleaning', 'freon', 'refrigerant', 'fridge'][index % 4] ?? 'cleaning';
    }
    return renderTemplate`${renderComponent($$result, 'BaseLayout', $$BaseLayout, { title: t.blog.title, description: t.blog.pageLead, locale: locale, 'data-astro-cid-s63ypivo': true }, { default: async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="container page" aria-labelledby="blog-title" data-astro-cid-s63ypivo> <div class="page-hero" data-astro-cid-s63ypivo> <p class="pill" data-astro-cid-s63ypivo>🧰 ${t.blog.title} · ${articlesForLocale.length}</p> <h1 id="blog-title" data-astro-cid-s63ypivo>${t.blog.pageHeading}</h1> <p class="lead" data-astro-cid-s63ypivo>${t.blog.pageLead}</p> </div> <ul class="article-grid" data-astro-cid-s63ypivo> ${articlesForLocale.map((article, index) => renderTemplate`<li class="article-card" data-astro-cid-s63ypivo> <a class="article-card__visual"${addAttribute(visualFor(index), 'data-visual')}${addAttribute(localizedHref(locale, `/blog/${article.slug}/`), 'href')}${addAttribute(pickLocale(article.title, locale), 'aria-label')} data-astro-cid-s63ypivo> <span aria-hidden="true" data-astro-cid-s63ypivo></span> </a> <div class="article-card__body" data-astro-cid-s63ypivo> <p class="meta" data-astro-cid-s63ypivo> ${formatter.format(new Date(article.publishedAt))} · ${article.readMinutes}${' '} ${t.blog.minRead} </p> <h2 data-astro-cid-s63ypivo> <a${addAttribute(localizedHref(locale, `/blog/${article.slug}/`), 'href')} data-astro-cid-s63ypivo> ${pickLocale(article.title, locale)} </a> </h2> <p class="excerpt" data-astro-cid-s63ypivo>${pickLocale(article.excerpt, locale)}</p> </div> </li>`)} </ul> </section> ` })} `;
  },
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/blog/index.astro',
  void 0,
);
const $$file =
  '/Users/mac/Projects/digiagency-portfolio/local-business-growth/apps/web/src/pages/en/blog/index.astro';
const $$url = '/en/blog/';

const _page = /*#__PURE__*/ Object.freeze(
  /*#__PURE__*/ Object.defineProperty(
    {
      __proto__: null,
      default: $$Index,
      file: $$file,
      url: $$url,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
);

const page = () => _page;

export { page };
