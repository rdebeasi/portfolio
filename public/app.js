(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.js", function(exports, require, module) {
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // do your setup here
  console.log('Initialized app');
});
});

require.register("views/words/faster/modernizr.custom.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
 * Contains: fontface | backgroundsize | borderimage | borderradius | boxshadow | flexbox | hsla | multiplebgs | opacity | rgba | textshadow | cssanimations | csscolumns | generatedcontent | cssgradients | cssreflections | csstransforms | csstransforms3d | csstransitions | applicationcache | canvas | canvastext | draganddrop | hashchange | history | audio | video | indexeddb | input | inputtypes | localstorage | postmessage | sessionstorage | websockets | websqldatabase | webworkers | geolocation | inlinesvg | smil | svg | svgclippaths | touch | webgl | iepp | cssclasses | addtest | teststyles | testprop | testallprops | hasevent | prefixes | domprefixes | load
 */
;window.Modernizr = function (a, b, c) {
  function H() {
    e.input = function (a) {
      for (var b = 0, c = a.length; b < c; b++) {
        t[a[b]] = a[b] in l;
      }return t;
    }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) {
      for (var d = 0, e, f, h, i = a.length; d < i; d++) {
        l.setAttribute("type", f = a[d]), e = l.type !== "text", e && (l.value = m, l.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && l.style.WebkitAppearance !== c ? (g.appendChild(l), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(l, null).WebkitAppearance !== "textfield" && l.offsetHeight !== 0, g.removeChild(l)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = l.checkValidity && l.checkValidity() === !1 : /^color$/.test(f) ? (g.appendChild(l), g.offsetWidth, e = l.value != m, g.removeChild(l)) : e = l.value != m)), s[a[d]] = !!e;
      }return s;
    }("search tel url email datetime date month week time datetime-local number range color".split(" "));
  }function F(a, b) {
    var c = a.charAt(0).toUpperCase() + a.substr(1),
        d = (a + " " + p.join(c + " ") + c).split(" ");return E(d, b);
  }function E(a, b) {
    for (var d in a) {
      if (k[a[d]] !== c) return b == "pfx" ? a[d] : !0;
    }return !1;
  }function D(a, b) {
    return !! ~("" + a).indexOf(b);
  }function C(a, b) {
    return (typeof a === "undefined" ? "undefined" : _typeof(a)) === b;
  }function B(a, b) {
    return A(o.join(a + ";") + (b || ""));
  }function A(a) {
    k.cssText = a;
  }var d = "2.0.6",
      e = {},
      f = !0,
      g = b.documentElement,
      h = b.head || b.getElementsByTagName("head")[0],
      i = "modernizr",
      j = b.createElement(i),
      k = j.style,
      l = b.createElement("input"),
      m = ":)",
      n = Object.prototype.toString,
      o = " -webkit- -moz- -o- -ms- -khtml- ".split(" "),
      p = "Webkit Moz O ms Khtml".split(" "),
      q = { svg: "http://www.w3.org/2000/svg" },
      r = {},
      s = {},
      t = {},
      u = [],
      v = function v(a, c, d, e) {
    var f,
        h,
        j,
        k = b.createElement("div");if (parseInt(d, 10)) while (d--) {
      j = b.createElement("div"), j.id = e ? e[d] : i + (d + 1), k.appendChild(j);
    }f = ["&shy;", "<style>", a, "</style>"].join(""), k.id = i, k.innerHTML += f, g.appendChild(k), h = c(k, a), k.parentNode.removeChild(k);return !!h;
  },
      w = function () {
    function d(d, e) {
      e = e || b.createElement(a[d] || "div"), d = "on" + d;var f = d in e;f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = C(e[d], "function"), C(e[d], c) || (e[d] = c), e.removeAttribute(d))), e = null;return f;
    }var a = { select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img" };return d;
  }(),
      x,
      y = {}.hasOwnProperty,
      z;!C(y, c) && !C(y.call, c) ? z = function z(a, b) {
    return y.call(a, b);
  } : z = function z(a, b) {
    return b in a && C(a.constructor.prototype[b], c);
  };var G = function (c, d) {
    var f = c.join(""),
        g = d.length;v(f, function (c, d) {
      var f = b.styleSheets[b.styleSheets.length - 1],
          h = f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "",
          i = c.childNodes,
          j = {};while (g--) {
        j[i[g].id] = i[g];
      }e.touch = "ontouchstart" in a || j.touch.offsetTop === 9, e.csstransforms3d = j.csstransforms3d.offsetLeft === 9, e.generatedcontent = j.generatedcontent.offsetHeight >= 1, e.fontface = /src/i.test(h) && h.indexOf(d.split(" ")[0]) === 0;
    }, g, d);
  }(['@font-face {font-family:"font";src:url("https://")}', ["@media (", o.join("touch-enabled),("), i, ")", "{#touch{top:9px;position:absolute}}"].join(""), ["@media (", o.join("transform-3d),("), i, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', m, '";visibility:hidden}'].join("")], ["fontface", "touch", "csstransforms3d", "generatedcontent"]);r.flexbox = function () {
    function c(a, b, c, d) {
      a.style.cssText = o.join(b + ":" + c + ";") + (d || "");
    }function a(a, b, c, d) {
      b += ":", a.style.cssText = (b + o.join(c + ";" + b)).slice(0, -b.length) + (d || "");
    }var d = b.createElement("div"),
        e = b.createElement("div");a(d, "display", "box", "width:42px;padding:0;"), c(e, "box-flex", "1", "width:10px;"), d.appendChild(e), g.appendChild(d);var f = e.offsetWidth === 42;d.removeChild(e), g.removeChild(d);return f;
  }, r.canvas = function () {
    var a = b.createElement("canvas");return !!a.getContext && !!a.getContext("2d");
  }, r.canvastext = function () {
    return !!e.canvas && !!C(b.createElement("canvas").getContext("2d").fillText, "function");
  }, r.webgl = function () {
    return !!a.WebGLRenderingContext;
  }, r.touch = function () {
    return e.touch;
  }, r.geolocation = function () {
    return !!navigator.geolocation;
  }, r.postmessage = function () {
    return !!a.postMessage;
  }, r.websqldatabase = function () {
    var b = !!a.openDatabase;return b;
  }, r.indexedDB = function () {
    for (var b = -1, c = p.length; ++b < c;) {
      if (a[p[b].toLowerCase() + "IndexedDB"]) return !0;
    }return !!a.indexedDB;
  }, r.hashchange = function () {
    return w("hashchange", a) && (b.documentMode === c || b.documentMode > 7);
  }, r.history = function () {
    return !!a.history && !!history.pushState;
  }, r.draganddrop = function () {
    return w("dragstart") && w("drop");
  }, r.websockets = function () {
    for (var b = -1, c = p.length; ++b < c;) {
      if (a[p[b] + "WebSocket"]) return !0;
    }return "WebSocket" in a;
  }, r.rgba = function () {
    A("background-color:rgba(150,255,150,.5)");return D(k.backgroundColor, "rgba");
  }, r.hsla = function () {
    A("background-color:hsla(120,40%,100%,.5)");return D(k.backgroundColor, "rgba") || D(k.backgroundColor, "hsla");
  }, r.multiplebgs = function () {
    A("background:url(https://),url(https://),red url(https://)");return (/(url\s*\(.*?){3}/.test(k.background)
    );
  }, r.backgroundsize = function () {
    return F("backgroundSize");
  }, r.borderimage = function () {
    return F("borderImage");
  }, r.borderradius = function () {
    return F("borderRadius");
  }, r.boxshadow = function () {
    return F("boxShadow");
  }, r.textshadow = function () {
    return b.createElement("div").style.textShadow === "";
  }, r.opacity = function () {
    B("opacity:.55");return (/^0.55$/.test(k.opacity)
    );
  }, r.cssanimations = function () {
    return F("animationName");
  }, r.csscolumns = function () {
    return F("columnCount");
  }, r.cssgradients = function () {
    var a = "background-image:",
        b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
        c = "linear-gradient(left top,#9f9, white);";A((a + o.join(b + a) + o.join(c + a)).slice(0, -a.length));return D(k.backgroundImage, "gradient");
  }, r.cssreflections = function () {
    return F("boxReflect");
  }, r.csstransforms = function () {
    return !!E(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]);
  }, r.csstransforms3d = function () {
    var a = !!E(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);a && "webkitPerspective" in g.style && (a = e.csstransforms3d);return a;
  }, r.csstransitions = function () {
    return F("transitionProperty");
  }, r.fontface = function () {
    return e.fontface;
  }, r.generatedcontent = function () {
    return e.generatedcontent;
  }, r.video = function () {
    var a = b.createElement("video"),
        c = !1;try {
      if (c = !!a.canPlayType) {
        c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"');var d = 'video/mp4; codecs="avc1.42E01E';c.h264 = a.canPlayType(d + '"') || a.canPlayType(d + ', mp4a.40.2"'), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"');
      }
    } catch (e) {}return c;
  }, r.audio = function () {
    var a = b.createElement("audio"),
        c = !1;try {
      if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"'), c.mp3 = a.canPlayType("audio/mpeg;"), c.wav = a.canPlayType('audio/wav; codecs="1"'), c.m4a = a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;");
    } catch (d) {}return c;
  }, r.localstorage = function () {
    try {
      return !!localStorage.getItem;
    } catch (a) {
      return !1;
    }
  }, r.sessionstorage = function () {
    try {
      return !!sessionStorage.getItem;
    } catch (a) {
      return !1;
    }
  }, r.webworkers = function () {
    return !!a.Worker;
  }, r.applicationcache = function () {
    return !!a.applicationCache;
  }, r.svg = function () {
    return !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect;
  }, r.inlinesvg = function () {
    var a = b.createElement("div");a.innerHTML = "<svg/>";return (a.firstChild && a.firstChild.namespaceURI) == q.svg;
  }, r.smil = function () {
    return !!b.createElementNS && /SVG/.test(n.call(b.createElementNS(q.svg, "animate")));
  }, r.svgclippaths = function () {
    return !!b.createElementNS && /SVG/.test(n.call(b.createElementNS(q.svg, "clipPath")));
  };for (var I in r) {
    z(r, I) && (x = I.toLowerCase(), e[x] = r[I](), u.push((e[x] ? "" : "no-") + x));
  }e.input || H(), e.addTest = function (a, b) {
    if ((typeof a === "undefined" ? "undefined" : _typeof(a)) == "object") for (var d in a) {
      z(a, d) && e.addTest(d, a[d]);
    } else {
      a = a.toLowerCase();if (e[a] !== c) return;b = typeof b == "boolean" ? b : !!b(), g.className += " " + (b ? "" : "no-") + a, e[a] = b;
    }return e;
  }, A(""), j = l = null, a.attachEvent && function () {
    var a = b.createElement("div");a.innerHTML = "<elem></elem>";return a.childNodes.length !== 1;
  }() && function (a, b) {
    function s(a) {
      var b = -1;while (++b < g) {
        a.createElement(f[b]);
      }
    }a.iepp = a.iepp || {};var d = a.iepp,
        e = d.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        f = e.split("|"),
        g = f.length,
        h = new RegExp("(^|\\s)(" + e + ")", "gi"),
        i = new RegExp("<(/*)(" + e + ")", "gi"),
        j = /^\s*[\{\}]\s*$/,
        k = new RegExp("(^|[^\\n]*?\\s)(" + e + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
        l = b.createDocumentFragment(),
        m = b.documentElement,
        n = m.firstChild,
        o = b.createElement("body"),
        p = b.createElement("style"),
        q = /print|all/,
        r;d.getCSS = function (a, b) {
      if (a + "" === c) return "";var e = -1,
          f = a.length,
          g,
          h = [];while (++e < f) {
        g = a[e];if (g.disabled) continue;b = g.media || b, q.test(b) && h.push(d.getCSS(g.imports, b), g.cssText), b = "all";
      }return h.join("");
    }, d.parseCSS = function (a) {
      var b = [],
          c;while ((c = k.exec(a)) != null) {
        b.push(((j.exec(c[1]) ? "\n" : c[1]) + c[2] + c[3]).replace(h, "$1.iepp_$2") + c[4]);
      }return b.join("\n");
    }, d.writeHTML = function () {
      var a = -1;r = r || b.body;while (++a < g) {
        var c = b.getElementsByTagName(f[a]),
            d = c.length,
            e = -1;while (++e < d) {
          c[e].className.indexOf("iepp_") < 0 && (c[e].className += " iepp_" + f[a]);
        }
      }l.appendChild(r), m.appendChild(o), o.className = r.className, o.id = r.id, o.innerHTML = r.innerHTML.replace(i, "<$1font");
    }, d._beforePrint = function () {
      p.styleSheet.cssText = d.parseCSS(d.getCSS(b.styleSheets, "all")), d.writeHTML();
    }, d.restoreHTML = function () {
      o.innerHTML = "", m.removeChild(o), m.appendChild(r);
    }, d._afterPrint = function () {
      d.restoreHTML(), p.styleSheet.cssText = "";
    }, s(b), s(l);d.disablePP || (n.insertBefore(p, n.firstChild), p.media = "print", p.className = "iepp-printshim", a.attachEvent("onbeforeprint", d._beforePrint), a.attachEvent("onafterprint", d._afterPrint));
  }(a, b), e._version = d, e._prefixes = o, e._domPrefixes = p, e.hasEvent = w, e.testProp = function (a) {
    return E([a]);
  }, e.testAllProps = F, e.testStyles = v, g.className = g.className.replace(/\bno-js\b/, "") + (f ? " js " + u.join(" ") : "");return e;
}(undefined, undefined.document), function (a, b, c) {
  function k(a) {
    return !a || a == "loaded" || a == "complete";
  }function j() {
    var a = 1,
        b = -1;while (p.length - ++b) {
      if (p[b].s && !(a = p[b].r)) break;
    }a && g();
  }function i(a) {
    var c = b.createElement("script"),
        d;c.src = a.s, c.onreadystatechange = c.onload = function () {
      !d && k(c.readyState) && (d = 1, j(), c.onload = c.onreadystatechange = null);
    }, m(function () {
      d || (d = 1, j());
    }, _H.errorTimeout), a.e ? c.onload() : n.parentNode.insertBefore(c, n);
  }function h(a) {
    var c = b.createElement("link"),
        d;c.href = a.s, c.rel = "stylesheet", c.type = "text/css";if (!a.e && (w || r)) {
      var e = function e(a) {
        m(function () {
          if (!d) try {
            a.sheet.cssRules.length ? (d = 1, j()) : e(a);
          } catch (b) {
            b.code == 1e3 || b.message == "security" || b.message == "denied" ? (d = 1, m(function () {
              j();
            }, 0)) : e(a);
          }
        }, 0);
      };e(c);
    } else c.onload = function () {
      d || (d = 1, m(function () {
        j();
      }, 0));
    }, a.e && c.onload();m(function () {
      d || (d = 1, j());
    }, _H.errorTimeout), !a.e && n.parentNode.insertBefore(c, n);
  }function g() {
    var a = p.shift();q = 1, a ? a.t ? m(function () {
      a.t == "c" ? h(a) : i(a);
    }, 0) : (a(), j()) : q = 0;
  }function f(a, c, d, e, f, h) {
    function i() {
      !o && k(l.readyState) && (r.r = o = 1, !q && j(), l.onload = l.onreadystatechange = null, m(function () {
        u.removeChild(l);
      }, 0));
    }var l = b.createElement(a),
        o = 0,
        r = { t: d, s: c, e: h };l.src = l.data = c, !s && (l.style.display = "none"), l.width = l.height = "0", a != "object" && (l.type = d), l.onload = l.onreadystatechange = i, a == "img" ? l.onerror = i : a == "script" && (l.onerror = function () {
      r.e = r.r = 1, g();
    }), p.splice(e, 0, r), u.insertBefore(l, s ? null : n), m(function () {
      o || (u.removeChild(l), r.r = r.e = o = 1, j());
    }, _H.errorTimeout);
  }function e(a, b, c) {
    var d = b == "c" ? z : y;q = 0, b = b || "j", C(a) ? f(d, a, b, this.i++, l, c) : (p.splice(this.i++, 0, a), p.length == 1 && g());return this;
  }function d() {
    var a = _H;a.loader = { load: e, i: 0 };return a;
  }var l = b.documentElement,
      m = a.setTimeout,
      n = b.getElementsByTagName("script")[0],
      o = {}.toString,
      p = [],
      q = 0,
      r = "MozAppearance" in l.style,
      s = r && !!b.createRange().compareNode,
      t = r && !s,
      u = s ? l : n.parentNode,
      v = a.opera && o.call(a.opera) == "[object Opera]",
      w = "webkitAppearance" in l.style,
      x = w && "async" in b.createElement("script"),
      y = r ? "object" : v || x ? "img" : "script",
      z = w ? "img" : y,
      A = Array.isArray || function (a) {
    return o.call(a) == "[object Array]";
  },
      B = function B(a) {
    return Object(a) === a;
  },
      C = function C(a) {
    return typeof a == "string";
  },
      D = function D(a) {
    return o.call(a) == "[object Function]";
  },
      E = [],
      F = {},
      _G,
      _H;_H = function H(a) {
    function f(a) {
      var b = a.split("!"),
          c = E.length,
          d = b.pop(),
          e = b.length,
          f = { url: d, origUrl: d, prefixes: b },
          g,
          h;for (h = 0; h < e; h++) {
        g = F[b[h]], g && (f = g(f));
      }for (h = 0; h < c; h++) {
        f = E[h](f);
      }return f;
    }function e(a, b, e, g, h) {
      var i = f(a),
          j = i.autoCallback;if (!i.bypass) {
        b && (b = D(b) ? b : b[a] || b[g] || b[a.split("/").pop().split("?")[0]]);if (i.instead) return i.instead(a, b, e, g, h);e.load(i.url, i.forceCSS || !i.forceJS && /css$/.test(i.url) ? "c" : c, i.noexec), (D(b) || D(j)) && e.load(function () {
          d(), b && b(i.origUrl, h, g), j && j(i.origUrl, h, g);
        });
      }
    }function b(a, b) {
      function c(a) {
        if (C(a)) e(a, h, b, 0, d);else if (B(a)) for (i in a) {
          a.hasOwnProperty(i) && e(a[i], h, b, i, d);
        }
      }var d = !!a.test,
          f = d ? a.yep : a.nope,
          g = a.load || a.both,
          h = a.callback,
          i;c(f), c(g), a.complete && b.load(a.complete);
    }var g,
        h,
        i = this.yepnope.loader;if (C(a)) e(a, 0, i, 0);else if (A(a)) for (g = 0; g < a.length; g++) {
      h = a[g], C(h) ? e(h, 0, i, 0) : A(h) ? _H(h) : B(h) && b(h, i);
    } else B(a) && b(a, i);
  }, _H.addPrefix = function (a, b) {
    F[a] = b;
  }, _H.addFilter = function (a) {
    E.push(a);
  }, _H.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", _G = function G() {
    b.removeEventListener("DOMContentLoaded", _G, 0), b.readyState = "complete";
  }, 0)), a.yepnope = d();
}(undefined, undefined.document), Modernizr.load = function () {
  yepnope.apply(window, [].slice.call(arguments, 0));
};
});

