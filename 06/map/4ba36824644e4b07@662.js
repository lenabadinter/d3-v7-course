import define1 from "./e93997d5089d7165@2303.js";
import define2 from "./a33468b95d0b15b0@808.js";
import define3 from "./95755285ea201c85@152.js";

function _1(md){return(
md`# Can you point to Ukraine on a map?`
)}

function _2(md){return(
md`That's what Secretary of State Mike Pompeo [reportedly asked](https://www.npr.org/2020/01/24/799244678/pompeo-wont-say-whether-he-owes-yovanovitch-an-apology-i-ve-done-what-s-right) NPR anchor Mary Louise Kelly.

In a [2014 survey](https://www.washingtonpost.com/news/monkey-cage/wp/2014/04/07/the-less-americans-know-about-ukraines-location-the-more-they-want-u-s-to-intervene/), about 16 percent of Americans could correctly locate Ukraine. About 60 percent of visitors to this page found it on the first try.`
)}

function _3(success,html,countryName){return(
success !== null
  ? html`${
      success
        ? '<p class="success">🏆 Congratulations! You pointed to Ukraine!</p>'
        : html`<p class="failure">Sorry. That wasn\'t Ukraine. ${
            countryName ? html` That's ${countryName}.` : ''
          }</p>`
    }`
  : html`Can you find Ukraine on a map?`
)}

function _hardMode(checkbox){return(
checkbox({
  description: "No marked borders",
  options: [{ value: "on", label: "Hard mode" }],
  value: "off"
})
)}

function _5(html,success,swatches,colorScale){return(
html`<div><small><b>${
  success ? 'Everyone\'s tries' : 'Tries'
}:</b></small>${swatches({
  color: colorScale
})}`
)}

function _map(point,handleClick,width,d3,height,svg,hardMode,features,path,handleMouseover,handleMouseout,success,loggedTriesSample,projection,colorScale,yourTries)
{
  let clickTimeout = null;

  function startClick(e, feature) {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
    const coords = point(e.target, e);
    /*
    const transform = d3.zoomTransform(map.children[0]);
    const coordsTranslated = transform.invert(coords);
    console.log(coords, coordsTranslated);
    */
    clickTimeout = setTimeout(
      handleClick.bind(this, e, feature, coords),
      width <= 500 ? 300 : 0
    );
  }

  function cancelClick() {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }
  }

  function zoomed() {
    map.children[0].setAttribute("transform", d3.event.transform);
  }

  const zoom = d3
    .zoom()
    .extent([[0, 0], [width, height]])
    .translateExtent([[-50, -50], [width + 50, height + 50]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  function zoomIn() {
    d3.select(map)
      .transition()
      .call(zoom.scaleBy, 2);
  }

  function zoomOut() {
    d3.select(map)
      .transition()
      .call(zoom.scaleBy, 0.5);
  }

  const map = svg`<svg width="${width}" height="${height}" class="map${
    hardMode === 'on' ? ' hardMode' : ''
  }">
    <g>
    <g transform="translate(-${width * 0.25},-${height * 0.1})scale(1.4)">
      ${features.map(
        feature =>
          svg`<path d="${path(
            feature
          )}" class="country" ondblclick=${cancelClick} onclick=${e =>
            startClick(
              e,
              feature
            )} onmouseover=${handleMouseover} onmouseout=${handleMouseout} />`
      )}
    ${
      success
        ? loggedTriesSample.map(
            point =>
              svg`<circle cx="${projection([point.long, point.lat])[0]}" cy="${
                projection([point.long, point.lat])[1]
              }" r="1" fill="${colorScale(point.tries)}" class="point" />`
          )
        : ''
    }
    ${yourTries.map(
      point =>
        svg`<circle cx="${point.x * 100}%" cy="${point.y *
          100}%" stroke="black" stroke-width="1" r="2" fill="${colorScale(
          point.tries
        )}" />`
    )}
    </g>
    </g>
    <g transform="scale(0.35)">
      <g>
        <rect fill="white" x="10" y="10" width="75" height="75" class="button" onclick=${zoomIn} />
        <path d="M79.122,13.679H16.878c-3.3,0-5.985,2.685-5.985,5.986v56.67c0,3.3,2.685,5.985,5.985,5.985h62.244  c3.3,0,5.985-2.685,5.985-5.985v-56.67C85.107,16.365,82.423,13.679,79.122,13.679z M60.048,49.445H49.445v10.603h-2.891V49.445  H35.952v-2.891h10.603V35.952h2.891v10.602h10.603V49.445z" class="button" onclick=${zoomIn}></path>
      </g>
      <g transform="translate(0,80)">
        <rect fill="white" x="10" y="10" width="75" height="75" class="button" onclick=${zoomOut} />
        <path d="M80.289,12.392H15.711c-3.425,0-6.211,2.786-6.211,6.211v58.793c0,3.426,2.786,6.211,6.211,6.211h64.578  c3.425,0,6.211-2.785,6.211-6.211V18.603C86.5,15.178,83.714,12.392,80.289,12.392z M60.5,49.5h-25v-3h25V49.5z" onclick=${zoomOut} class="button"></path>
      </g>
    </g>
  </svg>`;

  if (width <= 500) {
    d3.select(map)
      .call(zoom.scaleBy, 1.5)
      .call(zoom.translateBy, -50, 0);
  }

  const zoomCall = d3.select(map).call(zoom);

  const dblclickHandler = zoomCall.on("dblclick.zoom");

  zoomCall.on("dblclick.zoom", function(d, i, nodes) {
    cancelClick();
    dblclickHandler.call(this, d, i, nodes);
  });

  return map;
}


function _7(md){return(
md``
)}

function _8(md){return(
md`### Appendix`
)}

