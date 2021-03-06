!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).VueChartkick = e()
}(this, function () {
    "use strict";
    var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function e(t) {
        var e = s.call(t);
        return "[object Arguments]" === e || "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && 0 <= t.length && "[object Function]" === s.call(t.callee)
    }

    var r, u, y, d, o, h, m, b, g, n, v, a, i = (function (t) {
        t.exports = function () {
            function u(t) {
                return Object.prototype.toString.call(t) === "[object Array]"
            }

            function i(t) {
                return t instanceof Function
            }

            function o(t) {
                return Object.prototype.toString.call(t) === "[object Object]" && !i(t) && t instanceof Object
            }

            function n(t, e) {
                var r;
                for (r in e) {
                    if (r === "__proto__") {
                        continue
                    }
                    if (o(e[r]) || u(e[r])) {
                        if (o(e[r]) && !o(t[r])) {
                            t[r] = {}
                        }
                        if (u(e[r]) && !u(t[r])) {
                            t[r] = []
                        }
                        n(t[r], e[r])
                    } else if (e[r] !== undefined) {
                        t[r] = e[r]
                    }
                }
            }

            function Y(t, e) {
                var r = {};
                n(r, t);
                n(r, e);
                return r
            }

            var s = /^(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)$/i,
                y = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)?(:)?(\d\d)?([.,]\d+)?($|Z|([+-])(\d\d)(:)?(\d\d)?)/i,
                d = String(1.5).charAt(1);

            function l(t) {
                var e, r, o, n, a, i, s, l, c, p, f;
                p = Object.prototype.toString.call(t);
                if (p === "[object Date]") {
                    return t
                }
                if (p !== "[object String]") {
                    return
                }
                o = t.match(y);
                if (o) {
                    f = parseInt(o[1], 10);
                    i = parseInt(o[3], 10) - 1;
                    e = parseInt(o[5], 10);
                    r = parseInt(o[7], 10);
                    a = o[9] ? parseInt(o[9], 10) : 0;
                    c = o[11] ? parseInt(o[11], 10) : 0;
                    n = o[12] ? parseFloat(d + o[12].slice(1)) * 1e3 : 0;
                    l = Date.UTC(f, i, e, r, a, c, n);
                    if (o[13] && o[14]) {
                        s = o[15] * 60;
                        if (o[17]) {
                            s += parseInt(o[17], 10)
                        }
                        s *= o[14] === "-" ? -1 : 1;
                        l -= s * 60 * 1e3
                    }
                    return new Date(l)
                }
            }

            function h(t) {
                var e, r, o;
                for (e = 0; e < t.length; e++) {
                    o = t[e].data;
                    for (r = 0; r < o.length; r++) {
                        if (o[r][1] < 0) {
                            return true
                        }
                    }
                }
                return false
            }

            function m(t) {
                return "" + t
            }

            function K(t) {
                return parseFloat(t)
            }

            function Z(t) {
                var e, r, o, n;
                if (typeof t !== "object") {
                    if (typeof t === "number") {
                        t = new Date(t * 1e3)
                    } else {
                        t = m(t);
                        if (e = t.match(s)) {
                            r = parseInt(e[1], 10);
                            o = parseInt(e[3], 10) - 1;
                            n = parseInt(e[5], 10);
                            return new Date(r, o, n)
                        } else {
                            var a = t.replace(/ /, "T").replace(" ", "").replace("UTC", "Z");
                            t = l(a) || new Date(t)
                        }
                    }
                }
                return t
            }

            function c(t) {
                if (!u(t)) {
                    var e = [], r;
                    for (r in t) {
                        if (t.hasOwnProperty(r)) {
                            e.push([r, t[r]])
                        }
                    }
                    t = e
                }
                return t
            }

            function p(a, i, s, l, c, p, f, u) {
                return function (t, e, r) {
                    var o = t.data;
                    var n = Y({}, a);
                    n = Y(n, r || {});
                    if (t.hideLegend || "legend" in e) {
                        i(n, e.legend, t.hideLegend)
                    }
                    if (e.title) {
                        s(n, e.title)
                    }
                    if ("min" in e) {
                        l(n, e.min)
                    } else if (!h(o)) {
                        l(n, 0)
                    }
                    if (e.max) {
                        c(n, e.max)
                    }
                    if ("stacked" in e) {
                        p(n, e.stacked)
                    }
                    if (e.colors) {
                        n.colors = e.colors
                    }
                    if (e.xtitle) {
                        f(n, e.xtitle)
                    }
                    if (e.ytitle) {
                        u(n, e.ytitle)
                    }
                    n = Y(n, e.library || {});
                    return n
                }
            }

            function b(t, e) {
                return t[0].getTime() - e[0].getTime()
            }

            function g(t, e) {
                return t[0] - e[0]
            }

            function q(t, e) {
                return t - e
            }

            function tt(t) {
                return t.getMilliseconds() === 0 && t.getSeconds() === 0
            }

            function et(t) {
                return tt(t) && t.getMinutes() === 0
            }

            function rt(t) {
                return et(t) && t.getHours() === 0
            }

            function ot(t, e) {
                return rt(t) && t.getDay() === e
            }

            function nt(t) {
                return rt(t) && t.getDate() === 1
            }

            function at(t) {
                return nt(t) && t.getMonth() === 0
            }

            function a(t) {
                return !isNaN(Z(t)) && m(t).length >= 6
            }

            function f(t) {
                return typeof t === "number"
            }

            var v = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB"];

            function x(t, e, r, o) {
                t = t || "";
                if (r.prefix) {
                    if (e < 0) {
                        e = e * -1;
                        t += "-"
                    }
                    t += r.prefix
                }
                var n = r.suffix || "";
                var a = r.precision;
                var i = r.round;
                if (r.byteScale) {
                    var s;
                    var l = o ? r.byteScale : e;
                    if (l >= 0x1000000000000000) {
                        e /= 0x1000000000000000;
                        s = 6
                    } else if (l >= 0x4000000000000) {
                        e /= 0x4000000000000;
                        s = 5
                    } else if (l >= 1099511627776) {
                        e /= 1099511627776;
                        s = 4
                    } else if (l >= 1073741824) {
                        e /= 1073741824;
                        s = 3
                    } else if (l >= 1048576) {
                        e /= 1048576;
                        s = 2
                    } else if (l >= 1024) {
                        e /= 1024;
                        s = 1
                    } else {
                        s = 0
                    }
                    if (a === undefined && i === undefined) {
                        if (e >= 1023.5) {
                            if (s < v.length - 1) {
                                e = 1;
                                s += 1
                            }
                        }
                        a = e >= 1e3 ? 4 : 3
                    }
                    n = " " + v[s]
                }
                if (a !== undefined && i !== undefined) {
                    throw Error("Use either round or precision, not both")
                }
                if (!o) {
                    if (a !== undefined) {
                        e = e.toPrecision(a);
                        if (!r.zeros) {
                            e = parseFloat(e)
                        }
                    }
                    if (i !== undefined) {
                        if (i < 0) {
                            var c = Math.pow(10, -1 * i);
                            e = parseInt((1 * e / c).toFixed(0)) * c
                        } else {
                            e = e.toFixed(i);
                            if (!r.zeros) {
                                e = parseFloat(e)
                            }
                        }
                    }
                }
                if (r.thousands || r.decimal) {
                    e = m(e);
                    var p = e.split(".");
                    e = p[0];
                    if (r.thousands) {
                        e = e.replace(/\B(?=(\d{3})+(?!\d))/g, r.thousands)
                    }
                    if (p.length > 1) {
                        e += (r.decimal || ".") + p[1]
                    }
                }
                return t + e + n
            }

            function it(t, e, r) {
                if (r in e) {
                    return e[r]
                } else if (r in t.options) {
                    return t.options[r]
                }
                return null
            }

            function A(t) {
                var e, r, o;
                for (e = 0; e < t.length; e++) {
                    o = t[e].data;
                    for (r = 0; r < o.length; r++) {
                        if (o[r][1] != 0) {
                            return false
                        }
                    }
                }
                return true
            }

            var w = {
                    maintainAspectRatio: false,
                    animation: false,
                    tooltips: {displayColors: false, callbacks: {}},
                    legend: {},
                    title: {fontSize: 20, fontColor: "#333"}
                }, z = {
                    scales: {
                        yAxes: [{ticks: {maxTicksLimit: 4}, scaleLabel: {fontSize: 16, fontColor: "#333"}}],
                        xAxes: [{
                            gridLines: {drawOnChartArea: false},
                            scaleLabel: {fontSize: 16, fontColor: "#333"},
                            time: {},
                            ticks: {}
                        }]
                    }
                },
                st = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#3B3EAC", "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395", "#994499", "#22AA99", "#AAAA11", "#6633CC", "#E67300", "#8B0707", "#329262", "#5574A6", "#651067"],
                M = function (t, e, r) {
                    if (e !== undefined) {
                        t.legend.display = !!e;
                        if (e && e !== true) {
                            t.legend.position = e
                        }
                    } else if (r) {
                        t.legend.display = false
                    }
                }, S = function (t, e) {
                    t.title.display = true;
                    t.title.text = e
                }, t = function (t, e) {
                    if (e !== null) {
                        t.scales.yAxes[0].ticks.min = K(e)
                    }
                }, e = function (t, e) {
                    t.scales.yAxes[0].ticks.max = K(e)
                }, C = function (t, e) {
                    if (e !== null) {
                        t.scales.xAxes[0].ticks.min = K(e)
                    }
                }, O = function (t, e) {
                    t.scales.xAxes[0].ticks.max = K(e)
                }, j = function (t, e) {
                    t.scales.xAxes[0].stacked = !!e;
                    t.scales.yAxes[0].stacked = !!e
                }, _ = function (t, e) {
                    t.scales.xAxes[0].scaleLabel.display = true;
                    t.scales.xAxes[0].scaleLabel.labelString = e
                }, P = function (t, e) {
                    t.scales.yAxes[0].scaleLabel.display = true;
                    t.scales.yAxes[0].scaleLabel.labelString = e
                }, lt = function (t, e) {
                    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    return r ? "rgba(" + parseInt(r[1], 16) + ", " + parseInt(r[2], 16) + ", " + parseInt(r[3], 16) + ", " + e + ")" : t
                }, ct = function (t) {
                    return t != null
                }, k = function (t, e, r) {
                    var o = Math.ceil(t.element.offsetWidth / 4 / e.labels.length);
                    if (o > 25) {
                        o = 25
                    } else if (o < 10) {
                        o = 10
                    }
                    if (!r.scales.xAxes[0].ticks.callback) {
                        r.scales.xAxes[0].ticks.callback = function (t) {
                            t = m(t);
                            if (t.length > o) {
                                return t.substring(0, o - 2) + "..."
                            } else {
                                return t
                            }
                        }
                    }
                }, E = function (t, e, r) {
                    var n = {
                        prefix: t.options.prefix,
                        suffix: t.options.suffix,
                        thousands: t.options.thousands,
                        decimal: t.options.decimal,
                        precision: t.options.precision,
                        round: t.options.round,
                        zeros: t.options.zeros
                    };
                    if (t.options.bytes) {
                        var o = t.data;
                        if (r === "pie") {
                            o = [{data: o}]
                        }
                        var a = 0;
                        for (var i = 0; i < o.length; i++) {
                            var s = o[i];
                            for (var l = 0; l < s.data.length; l++) {
                                if (s.data[l][1] > a) {
                                    a = s.data[l][1]
                                }
                            }
                        }
                        var c = 1;
                        while (a >= 1024) {
                            c *= 1024;
                            a /= 1024
                        }
                        n.byteScale = c
                    }
                    if (r !== "pie") {
                        var p = e.scales.yAxes;
                        if (r === "bar") {
                            p = e.scales.xAxes
                        }
                        if (n.byteScale) {
                            if (!p[0].ticks.stepSize) {
                                p[0].ticks.stepSize = n.byteScale / 2
                            }
                            if (!p[0].ticks.maxTicksLimit) {
                                p[0].ticks.maxTicksLimit = 4
                            }
                        }
                        if (!p[0].ticks.callback) {
                            p[0].ticks.callback = function (t) {
                                return x("", t, n, true)
                            }
                        }
                    }
                    if (!e.tooltips.callbacks.label) {
                        if (r === "scatter") {
                            e.tooltips.callbacks.label = function (t, e) {
                                var r = e.datasets[t.datasetIndex].label || "";
                                if (r) {
                                    r += ": "
                                }
                                return r + "(" + t.xLabel + ", " + t.yLabel + ")"
                            }
                        } else if (r === "bubble") {
                            e.tooltips.callbacks.label = function (t, e) {
                                var r = e.datasets[t.datasetIndex].label || "";
                                if (r) {
                                    r += ": "
                                }
                                var o = e.datasets[t.datasetIndex].data[t.index];
                                return r + "(" + t.xLabel + ", " + t.yLabel + ", " + o.v + ")"
                            }
                        } else if (r === "pie") {
                            e.tooltips.callbacks.label = function (t, e) {
                                var r = e.labels[t.index];
                                var o = ": ";
                                if (u(r)) {
                                    r = r.slice();
                                    r[0] += o
                                } else {
                                    r += o
                                }
                                return x(r, e.datasets[t.datasetIndex].data[t.index], n)
                            }
                        } else {
                            var f = r === "bar" ? "xLabel" : "yLabel";
                            e.tooltips.callbacks.label = function (t, e) {
                                var r = e.datasets[t.datasetIndex].label || "";
                                if (r) {
                                    r += ": "
                                }
                                return x(r, t[f], n)
                            }
                        }
                    }
                }, T = p(Y(w, z), M, S, t, e, j, _, P), I = function (t, e, r, o) {
                    var n = [];
                    var a = [];
                    var i = t.options.colors || st;
                    var s = true;
                    var l = true;
                    var c;
                    var p = true;
                    var f = true;
                    var u = true;
                    var y = true;
                    var d = t.data;
                    var h = 0;
                    if (r === "bubble") {
                        for (var m = 0; m < d.length; m++) {
                            var b = d[m];
                            for (var g = 0; g < b.data.length; g++) {
                                if (b.data[g][2] > h) {
                                    h = b.data[g][2]
                                }
                            }
                        }
                    }
                    var v, x, A, w, z, M = [], S = [];
                    if (r === "bar" || r === "column" || t.xtype !== "number" && t.xtype !== "bubble") {
                        var C = [];
                        for (v = 0; v < d.length; v++) {
                            A = d[v];
                            for (x = 0; x < A.data.length; x++) {
                                w = A.data[x];
                                z = t.xtype == "datetime" ? w[0].getTime() : w[0];
                                if (!M[z]) {
                                    M[z] = new Array(d.length)
                                }
                                M[z][v] = K(w[1]);
                                if (C.indexOf(z) === -1) {
                                    C.push(z)
                                }
                            }
                        }
                        if (t.xtype === "datetime" || t.xtype === "number") {
                            C.sort(q)
                        }
                        for (x = 0; x < d.length; x++) {
                            S.push([])
                        }
                        var O;
                        var j;
                        for (j = 0; j < C.length; j++) {
                            v = C[j];
                            if (t.xtype === "datetime") {
                                O = new Date(K(v));
                                s = s && rt(O);
                                if (!c) {
                                    c = O.getDay()
                                }
                                l = l && ot(O, c);
                                p = p && nt(O);
                                f = f && at(O);
                                u = u && et(O);
                                y = y && tt(O)
                            } else {
                                O = v
                            }
                            a.push(O);
                            for (x = 0; x < d.length; x++) {
                                S[x].push(M[v][x] === undefined ? null : M[v][x])
                            }
                        }
                    } else {
                        for (var _ = 0; _ < d.length; _++) {
                            var P = d[_];
                            var k = [];
                            for (var E = 0; E < P.data.length; E++) {
                                var T = {x: K(P.data[E][0]), y: K(P.data[E][1])};
                                if (r === "bubble") {
                                    T.r = K(P.data[E][2]) * 20 / h;
                                    T.v = P.data[E][2]
                                }
                                k.push(T)
                            }
                            S.push(k)
                        }
                    }
                    for (v = 0; v < d.length; v++) {
                        A = d[v];
                        var I = A.color || i[v];
                        var D = r !== "line" ? lt(I, .5) : I;
                        var F = {
                            label: A.name || "",
                            data: S[v],
                            fill: r === "area",
                            borderColor: I,
                            backgroundColor: D,
                            pointBackgroundColor: I,
                            borderWidth: 2,
                            pointHoverBackgroundColor: I
                        };
                        if (A.stack) {
                            F.stack = A.stack
                        }
                        var L = it(t, A, "curve");
                        if (L === false) {
                            F.lineTension = 0
                        }
                        var R = it(t, A, "points");
                        if (R === false) {
                            F.pointRadius = 0;
                            F.pointHitRadius = 5
                        }
                        F = Y(F, t.options.dataset || {});
                        F = Y(F, A.library || {});
                        F = Y(F, A.dataset || {});
                        n.push(F)
                    }
                    var U = t.options.xmin;
                    var B = t.options.xmax;
                    if (t.xtype === "datetime") {
                        var N = "math" in o.helpers;
                        var W = N ? "ticks" : "time";
                        if (ct(U)) {
                            e.scales.xAxes[0][W].min = Z(U).getTime()
                        }
                        if (ct(B)) {
                            e.scales.xAxes[0][W].max = Z(B).getTime()
                        }
                    } else if (t.xtype === "number") {
                        if (ct(U)) {
                            e.scales.xAxes[0].ticks.min = U
                        }
                        if (ct(B)) {
                            e.scales.xAxes[0].ticks.max = B
                        }
                    }
                    if (t.xtype === "datetime" && a.length === 0) {
                        if (ct(U)) {
                            a.push(Z(U))
                        }
                        if (ct(B)) {
                            a.push(Z(B))
                        }
                        s = false;
                        l = false;
                        p = false;
                        f = false;
                        u = false;
                        y = false
                    }
                    if (t.xtype === "datetime" && a.length > 0) {
                        var $ = (ct(U) ? Z(U) : a[0]).getTime();
                        var H = (ct(B) ? Z(B) : a[0]).getTime();
                        for (v = 1; v < a.length; v++) {
                            var V = a[v].getTime();
                            if (V < $) {
                                $ = V
                            }
                            if (V > H) {
                                H = V
                            }
                        }
                        var J = (H - $) / (86400 * 1e3);
                        if (!e.scales.xAxes[0].time.unit) {
                            var G;
                            if (f || J > 365 * 10) {
                                e.scales.xAxes[0].time.unit = "year";
                                G = 365
                            } else if (p || J > 30 * 10) {
                                e.scales.xAxes[0].time.unit = "month";
                                G = 30
                            } else if (s || J > 10) {
                                e.scales.xAxes[0].time.unit = "day";
                                G = 1
                            } else if (u || J > .5) {
                                e.scales.xAxes[0].time.displayFormats = {hour: "MMM D, h a"};
                                e.scales.xAxes[0].time.unit = "hour";
                                G = 1 / 24
                            } else if (y) {
                                e.scales.xAxes[0].time.displayFormats = {minute: "h:mm a"};
                                e.scales.xAxes[0].time.unit = "minute";
                                G = 1 / 24 / 60
                            }
                            if (G && J > 0) {
                                var Q = Math.ceil(J / G / (t.element.offsetWidth / 100));
                                if (l && G === 1) {
                                    Q = Math.ceil(Q / 7) * 7
                                }
                                e.scales.xAxes[0].time.unitStepSize = Q
                            }
                        }
                        if (!e.scales.xAxes[0].time.tooltipFormat) {
                            if (s) {
                                e.scales.xAxes[0].time.tooltipFormat = "ll"
                            } else if (u) {
                                e.scales.xAxes[0].time.tooltipFormat = "MMM D, h a"
                            } else if (y) {
                                e.scales.xAxes[0].time.tooltipFormat = "h:mm a"
                            }
                        }
                    }
                    var X = {labels: a, datasets: n};
                    return X
                }, r = function t(e) {
                    this.name = "chartjs";
                    this.library = e
                };
            r.prototype.renderLineChart = function t(e, r) {
                var o = {};
                if (!e.options.max && A(e.data)) {
                    o.max = 1
                }
                var n = T(e, Y(o, e.options));
                E(e, n, r);
                var a = I(e, n, r || "line", this.library);
                if (e.xtype === "number") {
                    n.scales.xAxes[0].type = "linear";
                    n.scales.xAxes[0].position = "bottom"
                } else {
                    n.scales.xAxes[0].type = e.xtype === "string" ? "category" : "time"
                }
                this.drawChart(e, "line", a, n)
            }, r.prototype.renderPieChart = function t(e) {
                var r = Y({}, w);
                if (e.options.donut) {
                    r.cutoutPercentage = 50
                }
                if ("legend" in e.options) {
                    M(r, e.options.legend)
                }
                if (e.options.title) {
                    S(r, e.options.title)
                }
                r = Y(r, e.options.library || {});
                E(e, r, "pie");
                var o = [];
                var n = [];
                for (var a = 0; a < e.data.length; a++) {
                    var i = e.data[a];
                    o.push(i[0]);
                    n.push(i[1])
                }
                var s = {data: n, backgroundColor: e.options.colors || st};
                s = Y(s, e.options.dataset || {});
                var l = {labels: o, datasets: [s]};
                this.drawChart(e, "pie", l, r)
            }, r.prototype.renderColumnChart = function t(e, r) {
                var o;
                if (r === "bar") {
                    var n = Y(w, z);
                    delete n.scales.yAxes[0].ticks.maxTicksLimit;
                    o = p(n, M, S, C, O, j, _, P)(e, e.options)
                } else {
                    o = T(e, e.options)
                }
                E(e, o, r);
                var a = I(e, o, "column", this.library);
                if (r !== "bar") {
                    k(e, a, o)
                }
                this.drawChart(e, r === "bar" ? "horizontalBar" : "bar", a, o)
            }, r.prototype.renderAreaChart = function t(e) {
                this.renderLineChart(e, "area")
            }, r.prototype.renderBarChart = function t(e) {
                this.renderColumnChart(e, "bar")
            }, r.prototype.renderScatterChart = function t(e, r) {
                r = r || "scatter";
                var o = T(e, e.options);
                E(e, o, r);
                if (!("showLines" in o)) {
                    o.showLines = false
                }
                var n = I(e, o, r, this.library);
                o.scales.xAxes[0].type = "linear";
                o.scales.xAxes[0].position = "bottom";
                this.drawChart(e, r, n, o)
            }, r.prototype.renderBubbleChart = function t(e) {
                this.renderScatterChart(e, "bubble")
            }, r.prototype.destroy = function t(e) {
                if (e.chart) {
                    e.chart.destroy()
                }
            }, r.prototype.drawChart = function t(e, r, o, n) {
                this.destroy(e);
                var a = {type: r, data: o, options: n};
                if (e.options.code) {
                    window.console.log("new Chart(ctx, " + JSON.stringify(a) + ");")
                }
                e.element.innerHTML = "<canvas></canvas>";
                var i = e.element.getElementsByTagName("CANVAS")[0];
                e.chart = new this.library(i, a)
            };
            var D = {
                chart: {},
                xAxis: {title: {text: null}, labels: {style: {fontSize: "12px"}}},
                yAxis: {title: {text: null}, labels: {style: {fontSize: "12px"}}},
                title: {text: null},
                credits: {enabled: false},
                legend: {borderWidth: 0},
                tooltip: {style: {fontSize: "12px"}},
                plotOptions: {areaspline: {}, area: {}, series: {marker: {}}}
            }, F = function (t, e, r) {
                if (e !== undefined) {
                    t.legend.enabled = !!e;
                    if (e && e !== true) {
                        if (e === "top" || e === "bottom") {
                            t.legend.verticalAlign = e
                        } else {
                            t.legend.layout = "vertical";
                            t.legend.verticalAlign = "middle";
                            t.legend.align = e
                        }
                    }
                } else if (r) {
                    t.legend.enabled = false
                }
            }, L = function (t, e) {
                t.title.text = e
            }, R, U, B, N, W, $ = p(D, F, L, function (t, e) {
                t.yAxis.min = e
            }, function (t, e) {
                t.yAxis.max = e
            }, function (t, e) {
                var r = e ? e === true ? "normal" : e : null;
                t.plotOptions.series.stacking = r;
                t.plotOptions.area.stacking = r;
                t.plotOptions.areaspline.stacking = r
            }, function (t, e) {
                t.xAxis.title.text = e
            }, function (t, e) {
                t.yAxis.title.text = e
            }), H = function (t, e, r) {
                var o = {
                    prefix: t.options.prefix,
                    suffix: t.options.suffix,
                    thousands: t.options.thousands,
                    decimal: t.options.decimal,
                    precision: t.options.precision,
                    round: t.options.round,
                    zeros: t.options.zeros
                };
                if (r !== "pie" && !e.yAxis.labels.formatter) {
                    e.yAxis.labels.formatter = function () {
                        return x("", this.value, o)
                    }
                }
                if (!e.tooltip.pointFormatter) {
                    e.tooltip.pointFormatter = function () {
                        return '<span style="color:' + this.color + '">●</span> ' + x(this.series.name + ": <b>", this.y, o) + "</b><br/>"
                    }
                }
            }, V = function t(e) {
                this.name = "highcharts";
                this.library = e
            };
            V.prototype.renderLineChart = function t(e, r) {
                r = r || "spline";
                var o = {};
                if (r === "areaspline") {
                    o = {
                        plotOptions: {
                            areaspline: {stacking: "normal"},
                            area: {stacking: "normal"},
                            series: {marker: {enabled: false}}
                        }
                    }
                }
                if (e.options.curve === false) {
                    if (r === "areaspline") {
                        r = "area"
                    } else if (r === "spline") {
                        r = "line"
                    }
                }
                var n = $(e, e.options, o), a, i, s;
                n.xAxis.type = e.xtype === "string" ? "category" : e.xtype === "number" ? "linear" : "datetime";
                if (!n.chart.type) {
                    n.chart.type = r
                }
                H(e, n, r);
                var l = e.data;
                for (i = 0; i < l.length; i++) {
                    l[i].name = l[i].name || "Value";
                    a = l[i].data;
                    if (e.xtype === "datetime") {
                        for (s = 0; s < a.length; s++) {
                            a[s][0] = a[s][0].getTime()
                        }
                    }
                    l[i].marker = {symbol: "circle"};
                    if (e.options.points === false) {
                        l[i].marker.enabled = false
                    }
                }
                this.drawChart(e, l, n)
            }, V.prototype.renderScatterChart = function t(e) {
                var r = $(e, e.options, {});
                r.chart.type = "scatter";
                this.drawChart(e, e.data, r)
            }, V.prototype.renderPieChart = function t(e) {
                var r = Y(D, {});
                if (e.options.colors) {
                    r.colors = e.options.colors
                }
                if (e.options.donut) {
                    r.plotOptions = {pie: {innerSize: "50%"}}
                }
                if ("legend" in e.options) {
                    F(r, e.options.legend)
                }
                if (e.options.title) {
                    L(r, e.options.title)
                }
                var o = Y(r, e.options.library || {});
                H(e, o, "pie");
                var n = [{type: "pie", name: e.options.label || "Value", data: e.data}];
                this.drawChart(e, n, o)
            }, V.prototype.renderColumnChart = function t(e, r) {
                r = r || "column";
                var o = e.data;
                var n = $(e, e.options), a, i, s, l, c = [], p = [];
                n.chart.type = r;
                H(e, n, r);
                for (a = 0; a < o.length; a++) {
                    s = o[a];
                    for (i = 0; i < s.data.length; i++) {
                        l = s.data[i];
                        if (!c[l[0]]) {
                            c[l[0]] = new Array(o.length);
                            p.push(l[0])
                        }
                        c[l[0]][a] = l[1]
                    }
                }
                if (e.xtype === "number") {
                    p.sort(q)
                }
                n.xAxis.categories = p;
                var f = [], u;
                for (a = 0; a < o.length; a++) {
                    l = [];
                    for (i = 0; i < p.length; i++) {
                        l.push(c[p[i]][a] || 0)
                    }
                    u = {name: o[a].name || "Value", data: l};
                    if (o[a].stack) {
                        u.stack = o[a].stack
                    }
                    f.push(u)
                }
                this.drawChart(e, f, n)
            }, V.prototype.renderBarChart = function t(e) {
                this.renderColumnChart(e, "bar")
            }, V.prototype.renderAreaChart = function t(e) {
                this.renderLineChart(e, "areaspline")
            }, V.prototype.destroy = function t(e) {
                if (e.chart) {
                    e.chart.destroy()
                }
            }, V.prototype.drawChart = function t(e, r, o) {
                this.destroy(e);
                o.chart.renderTo = e.element.id;
                o.series = r;
                if (e.options.code) {
                    window.console.log("new Highcharts.Chart(" + JSON.stringify(o) + ");")
                }
                e.chart = new this.library.Chart(o)
            };
            var J = {}, G = [], Q = {
                chartArea: {},
                fontName: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif",
                pointSize: 6,
                legend: {textStyle: {fontSize: 12, color: "#444"}, alignment: "center", position: "right"},
                curveType: "function",
                hAxis: {
                    textStyle: {color: "#666", fontSize: 12},
                    titleTextStyle: {},
                    gridlines: {color: "transparent"},
                    baselineColor: "#ccc",
                    viewWindow: {}
                },
                vAxis: {
                    textStyle: {color: "#666", fontSize: 12},
                    titleTextStyle: {},
                    baselineColor: "#ccc",
                    viewWindow: {}
                },
                tooltip: {textStyle: {color: "#666", fontSize: 12}}
            }, X = function (t, e, r) {
                if (e !== undefined) {
                    var o;
                    if (!e) {
                        o = "none"
                    } else if (e === true) {
                        o = "right"
                    } else {
                        o = e
                    }
                    t.legend.position = o
                } else if (r) {
                    t.legend.position = "none"
                }
            }, pt = function (t, e) {
                t.title = e;
                t.titleTextStyle = {color: "#333", fontSize: "20px"}
            }, ft, ut, yt = function (t, e) {
                t.hAxis.viewWindow.min = e
            }, dt = function (t, e) {
                t.hAxis.viewWindow.max = e
            }, ht = function (t, e) {
                t.isStacked = e ? e : false
            }, mt = function (t, e) {
                t.hAxis.title = e;
                t.hAxis.titleTextStyle.italic = false
            }, bt = function (t, e) {
                t.vAxis.title = e;
                t.vAxis.titleTextStyle.italic = false
            }, gt = p(Q, X, pt, function (t, e) {
                t.vAxis.viewWindow.min = e
            }, function (t, e) {
                t.vAxis.viewWindow.max = e
            }, ht, mt, bt), vt = function (t) {
                if (window.attachEvent) {
                    window.attachEvent("onresize", t)
                } else if (window.addEventListener) {
                    window.addEventListener("resize", t, true)
                }
                t()
            }, xt = function t(e) {
                this.name = "google";
                this.library = e
            };
            xt.prototype.renderLineChart = function t(o) {
                var n = this;
                this.waitForLoaded(o, function () {
                    var t = {};
                    if (o.options.curve === false) {
                        t.curveType = "none"
                    }
                    if (o.options.points === false) {
                        t.pointSize = 0
                    }
                    var e = gt(o, o.options, t);
                    var r = n.createDataTable(o.data, o.xtype);
                    n.drawChart(o, "LineChart", r, e)
                })
            }, xt.prototype.renderPieChart = function t(o) {
                var n = this;
                this.waitForLoaded(o, function () {
                    var t = {chartArea: {top: "10%", height: "80%"}, legend: {}};
                    if (o.options.colors) {
                        t.colors = o.options.colors
                    }
                    if (o.options.donut) {
                        t.pieHole = .5
                    }
                    if ("legend" in o.options) {
                        X(t, o.options.legend)
                    }
                    if (o.options.title) {
                        pt(t, o.options.title)
                    }
                    var e = Y(Y(Q, t), o.options.library || {});
                    var r = new n.library.visualization.DataTable;
                    r.addColumn("string", "");
                    r.addColumn("number", "Value");
                    r.addRows(o.data);
                    n.drawChart(o, "PieChart", r, e)
                })
            }, xt.prototype.renderColumnChart = function t(r) {
                var o = this;
                this.waitForLoaded(r, function () {
                    var t = gt(r, r.options);
                    var e = o.createDataTable(r.data, r.xtype);
                    o.drawChart(r, "ColumnChart", e, t)
                })
            }, xt.prototype.renderBarChart = function t(o) {
                var n = this;
                this.waitForLoaded(o, function () {
                    var t = {hAxis: {gridlines: {color: "#ccc"}}};
                    var e = p(Q, X, pt, yt, dt, ht, mt, bt)(o, o.options, t);
                    var r = n.createDataTable(o.data, o.xtype);
                    n.drawChart(o, "BarChart", r, e)
                })
            }, xt.prototype.renderAreaChart = function t(o) {
                var n = this;
                this.waitForLoaded(o, function () {
                    var t = {isStacked: true, pointSize: 0, areaOpacity: .5};
                    var e = gt(o, o.options, t);
                    var r = n.createDataTable(o.data, o.xtype);
                    n.drawChart(o, "AreaChart", r, e)
                })
            }, xt.prototype.renderGeoChart = function t(o) {
                var n = this;
                this.waitForLoaded(o, "geochart", function () {
                    var t = {legend: "none", colorAxis: {colors: o.options.colors || ["#f6c7b6", "#ce502d"]}};
                    var e = Y(Y(Q, t), o.options.library || {});
                    var r = new n.library.visualization.DataTable;
                    r.addColumn("string", "");
                    r.addColumn("number", o.options.label || "Value");
                    r.addRows(o.data);
                    n.drawChart(o, "GeoChart", r, e)
                })
            }, xt.prototype.renderScatterChart = function t(c) {
                var p = this;
                this.waitForLoaded(c, function () {
                    var t = {};
                    var e = gt(c, c.options, t);
                    var r = c.data, o = [], n, a, i, s;
                    for (n = 0; n < r.length; n++) {
                        r[n].name = r[n].name || "Value";
                        s = r[n].data;
                        for (a = 0; a < s.length; a++) {
                            var l = new Array(r.length + 1);
                            l[0] = s[a][0];
                            l[n + 1] = s[a][1];
                            o.push(l)
                        }
                    }
                    i = new p.library.visualization.DataTable;
                    i.addColumn("number", "");
                    for (n = 0; n < r.length; n++) {
                        i.addColumn("number", r[n].name)
                    }
                    i.addRows(o);
                    p.drawChart(c, "ScatterChart", i, e)
                })
            }, xt.prototype.renderTimeline = function t(o) {
                var n = this;
                this.waitForLoaded(o, "timeline", function () {
                    var t = {legend: "none"};
                    if (o.options.colors) {
                        t.colors = o.options.colors
                    }
                    var e = Y(Y(Q, t), o.options.library || {});
                    var r = new n.library.visualization.DataTable;
                    r.addColumn({type: "string", id: "Name"});
                    r.addColumn({type: "date", id: "Start"});
                    r.addColumn({type: "date", id: "End"});
                    r.addRows(o.data);
                    o.element.style.lineHeight = "normal";
                    n.drawChart(o, "Timeline", r, e)
                })
            }, xt.prototype.destroy = function t(e) {
                if (e.chart) {
                    e.chart.clearChart()
                }
            }, xt.prototype.drawChart = function t(e, r, o, n) {
                this.destroy(e);
                if (e.options.code) {
                    window.console.log("var data = new google.visualization.DataTable(" + o.toJSON() + ");\nvar chart = new google.visualization." + r + "(element);\nchart.draw(data, " + JSON.stringify(n) + ");")
                }
                e.chart = new this.library.visualization[r](e.element);
                vt(function () {
                    e.chart.draw(o, n)
                })
            }, xt.prototype.waitForLoaded = function t(e, r, o) {
                var n = this;
                if (!o) {
                    o = r;
                    r = "corechart"
                }
                G.push({pack: r, callback: o});
                if (J[r]) {
                    this.runCallbacks()
                } else {
                    J[r] = true;
                    var a = {
                        packages: [r], callback: function () {
                            n.runCallbacks()
                        }
                    };
                    var i = e.__config();
                    if (i.language) {
                        a.language = i.language
                    }
                    if (r === "geochart" && i.mapsApiKey) {
                        a.mapsApiKey = i.mapsApiKey
                    }
                    this.library.charts.load("current", a)
                }
            }, xt.prototype.runCallbacks = function t() {
                var e, r;
                for (var o = 0; o < G.length; o++) {
                    e = G[o];
                    r = this.library.visualization && (e.pack === "corechart" && this.library.visualization.LineChart || e.pack === "timeline" && this.library.visualization.Timeline || e.pack === "geochart" && this.library.visualization.GeoChart);
                    if (r) {
                        e.callback();
                        G.splice(o, 1);
                        o--
                    }
                }
            }, xt.prototype.createDataTable = function t(e, r) {
                var o, n, a, i, s, l = [], c = [];
                for (o = 0; o < e.length; o++) {
                    a = e[o];
                    e[o].name = e[o].name || "Value";
                    for (n = 0; n < a.data.length; n++) {
                        i = a.data[n];
                        s = r === "datetime" ? i[0].getTime() : i[0];
                        if (!l[s]) {
                            l[s] = new Array(e.length);
                            c.push(s)
                        }
                        l[s][o] = K(i[1])
                    }
                }
                var p = [];
                var f = true;
                var u;
                for (n = 0; n < c.length; n++) {
                    o = c[n];
                    if (r === "datetime") {
                        u = new Date(K(o));
                        f = f && rt(u)
                    } else if (r === "number") {
                        u = K(o)
                    } else {
                        u = o
                    }
                    p.push([u].concat(l[o]))
                }
                if (r === "datetime") {
                    p.sort(b)
                } else if (r === "number") {
                    p.sort(g);
                    for (o = 0; o < p.length; o++) {
                        p[o][0] = m(p[o][0])
                    }
                    r = "string"
                }
                var y = new this.library.visualization.DataTable;
                r = r === "datetime" && f ? "date" : r;
                y.addColumn(r, "");
                for (o = 0; o < e.length; o++) {
                    y.addColumn("number", e[o].name)
                }
                y.addRows(p);
                return y
            };
            var At = [], wt = 0, zt = 4;

            function Mt(t, e, r) {
                At.push([t, e, r]);
                St()
            }

            function St() {
                if (wt < zt) {
                    var t = At.shift();
                    if (t) {
                        wt++;
                        Ot(t[0], t[1], t[2]);
                        St()
                    }
                }
            }

            function Ct() {
                wt--;
                St()
            }

            function Ot(t, e, n) {
                jt(t, e, function (t, e, r) {
                    var o = typeof r === "string" ? r : r.message;
                    n(o)
                })
            }

            function jt(t, e, r) {
                var o = window.jQuery || window.Zepto || window.$;
                if (o && o.ajax) {
                    o.ajax({dataType: "json", url: t, success: e, error: r, complete: Ct})
                } else {
                    var n = new XMLHttpRequest;
                    n.open("GET", t, true);
                    n.setRequestHeader("Content-Type", "application/json");
                    n.onload = function () {
                        Ct();
                        if (n.status === 200) {
                            e(JSON.parse(n.responseText), n.statusText, n)
                        } else {
                            r(n, "error", n.statusText)
                        }
                    };
                    n.send()
                }
            }

            var _t = {}, Pt = [];

            function kt(t, e) {
                if (document.body.innerText) {
                    t.innerText = e
                } else {
                    t.textContent = e
                }
            }

            function Et(t, e, r) {
                if (!r) {
                    e = "Error Loading Chart: " + e
                }
                kt(t, e);
                t.style.color = "#ff0000"
            }

            function Tt(e) {
                try {
                    e.__render()
                } catch (t) {
                    Et(e.element, t.message);
                    throw t
                }
            }

            function It(e, t) {
                if (typeof t === "string") {
                    Mt(t, function (t) {
                        e.rawData = t;
                        Tt(e)
                    }, function (t) {
                        Et(e.element, t)
                    })
                } else if (typeof t === "function") {
                    try {
                        t(function (t) {
                            e.rawData = t;
                            Tt(e)
                        }, function (t) {
                            Et(e.element, t, true)
                        })
                    } catch (t) {
                        Et(e.element, t, true)
                    }
                } else {
                    e.rawData = t;
                    Tt(e)
                }
            }

            function Dt(r) {
                var o = r.element;
                var n = document.createElement("a");
                var a = r.options.download;
                if (a === true) {
                    a = {}
                } else if (typeof a === "string") {
                    a = {filename: a}
                }
                n.download = a.filename || "chart.png";
                n.style.position = "absolute";
                n.style.top = "20px";
                n.style.right = "20px";
                n.style.zIndex = 1e3;
                n.style.lineHeight = "20px";
                n.target = "_blank";
                var t = document.createElement("img");
                t.alt = "Download";
                t.style.border = "none";
                t.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAABCFBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMywEsqxAAAAV3RSTlMAAQIDBggJCgsMDQ4PERQaHB0eISIjJCouLzE0OTo/QUJHSUpLTU5PUllhYmltcHh5foWLjI+SlaCio6atr7S1t7m6vsHHyM7R2tze5Obo7fHz9ff5+/1hlxK2AAAA30lEQVQYGUXBhVYCQQBA0TdYWAt2d3d3YWAHyur7/z9xgD16Lw0DW+XKx+1GgX+FRzM3HWQWrHl5N/oapW5RPe0PkBu+UYeICvozTWZVK23Ao04B79oJrOsJDOoxkZoQPWgX29pHpCZEk7rEvQYiNSFq1UMqvlCjJkRBS1R8hb00Vb/TajtBL7nTHE1X1vyMQF732dQhyF2o6SAwrzP06iUQzvwsArlnzcOdrgBhJyHa1QOgO9U1GsKuvjUTjavliZYQ8nNPapG6sap/3nrIdJ6bOWzmX/fy0XVpfzZP3S8OJT3g9EEiJwAAAABJRU5ErkJggg==";
                n.appendChild(t);
                o.style.position = "relative";
                r.__downloadAttached = true;
                r.__enterEvent = Ft(o, "mouseover", function (t) {
                    var e = t.relatedTarget;
                    if ((!e || e !== this && !Rt(this, e)) && r.options.download) {
                        n.href = r.toImage(a);
                        o.appendChild(n)
                    }
                });
                r.__leaveEvent = Ft(o, "mouseout", function (t) {
                    var e = t.relatedTarget;
                    if (!e || e !== this && !Rt(this, e)) {
                        if (n.parentNode) {
                            n.parentNode.removeChild(n)
                        }
                    }
                })
            }

            function Ft(t, e, r) {
                if (t.addEventListener) {
                    t.addEventListener(e, r, false);
                    return r
                } else {
                    var o = function () {
                        return r.call(t, window.event)
                    };
                    t.attachEvent("on" + e, o);
                    return o
                }
            }

            function Lt(t, e, r) {
                if (t.removeEventListener) {
                    t.removeEventListener(e, r, false)
                } else {
                    t.detachEvent("on" + e, r)
                }
            }

            function Rt(t, e) {
                if (t === e) {
                    return false
                }
                while (e && e !== t) {
                    e = e.parentNode
                }
                return e === t
            }

            function Ut(t) {
                if (t) {
                    if (t.product === "Highcharts") {
                        return V
                    } else if (t.charts) {
                        return xt
                    } else if (i(t)) {
                        return r
                    }
                }
                throw new Error("Unknown adapter")
            }

            function Bt(t) {
                var e = Ut(t);
                var r = new e(t);
                if (Pt.indexOf(r) === -1) {
                    Pt.push(r)
                }
            }

            function Nt() {
                if ("Chart" in window) {
                    Bt(window.Chart)
                }
                if ("Highcharts" in window) {
                    Bt(window.Highcharts)
                }
                if (window.google && window.google.charts) {
                    Bt(window.google)
                }
            }

            function Wt(t, e) {
                if (e === "PieChart" || e === "GeoChart" || e === "Timeline") {
                    return t.length === 0
                } else {
                    for (var r = 0; r < t.length; r++) {
                        if (t[r].data.length > 0) {
                            return false
                        }
                    }
                    return true
                }
            }

            function $t(t, e) {
                if (e.options.messages && e.options.messages.empty && Wt(e.data, t)) {
                    kt(e.element, e.options.messages.empty)
                } else {
                    Ht(t, e);
                    if (e.options.download && !e.__downloadAttached && e.adapter === "chartjs") {
                        Dt(e)
                    }
                }
            }

            function Ht(t, e) {
                var r, o, n, a;
                n = "render" + t;
                a = e.options.adapter;
                Nt();
                for (r = 0; r < Pt.length; r++) {
                    o = Pt[r];
                    if ((!a || a === o.name) && i(o[n])) {
                        e.adapter = o.name;
                        e.__adapterObject = o;
                        return o[n](e)
                    }
                }
                if (Pt.length > 0) {
                    throw new Error("No charting library found for " + t)
                } else {
                    throw new Error("No charting libraries found - be sure to include one before your charts")
                }
            }

            var Vt = function (t, e) {
                if (e === "number") {
                    t = K(t)
                } else if (e === "datetime") {
                    t = Z(t)
                } else {
                    t = m(t)
                }
                return t
            }, Jt = function (t, e) {
                var r = [], o, n;
                for (n = 0; n < t.length; n++) {
                    if (e === "bubble") {
                        r.push([K(t[n][0]), K(t[n][1]), K(t[n][2])])
                    } else {
                        o = Vt(t[n][0], e);
                        r.push([o, K(t[n][1])])
                    }
                }
                if (e === "datetime") {
                    r.sort(b)
                } else if (e === "number") {
                    r.sort(g)
                }
                return r
            };

            function Gt(t, e, r) {
                if (Wt(t)) {
                    if ((r.xmin || r.xmax) && (!r.xmin || a(r.xmin)) && (!r.xmax || a(r.xmax))) {
                        return "datetime"
                    } else {
                        return "number"
                    }
                } else if (Qt(t, f)) {
                    return "number"
                } else if (!e && Qt(t, a)) {
                    return "datetime"
                } else {
                    return "string"
                }
            }

            function Qt(t, e) {
                var r, o, n;
                for (r = 0; r < t.length; r++) {
                    n = c(t[r].data);
                    for (o = 0; o < n.length; o++) {
                        if (!e(n[o][0])) {
                            return false
                        }
                    }
                }
                return true
            }

            function Xt(t) {
                var e = [], r, o;
                for (r = 0; r < t.length; r++) {
                    var n = {};
                    for (o in t[r]) {
                        if (t[r].hasOwnProperty(o)) {
                            n[o] = t[r][o]
                        }
                    }
                    e.push(n)
                }
                return e
            }

            function Yt(t, e, r) {
                var o;
                var n = t.options;
                var a = t.rawData;
                if (!u(a) || typeof a[0] !== "object" || u(a[0])) {
                    a = [{name: n.label, data: a}];
                    t.hideLegend = true
                } else {
                    t.hideLegend = false
                }
                a = Xt(a);
                for (o = 0; o < a.length; o++) {
                    a[o].data = c(a[o].data)
                }
                t.xtype = e ? e : n.discrete ? "string" : Gt(a, r, n);
                for (o = 0; o < a.length; o++) {
                    a[o].data = Jt(a[o].data, t.xtype)
                }
                return a
            }

            function Kt(t) {
                var e = c(t.rawData), r;
                for (r = 0; r < e.length; r++) {
                    e[r] = [m(e[r][0]), K(e[r][1])]
                }
                return e
            }

            var Zt = function t(e, r, o) {
                var n;
                if (typeof e === "string") {
                    n = e;
                    e = document.getElementById(e);
                    if (!e) {
                        throw new Error("No element with id " + n)
                    }
                }
                this.element = e;
                this.options = Y(le.options, o || {});
                this.dataSource = r;
                le.charts[e.id] = this;
                It(this, r);
                if (this.options.refresh) {
                    this.startRefresh()
                }
            };
            Zt.prototype.getElement = function t() {
                return this.element
            }, Zt.prototype.getDataSource = function t() {
                return this.dataSource
            }, Zt.prototype.getData = function t() {
                return this.data
            }, Zt.prototype.getOptions = function t() {
                return this.options
            }, Zt.prototype.getChartObject = function t() {
                return this.chart
            }, Zt.prototype.getAdapter = function t() {
                return this.adapter
            }, Zt.prototype.updateData = function t(e, r) {
                this.dataSource = e;
                if (r) {
                    this.__updateOptions(r)
                }
                It(this, e)
            }, Zt.prototype.setOptions = function t(e) {
                this.__updateOptions(e);
                this.redraw()
            }, Zt.prototype.redraw = function t() {
                It(this, this.rawData)
            }, Zt.prototype.refreshData = function t() {
                if (typeof this.dataSource === "string") {
                    var e = this.dataSource.indexOf("?") === -1 ? "?" : "&";
                    var r = this.dataSource + e + "_=" + (new Date).getTime();
                    It(this, r)
                } else if (typeof this.dataSource === "function") {
                    It(this, this.dataSource)
                }
            }, Zt.prototype.startRefresh = function t() {
                var e = this;
                var r = this.options.refresh;
                if (r && typeof this.dataSource !== "string" && typeof this.dataSource !== "function") {
                    throw new Error("Data source must be a URL or callback for refresh")
                }
                if (!this.intervalId) {
                    if (r) {
                        this.intervalId = setInterval(function () {
                            e.refreshData()
                        }, r * 1e3)
                    } else {
                        throw new Error("No refresh interval")
                    }
                }
            }, Zt.prototype.stopRefresh = function t() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null
                }
            }, Zt.prototype.toImage = function t(e) {
                if (this.adapter === "chartjs") {
                    if (e && e.background && e.background !== "transparent") {
                        var r = this.chart.chart.canvas;
                        var o = this.chart.chart.ctx;
                        var n = document.createElement("canvas");
                        var a = n.getContext("2d");
                        n.width = o.canvas.width;
                        n.height = o.canvas.height;
                        a.fillStyle = e.background;
                        a.fillRect(0, 0, n.width, n.height);
                        a.drawImage(r, 0, 0);
                        return n.toDataURL("image/png")
                    } else {
                        return this.chart.toBase64Image()
                    }
                } else {
                    return null
                }
            }, Zt.prototype.destroy = function t() {
                if (this.__adapterObject) {
                    this.__adapterObject.destroy(this)
                }
                if (this.__enterEvent) {
                    Lt(this.element, "mouseover", this.__enterEvent)
                }
                if (this.__leaveEvent) {
                    Lt(this.element, "mouseout", this.__leaveEvent)
                }
            }, Zt.prototype.__updateOptions = function t(e) {
                var r = e.refresh && e.refresh !== this.options.refresh;
                this.options = Y(le.options, e);
                if (r) {
                    this.stopRefresh();
                    this.startRefresh()
                }
            }, Zt.prototype.__render = function t() {
                this.data = this.__processData();
                $t(this.__chartName(), this)
            }, Zt.prototype.__config = function t() {
                return _t
            };
            var qt, te, ee, re, oe, ne, ae, ie, se, le = {
                LineChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this)
                    };
                    e.prototype.__chartName = function t() {
                        return "LineChart"
                    };
                    return e
                }(Zt), PieChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Kt(this)
                    };
                    e.prototype.__chartName = function t() {
                        return "PieChart"
                    };
                    return e
                }(Zt), ColumnChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this, null, true)
                    };
                    e.prototype.__chartName = function t() {
                        return "ColumnChart"
                    };
                    return e
                }(Zt), BarChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this, null, true)
                    };
                    e.prototype.__chartName = function t() {
                        return "BarChart"
                    };
                    return e
                }(Zt), AreaChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this)
                    };
                    e.prototype.__chartName = function t() {
                        return "AreaChart"
                    };
                    return e
                }(Zt), GeoChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Kt(this)
                    };
                    e.prototype.__chartName = function t() {
                        return "GeoChart"
                    };
                    return e
                }(Zt), ScatterChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this, "number")
                    };
                    e.prototype.__chartName = function t() {
                        return "ScatterChart"
                    };
                    return e
                }(Zt), BubbleChart: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        return Yt(this, "bubble")
                    };
                    e.prototype.__chartName = function t() {
                        return "BubbleChart"
                    };
                    return e
                }(Zt), Timeline: function (t) {
                    function e() {
                        t.apply(this, arguments)
                    }

                    if (t) {
                        e.__proto__ = t
                    }
                    e.prototype = Object.create(t && t.prototype);
                    e.prototype.constructor = e;
                    e.prototype.__processData = function t() {
                        var e, r = this.rawData;
                        for (e = 0; e < r.length; e++) {
                            r[e][1] = Z(r[e][1]);
                            r[e][2] = Z(r[e][2])
                        }
                        return r
                    };
                    e.prototype.__chartName = function t() {
                        return "Timeline"
                    };
                    return e
                }(Zt), charts: {}, configure: function (t) {
                    for (var e in t) {
                        if (t.hasOwnProperty(e)) {
                            _t[e] = t[e]
                        }
                    }
                }, setDefaultOptions: function (t) {
                    le.options = t
                }, eachChart: function (t) {
                    for (var e in le.charts) {
                        if (le.charts.hasOwnProperty(e)) {
                            t(le.charts[e])
                        }
                    }
                }, config: _t, options: {}, adapters: Pt, addAdapter: Bt, use: function (t) {
                    Bt(t);
                    return le
                }
            };
            if (typeof window !== "undefined" && !window.Chartkick) {
                window.Chartkick = le
            }
            return le.default = le
        }()
    }(r = {exports: {}}), r.exports), s = Object.prototype.toString;
    Object.keys || (u = Object.prototype.hasOwnProperty, y = Object.prototype.toString, d = e, o = Object.prototype.propertyIsEnumerable, h = !o.call({toString: null}, "toString"), m = o.call(function () {
    }, "prototype"), b = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], g = function (t) {
        var e = t.constructor;
        return e && e.prototype === t
    }, n = {
        $applicationCache: !0,
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $onmozfullscreenchange: !0,
        $onmozfullscreenerror: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0
    }, v = function () {
        if ("undefined" == typeof window) return !1;
        for (var t in window) try {
            if (!n["$" + t] && u.call(window, t) && null !== window[t] && "object" == typeof window[t]) try {
                g(window[t])
            } catch (t) {
                return !0
            }
        } catch (t) {
            return !0
        }
        return !1
    }(), a = function (t) {
        var e = null !== t && "object" == typeof t, r = "[object Function]" === y.call(t), o = d(t),
            n = e && "[object String]" === y.call(t), a = [];
        if (!e && !r && !o) throw new TypeError("Object.keys called on a non-object");
        var i = m && r;
        if (n && 0 < t.length && !u.call(t, 0)) for (var s = 0; s < t.length; ++s) a.push(String(s));
        if (o && 0 < t.length) for (var l = 0; l < t.length; ++l) a.push(String(l)); else for (var c in t) i && "prototype" === c || !u.call(t, c) || a.push(String(c));
        if (h) for (var p = function (t) {
            if ("undefined" == typeof window || !v) return g(t);
            try {
                return g(t)
            } catch (t) {
                return !1
            }
        }(t), f = 0; f < b.length; ++f) p && "constructor" === b[f] || !u.call(t, b[f]) || a.push(b[f]);
        return a
    });
    var l = Array.prototype.slice, c = Object.keys, p = c ? function (t) {
        return c(t)
    } : a, f = Object.keys;
    p.shim = function () {
        return Object.keys ? function () {
            var t = Object.keys(arguments);
            return t && t.length === arguments.length
        }(1, 2) || (Object.keys = function (t) {
            return e(t) ? f(l.call(t)) : f(t)
        }) : Object.keys = p, Object.keys || p
    };

    function x(t) {
        return !(z && t && "object" == typeof t && Symbol.toStringTag in t) && "[object Arguments]" === M.call(t)
    }

    function A(t) {
        return !!x(t) || null !== t && "object" == typeof t && "number" == typeof t.length && 0 <= t.length && "[object Array]" !== M.call(t) && "[object Function]" === M.call(t.callee)
    }

    var w = p, z = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, M = Object.prototype.toString,
        S = function () {
            return x(arguments)
        }();
    x.isLegacyArguments = A;

    function C(t, e, r, o) {
        var n;
        e in t && ("function" != typeof (n = o) || "[object Function]" !== P.call(n) || !o()) || (T ? E(t, e, {
            configurable: !0,
            enumerable: !1,
            value: r,
            writable: !0
        }) : t[e] = r)
    }

    function O(t, e) {
        var r = 2 < arguments.length ? arguments[2] : {}, o = w(e);
        _ && (o = k.call(o, Object.getOwnPropertySymbols(e)));
        for (var n = 0; n < o.length; n += 1) C(t, o[n], e[o[n]], r[o[n]])
    }

    var j = S ? x : A, _ = "function" == typeof Symbol && "symbol" == typeof Symbol("foo"),
        P = Object.prototype.toString, k = Array.prototype.concat, E = Object.defineProperty, T = E && function () {
            var t = {};
            try {
                for (var e in E(t, "x", {enumerable: !1, value: t}), t) return !1;
                return t.x === t
            } catch (t) {
                return !1
            }
        }();
    O.supportsDescriptors = !!T;

    function I() {
        return "function" == typeof B && ("function" == typeof Symbol && ("symbol" == typeof B("foo") && ("symbol" == typeof Symbol("bar") && function () {
            if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
            if ("symbol" == typeof Symbol.iterator) return !0;
            var t = {}, e = Symbol("test"), r = Object(e);
            if ("string" == typeof e) return !1;
            if ("[object Symbol]" !== Object.prototype.toString.call(e)) return !1;
            if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
            for (e in t[e] = 42, t) return !1;
            if ("function" == typeof Object.keys && 0 !== Object.keys(t).length) return !1;
            if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1;
            var o = Object.getOwnPropertySymbols(t);
            if (1 !== o.length || o[0] !== e) return !1;
            if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
            if ("function" == typeof Object.getOwnPropertyDescriptor) {
                var n = Object.getOwnPropertyDescriptor(t, e);
                if (42 !== n.value || !0 !== n.enumerable) return !1
            }
            return !0
        }())))
    }

    var D, F = O, L = Array.prototype.slice, R = Object.prototype.toString,
        U = Function.prototype.bind || function (e) {
            var r = this;
            if ("function" != typeof r || "[object Function]" !== R.call(r)) throw new TypeError("Function.prototype.bind called on incompatible " + r);
            for (var o, t, n = L.call(arguments, 1), a = Math.max(0, r.length - n.length), i = [], s = 0; s < a; s++) i.push("$" + s);
            return o = Function("binder", "return function (" + i.join(",") + "){ return binder.apply(this,arguments); }")(function () {
                if (this instanceof o) {
                    var t = r.apply(this, n.concat(L.call(arguments)));
                    return Object(t) === t ? t : this
                }
                return r.apply(e, n.concat(L.call(arguments)))
            }), r.prototype && ((t = function () {
            }).prototype = r.prototype, o.prototype = new t, t.prototype = null), o
        }, B = t.Symbol, N = TypeError, W = Object.getOwnPropertyDescriptor;
    if (W) try {
        W({}, "")
    } catch (t) {
        W = null
    }

    function $() {
        throw new N
    }

    function H(t, e) {
        if ("string" != typeof t || 0 === t.length) throw new TypeError("intrinsic name must be a non-empty string");
        if (1 < arguments.length && "boolean" != typeof e) throw new TypeError('"allowMissing" argument must be a boolean');
        for (var n, r = (n = [], K(t, Z, function (t, e, r, o) {
            n[n.length] = r ? K(o, q, "$1") : e || t
        }), n), o = function (t, e) {
            if (!(t in Y)) throw new SyntaxError("intrinsic " + t + " does not exist!");
            if (void 0 === Y[t] && !e) throw new N("intrinsic " + t + " exists, but is not available. Please file an issue!");
            return Y[t]
        }("%" + (0 < r.length ? r[0] : "") + "%", e), a = 1; a < r.length; a += 1) if (null != o) if (W && a + 1 >= r.length) {
            var i = W(o, r[a]);
            if (!(e || r[a] in o)) throw new N("base intrinsic for " + t + " exists, but the property is not available.");
            o = i ? i.get || i.value : o[r[a]]
        } else o = o[r[a]];
        return o
    }

    function V() {
        return rt(U, et, arguments)
    }

    var J = W ? function () {
            try {
                return $
            } catch (t) {
                try {
                    return W(arguments, "callee").get
                } catch (t) {
                    return $
                }
            }
        }() : $, G = I(), Q = Object.getPrototypeOf || function (t) {
            return t.__proto__
        }, X = "undefined" == typeof Uint8Array ? D : Q(Uint8Array), Y = {
            "%Array%": Array,
            "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? D : ArrayBuffer,
            "%ArrayBufferPrototype%": "undefined" == typeof ArrayBuffer ? D : ArrayBuffer.prototype,
            "%ArrayIteratorPrototype%": G ? Q([][Symbol.iterator]()) : D,
            "%ArrayPrototype%": Array.prototype,
            "%ArrayProto_entries%": Array.prototype.entries,
            "%ArrayProto_forEach%": Array.prototype.forEach,
            "%ArrayProto_keys%": Array.prototype.keys,
            "%ArrayProto_values%": Array.prototype.values,
            "%AsyncFromSyncIteratorPrototype%": D,
            "%AsyncFunction%": void 0,
            "%AsyncFunctionPrototype%": D,
            "%AsyncGenerator%": D,
            "%AsyncGeneratorFunction%": void 0,
            "%AsyncGeneratorPrototype%": D,
            "%AsyncIteratorPrototype%": D,
            "%Atomics%": "undefined" == typeof Atomics ? D : Atomics,
            "%Boolean%": Boolean,
            "%BooleanPrototype%": Boolean.prototype,
            "%DataView%": "undefined" == typeof DataView ? D : DataView,
            "%DataViewPrototype%": "undefined" == typeof DataView ? D : DataView.prototype,
            "%Date%": Date,
            "%DatePrototype%": Date.prototype,
            "%decodeURI%": decodeURI,
            "%decodeURIComponent%": decodeURIComponent,
            "%encodeURI%": encodeURI,
            "%encodeURIComponent%": encodeURIComponent,
            "%Error%": Error,
            "%ErrorPrototype%": Error.prototype,
            "%eval%": eval,
            "%EvalError%": EvalError,
            "%EvalErrorPrototype%": EvalError.prototype,
            "%Float32Array%": "undefined" == typeof Float32Array ? D : Float32Array,
            "%Float32ArrayPrototype%": "undefined" == typeof Float32Array ? D : Float32Array.prototype,
            "%Float64Array%": "undefined" == typeof Float64Array ? D : Float64Array,
            "%Float64ArrayPrototype%": "undefined" == typeof Float64Array ? D : Float64Array.prototype,
            "%Function%": Function,
            "%FunctionPrototype%": Function.prototype,
            "%Generator%": D,
            "%GeneratorFunction%": void 0,
            "%GeneratorPrototype%": D,
            "%Int8Array%": "undefined" == typeof Int8Array ? D : Int8Array,
            "%Int8ArrayPrototype%": "undefined" == typeof Int8Array ? D : Int8Array.prototype,
            "%Int16Array%": "undefined" == typeof Int16Array ? D : Int16Array,
            "%Int16ArrayPrototype%": "undefined" == typeof Int16Array ? D : Int8Array.prototype,
            "%Int32Array%": "undefined" == typeof Int32Array ? D : Int32Array,
            "%Int32ArrayPrototype%": "undefined" == typeof Int32Array ? D : Int32Array.prototype,
            "%isFinite%": isFinite,
            "%isNaN%": isNaN,
            "%IteratorPrototype%": G ? Q(Q([][Symbol.iterator]())) : D,
            "%JSON%": "object" == typeof JSON ? JSON : D,
            "%JSONParse%": "object" == typeof JSON ? JSON.parse : D,
            "%Map%": "undefined" == typeof Map ? D : Map,
            "%MapIteratorPrototype%": "undefined" != typeof Map && G ? Q((new Map)[Symbol.iterator]()) : D,
            "%MapPrototype%": "undefined" == typeof Map ? D : Map.prototype,
            "%Math%": Math,
            "%Number%": Number,
            "%NumberPrototype%": Number.prototype,
            "%Object%": Object,
            "%ObjectPrototype%": Object.prototype,
            "%ObjProto_toString%": Object.prototype.toString,
            "%ObjProto_valueOf%": Object.prototype.valueOf,
            "%parseFloat%": parseFloat,
            "%parseInt%": parseInt,
            "%Promise%": "undefined" == typeof Promise ? D : Promise,
            "%PromisePrototype%": "undefined" == typeof Promise ? D : Promise.prototype,
            "%PromiseProto_then%": "undefined" == typeof Promise ? D : Promise.prototype.then,
            "%Promise_all%": "undefined" == typeof Promise ? D : Promise.all,
            "%Promise_reject%": "undefined" == typeof Promise ? D : Promise.reject,
            "%Promise_resolve%": "undefined" == typeof Promise ? D : Promise.resolve,
            "%Proxy%": "undefined" == typeof Proxy ? D : Proxy,
            "%RangeError%": RangeError,
            "%RangeErrorPrototype%": RangeError.prototype,
            "%ReferenceError%": ReferenceError,
            "%ReferenceErrorPrototype%": ReferenceError.prototype,
            "%Reflect%": "undefined" == typeof Reflect ? D : Reflect,
            "%RegExp%": RegExp,
            "%RegExpPrototype%": RegExp.prototype,
            "%Set%": "undefined" == typeof Set ? D : Set,
            "%SetIteratorPrototype%": "undefined" != typeof Set && G ? Q((new Set)[Symbol.iterator]()) : D,
            "%SetPrototype%": "undefined" == typeof Set ? D : Set.prototype,
            "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? D : SharedArrayBuffer,
            "%SharedArrayBufferPrototype%": "undefined" == typeof SharedArrayBuffer ? D : SharedArrayBuffer.prototype,
            "%String%": String,
            "%StringIteratorPrototype%": G ? Q(""[Symbol.iterator]()) : D,
            "%StringPrototype%": String.prototype,
            "%Symbol%": G ? Symbol : D,
            "%SymbolPrototype%": G ? Symbol.prototype : D,
            "%SyntaxError%": SyntaxError,
            "%SyntaxErrorPrototype%": SyntaxError.prototype,
            "%ThrowTypeError%": J,
            "%TypedArray%": X,
            "%TypedArrayPrototype%": X ? X.prototype : D,
            "%TypeError%": N,
            "%TypeErrorPrototype%": N.prototype,
            "%Uint8Array%": "undefined" == typeof Uint8Array ? D : Uint8Array,
            "%Uint8ArrayPrototype%": "undefined" == typeof Uint8Array ? D : Uint8Array.prototype,
            "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? D : Uint8ClampedArray,
            "%Uint8ClampedArrayPrototype%": "undefined" == typeof Uint8ClampedArray ? D : Uint8ClampedArray.prototype,
            "%Uint16Array%": "undefined" == typeof Uint16Array ? D : Uint16Array,
            "%Uint16ArrayPrototype%": "undefined" == typeof Uint16Array ? D : Uint16Array.prototype,
            "%Uint32Array%": "undefined" == typeof Uint32Array ? D : Uint32Array,
            "%Uint32ArrayPrototype%": "undefined" == typeof Uint32Array ? D : Uint32Array.prototype,
            "%URIError%": URIError,
            "%URIErrorPrototype%": URIError.prototype,
            "%WeakMap%": "undefined" == typeof WeakMap ? D : WeakMap,
            "%WeakMapPrototype%": "undefined" == typeof WeakMap ? D : WeakMap.prototype,
            "%WeakSet%": "undefined" == typeof WeakSet ? D : WeakSet,
            "%WeakSetPrototype%": "undefined" == typeof WeakSet ? D : WeakSet.prototype
        }, K = U.call(Function.call, String.prototype.replace),
        Z = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
        q = /\\(\\)?/g, tt = H("%Function.prototype.apply%"), et = H("%Function.prototype.call%"),
        rt = H("%Reflect.apply%", !0) || U.call(et, tt);
    V.apply = function () {
        return rt(U, tt, arguments)
    };

    function ot(t) {
        return t != t
    }

    function nt(t, e) {
        return 0 === t && 0 === e ? 1 / t == 1 / e : t === e || !(!ot(t) || !ot(e))
    }

    function at() {
        return "function" == typeof Object.is ? Object.is : nt
    }

    var it = V(at(), Object);
    F(it, {
        getPolyfill: at, implementation: nt, shim: function () {
            var t = at();
            return F(Object, {is: t}, {
                is: function () {
                    return Object.is !== t
                }
            }), t
        }
    });
    var st, lt, ct, pt, ft = it, ut = I() && "symbol" == typeof Symbol.toStringTag;
    ut && (st = Function.call.bind(RegExp.prototype.exec), lt = {}, pt = {
        toString: ct = function () {
            throw lt
        }, valueOf: ct
    }, "symbol" == typeof Symbol.toPrimitive && (pt[Symbol.toPrimitive] = ct));

    function yt() {
        if (null != this && this !== bt(this)) throw new gt("RegExp.prototype.flags getter called on non-object");
        var t = "";
        return this.global && (t += "g"), this.ignoreCase && (t += "i"), this.multiline && (t += "m"), this.dotAll && (t += "s"), this.unicode && (t += "u"), this.sticky && (t += "y"), t
    }

    function dt() {
        if (!vt) throw new At("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
        if ("gim" === /a/gim.flags) {
            var t = xt(RegExp.prototype, "flags");
            if (t && "function" == typeof t.get && "boolean" == typeof /a/.dotAll) return t.get
        }
        return yt
    }

    var ht = Object.prototype.toString, mt = ut ? function (t) {
            if (!t || "object" != typeof t) return !1;
            try {
                st(t, pt)
            } catch (t) {
                return t === lt
            }
        } : function (t) {
            return !(!t || "object" != typeof t && "function" != typeof t) && "[object RegExp]" === ht.call(t)
        }, bt = Object, gt = TypeError, vt = F.supportsDescriptors, xt = Object.getOwnPropertyDescriptor, At = TypeError,
        wt = F.supportsDescriptors, zt = Object.getOwnPropertyDescriptor, Mt = Object.defineProperty, St = TypeError,
        Ct = Object.getPrototypeOf, Ot = /a/, jt = V(yt);
    F(jt, {
        getPolyfill: dt, implementation: yt, shim: function () {
            if (!wt || !Ct) throw new St("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");
            var t = dt(), e = Ct(Ot), r = zt(e, "flags");
            return r && r.get === t || Mt(e, "flags", {configurable: !0, enumerable: !1, get: t}), t
        }
    });
    var _t = jt, Pt = Date.prototype.getDay, kt = Object.prototype.toString,
        Et = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, Tt = function (t) {
            return "object" == typeof t && null !== t && (Et ? function (t) {
                try {
                    return Pt.call(t), !0
                } catch (t) {
                    return !1
                }
            }(t) : "[object Date]" === kt.call(t))
        }, It = Date.prototype.getTime;

    function Dt(t, e, r) {
        var o = r || {};
        return !(o.strict ? !ft(t, e) : t !== e) || (!t || !e || "object" != typeof t && "object" != typeof e ? o.strict ? ft(t, e) : t == e : function (t, e, r) {
            var o, n;
            if (typeof t != typeof e) return !1;
            if (Ft(t) || Ft(e)) return !1;
            if (t.prototype !== e.prototype) return !1;
            if (j(t) !== j(e)) return !1;
            var a = mt(t), i = mt(e);
            if (a !== i) return !1;
            if (a || i) return t.source === e.source && _t(t) === _t(e);
            if (Tt(t) && Tt(e)) return It.call(t) === It.call(e);
            var s = Lt(t), l = Lt(e);
            if (s !== l) return !1;
            if (s || l) {
                if (t.length !== e.length) return !1;
                for (o = 0; o < t.length; o++) if (t[o] !== e[o]) return !1;
                return !0
            }
            if (typeof t != typeof e) return !1;
            try {
                var c = w(t), p = w(e)
            } catch (t) {
                return !1
            }
            if (c.length !== p.length) return !1;
            for (c.sort(), p.sort(), o = c.length - 1; 0 <= o; o--) if (c[o] != p[o]) return !1;
            for (o = c.length - 1; 0 <= o; o--) if (n = c[o], !Dt(t[n], e[n], r)) return !1;
            return !0
        }(t, e, o))
    }

    function Ft(t) {
        return null == t
    }

    function Lt(t) {
        return !(!t || "object" != typeof t || "number" != typeof t.length) && ("function" == typeof t.copy && "function" == typeof t.slice && !(0 < t.length && "number" != typeof t[0]))
    }

    var Rt = Dt, Ut = function (t) {
        return !(!(o = t) || "object" != typeof o || (e = t, "[object RegExp]" === (r = Object.prototype.toString.call(e)) || "[object Date]" === r || function (t) {
            return t.$$typeof === Bt
        }(e)));
        var e, r, o
    };
    var Bt = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

    function Nt(t, e) {
        return !1 !== e.clone && e.isMergeableObject(t) ? Jt((r = t, Array.isArray(r) ? [] : {}), t, e) : t;
        var r
    }

    function Wt(t, e, r) {
        return t.concat(e).map(function (t) {
            return Nt(t, r)
        })
    }

    function $t(t) {
        return Object.keys(t).concat((e = t, Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function (t) {
            return e.propertyIsEnumerable(t)
        }) : []));
        var e
    }

    function Ht(t, e) {
        try {
            return e in t
        } catch (t) {
            return !1
        }
    }

    function Vt(o, n, a) {
        var i = {};
        return a.isMergeableObject(o) && $t(o).forEach(function (t) {
            i[t] = Nt(o[t], a)
        }), $t(n).forEach(function (t) {
            var e, r;
            (!Ht(e = o, r = t) || Object.hasOwnProperty.call(e, r) && Object.propertyIsEnumerable.call(e, r)) && (Ht(o, t) && a.isMergeableObject(n[t]) ? i[t] = function (t, e) {
                if (!e.customMerge) return Jt;
                var r = e.customMerge(t);
                return "function" == typeof r ? r : Jt
            }(t, a)(o[t], n[t], a) : i[t] = Nt(n[t], a))
        }), i
    }

    function Jt(t, e, r) {
        (r = r || {}).arrayMerge = r.arrayMerge || Wt, r.isMergeableObject = r.isMergeableObject || Ut, r.cloneUnlessOtherwiseSpecified = Nt;
        var o = Array.isArray(e);
        return o === Array.isArray(t) ? o ? r.arrayMerge(t, e, r) : Vt(t, e, r) : Nt(e, r)
    }

    Jt.all = function (t, r) {
        if (!Array.isArray(t)) throw new Error("first argument should be an array");
        return t.reduce(function (t, e) {
            return Jt(t, e, r)
        }, {})
    };

    function Gt(t, e, r) {
        var n = ["adapter", "bytes", "code", "colors", "curve", "dataset", "decimal", "discrete", "donut", "download", "label", "legend", "library", "max", "messages", "min", "points", "precision", "prefix", "refresh", "round", "stacked", "suffix", "thousands", "title", "xmax", "xmin", "xtitle", "ytitle", "zeros"];
        t.component(e, {
            props: ["data", "id", "width", "height"].concat(n), render: function (t) {
                return t("div", {attrs: {id: this.chartId}, style: this.chartStyle}, ["Loading..."])
            }, data: function () {
                return {chartId: null}
            }, computed: {
                chartStyle: function () {
                    return this.data, this.chartOptions, {
                        height: this.height || "300px",
                        lineHeight: this.height || "300px",
                        width: this.width || "100%",
                        textAlign: "center",
                        color: "#999",
                        fontSize: "14px",
                        fontFamily: "'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif"
                    }
                }, chartOptions: function () {
                    for (var t = {}, e = n, r = 0; r < e.length; r++) {
                        var o = e[r];
                        void 0 !== this[o] && (t[o] = this[o])
                    }
                    return t
                }
            }, created: function () {
                this.chartId = this.chartId || this.id || "chart-" + Xt++
            }, mounted: function () {
                this.updateChart(), this.savedState = this.currentState()
            }, updated: function () {
                var t = this.currentState();
                Rt(t, this.savedState) || (this.updateChart(), this.savedState = t)
            }, beforeDestroy: function () {
                this.chart && this.chart.destroy()
            }, methods: {
                updateChart: function () {
                    null !== this.data ? this.chart ? this.chart.updateData(this.data, this.chartOptions) : this.chart = new r(this.chartId, this.data, this.chartOptions) : this.chart && (this.chart.destroy(), this.chart = null, this.$el.innerText = "Loading...")
                }, currentState: function () {
                    return Qt({}, {data: this.data, chartOptions: this.chartOptions})
                }
            }
        })
    }

    var Qt = Jt, Xt = 1;
    i.version = "0.6.1", i.install = function (t, e) {
        e && e.adapter && i.addAdapter(e.adapter), Gt(t, "line-chart", i.LineChart), Gt(t, "pie-chart", i.PieChart), Gt(t, "column-chart", i.ColumnChart), Gt(t, "bar-chart", i.BarChart), Gt(t, "area-chart", i.AreaChart), Gt(t, "scatter-chart", i.ScatterChart), Gt(t, "geo-chart", i.GeoChart), Gt(t, "timeline", i.Timeline)
    };
    var Yt = i;
    return "undefined" != typeof window && window.Vue && window.Vue.use(Yt), Yt
});