require.register("views/words/faster/presentation.js", function(exports, require, module) {
'use strict';

/*!
Deck JS - deck.core
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
The deck.core module provides all the basic functionality for creating and
moving through a deck.  It does so by applying classes to indicate the state of
the deck and its slides, allowing CSS to take care of the visual representation
of each state.  It also provides methods for navigating the deck and inspecting
its state, as well as basic key bindings for going to the next and previous
slides.  More functionality is provided by wholly separate extension modules
that use the API provided by core.
*/
(function ($, deck, document, undefined) {
	var slides,
	    // Array of all the uh, slides...
	current,
	    // Array index of the current slide
	$container,
	    // Keeping this cached

	events = {
		/*
  This event fires whenever the current slide changes, whether by way of
  next, prev, or go. The callback function is passed two parameters, from
  and to, equal to the indices of the old slide and the new slide
  respectively. If preventDefault is called on the event within this handler
  the slide change does not occur.
  
  $(document).bind('deck.change', function(event, from, to) {
     alert('Moving from slide ' + from + ' to ' + to);
  });
  */
		change: 'deck.change',

		/*
  This event fires at the beginning of deck initialization, after the options
  are set but before the slides array is created.  This event makes a good hook
  for preprocessing extensions looking to modify the deck.
  */
		beforeInitialize: 'deck.beforeInit',

		/*
  This event fires at the end of deck initialization. Extensions should
  implement any code that relies on user extensible options (key bindings,
  element selectors, classes) within a handler for this event. Native
  events associated with Deck JS should be scoped under a .deck event
  namespace, as with the example below:
  
  var $d = $(document);
  $.deck.defaults.keys.myExtensionKeycode = 70; // 'h'
  $d.bind('deck.init', function() {
     $d.bind('keydown.deck', function(event) {
        if (event.which === $.deck.getOptions().keys.myExtensionKeycode) {
           // Rock out
        }
     });
  });
  */
		initialize: 'deck.init'
	},
	    options = {},
	    $d = $(document),


	/*
 Internal function. Updates slide and container classes based on which
 slide is the current slide.
 */
	updateStates = function updateStates() {
		var oc = options.classes,
		    osc = options.selectors.container,
		    old = $container.data('onSlide'),
		    $all = $();

		// Container state
		$container.removeClass(oc.onPrefix + old).addClass(oc.onPrefix + current).data('onSlide', current);

		// Remove and re-add child-current classes for nesting
		$('.' + oc.current).parentsUntil(osc).removeClass(oc.childCurrent);
		slides[current].parentsUntil(osc).addClass(oc.childCurrent);

		// Remove previous states
		$.each(slides, function (i, el) {
			$all = $all.add(el);
		});
		$all.removeClass([oc.before, oc.previous, oc.current, oc.next, oc.after].join(" "));

		// Add new states back in
		slides[current].addClass(oc.current);
		if (current > 0) {
			slides[current - 1].addClass(oc.previous);
		}
		if (current + 1 < slides.length) {
			slides[current + 1].addClass(oc.next);
		}
		if (current > 1) {
			$.each(slides.slice(0, current - 1), function (i, el) {
				el.addClass(oc.before);
			});
		}
		if (current + 2 < slides.length) {
			$.each(slides.slice(current + 2), function (i, el) {
				el.addClass(oc.after);
			});
		}
	},


	/* Methods exposed in the jQuery.deck namespace */
	methods = {

		/*
  jQuery.deck(selector, options)
  
  selector: string | jQuery | array
  options: object, optional
  		
  Initializes the deck, using each element matched by selector as a slide.
  May also be passed an array of string selectors or jQuery objects, in
  which case each selector in the array is considered a slide. The second
  parameter is an optional options object which will extend the default
  values.
  
  $.deck('.slide');
  
  or
  
  $.deck([
     '#first-slide',
     '#second-slide',
     '#etc'
  ]);
  */
		init: function init(elements, opts) {
			var startTouch,
			    tolerance,
			    esp = function esp(e) {
				e.stopPropagation();
			};

			options = $.extend(true, {}, $[deck].defaults, opts);
			slides = [];
			current = 0;
			$container = $(options.selectors.container);
			tolerance = options.touch.swipeTolerance;

			// Pre init event for preprocessing hooks
			$d.trigger(events.beforeInitialize);

			// Hide the deck while states are being applied to kill transitions
			$container.addClass(options.classes.loading);

			// Fill slides array depending on parameter type
			if ($.isArray(elements)) {
				$.each(elements, function (i, e) {
					slides.push($(e));
				});
			} else {
				$(elements).each(function (i, e) {
					slides.push($(e));
				});
			}

			/* Remove any previous bindings, and rebind key events */
			$d.unbind('keydown.deck').bind('keydown.deck', function (e) {
				if (e.which === options.keys.next || $.inArray(e.which, options.keys.next) > -1) {
					methods.next();
					e.preventDefault();
				} else if (e.which === options.keys.previous || $.inArray(e.which, options.keys.previous) > -1) {
					methods.prev();
					e.preventDefault();
				}
			});

			/* Bind touch events for swiping between slides on touch devices */
			$container.unbind('touchstart.deck').bind('touchstart.deck', function (e) {
				if (!startTouch) {
					startTouch = $.extend({}, e.originalEvent.targetTouches[0]);
				}
			}).unbind('touchmove.deck').bind('touchmove.deck', function (e) {
				$.each(e.originalEvent.changedTouches, function (i, t) {
					if (startTouch && t.identifier === startTouch.identifier) {
						if (t.screenX - startTouch.screenX > tolerance || t.screenY - startTouch.screenY > tolerance) {
							$[deck]('prev');
							startTouch = undefined;
						} else if (t.screenX - startTouch.screenX < -1 * tolerance || t.screenY - startTouch.screenY < -1 * tolerance) {
							$[deck]('next');
							startTouch = undefined;
						}
						return false;
					}
				});
				e.preventDefault();
			}).unbind('touchend.deck').bind('touchend.deck', function (t) {
				$.each(t.originalEvent.changedTouches, function (i, t) {
					if (startTouch && t.identifier === startTouch.identifier) {
						startTouch = undefined;
					}
				});
			}).scrollLeft(0).scrollTop(0)
			/* Stop propagation of key events within editable elements of slides */
			.undelegate('input, textarea, select, button, meter, progress, [contentEditable]', 'keydown', esp).delegate('input, textarea, select, button, meter, progress, [contentEditable]', 'keydown', esp);

			/*
   Kick iframe videos, which dont like to redraw w/ transforms.
   Remove this if Webkit ever fixes it.
    */
			$.each(slides, function (i, $el) {
				$el.unbind('webkitTransitionEnd.deck').bind('webkitTransitionEnd.deck', function (event) {
					if ($el.hasClass($[deck]('getOptions').classes.current)) {
						var embeds = $(this).find('iframe').css('opacity', 0);
						window.setTimeout(function () {
							embeds.css('opacity', 1);
						}, 100);
					}
				});
			});

			if (slides.length) {
				updateStates();
			}

			// Show deck again now that slides are in place
			$container.removeClass(options.classes.loading);
			$d.trigger(events.initialize);
		},

		/*
  jQuery.deck('go', index)
  
  index: integer | string
  
  Moves to the slide at the specified index if index is a number. Index is
  0-based, so $.deck('go', 0); will move to the first slide. If index is a
  string this will move to the slide with the specified id. If index is out
  of bounds or doesn't match a slide id the call is ignored.
  */
		go: function go(index) {
			var e = $.Event(events.change),
			    ndx;

			/* Number index, easy. */
			if (typeof index === 'number' && index >= 0 && index < slides.length) {
				ndx = index;
			}
			/* Id string index, search for it and set integer index */
			else if (typeof index === 'string') {
					$.each(slides, function (i, $slide) {
						if ($slide.attr('id') === index) {
							ndx = i;
							return false;
						}
					});
				};

			/* Out of bounds, id doesn't exist, illegal input, eject */
			if (typeof ndx === 'undefined') return;

			$d.trigger(e, [current, ndx]);
			if (e.isDefaultPrevented()) {
				/* Trigger the event again and undo the damage done by extensions. */
				$d.trigger(events.change, [ndx, current]);
			} else {
				current = ndx;
				updateStates();
			}
		},

		/*
  jQuery.deck('next')
  
  Moves to the next slide. If the last slide is already active, the call
  is ignored.
  */
		next: function next() {
			methods.go(current + 1);
		},

		/*
  jQuery.deck('prev')
  
  Moves to the previous slide. If the first slide is already active, the
  call is ignored.
  */
		prev: function prev() {
			methods.go(current - 1);
		},

		/*
  jQuery.deck('getSlide', index)
  
  index: integer, optional
  
  Returns a jQuery object containing the slide at index. If index is not
  specified, the current slide is returned.
  */
		getSlide: function getSlide(index) {
			var i = typeof index !== 'undefined' ? index : current;
			if (typeof i != 'number' || i < 0 || i >= slides.length) return null;
			return slides[i];
		},

		/*
  jQuery.deck('getSlides')
  
  Returns all slides as an array of jQuery objects.
  */
		getSlides: function getSlides() {
			return slides;
		},

		/*
  jQuery.deck('getContainer')
  
  Returns a jQuery object containing the deck container as defined by the
  container option.
  */
		getContainer: function getContainer() {
			return $container;
		},

		/*
  jQuery.deck('getOptions')
  
  Returns the options object for the deck, including any overrides that
  were defined at initialization.
  */
		getOptions: function getOptions() {
			return options;
		},

		/*
  jQuery.deck('extend', name, method)
  
  name: string
  method: function
  
  Adds method to the deck namespace with the key of name. This doesn’t
  give access to any private member data — public methods must still be
  used within method — but lets extension authors piggyback on the deck
  namespace rather than pollute jQuery.
  
  $.deck('extend', 'alert', function(msg) {
     alert(msg);
  });
  	// Alerts 'boom'
  $.deck('alert', 'boom');
  */
		extend: function extend(name, method) {
			methods[name] = method;
		}
	};

	/* jQuery extension */
	$[deck] = function (method, arg) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			return methods.init(method, arg);
		}
	};

	/*
 The default settings object for a deck. All deck extensions should extend
 this object to add defaults for any of their options.
 
 options.classes.after
 	This class is added to all slides that appear after the 'next' slide.
 
 options.classes.before
 	This class is added to all slides that appear before the 'previous'
 	slide.
 	
 options.classes.childCurrent
 	This class is added to all elements in the DOM tree between the
 	'current' slide and the deck container. For standard slides, this is
 	mostly seen and used for nested slides.
 	
 options.classes.current
 	This class is added to the current slide.
 	
 options.classes.loading
 	This class is applied to the deck container during loading phases and is
 	primarily used as a way to short circuit transitions between states
 	where such transitions are distracting or unwanted.  For example, this
 	class is applied during deck initialization and then removed to prevent
 	all the slides from appearing stacked and transitioning into place
 	on load.
 	
 options.classes.next
 	This class is added to the slide immediately following the 'current'
 	slide.
 	
 options.classes.onPrefix
 	This prefix, concatenated with the current slide index, is added to the
 	deck container as you change slides.
 	
 options.classes.previous
 	This class is added to the slide immediately preceding the 'current'
 	slide.
 	
 options.selectors.container
 	Elements matched by this CSS selector will be considered the deck
 	container. The deck container is used to scope certain states of the
 	deck, as with the onPrefix option, or with extensions such as deck.goto
 	and deck.menu.
 	
 options.keys.next
 	The numeric keycode used to go to the next slide.
 	
 options.keys.previous
 	The numeric keycode used to go to the previous slide.
 	
 options.touch.swipeTolerance
 	The number of pixels the users finger must travel to produce a swipe
 	gesture.
 */
	$[deck].defaults = {
		classes: {
			after: 'deck-after',
			before: 'deck-before',
			childCurrent: 'deck-child-current',
			current: 'deck-current',
			loading: 'deck-loading',
			next: 'deck-next',
			onPrefix: 'on-slide-',
			previous: 'deck-previous'
		},

		selectors: {
			container: '.deck-container'
		},

		keys: {
			// enter, space, page down, right arrow, down arrow,
			next: [13, 32, 34, 39, 40],
			// backspace, page up, left arrow, up arrow
			previous: [8, 33, 37, 38]
		},

		touch: {
			swipeTolerance: 60
		}
	};

	$d.ready(function () {
		$('html').addClass('ready');
	});

	/*
 FF + Transforms + Flash video don't get along...
 Firefox will reload and start playing certain videos after a
 transform.  Blanking the src when a previously shown slide goes out
 of view prevents this.
 */
	$d.bind('deck.change', function (e, from, to) {
		var oldFrames = $[deck]('getSlide', from).find('iframe'),
		    newFrames = $[deck]('getSlide', to).find('iframe');

		oldFrames.each(function () {
			var $this = $(this),
			    curSrc = $this.attr('src');

			if (curSrc) {
				$this.data('deck-src', curSrc).attr('src', '');
			}
		});

		newFrames.each(function () {
			var $this = $(this),
			    originalSrc = $this.data('deck-src');

			if (originalSrc) {
				$this.attr('src', originalSrc);
			}
		});
	});
})(jQuery, 'deck', document);