function _htl(require){return(
require("htl@0.0.9")
)}

function _svg(htl){return(
htl.svg
)}

function _d3(require){return(
require('d3')
)}

function _topojson(require){return(
require('topojson')
)}

function _height(width){return(
width <= 500 ? Math.round(width / 1.2) : Math.round(width / 1.8)
)}

function _projection(d3,width,height){return(
d3
  .geoNaturalEarth1()
  .rotate([0, 0])
  .precision(0.1)
  .fitSize([width, height], { type: "Sphere" })
)}

function _path(d3,projection){return(
d3.geoPath().projection(projection)
)}

function _world(FileAttachment){return(
FileAttachment("world-atlas-110m.json").json()
)}

async function _countryIds(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("country-ids.csv").text())
)}

function _features(topojson,world){return(
topojson.feature(world, world.objects.countries).features
)}

function _point(){return(
function(node, event) {
  const svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    let point = svg.createSVGPoint();
    (point.x = event.clientX), (point.y = event.clientY);
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  const rect = node.getBoundingClientRect();
  return [
    event.clientX - rect.left - node.clientLeft,
    event.clientY - rect.top - node.clientTop
  ];
}
)}

function _handleClick($0,countryIds,$1,$2,width,height,tries,d3,hardMode,$3){return(
(e, feature, coords) => {
  $0.value = (
    countryIds.find(country => feature.id === country.code) || { name: null }
  ).name;
  $1.value = feature.id === '804';
  $2.value.push({
    x: coords[0] / width,
    y: coords[1] / height,
    tries: tries + 1
  });
  try {
    d3.json(
      "https://a8qabv339g.execute-api.us-east-1.amazonaws.com/dev/points",
      {
        body: JSON.stringify({
          country: feature.id,
          x: coords[0],
          y: coords[1],
          width,
          height,
          tries: tries + 1,
          bot: false,
          hardMode
        }),
        headers: { "content-type": "application/json" },
        method: "POST",
        mode: "cors"
      }
    );
    ++$3.value;
  } catch (e) {
    // no-op
  }
}
)}

function _handleMouseover(){return(
e => e.target.classList.add('highlighted')
)}

function _handleMouseout(){return(
e => e.target.classList.remove('highlighted')
)}

function _success(){return(
null
)}

function _countryName(){return(
null
)}

function _tries(){return(
0
)}

function _yourTries(){return(
[]
)}

async function _loggedTries(d3)
{
  try {
    return await d3.tsv(
      'https://d18fkkvkxmrwi8.cloudfront.net/sampled-tries.tsv'
    );
  } catch (e) {
    return [];
  }
}


function _loggedTriesSample(loggedTries){return(
loggedTries
)}

function _colorScale(d3){return(
d3
  .scaleOrdinal()
  .domain([1, 2, 3, 4, 5]) // , 'yours'
  .unknown("#f1eef6")
  .range(
    ["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"] // "green",
      .slice()
      .reverse()
  )
)}

