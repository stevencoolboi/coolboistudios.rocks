(function() {
    var scrollSpeed = 5; // Adjust this value to control the scrolling speed (higher = faster, lower = slower)
    
    function C() {
        if (!D && document.body) {
            D = !0;
            var a = document.body, b = document.documentElement, d = window.innerHeight, c = a.scrollHeight;
            l = 0 <= document.compatMode.indexOf("CSS") ? b : a;
            m = a;
            f.keyboardSupport && window.addEventListener("keydown", M, !1);
            if (top != self) v = !0;
            else if (ca && c > d && (a.offsetHeight <= d || b.offsetHeight <= d)) {
                var e = document.createElement("div");
                e.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + l.scrollHeight + "px";
                document.body.appendChild(e);
                var g;
                w = function() {
                    g || (g = setTimeout(function() {
                        e.style.height = "0";
                        e.style.height = l.scrollHeight + "px";
                        g = null
                    }, 500));
                };
                setTimeout(w, 10);
                window.addEventListener("resize", w, !1);
                z = new da(w);
                z.observe(a, {attributes: !0, childList: !0, characterData: !1});
                l.offsetHeight <= d && (d = document.createElement("div"), d.style.clear = "both", a.appendChild(d))
            }
            f.fixedBackground || (a.style.backgroundAttachment = "scroll", b.style.backgroundAttachment = "scroll");
        }
    }

    function N(a, b, d) {
        ea(b, d);
        if (1 != f.accelerationMax) {
            var c = Date.now() - E;
            c < f.accelerationDelta && (c = (1 + 50 / c) / 2, 1 < c && (c = Math.min(c, f.accelerationMax), b *= c, d *= c));
            E = Date.now();
        }
        t.push({x: b * scrollSpeed, y: d * scrollSpeed, lastX: 0 > b ? .99 : -.99, lastY: 0 > d ? .99 : -.99, start: Date.now()});
        if (!F) {
            c = O();
            var e = a === c || a === document.body;
            null == a.$scrollBehavior && fa(a) && (a.$scrollBehavior = a.style.scrollBehavior, a.style.scrollBehavior = "auto");
            var g = function(c) {
                c = Date.now();
                for (var k = 0, l = 0, h = 0; h < t.length; h++) {
                    var n = t[h], p = c - n.start, m = p >= f.animationTime, q = m ? 1 : p / f.animationTime;
                    f.pulseAlgorithm && (p = q, 1 <= p ? q = 1 : 0 >= p ? q = 0 : (1 == f.pulseNormalize && (f.pulseNormalize /= P(1)), q = P(p)));
                    p = n.x * q - n.lastX >> 0;
                    q = n.y * q - n.lastY >> 0;
                    k += p;
                    l += q;
                    n.lastX += p;
                    n.lastY += q;
                    m && (t.splice(h, 1), h--);
                }
                e ? window.scrollBy(k, l) : (k && (a.scrollLeft += k), l && (a.scrollTop += l));
                b || d || (t = []);
                t.length ? Q(g, a, 1E3 / f.frameRate + 1) : (F = !1, null != a.$scrollBehavior && (a.style.scrollBehavior = a.$scrollBehavior, a.$scrollBehavior = null));
            };
            Q(g, a, 0);
            F = !0;
        }
    }

    // All other functions remain the same...

})();
