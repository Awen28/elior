import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import { AppProviders } from './AppProviders';
import { STATIC_HEAD } from './staticHead';
import { renderSeoHead } from '../src/lib/seoHead';
import { resetServerSeo, takeServerSeo } from '../src/lib/seoServer';

export async function onRenderHtml(pageContext: { urlPathname: string }) {
  resetServerSeo();

  const pageHtml = dangerouslySkipEscape(
    renderToString(
      <StaticRouter location={pageContext.urlPathname}>
        <AppProviders />
      </StaticRouter>
    )
  );

  const seo = takeServerSeo();
  const head = `${STATIC_HEAD}${seo ? renderSeoHead(seo) : ''}`;
  const lang = seo?.language ?? 'de-AT';

  return escapeInject`<!doctype html>
<html lang="${lang}">
  <head>${dangerouslySkipEscape(head)}
  </head>
  <body>
    <div id="root">${pageHtml}</div>
  </body>
</html>`;
}