/*!
Deck JS - deck.goto
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds the necessary methods and key bindings to show and hide a form
for jumping to any slide number/id in the deck (and processes that form
accordingly). The form-showing state is indicated by the presence of a class on
the deck container.
*/
(function ($, deck, undefined) {
	var $d = $(document);

	/*
 Extends defaults/options.
 
 options.classes.goto
 	This class is added to the deck container when showing the Go To Slide
 	form.
 	
 options.selectors.gotoDatalist
 	The element that matches this selector is the datalist element that will
 	be populated with options for each of the slide ids.  In browsers that
 	support the datalist element, this provides a drop list of slide ids to
 	aid the user in selecting a slide.
 	
 options.selectors.gotoForm
 	The element that matches this selector is the form that is submitted
 	when a user hits enter after typing a slide number/id in the gotoInput
 	element.
 
 options.selectors.gotoInput
 	The element that matches this selector is the text input field for
 	entering a slide number/id in the Go To Slide form.
 	
 options.keys.goto
 	The numeric keycode used to show the Go To Slide form.
 	
 options.countNested
 	If false, only top level slides will be counted when entering a
 	slide number.
 */
	$.extend(true, $[deck].defaults, {
		classes: {
			goto: 'deck-goto'
		},

		selectors: {
			gotoDatalist: '#goto-datalist',
			gotoForm: '.goto-form',
			gotoInput: '#goto-slide'
		},

		keys: {
			goto: 71 // g
		},

		countNested: true
	});

	/*
 jQuery.deck('showGoTo')
 
 Shows the Go To Slide form by adding the class specified by the goto class
 option to the deck container.
 */
	$[deck]('extend', 'showGoTo', function () {
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.goto);
		$($[deck]('getOptions').selectors.gotoInput).focus();
	});

	/*
 jQuery.deck('hideGoTo')
 
 Hides the Go To Slide form by removing the class specified by the goto class
 option from the deck container.
 */
	$[deck]('extend', 'hideGoTo', function () {
		$($[deck]('getOptions').selectors.gotoInput).blur();
		$[deck]('getContainer').removeClass($[deck]('getOptions').classes.goto);
	});

	/*
 jQuery.deck('toggleGoTo')
 
 Toggles between showing and hiding the Go To Slide form.
 */
	$[deck]('extend', 'toggleGoTo', function () {
		$[deck]($[deck]('getContainer').hasClass($[deck]('getOptions').classes.goto) ? 'hideGoTo' : 'showGoTo');
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions'),
		    $datalist = $(opts.selectors.gotoDatalist),
		    slideTest = $.map([opts.classes.before, opts.classes.previous, opts.classes.current, opts.classes.next, opts.classes.after], function (el, i) {
			return '.' + el;
		}).join(', '),
		    rootCounter = 1;

		// Bind key events
		$d.unbind('keydown.deckgoto').bind('keydown.deckgoto', function (e) {
			var key = $[deck]('getOptions').keys.goto;

			if (e.which === key || $.inArray(e.which, key) > -1) {
				e.preventDefault();
				$[deck]('toggleGoTo');
			}
		});

		/* Populate datalist and work out countNested*/
		$.each($[deck]('getSlides'), function (i, $slide) {
			var id = $slide.attr('id'),
			    $parentSlides = $slide.parentsUntil(opts.selectors.container, slideTest);

			if (id) {
				$datalist.append('<option value="' + id + '">');
			}

			if ($parentSlides.length) {
				$slide.removeData('rootIndex');
			} else if (!opts.countNested) {
				$slide.data('rootIndex', rootCounter);
				++rootCounter;
			}
		});

		// Process form submittal, go to the slide entered
		$(opts.selectors.gotoForm).unbind('submit.deckgoto').bind('submit.deckgoto', function (e) {
			var $field = $($[deck]('getOptions').selectors.gotoInput),
			    ndx = parseInt($field.val(), 10);

			if (!$[deck]('getOptions').countNested) {
				if (ndx >= rootCounter) return false;
				$.each($[deck]('getSlides'), function (i, $slide) {
					if ($slide.data('rootIndex') === ndx) {
						ndx = i + 1;
						return false;
					}
				});
			}

			$[deck]('go', isNaN(ndx) ? $field.val() : ndx - 1);
			$[deck]('hideGoTo');
			$field.val('');

			e.preventDefault();
		});

		// Dont let keys in the input trigger deck actions
		$(opts.selectors.gotoInput).unbind('keydown.deckgoto').bind('keydown.deckgoto', function (e) {
			e.stopPropagation();
		});
	});
})(jQuery, 'deck');