function _31(html){return(
html`<style>
.map {
   max-width: 100%;
   width: 100%;
   height: auto;
   background-color: white;
   border: 1px solid rgb(240,240,240);
}
.country {
   fill: rgb(240,240,240);
   stroke: rgb(200,200,200);
   stroke-width: 0.5;
   cursor: pointer;
}
.highlighted {
   fill: rgb(200,200,200);
}
.success {
   color: green;
}
.failure {
   color: red;
}
.point {
   opacity: 0.4;
   pointer-events: none;
}
small {
   position: relative;
   font-size: 11px;
   font-family:-apple-system, system-ui, "avenir next", avenir, helvetica, "helvetica neue", ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
}
.button {
   cursor: pointer;
}
.hardMode .country {
   stroke: rgb(240,240,240);
}
.hardMode .highlighted {
   fill: rgb(240,240,240);
}
</style>`
)}

function _34(pageAnalytics){return(
pageAnalytics
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["world-atlas-110m.json", {url: new URL("./files/0ca9148938fe656b24d3cd9474fc7190de67f0c2fa0c6940f93f874da1572341e3691665fd40b708cdd5573317e4b18f96bfc1d3617464cb0dc2d8b607c3bddd.json", import.meta.url), mimeType: "application/json", toString}],
    ["country-ids.csv", {url: new URL("./files/200ac63b66db3fd13ac4cbd9cbce45e093d4b6f3b3f417180dab43baa66321735b55893ee593319cb3c008cd2d59df605eee2204f729f6b94623166eb75383f0.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["success","html","countryName"], _3);
  main.variable(observer("viewof hardMode")).define("viewof hardMode", ["checkbox"], _hardMode);
  main.variable(observer("hardMode")).define("hardMode", ["Generators", "viewof hardMode"], (G, _) => G.input(_));
  main.variable(observer()).define(["html","success","swatches","colorScale"], _5);
  main.variable(observer("map")).define("map", ["point","handleClick","width","d3","height","svg","hardMode","features","path","handleMouseover","handleMouseout","success","loggedTriesSample","projection","colorScale","yourTries"], _map);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  main.variable(observer("htl")).define("htl", ["require"], _htl);
  main.variable(observer("svg")).define("svg", ["htl"], _svg);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("projection")).define("projection", ["d3","width","height"], _projection);
  main.variable(observer("path")).define("path", ["d3","projection"], _path);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("countryIds")).define("countryIds", ["d3","FileAttachment"], _countryIds);
  main.variable(observer("features")).define("features", ["topojson","world"], _features);
  main.variable(observer("point")).define("point", _point);
  main.variable(observer("handleClick")).define("handleClick", ["mutable countryName","countryIds","mutable success","mutable yourTries","width","height","tries","d3","hardMode","mutable tries"], _handleClick);
  main.variable(observer("handleMouseover")).define("handleMouseover", _handleMouseover);
  main.variable(observer("handleMouseout")).define("handleMouseout", _handleMouseout);
  main.define("initial success", _success);
  main.variable(observer("mutable success")).define("mutable success", ["Mutable", "initial success"], (M, _) => new M(_));
  main.variable(observer("success")).define("success", ["mutable success"], _ => _.generator);
  main.define("initial countryName", _countryName);
  main.variable(observer("mutable countryName")).define("mutable countryName", ["Mutable", "initial countryName"], (M, _) => new M(_));
  main.variable(observer("countryName")).define("countryName", ["mutable countryName"], _ => _.generator);
  main.define("initial tries", _tries);
  main.variable(observer("mutable tries")).define("mutable tries", ["Mutable", "initial tries"], (M, _) => new M(_));
  main.variable(observer("tries")).define("tries", ["mutable tries"], _ => _.generator);
  main.define("initial yourTries", _yourTries);
  main.variable(observer("mutable yourTries")).define("mutable yourTries", ["Mutable", "initial yourTries"], (M, _) => new M(_));
  main.variable(observer("yourTries")).define("yourTries", ["mutable yourTries"], _ => _.generator);
  main.variable(observer("loggedTries")).define("loggedTries", ["d3"], _loggedTries);
  main.variable(observer("loggedTriesSample")).define("loggedTriesSample", ["loggedTries"], _loggedTriesSample);
  main.variable(observer("colorScale")).define("colorScale", ["d3"], _colorScale);
  main.variable(observer()).define(["html"], _31);
  const child2 = runtime.module(define2);
  main.import("swatches", child2);
  const child3 = runtime.module(define3);
  main.import("pageAnalytics", child3);
  main.variable(observer()).define(["pageAnalytics"], _34);
  return main;
}
