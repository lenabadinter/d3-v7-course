// https://observablehq.com/@chriszs/page-analytics@152
function _1(md,html){return(
md`# Page Analytics
Discussed here: [Embedding Google Analytics, Good or Evil Poll](https://talk.observablehq.com/t/embedding-google-analytics-good-or-evil-poll/1400)

Usage instructions:
  1. Clone this notebook, so you can change the id to your own id "UA-xxxxxx-xx"
  * Switch to the clone (the import link below will update)
  * Add Page Analytics to any of your notebooks by add two cells:
    * import { pageAnalytics } from '${html`<a href>`.pathname.substr(1)}'
    * pageAnalytics
`
)}

function _id(){return(
'UA-157081722-1'
)}

async function _pageAnalytics(require,id,html,md)
{
  await require(`https://www.googletagmanager.com/gtag/js?id=${id}`).catch(
    () => {}
  );
  const dataLayer = (window.dataLayer = window.dataLayer || []);
  const location = html`<a href>`;
  gtag('js', new Date());
  gtag('config', id, {
    page_path: location.pathname,
    page_location: location.href
  });
  return md``;
  function gtag() {
    dataLayer.push(arguments);
  }
}


export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","html"], _1);
  main.variable(observer("id")).define("id", _id);
  main.variable(observer("pageAnalytics")).define("pageAnalytics", ["require","id","html","md"], _pageAnalytics);
  return main;
}