/*!
Deck JS - deck.hash
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds deep linking to individual slides, enables internal links
to slides within decks, and updates the address bar with the hash as the user
moves through the deck. A permalink anchor is also updated. Standard themes
hide this link in browsers that support the History API, and show it for
those that do not. Slides that do not have an id are assigned one according to
the hashPrefix option. In addition to the on-slide container state class
kept by core, this module adds an on-slide state class that uses the id of each
slide.
*/
(function ($, deck, window, undefined) {
	var $d = $(document),
	    $window = $(window),


	/* Collection of internal fragment links in the deck */
	$internals,


	/*
 Internal only function.  Given a string, extracts the id from the hash,
 matches it to the appropriate slide, and navigates there.
 */
	goByHash = function goByHash(str) {
		var id = str.substr(str.indexOf("#") + 1),
		    slides = $[deck]('getSlides');

		$.each(slides, function (i, $el) {
			if ($el.attr('id') === id) {
				$[deck]('go', i);
				return false;
			}
		});

		// If we don't set these to 0 the container scrolls due to hashchange
		$[deck]('getContainer').scrollLeft(0).scrollTop(0);
	};

	/*
 Extends defaults/options.
 
 options.selectors.hashLink
 	The element matching this selector has its href attribute updated to
 	the hash of the current slide as the user navigates through the deck.
 	
 options.hashPrefix
 	Every slide that does not have an id is assigned one at initialization.
 	Assigned ids take the form of hashPrefix + slideIndex, e.g., slide-0,
 	slide-12, etc.
 	options.preventFragmentScroll
 	When deep linking to a hash of a nested slide, this scrolls the deck
 	container to the top, undoing the natural browser behavior of scrolling
 	to the document fragment on load.
 */
	$.extend(true, $[deck].defaults, {
		selectors: {
			hashLink: '.deck-permalink'
		},

		hashPrefix: 'slide-',
		preventFragmentScroll: true
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions');
		$internals = $(), slides = $[deck]('getSlides');

		$.each(slides, function (i, $el) {
			var hash;

			/* Hand out ids to the unfortunate slides born without them */
			if (!$el.attr('id') || $el.data('deckAssignedId') === $el.attr('id')) {
				$el.attr('id', opts.hashPrefix + i);
				$el.data('deckAssignedId', opts.hashPrefix + i);
			}

			hash = '#' + $el.attr('id');

			/* Deep link to slides on init */
			if (hash === window.location.hash) {
				$[deck]('go', i);
			}

			/* Add internal links to this slide */
			$internals = $internals.add('a[href="' + hash + '"]');
		});

		if (!Modernizr.hashchange) {
			/* Set up internal links using click for the poor browsers
   without a hashchange event. */
			$internals.unbind('click.deckhash').bind('click.deckhash', function (e) {
				goByHash($(this).attr('href'));
			});
		}

		/* Set up first id container state class */
		if (slides.length) {
			$[deck]('getContainer').addClass(opts.classes.onPrefix + $[deck]('getSlide').attr('id'));
		};
	})
	/* Update permalink, address bar, and state class on a slide change */
	.bind('deck.change', function (e, from, to) {
		var hash = '#' + $[deck]('getSlide', to).attr('id'),
		    opts = $[deck]('getOptions'),
		    osp = opts.classes.onPrefix,
		    $c = $[deck]('getContainer');

		$c.removeClass(osp + $[deck]('getSlide', from).attr('id'));
		$c.addClass(osp + $[deck]('getSlide', to).attr('id'));

		$(opts.selectors.hashLink).attr('href', hash);
		if (Modernizr.history) {
			window.history.replaceState({}, "", hash);
		}
	});

	/* Deals with internal links in modern browsers */
	$window.bind('hashchange.deckhash', function (e) {
		if (e.originalEvent && e.originalEvent.newURL) {
			goByHash(e.originalEvent.newURL);
		} else {
			goByHash(window.location.hash);
		}
	})
	/* Prevent scrolling on deep links */
	.bind('load', function () {
		if ($[deck]('getOptions').preventFragmentScroll) {
			$[deck]('getContainer').scrollLeft(0).scrollTop(0);
		}
	});
})(jQuery, 'deck', undefined);
/*!
Deck JS - deck.menu
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds the methods and key binding to show and hide a menu of all
slides in the deck. The deck menu state is indicated by the presence of a class
on the deck container.
*/
(function ($, deck, undefined) {
	var $d = $(document),
	    rootSlides; // Array of top level slides

	/*
 Extends defaults/options.
 
 options.classes.menu
 	This class is added to the deck container when showing the slide menu.
 
 options.keys.menu
 	The numeric keycode used to toggle between showing and hiding the slide
 	menu.
 	
 options.touch.doubletapWindow
 	Two consecutive touch events within this number of milliseconds will
 	be considered a double tap, and will toggle the menu on touch devices.
 */
	$.extend(true, $[deck].defaults, {
		classes: {
			menu: 'deck-menu'
		},

		keys: {
			menu: 77 // m
		},

		touch: {
			doubletapWindow: 400
		}
	});

	/*
 jQuery.deck('showMenu')
 
 Shows the slide menu by adding the class specified by the menu class option
 to the deck container.
 */
	$[deck]('extend', 'showMenu', function () {
		var $c = $[deck]('getContainer'),
		    opts = $[deck]('getOptions');

		if ($c.hasClass(opts.classes.menu)) return;

		// Hide through loading class to short-circuit transitions (perf)
		$c.addClass([opts.classes.loading, opts.classes.menu].join(' '));

		/* Forced to do this in JS until CSS learns second-grade math. Save old
  style value for restoration when menu is hidden. */
		if (Modernizr.csstransforms) {
			$.each(rootSlides, function (i, $slide) {
				$slide.data('oldStyle', $slide.attr('style'));
				$slide.css({
					'position': 'absolute',
					'left': i % 4 * 25 + '%',
					'top': Math.floor(i / 4) * 25 + '%'
				});
			});
		}

		// Need to ensure the loading class renders first, then remove
		window.setTimeout(function () {
			$c.removeClass(opts.classes.loading).scrollTop($[deck]('getSlide').offset().top);
		}, 0);
	});

	/*
 jQuery.deck('hideMenu')
 
 Hides the slide menu by removing the class specified by the menu class
 option from the deck container.
 */
	$[deck]('extend', 'hideMenu', function () {
		var $c = $[deck]('getContainer'),
		    opts = $[deck]('getOptions');

		if (!$c.hasClass(opts.classes.menu)) return;

		$c.removeClass(opts.classes.menu);
		$c.addClass(opts.classes.loading);

		/* Restore old style value */
		if (Modernizr.csstransforms) {
			$.each(rootSlides, function (i, $slide) {
				var oldStyle = $slide.data('oldStyle');

				$slide.attr('style', oldStyle ? oldStyle : '');
			});
		}

		window.setTimeout(function () {
			$c.removeClass(opts.classes.loading).scrollTop(0);
		}, 0);
	});

	/*
 jQuery.deck('toggleMenu')
 
 Toggles between showing and hiding the slide menu.
 */
	$[deck]('extend', 'toggleMenu', function () {
		$[deck]('getContainer').hasClass($[deck]('getOptions').classes.menu) ? $[deck]('hideMenu') : $[deck]('showMenu');
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions'),
		    touchEndTime = 0,
		    currentSlide,
		    slideTest = $.map([opts.classes.before, opts.classes.previous, opts.classes.current, opts.classes.next, opts.classes.after], function (el, i) {
			return '.' + el;
		}).join(', ');

		// Build top level slides array
		rootSlides = [];
		$.each($[deck]('getSlides'), function (i, $el) {
			if (!$el.parentsUntil(opts.selectors.container, slideTest).length) {
				rootSlides.push($el);
			}
		});

		// Bind key events
		$d.unbind('keydown.deckmenu').bind('keydown.deckmenu', function (e) {
			if (e.which === opts.keys.menu || $.inArray(e.which, opts.keys.menu) > -1) {
				$[deck]('toggleMenu');
				e.preventDefault();
			}
		});

		// Double tap to toggle slide menu for touch devices
		$[deck]('getContainer').unbind('touchstart.deckmenu').bind('touchstart.deckmenu', function (e) {
			currentSlide = $[deck]('getSlide');
		}).unbind('touchend.deckmenu').bind('touchend.deckmenu', function (e) {
			var now = Date.now();

			// Ignore this touch event if it caused a nav change (swipe)
			if (currentSlide !== $[deck]('getSlide')) return;

			if (now - touchEndTime < opts.touch.doubletapWindow) {
				$[deck]('toggleMenu');
				e.preventDefault();
			}
			touchEndTime = now;
		});

		// Selecting slides from the menu
		$.each($[deck]('getSlides'), function (i, $s) {
			$s.unbind('click.deckmenu').bind('click.deckmenu', function (e) {
				if (!$[deck]('getContainer').hasClass(opts.classes.menu)) return;

				$[deck]('go', i);
				$[deck]('hideMenu');
				e.stopPropagation();
				e.preventDefault();
			});
		});
	}).bind('deck.change', function (e, from, to) {
		var container = $[deck]('getContainer');

		if (container.hasClass($[deck]('getOptions').classes.menu)) {
			container.scrollTop($[deck]('getSlide', to).offset().top);
		}
	});
})(jQuery, 'deck');

