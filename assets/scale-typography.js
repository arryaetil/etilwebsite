/*
 * Verkleint alle typografie op de site met 17% (in het midden van 15-20%).
 *
 * Werkwijze: we lezen eerst de huidige (computed) font-size van elk element,
 * vermenigvuldigen die met 0.83, en zetten de uitkomst als inline font-size
 * terug. Omdat we ALLE waardes eerst inlezen vóór we iets aanpassen, blijven
 * de onderlinge verhoudingen tussen H1/H2/H3/body 1-op-1 intact -- alles
 * schuift exact dezelfde stap naar beneden.
 */
(function () {
  var SCALE = 0.83;

  function apply() {
    var nodes = document.querySelectorAll('body, body *');
    var sizes = new Array(nodes.length);

    // 1) Lees alle huidige groottes in één pass.
    for (var i = 0; i < nodes.length; i++) {
      var raw = window.getComputedStyle(nodes[i]).fontSize;
      sizes[i] = parseFloat(raw);
    }

    // 2) Schrijf alle nieuwe groottes terug.
    for (var j = 0; j < nodes.length; j++) {
      var px = sizes[j];
      if (!isFinite(px) || px <= 0) continue;
      nodes[j].style.fontSize = (px * SCALE).toFixed(2) + 'px';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
})();
