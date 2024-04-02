// https://chat.openai.com/share/876ac8da-902b-4ce5-80cc-0c392d80068e

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandingError = void 0;
exports.parse = n;
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function t(r, e, n, a) {
  var o = Error.call(this, r);
  return Object.setPrototypeOf && Object.setPrototypeOf(o, t.prototype), o.expected = e, o.found = n, o.location = a, o.name = "SyntaxError", o;
}
function r(t, r, e) {
  return e = e || " ", t.length > r ? t : (r -= t.length, t + (e += e.repeat(r)).slice(0, r));
}
function e(r, e) {
  var n,
    a,
    o,
    c,
    u = {},
    s = (e = void 0 !== e ? e : {}).grammarSource,
    i = {
      URI_Template: br
    },
    h = br,
    l = "!",
    f = "=",
    p = "]",
    A = "_",
    d = "~",
    F = "{",
    g = "}",
    x = "+",
    m = "#",
    C = ".",
    v = "/",
    y = ";",
    D = "?",
    b = "&",
    w = ",",
    E = "@",
    j = "|",
    $ = ":",
    L = "*",
    R = "%",
    k = "a",
    S = "b",
    O = "c",
    U = "d",
    V = "e",
    I = "f",
    N = /^[#-$]/,
    P = /^[&-;]/,
    B = /^[?-[]/,
    M = /^[a-z]/,
    _ = /^[1-9]/,
    z = /^[\xA0-\uD7FF]/,
    T = /^[\uF900-\uFDCF]/,
    Z = /^[\uFDF0-\uFFEF]/,
    q = /^[\u10000-\u1FFFD]/,
    G = /^[\u20000-\u2FFFD]/,
    H = /^[\u30000-\u3FFFD]/,
    J = /^[\u40000-\u4FFFD]/,
    K = /^[\u50000-\u5FFFD]/,
    Q = /^[\u60000-\u6FFFD]/,
    W = /^[\u70000-\u7FFFD]/,
    X = /^[\u80000-\u8FFFD]/,
    Y = /^[\u90000-\u9FFFD]/,
    tt = /^[\uA0000-\uAFFFD]/,
    rt = /^[\uB0000-\uBFFFD]/,
    et = /^[\uC0000-\uCFFFD]/,
    nt = /^[\uD0000-\uDFFFD]/,
    at = /^[\uE1000-\uEFFFD]/,
    ot = /^[\uE000-\uF8FF]/,
    ct = /^[\uF0000-\uFFFFD]/,
    ut = /^[\u100000-\u10FFFD]/,
    st = /^[A-Z]/,
    it = /^[0-9]/,
    ht = mr("!", !1),
    lt = Cr([["#", "$"]], !1, !1),
    ft = Cr([["&", ";"]], !1, !1),
    pt = mr("=", !1),
    At = Cr([["?", "["]], !1, !1),
    dt = mr("]", !1),
    Ft = mr("_", !1),
    gt = Cr([["a", "z"]], !1, !1),
    xt = mr("~", !1),
    mt = mr("{", !1),
    Ct = mr("}", !1),
    vt = mr("+", !1),
    yt = mr("#", !1),
    Dt = mr(".", !1),
    bt = mr("/", !1),
    wt = mr(";", !1),
    Et = mr("?", !1),
    jt = mr("&", !1),
    $t = mr(",", !1),
    Lt = mr("@", !1),
    Rt = mr("|", !1),
    kt = mr(":", !1),
    St = Cr([["1", "9"]], !1, !1),
    Ot = mr("*", !1),
    Ut = mr("%", !1),
    Vt = Cr([[" ", "퟿"]], !1, !1),
    It = Cr([["豈", "﷏"]], !1, !1),
    Nt = Cr([["ﷰ", "￯"]], !1, !1),
    Pt = Cr(["က", ["0", "῿"], "D"], !1, !1),
    Bt = Cr([" ", ["0", "⿿"], "D"], !1, !1),
    Mt = Cr(["　", ["0", "㿿"], "D"], !1, !1),
    _t = Cr(["䀀", ["0", "俿"], "D"], !1, !1),
    zt = Cr(["倀", ["0", "忿"], "D"], !1, !1),
    Tt = Cr(["怀", ["0", "濿"], "D"], !1, !1),
    Zt = Cr(["瀀", ["0", "翿"], "D"], !1, !1),
    qt = Cr(["耀", ["0", "迿"], "D"], !1, !1),
    Gt = Cr(["退", ["0", "鿿"], "D"], !1, !1),
    Ht = Cr(["ꀀ", ["0", "꿿"], "D"], !1, !1),
    Jt = Cr(["뀀", ["0", "뿿"], "D"], !1, !1),
    Kt = Cr(["쀀", ["0", "쿿"], "D"], !1, !1),
    Qt = Cr(["퀀", ["0", "\uDFFF"], "D"], !1, !1),
    Wt = Cr(["", ["0", ""], "D"], !1, !1),
    Xt = Cr([["", ""]], !1, !1),
    Yt = Cr(["", ["0", "￿"], "D"], !1, !1),
    tr = Cr(["က", "0", ["0", "ჿ"], "F", "D"], !1, !1),
    rr = Cr([["A", "Z"]], !1, !1),
    er = Cr([["0", "9"]], !1, !1),
    nr = mr("A", !0),
    ar = mr("B", !0),
    or = mr("C", !0),
    cr = mr("D", !0),
    ur = mr("E", !0),
    sr = mr("F", !0),
    ir = function ir(t, r) {
      return {
        operator: t,
        variables: r
      };
    },
    hr = function hr(t, r) {
      return r;
    },
    lr = function lr(t, r) {
      return [t].concat(_toConsumableArray(r));
    },
    fr = function fr(t, r) {
      return _objectSpread({
        name: t
      }, r);
    },
    pr = function pr(t) {
      return {
        maxLength: t
      };
    },
    Ar = function Ar() {
      return {
        explode: !0
      };
    },
    dr = 0,
    Fr = [{
      line: 1,
      column: 1
    }],
    gr = 0,
    xr = [];
  if ("startRule" in e) {
    if (!(e.startRule in i)) throw new Error("Can't start parsing from rule \"" + e.startRule + '".');
    h = i[e.startRule];
  }
  function mr(t, r) {
    return {
      type: "literal",
      text: t,
      ignoreCase: r
    };
  }
  function Cr(t, r, e) {
    return {
      type: "class",
      parts: t,
      inverted: r,
      ignoreCase: e
    };
  }
  function vr(t) {
    var e,
      n = Fr[t];
    if (n) return n;
    for (e = t - 1; !Fr[e];) e--;
    for (n = {
      line: (n = Fr[e]).line,
      column: n.column
    }; e < t;) 10 === r.charCodeAt(e) ? (n.line++, n.column = 1) : n.column++, e++;
    return Fr[t] = n, n;
  }
  function yr(t, r, e) {
    var n = vr(t),
      a = vr(r),
      o = {
        source: s,
        start: {
          offset: t,
          line: n.line,
          column: n.column
        },
        end: {
          offset: r,
          line: a.line,
          column: a.column
        }
      };
    return e && s && "function" == typeof s.offset && (o.start = s.offset(o.start), o.end = s.offset(o.end)), o;
  }
  function Dr(t) {
    dr < gr || (dr > gr && (gr = dr, xr = []), xr.push(t));
  }
  function br() {
    var t, r;
    for (t = [], (r = Er()) === u && (r = wr()); r !== u;) t.push(r), (r = Er()) === u && (r = wr());
    return t;
  }
  function wr() {
    var t;
    return 33 === r.charCodeAt(dr) ? (t = l, dr++) : (t = u, Dr(ht)), t === u && (N.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(lt)), t === u && (P.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(ft)), t === u && (61 === r.charCodeAt(dr) ? (t = f, dr++) : (t = u, Dr(pt)), t === u && (B.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(At)), t === u && (93 === r.charCodeAt(dr) ? (t = p, dr++) : (t = u, Dr(dt)), t === u && (95 === r.charCodeAt(dr) ? (t = A, dr++) : (t = u, Dr(Ft)), t === u && (M.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(gt)), t === u && (126 === r.charCodeAt(dr) ? (t = d, dr++) : (t = u, Dr(xt)), t === u && (t = function () {
      var t;
      z.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Vt));
      t === u && (T.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(It)), t === u && (Z.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Nt)), t === u && (q.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Pt)), t === u && (G.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Bt)), t === u && (H.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Mt)), t === u && (J.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(_t)), t === u && (K.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(zt)), t === u && (Q.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Tt)), t === u && (W.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Zt)), t === u && (X.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(qt)), t === u && (Y.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Gt)), t === u && (tt.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Ht)), t === u && (rt.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Jt)), t === u && (et.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Kt)), t === u && (nt.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Qt)), t === u && (at.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Wt))))))))))))))))));
      return t;
    }()) === u && (t = function () {
      var t;
      ot.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Xt));
      t === u && (ct.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(Yt)), t === u && (ut.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(tr))));
      return t;
    }()) === u && (t = Lr()))))))))), t;
  }
  function Er() {
    var t, e, n, a, o;
    return t = dr, 123 === r.charCodeAt(dr) ? (e = F, dr++) : (e = u, Dr(mt)), e !== u ? (n = function () {
      var t;
      t = function () {
        var t;
        43 === r.charCodeAt(dr) ? (t = x, dr++) : (t = u, Dr(vt));
        t === u && (35 === r.charCodeAt(dr) ? (t = m, dr++) : (t = u, Dr(yt)));
        return t;
      }(), t === u && (t = function () {
        var t;
        46 === r.charCodeAt(dr) ? (t = C, dr++) : (t = u, Dr(Dt));
        t === u && (47 === r.charCodeAt(dr) ? (t = v, dr++) : (t = u, Dr(bt)), t === u && (59 === r.charCodeAt(dr) ? (t = y, dr++) : (t = u, Dr(wt)), t === u && (63 === r.charCodeAt(dr) ? (t = D, dr++) : (t = u, Dr(Et)), t === u && (38 === r.charCodeAt(dr) ? (t = b, dr++) : (t = u, Dr(jt))))));
        return t;
      }()) === u && (t = function () {
        var t;
        61 === r.charCodeAt(dr) ? (t = f, dr++) : (t = u, Dr(pt));
        t === u && (44 === r.charCodeAt(dr) ? (t = w, dr++) : (t = u, Dr($t)), t === u && (33 === r.charCodeAt(dr) ? (t = l, dr++) : (t = u, Dr(ht)), t === u && (64 === r.charCodeAt(dr) ? (t = E, dr++) : (t = u, Dr(Lt)), t === u && (124 === r.charCodeAt(dr) ? (t = j, dr++) : (t = u, Dr(Rt))))));
        return t;
      }());
      return t;
    }(), n === u && (n = null), a = function () {
      var t, e, n, a, o, c;
      if (t = dr, e = jr(), e !== u) {
        for (n = [], a = dr, 44 === r.charCodeAt(dr) ? (o = w, dr++) : (o = u, Dr($t)), o !== u && (c = jr()) !== u ? a = hr(e, c) : (dr = a, a = u); a !== u;) n.push(a), a = dr, 44 === r.charCodeAt(dr) ? (o = w, dr++) : (o = u, Dr($t)), o !== u && (c = jr()) !== u ? a = hr(e, c) : (dr = a, a = u);
        t = lr(e, n);
      } else dr = t, t = u;
      return t;
    }(), a !== u ? (125 === r.charCodeAt(dr) ? (o = g, dr++) : (o = u, Dr(Ct)), o !== u ? t = ir(n, a) : (dr = t, t = u)) : (dr = t, t = u)) : (dr = t, t = u), t;
  }
  function jr() {
    var t, e, n;
    return t = dr, e = function () {
      var t, e, n, a, o, c, s;
      if (t = dr, e = dr, n = $r(), n !== u) {
        for (a = [], o = dr, 46 === r.charCodeAt(dr) ? (c = C, dr++) : (c = u, Dr(Dt)), c === u && (c = null), (s = $r()) !== u ? o = c = [c, s] : (dr = o, o = u); o !== u;) a.push(o), o = dr, 46 === r.charCodeAt(dr) ? (c = C, dr++) : (c = u, Dr(Dt)), c === u && (c = null), (s = $r()) !== u ? o = c = [c, s] : (dr = o, o = u);
        e = n = [n, a];
      } else dr = e, e = u;
      t = e !== u ? r.substring(t, dr) : e;
      return t;
    }(), e !== u ? (n = function () {
      var t;
      t = function () {
        var t, e, n;
        t = dr, 58 === r.charCodeAt(dr) ? (e = $, dr++) : (e = u, Dr(kt));
        e !== u ? (n = function () {
          var t, e, n, a, o, c;
          t = dr, e = dr, _.test(r.charAt(dr)) ? (n = r.charAt(dr), dr++) : (n = u, Dr(St));
          n !== u ? ((a = Rr()) === u && (a = null), (o = Rr()) === u && (o = null), (c = Rr()) === u && (c = null), e = n = [n, a, o, c]) : (dr = e, e = u);
          t = e !== u ? r.substring(t, dr) : e;
          return t;
        }(), n !== u ? t = pr(n) : (dr = t, t = u)) : (dr = t, t = u);
        return t;
      }(), t === u && (t = function () {
        var t, e;
        t = dr, 42 === r.charCodeAt(dr) ? (e = L, dr++) : (e = u, Dr(Ot));
        e !== u && (e = Ar());
        return t = e, t;
      }());
      return t;
    }(), n === u && (n = null), t = fr(e, n)) : (dr = t, t = u), t;
  }
  function $r() {
    var t;
    return (t = function () {
      var t;
      st.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(rr));
      t === u && (M.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(gt)));
      return t;
    }()) === u && (t = Rr()) === u && (95 === r.charCodeAt(dr) ? (t = A, dr++) : (t = u, Dr(Ft)), t === u && (t = Lr())), t;
  }
  function Lr() {
    var t, e, n, a, o;
    return t = dr, e = dr, 37 === r.charCodeAt(dr) ? (n = R, dr++) : (n = u, Dr(Ut)), n !== u && (a = kr()) !== u && (o = kr()) !== u ? e = n = [n, a, o] : (dr = e, e = u), t = e !== u ? r.substring(t, dr) : e;
  }
  function Rr() {
    var t;
    return it.test(r.charAt(dr)) ? (t = r.charAt(dr), dr++) : (t = u, Dr(er)), t;
  }
  function kr() {
    var t;
    return (t = Rr()) === u && (r.substr(dr, 1).toLowerCase() === k ? (t = r.charAt(dr), dr++) : (t = u, Dr(nr)), t === u && (r.substr(dr, 1).toLowerCase() === S ? (t = r.charAt(dr), dr++) : (t = u, Dr(ar)), t === u && (r.substr(dr, 1).toLowerCase() === O ? (t = r.charAt(dr), dr++) : (t = u, Dr(or)), t === u && (r.substr(dr, 1).toLowerCase() === U ? (t = r.charAt(dr), dr++) : (t = u, Dr(cr)), t === u && (r.substr(dr, 1).toLowerCase() === V ? (t = r.charAt(dr), dr++) : (t = u, Dr(ur)), t === u && (r.substr(dr, 1).toLowerCase() === I ? (t = r.charAt(dr), dr++) : (t = u, Dr(sr)))))))), t;
  }
  if ((n = h()) !== u && dr === r.length) return n;
  throw n !== u && dr < r.length && Dr({
    type: "end"
  }), a = xr, o = gr < r.length ? r.charAt(gr) : null, c = gr < r.length ? yr(gr, gr + 1) : yr(gr, gr), new t(t.buildMessage(a, o), a, o, c);
}
function n(t) {
  return new a(t);
}
!function (t, r) {
  function e() {
    this.constructor = t;
  }
  e.prototype = r.prototype, t.prototype = new e();
}(t, Error), t.prototype.format = function (t) {
  var e = "Error: " + this.message;
  if (this.location) {
    var n,
      a = null;
    for (n = 0; n < t.length; n++) if (t[n].source === this.location.source) {
      a = t[n].text.split(/\r\n|\n|\r/g);
      break;
    }
    var o = this.location.start,
      c = this.location.source && "function" == typeof this.location.source.offset ? this.location.source.offset(o) : o,
      u = this.location.source + ":" + c.line + ":" + c.column;
    if (a) {
      var s = this.location.end,
        i = r("", c.line.toString().length, " "),
        h = a[o.line - 1],
        l = (o.line === s.line ? s.column : h.length + 1) - o.column || 1;
      e += "\n --\x3e " + u + "\n" + i + " |\n" + c.line + " | " + h + "\n" + i + " | " + r("", o.column - 1, " ") + r("", l, "^");
    } else e += "\n at " + u;
  }
  return e;
}, t.buildMessage = function (t, r) {
  var e = {
    literal: function literal(t) {
      return '"' + a(t.text) + '"';
    },
    "class": function _class(t) {
      var r = t.parts.map(function (t) {
        return Array.isArray(t) ? o(t[0]) + "-" + o(t[1]) : o(t);
      });
      return "[" + (t.inverted ? "^" : "") + r.join("") + "]";
    },
    any: function any() {
      return "any character";
    },
    end: function end() {
      return "end of input";
    },
    other: function other(t) {
      return t.description;
    }
  };
  function n(t) {
    return t.charCodeAt(0).toString(16).toUpperCase();
  }
  function a(t) {
    return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (t) {
      return "\\x0" + n(t);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
      return "\\x" + n(t);
    });
  }
  function o(t) {
    return t.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function (t) {
      return "\\x0" + n(t);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function (t) {
      return "\\x" + n(t);
    });
  }
  function c(t) {
    return e[t.type](t);
  }
  return "Expected " + function (t) {
    var r,
      e,
      n = t.map(c);
    if (n.sort(), n.length > 0) {
      for (r = 1, e = 1; r < n.length; r++) n[r - 1] !== n[r] && (n[e] = n[r], e++);
      n.length = e;
    }
    switch (n.length) {
      case 1:
        return n[0];
      case 2:
        return n[0] + " or " + n[1];
      default:
        return n.slice(0, -1).join(", ") + ", or " + n[n.length - 1];
    }
  }(t) + " but " + function (t) {
    return t ? '"' + a(t) + '"' : "end of input";
  }(r) + " found.";
};
var a = /*#__PURE__*/function () {
  function a(t) {
    _classCallCheck(this, a);
    var r = e(t, {});
    this.items = r;
  }
  return _createClass(a, [{
    key: "expand",
    value: function expand(r) {
      var e = "",
        n = !1;
      var _iterator = _createForOfIteratorHelper(this.items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _a = _step.value;
          if ("string" == typeof _a) {
            if (_a.charCodeAt(0) <= 32 || ["%", "<", ">", "\\", "^", "`", "{", "|", "}", "", "", ""].includes(_a)) throw t("Invalid literal: ".concat(_a), null, _a, null);
            e += _a;
            continue;
          }
          e += new o(_a.variables, _a.operator).expand(r), n = !0;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (!n) throw new i("Template has no expressions");
      return e;
    }
  }]);
}();
var o = /*#__PURE__*/function () {
  function o(t, r) {
    _classCallCheck(this, o);
    this.operator = new c(r), this.variables = t;
  }
  return _createClass(o, [{
    key: "expand",
    value: function expand(t) {
      return this.operator.expand(this.variables, t);
    }
  }]);
}();
var c = /*#__PURE__*/function () {
  function c(t) {
    _classCallCheck(this, c);
    this.config = new u(t), this.prefix = this.config.addPrefix && null != t ? t : "";
  }
  return _createClass(c, [{
    key: "expand",
    value: function expand(t, r) {
      var _this = this;
      var e = [];
      if (t.forEach(function (t) {
        var n = new s(t.name, _this.config, t.maxLength, t.explode),
          a = r[n.name];
        if (null == (o = a) || Array.isArray(o) && 0 === o.length || "object" == _typeof(o) && 0 === Object.keys(o).length) return;
        var o;
        var _c = n.expand(a);
        e.push(null != _c ? _c : "");
      }), 0 === e.length) return "";
      if (0 === e.length) return "";
      var n = e.join(this.config.separator);
      return 0 === n.length ? this.config.emptyValue : this.prefix + n;
    }
  }]);
}();
var u = /*#__PURE__*/_createClass(function u(r) {
  _classCallCheck(this, u);
  if (this.addPrefix = !0, this.separator = ",", this.emptyValue = "", this.addName = !1, this.encode = u.UrlSafeEncode, null != r) switch (r) {
    case "+":
      this.addPrefix = !1, this.encode = u.RestrictedEncode;
      break;
    case "#":
      this.encode = u.RestrictedEncode, this.emptyValue = "#";
      break;
    case ".":
      this.separator = ".", this.emptyValue = ".";
      break;
    case "/":
      this.separator = "/";
      break;
    case ";":
      this.separator = ";", this.addName = !0;
      break;
    case "?":
    case "&":
      this.separator = "&", this.emptyValue = "=", this.addName = !0;
      break;
    default:
      throw t("Invalid expression operator", null, r, null);
  }
});
u.UrlSafeEncode = function (t) {
  return encodeURIComponent(t).replace("!", "%21");
}, u.RestrictedEncode = function (t) {
  return t.split(/%(?=[\da-fA-F]{2})/).map(function (t) {
    return encodeURI(t);
  }).join("%");
};
var s = /*#__PURE__*/function () {
  function s(t, r, e, n) {
    _classCallCheck(this, s);
    this.name = t, this.config = r, this.maxLength = e, this.explode = n;
  }
  return _createClass(s, [{
    key: "expand",
    value: function expand(t) {
      return !0 === this.explode ? this.expandExplode(t) : this.expandSingle(t);
    }
  }, {
    key: "expandSingle",
    value: function expandSingle(t) {
      var _this$config = this.config,
        r = _this$config.emptyValue,
        e = _this$config.encode,
        n = _this$config.addName;
      if ("object" == _typeof(t) && null != this.maxLength) throw new i("Max-length prefix can't be used with object values");
      var a = null;
      return Array.isArray(t) ? a = t.map(e).join(",") : "object" == _typeof(t) ? a = Object.entries(t).map(function (t) {
        return t.map(e).join(",");
      }).join(",") : (a = t, null != this.maxLength && (a = a.substring(0, this.maxLength)), a = e(a)), n && (a = a.length > 0 ? "".concat(this.name, "=").concat(a) : "".concat(this.name).concat(r)), a;
    }
  }, {
    key: "expandExplode",
    value: function expandExplode(t) {
      var _this2 = this;
      var _this$config2 = this.config,
        r = _this$config2.encode,
        e = _this$config2.addName,
        n = _this$config2.separator;
      if (Array.isArray(t)) {
        var _a2 = t.map(r);
        return e && (_a2 = _a2.map(function (t) {
          return "".concat(_this2.name, "=").concat(t);
        })), _a2.join(n);
      }
      if ("object" == _typeof(t)) {
        var _e = [];
        return Object.entries(t).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            t = _ref2[0],
            n = _ref2[1];
          var a = r(t);
          Array.isArray(n) ? n.forEach(function (t) {
            _e.push("".concat(a, "=").concat(r(t)));
          }) : _e.push("".concat(a, "=").concat(r(n)));
        }), _e.join(n);
      }
      return r(t);
    }
  }]);
}();
var i = exports.ExpandingError = /*#__PURE__*/function (_Error) {
  function i() {
    _classCallCheck(this, i);
    return _callSuper(this, i, arguments);
  }
  _inherits(i, _Error);
  return _createClass(i);
}( /*#__PURE__*/_wrapNativeSuper(Error));