/*!
Deck JS - deck.navigation
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds clickable previous and next links to the deck.
*/
(function ($, deck, undefined) {
	var $d = $(document),


	/* Updates link hrefs, and disabled states if last/first slide */
	updateButtons = function updateButtons(e, from, to) {
		var opts = $[deck]('getOptions'),
		    last = $[deck]('getSlides').length - 1,
		    prevSlide = $[deck]('getSlide', to - 1),
		    nextSlide = $[deck]('getSlide', to + 1),
		    prevId = prevSlide ? prevSlide.attr('id') : undefined;
		nextId = nextSlide ? nextSlide.attr('id') : undefined;

		$(opts.selectors.previousLink).toggleClass(opts.classes.navDisabled, !to).attr('href', '#' + (prevId ? prevId : ''));
		$(opts.selectors.nextLink).toggleClass(opts.classes.navDisabled, to === last).attr('href', '#' + (nextId ? nextId : ''));
	};

	/*
 Extends defaults/options.
 
 options.classes.navDisabled
 	This class is added to a navigation link when that action is disabled.
 	It is added to the previous link when on the first slide, and to the
 	next link when on the last slide.
 	
 options.selectors.nextLink
 	The elements that match this selector will move the deck to the next
 	slide when clicked.
 	
 options.selectors.previousLink
 	The elements that match this selector will move to deck to the previous
 	slide when clicked.
 */
	$.extend(true, $[deck].defaults, {
		classes: {
			navDisabled: 'deck-nav-disabled'
		},

		selectors: {
			nextLink: '.deck-next-link',
			previousLink: '.deck-prev-link'
		}
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions'),
		    slides = $[deck]('getSlides'),
		    $current = $[deck]('getSlide'),
		    ndx;

		// Setup prev/next link events
		$(opts.selectors.previousLink).unbind('click.decknavigation').bind('click.decknavigation', function (e) {
			$[deck]('prev');
			e.preventDefault();
		});

		$(opts.selectors.nextLink).unbind('click.decknavigation').bind('click.decknavigation', function (e) {
			$[deck]('next');
			e.preventDefault();
		});

		// Find where we started in the deck and set initial states
		$.each(slides, function (i, $slide) {
			if ($slide === $current) {
				ndx = i;
				return false;
			}
		});
		updateButtons(null, ndx, ndx);
	}).bind('deck.change', updateButtons);
})(jQuery, 'deck');

