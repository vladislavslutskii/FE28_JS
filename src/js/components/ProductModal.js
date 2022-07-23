!(function (e) {
  var t = {};
  function n(i) {
    if (t[i]) return t[i].exports;
    var o = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var i = Object.create(null);
      if (
        (n.r(i),
        Object.defineProperty(i, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var o in e)
          n.d(
            i,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return i;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 1));
})([
  function (e, t, n) {
    "use strict";
    function i() {
      return (i =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n)
              Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }).apply(this, arguments);
    }
    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, i.key, i);
      }
    }
    n.d(t, "a", function () {
      return l;
    });
    var s,
      r,
      a,
      l = (function () {
        function e(t) {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e);
          (this.config = i(
            {
              backscroll: !0,
              linkAttributeName: "data-hystmodal",
              closeOnOverlay: !0,
              closeOnEsc: !0,
              closeOnButton: !0,
              waitTransitions: !1,
              catchFocus: !0,
              fixedSelectors: "*[data-hystfixed]",
              beforeOpen: function () {},
              afterClose: function () {},
            },
            t
          )),
            this.config.linkAttributeName && this.init(),
            (this._closeAfterTransition =
              this._closeAfterTransition.bind(this));
        }
        var t, n, s;
        return (
          (t = e),
          (n = [
            {
              key: "init",
              value: function () {
                (this.isOpened = !1),
                  (this.openedWindow = !1),
                  (this.starter = !1),
                  (this._nextWindows = !1),
                  (this._scrollPosition = 0),
                  (this._reopenTrigger = !1),
                  (this._overlayChecker = !1),
                  (this._isMoved = !1),
                  (this._focusElements = [
                    "a[href]",
                    "area[href]",
                    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                    "select:not([disabled]):not([aria-hidden])",
                    "textarea:not([disabled]):not([aria-hidden])",
                    "button:not([disabled]):not([aria-hidden])",
                    "iframe",
                    "object",
                    "embed",
                    "[contenteditable]",
                    '[tabindex]:not([tabindex^="-"])',
                  ]),
                  (this._modalBlock = !1),
                  e._shadow ||
                    ((e._shadow = document.createElement("button")),
                    e._shadow.classList.add("hystmodal__shadow"),
                    document.body.appendChild(e._shadow)),
                  this.eventsFeeler();
              },
            },
            {
              key: "eventsFeeler",
              value: function () {
                document.addEventListener(
                  "click",
                  function (e) {
                    var t = e.target.closest(
                      "[" + this.config.linkAttributeName + "]"
                    );
                    if (!this._isMoved && t) {
                      e.preventDefault(), (this.starter = t);
                      var n = this.starter.getAttribute(
                        this.config.linkAttributeName
                      );
                      return (
                        (this._nextWindows = document.querySelector(n)),
                        void this.open()
                      );
                    }
                    this.config.closeOnButton &&
                      e.target.closest("[data-hystclose]") &&
                      this.close();
                  }.bind(this)
                ),
                  this.config.closeOnOverlay &&
                    (document.addEventListener(
                      "mousedown",
                      function (e) {
                        (!this._isMoved &&
                          e.target instanceof Element &&
                          !e.target.classList.contains("hystmodal__wrap")) ||
                          (this._overlayChecker = !0);
                      }.bind(this)
                    ),
                    document.addEventListener(
                      "mouseup",
                      function (e) {
                        if (
                          !this._isMoved &&
                          e.target instanceof Element &&
                          this._overlayChecker &&
                          e.target.classList.contains("hystmodal__wrap")
                        )
                          return (
                            e.preventDefault(),
                            this._overlayChecker,
                            void this.close()
                          );
                        this._overlayChecker = !1;
                      }.bind(this)
                    )),
                  window.addEventListener(
                    "keydown",
                    function (e) {
                      if (
                        !this._isMoved &&
                        this.config.closeOnEsc &&
                        27 == e.which &&
                        this.isOpened
                      )
                        return e.preventDefault(), void this.close();
                      !this._isMoved &&
                        this.config.catchFocus &&
                        9 == e.which &&
                        this.isOpened &&
                        this.focusCatcher(e);
                    }.bind(this)
                  );
              },
            },
            {
              key: "open",
              value: function (t) {
                if (
                  (t &&
                    (this._nextWindows =
                      "string" == typeof t ? document.querySelector(t) : t),
                  this._nextWindows)
                ) {
                  if (this.isOpened)
                    return (this._reopenTrigger = !0), void this.close();
                  (this.openedWindow = this._nextWindows),
                    (this._modalBlock =
                      this.openedWindow.querySelector(".hystmodal__window")),
                    this.config.beforeOpen(this),
                    this._bodyScrollControl(),
                    e._shadow.classList.add("hystmodal__shadow--show"),
                    this.openedWindow.classList.add("hystmodal--active"),
                    this.openedWindow.setAttribute("aria-hidden", "false"),
                    this.config.catchFocus && this.focusContol(),
                    (this.isOpened = !0);
                } else console.log("Warinig: hustModal selector is not found");
              },
            },
            {
              key: "close",
              value: function () {
                this.isOpened &&
                  (this.config.waitTransitions
                    ? (this.openedWindow.classList.add("hystmodal--moved"),
                      (this._isMoved = !0),
                      this.openedWindow.addEventListener(
                        "transitionend",
                        this._closeAfterTransition
                      ),
                      this.openedWindow.classList.remove("hystmodal--active"))
                    : (this.openedWindow.classList.remove("hystmodal--active"),
                      this._closeAfterTransition()));
              },
            },
            {
              key: "_closeAfterTransition",
              value: function () {
                this.openedWindow.classList.remove("hystmodal--moved"),
                  this.openedWindow.removeEventListener(
                    "transitionend",
                    this._closeAfterTransition
                  ),
                  (this._isMoved = !1),
                  e._shadow.classList.remove("hystmodal__shadow--show"),
                  this.openedWindow.setAttribute("aria-hidden", "true"),
                  this.config.catchFocus && this.focusContol(),
                  this._bodyScrollControl(),
                  (this.isOpened = !1),
                  (this.openedWindow.scrollTop = 0),
                  this.config.afterClose(this),
                  this._reopenTrigger &&
                    ((this._reopenTrigger = !1), this.open());
              },
            },
            {
              key: "focusContol",
              value: function () {
                var e = this.openedWindow.querySelectorAll(this._focusElements);
                this.isOpened && this.starter
                  ? this.starter.focus()
                  : e.length && e[0].focus();
              },
            },
            {
              key: "focusCatcher",
              value: function (e) {
                var t = this.openedWindow.querySelectorAll(this._focusElements),
                  n = Array.prototype.slice.call(t);
                if (this.openedWindow.contains(document.activeElement)) {
                  var i = n.indexOf(document.activeElement);
                  console.log(i),
                    e.shiftKey &&
                      0 === i &&
                      (n[n.length - 1].focus(), e.preventDefault()),
                    e.shiftKey ||
                      i !== n.length - 1 ||
                      (n[0].focus(), e.preventDefault());
                } else n[0].focus(), e.preventDefault();
              },
            },
            {
              key: "_bodyScrollControl",
              value: function () {
                if (this.config.backscroll) {
                  var e = Array.prototype.slice.call(
                      document.querySelectorAll(this.config.fixedSelectors)
                    ),
                    t = document.documentElement;
                  if (!0 === this.isOpened)
                    return (
                      t.classList.remove("hystmodal__opened"),
                      (t.style.marginRight = ""),
                      e.map(function (e) {
                        e.style.marginRight = "";
                      }),
                      window.scrollTo(0, this._scrollPosition),
                      void (t.style.top = "")
                    );
                  this._scrollPosition = window.pageYOffset;
                  var n = window.innerWidth - t.clientWidth;
                  (t.style.top = -this._scrollPosition + "px"),
                    n &&
                      ((t.style.marginRight = n + "px"),
                      e.map(function (e) {
                        e.style.marginRight =
                          parseInt(getComputedStyle(e).marginRight) + n + "px";
                      })),
                    t.classList.add("hystmodal__opened");
                }
              },
            },
          ]) && o(t.prototype, n),
          s && o(t, s),
          e
        );
      })();
    (a = !1),
      (r = "_shadow") in (s = l)
        ? Object.defineProperty(s, r, {
            value: a,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (s[r] = a);
  },
  function (e, t, n) {
    "use strict";
    n.r(t),
      function (e) {
        var t = n(0);
        n(3), n(4);
        e.HystModal = t.a;
      }.call(this, n(2));
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function("return this")();
    } catch (e) {
      "object" == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t) {
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector),
      Element.prototype.closest ||
        (Element.prototype.closest = function (e) {
          var t = this;
          do {
            if (t.matches(e)) return t;
            t = t.parentElement || t.parentNode;
          } while (null !== t && 1 === t.nodeType);
          return null;
        });
  },
  function (e, t, n) {},
]);
