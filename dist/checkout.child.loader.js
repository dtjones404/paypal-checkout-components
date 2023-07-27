!function(e, a) {
    for (var i in a) e[i] = a[i];
}(window, function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = !0;
        return module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.i = function(value) {
        return value;
    };
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = "./src/loader/index.js");
}({
    "./node_modules/webpack/buildin/harmony-module.js": function(module, exports) {
        module.exports = function(originalModule) {
            if (!originalModule.webpackPolyfill) {
                var module = Object.create(originalModule);
                module.children || (module.children = []);
                Object.defineProperty(module, "loaded", {
                    enumerable: !0,
                    get: function() {
                        return module.l;
                    }
                });
                Object.defineProperty(module, "id", {
                    enumerable: !0,
                    get: function() {
                        return module.i;
                    }
                });
                Object.defineProperty(module, "exports", {
                    enumerable: !0
                });
                module.webpackPolyfill = 1;
            }
            return module;
        };
    },
    "./src/lib/namespace.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function _defineProperty(obj, key, value) {
            key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value;
            return obj;
        }
        function extendNamespace(xports) {
            for (var namespaces = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], childnamespaces = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], _iterator = namespaces, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var name = _ref, namespace = window[name];
                if (namespace) for (var _iterator3 = childnamespaces, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator](); ;) {
                    var _ref3;
                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }
                    var childname = _ref3, childnamespace = xports[childname];
                    namespace[childname] && (childnamespace = _extends({}, namespace[childname], childnamespace));
                    xports = _extends({}, namespace, xports, _defineProperty({}, childname, childnamespace));
                }
            }
            for (var _iterator2 = namespaces, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var _name = _ref2;
                window[_name] = xports;
            }
            return xports;
        }
        __webpack_exports__.a = extendNamespace;
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        };
    },
    "./src/loader/component.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function isXComponent() {
            return Boolean(window.name && window.name.split(__WEBPACK_IMPORTED_MODULE_0__config__.a.name_separator)[0] === __WEBPACK_IMPORTED_MODULE_0__config__.a.xcomponent);
        }
        function getVersion() {
            if (!isXComponent()) throw new Error("Can not get version for non-xcomponent");
            return window.name.split(__WEBPACK_IMPORTED_MODULE_0__config__.a.name_separator)[2].replace(/_/g, ".");
        }
        function isLatest() {
            if (!isXComponent()) return !1;
            var version = getVersion();
            return Boolean(version === __WEBPACK_IMPORTED_MODULE_0__config__.a.major_version || version === __WEBPACK_IMPORTED_MODULE_0__config__.a.latest_version);
        }
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/loader/config.js");
        __webpack_exports__.c = isXComponent;
        __webpack_exports__.b = getVersion;
        __webpack_exports__.a = isLatest;
    },
    "./src/loader/config.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return config;
        });
        var config = {
            checkoutjs_url: "https://www.paypalobjects.com/api/checkout{version}.js",
            major_version: "4",
            latest_version: "latest",
            xcomponent: "xcomponent",
            xchild_global: "xchild",
            name_separator: "__",
            script_props: {
                "data-paypal-checkout": "",
                "data-no-bridge": "",
                "data-state": "ppxo_checkout"
            }
        };
    },
    "./src/loader/index.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: !0
        });
        var __WEBPACK_IMPORTED_MODULE_0__lib_namespace__ = __webpack_require__("./src/lib/namespace.js");
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__lib_namespace__.a)(__webpack_require__("./src/loader/interface.js"), [ "paypal", "PAYPAL" ], [ "apps" ]);
    },
    "./src/loader/interface.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        (function(module) {
            function onLoadCheckoutIntegration(callback) {
                return __WEBPACK_IMPORTED_MODULE_0__load__.a.listen(callback);
            }
            Object.defineProperty(__webpack_exports__, "__esModule", {
                value: !0
            });
            var __WEBPACK_IMPORTED_MODULE_0__load__ = __webpack_require__("./src/loader/load.js");
            __webpack_exports__.onLoadCheckoutIntegration = onLoadCheckoutIntegration;
            module.exports.default = module.exports;
        }).call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/harmony-module.js")(module));
    },
    "./src/loader/load.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function getIntegrationURLs() {
            return {
                latest: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__component__.a)(),
                major: __WEBPACK_IMPORTED_MODULE_0__config__.a.checkoutjs_url.replace("{version}", ""),
                minor: __WEBPACK_IMPORTED_MODULE_0__config__.a.checkoutjs_url.replace("{version}", "." + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__component__.b)())
            };
        }
        function getIntegrationProps() {
            var props = _extends({}, __WEBPACK_IMPORTED_MODULE_0__config__.a.script_props), query = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.a)();
            query.env && (props["data-env"] = query.env);
            query.stage && (props["data-stage"] = query.stage);
            return props;
        }
        var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__("./src/loader/config.js"), __WEBPACK_IMPORTED_MODULE_1__responder__ = __webpack_require__("./src/loader/responder.js"), __WEBPACK_IMPORTED_MODULE_2__component__ = __webpack_require__("./src/loader/component.js"), __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("./src/loader/util.js");
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return integrationResponder;
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, integrationResponder = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__responder__.a)();
        !function(callback) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__component__.c)()) return callback(null, null);
            var urls = getIntegrationURLs(), props = getIntegrationProps();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.b)(urls.latest ? urls.major : urls.minor, __WEBPACK_IMPORTED_MODULE_0__config__.a.xchild_global, props, function(err, result) {
                return err && !urls.latest ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.b)(urls.major + "?t=" + Date.now(), __WEBPACK_IMPORTED_MODULE_0__config__.a.xchild_global, props, callback) : callback(err, result);
            });
        }(function(err, result) {
            err && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__.c)("Failed to load checkout.js", err.stack || err.toString());
            if (err || result) return integrationResponder.respond(err, result);
        });
    },
    "./src/loader/responder.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function responder() {
            function flush() {
                if (loaded) for (;callbacks.length; ) callbacks.shift().call(null, err, res);
            }
            function respond(error, result) {
                loaded = !0;
                err = error;
                res = result;
                flush();
            }
            function listen(callback) {
                callbacks.push(callback);
                flush();
            }
            var callbacks = [], loaded = !1, err = void 0, res = void 0;
            return {
                respond: respond,
                listen: listen
            };
        }
        __webpack_exports__.a = responder;
    },
    "./src/loader/util.js": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        function loadScript(url, prop, attrs, callback) {
            if (window[prop]) return callback(null, window[prop]);
            var container = document.body || document.head;
            if (!container) return callback(new Error("Can not find container to insert script into"));
            var script = document.createElement("script");
            script.src = url;
            script.onload = function() {
                return window[prop] ? callback(null, window[prop]) : callback(new Error("Expected " + prop + " to be present on window"));
            };
            script.onerror = function(err) {
                return callback(err);
            };
            for (var _iterator = Object.keys(attrs), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ;) {
                var _ref;
                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }
                var attr = _ref;
                script.setAttribute(attr, attrs[attr]);
            }
            container.appendChild(script);
        }
        function warn() {
            var message = Array.prototype.slice.call(arguments).join(" ");
            window.console && window.console.warn ? window.console.warn(message) : window.console && window.console.log && window.console.log(message);
        }
        function parseQuery() {
            var queryString = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location.search, params = {};
            queryString && 0 === queryString.indexOf("?") && (queryString = queryString.slice(1));
            if (!queryString) return params;
            if (-1 === queryString.indexOf("=")) throw new Error("Can not parse query string params: " + queryString);
            for (var _iterator2 = queryString.split("&"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator](); ;) {
                var _ref2;
                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }
                var pair = _ref2;
                pair = pair.split("=");
                pair[0] && pair[1] && (params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]));
            }
            return params;
        }
        __webpack_exports__.b = loadScript;
        __webpack_exports__.c = warn;
        __webpack_exports__.a = parseQuery;
    }
}));
//# sourceMappingURL=checkout.child.loader.js.map