/*!
Deck JS - deck.scale
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds automatic scaling to the deck.  Slides are scaled down
using CSS transforms to fit within the deck container. If the container is
big enough to hold the slides without scaling, no scaling occurs. The user
can disable and enable scaling with a keyboard shortcut.

Note: CSS transforms may make Flash videos render incorrectly.  Presenters
that need to use video may want to disable scaling to play them.  HTML5 video
works fine.
*/
(function ($, deck, window, undefined) {
	var $d = $(document),
	    $w = $(window),
	    baseHeight,
	    // Value to scale against
	timer,
	    // Timeout id for debouncing
	rootSlides,


	/*
 Internal function to do all the dirty work of scaling the slides.
 */
	scaleDeck = function scaleDeck() {
		var opts = $[deck]('getOptions'),
		    obh = opts.baseHeight,
		    $container = $[deck]('getContainer'),
		    baseHeight = obh ? obh : $container.height();

		// Scale each slide down if necessary (but don't scale up)
		$.each(rootSlides, function (i, $slide) {
			var slideHeight = $slide.innerHeight(),
			    $scaler = $slide.find('.' + opts.classes.scaleSlideWrapper),
			    scale = $container.hasClass(opts.classes.scale) ? baseHeight / slideHeight : 1;

			$.each('Webkit Moz O ms Khtml'.split(' '), function (i, prefix) {
				if (scale === 1) {
					$scaler.css(prefix + 'Transform', '');
				} else {
					$scaler.css(prefix + 'Transform', 'scale(' + scale + ')');
				}
			});
		});
	};

	/*
 Extends defaults/options.
 	options.classes.scale
 	This class is added to the deck container when scaling is enabled.
 	It is enabled by default when the module is included.
 
 options.classes.scaleSlideWrapper
 	Scaling is done using a wrapper around the contents of each slide. This
 	class is applied to that wrapper.
 	options.keys.scale
 	The numeric keycode used to toggle enabling and disabling scaling.
 	options.baseHeight
 	When baseHeight is falsy, as it is by default, the deck is scaled in
 	proportion to the height of the deck container. You may instead specify
 	a height as a number of px, and slides will be scaled against this
 	height regardless of the container size.
 	options.scaleDebounce
 	Scaling on the browser resize event is debounced. This number is the
 	threshold in milliseconds. You can learn more about debouncing here:
 	http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			scale: 'deck-scale',
			scaleSlideWrapper: 'deck-slide-scaler'
		},

		keys: {
			scale: 83 // s
		},

		baseHeight: null,
		scaleDebounce: 200
	});

	/*
 jQuery.deck('disableScale')
 	Disables scaling and removes the scale class from the deck container.
 */
	$[deck]('extend', 'disableScale', function () {
		$[deck]('getContainer').removeClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});

	/*
 jQuery.deck('enableScale')
 	Enables scaling and adds the scale class to the deck container.
 */
	$[deck]('extend', 'enableScale', function () {
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});

	/*
 jQuery.deck('toggleScale')
 	Toggles between enabling and disabling scaling.
 */
	$[deck]('extend', 'toggleScale', function () {
		var $c = $[deck]('getContainer');
		$[deck]($c.hasClass($[deck]('getOptions').classes.scale) ? 'disableScale' : 'enableScale');
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions'),
		    slideTest = $.map([opts.classes.before, opts.classes.previous, opts.classes.current, opts.classes.next, opts.classes.after], function (el, i) {
			return '.' + el;
		}).join(', ');

		// Build top level slides array
		rootSlides = [];
		$.each($[deck]('getSlides'), function (i, $el) {
			if (!$el.parentsUntil(opts.selectors.container, slideTest).length) {
				rootSlides.push($el);
			}
		});

		// Use a wrapper on each slide to handle content scaling
		$.each(rootSlides, function (i, $slide) {
			$slide.children().wrapAll('<div class="' + opts.classes.scaleSlideWrapper + '"/>');
		});

		// Debounce the resize scaling
		$w.unbind('resize.deckscale').bind('resize.deckscale', function () {
			window.clearTimeout(timer);
			timer = window.setTimeout(scaleDeck, opts.scaleDebounce);
		})
		// Scale once on load, in case images or something change layout
		.unbind('load.deckscale').bind('load.deckscale', scaleDeck);

		// Bind key events
		$d.unbind('keydown.deckscale').bind('keydown.deckscale', function (e) {
			if (e.which === opts.keys.scale || $.inArray(e.which, opts.keys.scale) > -1) {
				$[deck]('toggleScale');
				e.preventDefault();
			}
		});

		// Enable scale on init
		$[deck]('enableScale');
	});
})(jQuery, 'deck', undefined);

/*!
Deck JS - deck.status
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds a (current)/(total) style status indicator to the deck.
*/
(function ($, deck, undefined) {
	var $d = $(document),
	    updateCurrent = function updateCurrent(e, from, to) {
		var opts = $[deck]('getOptions');

		$(opts.selectors.statusCurrent).text(opts.countNested ? to + 1 : $[deck]('getSlide', to).data('rootSlide'));
	};

	/*
 Extends defaults/options.
 
 options.selectors.statusCurrent
 	The element matching this selector displays the current slide number.
 	
 options.selectors.statusTotal
 	The element matching this selector displays the total number of slides.
 	
 options.countNested
 	If false, only top level slides will be counted in the current and
 	total numbers.
 */
	$.extend(true, $[deck].defaults, {
		selectors: {
			statusCurrent: '.deck-status-current',
			statusTotal: '.deck-status-total'
		},

		countNested: true
	});

	$d.bind('deck.init', function () {
		var opts = $[deck]('getOptions'),
		    slides = $[deck]('getSlides'),
		    $current = $[deck]('getSlide'),
		    ndx;

		// Set total slides once
		if (opts.countNested) {
			$(opts.selectors.statusTotal).text(slides.length);
		} else {
			/* Determine root slides by checking each slide's ancestor tree for
   any of the slide classes. */
			var rootIndex = 1,
			    slideTest = $.map([opts.classes.before, opts.classes.previous, opts.classes.current, opts.classes.next, opts.classes.after], function (el, i) {
				return '.' + el;
			}).join(', ');

			/* Store the 'real' root slide number for use during slide changes. */
			$.each(slides, function (i, $el) {
				var $parentSlides = $el.parentsUntil(opts.selectors.container, slideTest);

				$el.data('rootSlide', $parentSlides.length ? $parentSlides.last().data('rootSlide') : rootIndex++);
			});

			$(opts.selectors.statusTotal).text(rootIndex - 1);
		}

		// Find where we started in the deck and set initial state
		$.each(slides, function (i, $el) {
			if ($el === $current) {
				ndx = i;
				return false;
			}
		});
		updateCurrent(null, ndx, ndx);
	})
	/* Update current slide number with each change event */
	.bind('deck.change', updateCurrent);
})(jQuery, 'deck');
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map