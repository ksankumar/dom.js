/**
 * Copyright (c) 2016 Santhosh Kumar, Krishnan
 * @license The MIT License (MIT)
 * @description Perform DOM manipulation.
 * @author Santhosh Kumar Krishnan, https://www.linkedin.com/in/ksankumar
 * @version v1.0.1
 **/

(function(root, factory) {
    /**
     * AMD/RequireJS
     */
    if (typeof define === 'function' && define.amd) {
        define('dom', factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        /**
         * Common-js
         * Global access for DOM
         */
        root.$ = root.dom = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, function(win) {

    'use strict';
    var document = win.document,
        ep = Element.prototype,
        matchPrefixes = ['webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'],
        fn = function() {},
        wd = [('innerHeight' in win) ? win.innerHeight : document.documentElement.clientHeight, ('innerWidth' in win) ? win.innerWidth : document.documentElement.clientWidth],
        bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
        unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
        prefix = bind !== 'addEventListener' ? 'on' : '',
        matchEx = {
            'TAGS': 'body header section aside article nav address abbr area audio b base basefont bdi bdo blockquote button canvas center cite code col colgroup datalist dd delement details dfn dialog div dl dt em embed fielementdset figcaptain figure font footer form h1 h2 h3 h4 h5 h6 head hr i iframe img input lable legend li link main map mark menu menuitem meter object ol optgroup option output p param pre progress q rp rt s selementect small source span strong sub summary sup table thead tbody tr th td teatarea tfoot time title track u ul video wbr'.split(' '),
            'ID': /^(?:#([\w-]*))dom/,
            'CLASS': /^(?:#([\w-]*))dom/,
            'TAG': /<([\w-]*)>/
        },
        focusable = /^(?:input|select|textarea|button)$/i,
        checkable = /^(?:input|option)$/i,
        cssNumber = {
            'animationIterationCount': 1,
            'columnCount': 1,
            'fillOpacity': 1,
            'flexGrow': 1,
            'flexShrink': 1,
            'fontWeight': 1,
            'lineHeight': 1,
            'opacity': 1,
            'order': 1,
            'orphans': 1,
            'widows': 1,
            'zIndex': 1,
            'zoom': 1
        },
        /**
         * Common private Utility function
         * @type {Object}
         */
        Util = {
            /**
             * @method matches the element would be selected by the specified selector string
             * @return {Objec} returns whether an element matches a selector
             */
            matches: (function() {
                /* check for the standard method name first*/
                if (ep.matches) {
                    return 'matches';
                }
                /* check un-prefixed */
                if (ep.matchesSelector) {
                    return 'matchesSelector';
                }
                /* check vendor prefixes */
                var method, i = 0,
                    l = matchPrefixes.length;

                for (; i < l; i++) {
                    method = matchPrefixes[i];
                    if (ep[method]) {
                        return method;
                    }
                }
            })(),
            /**
             * convert to CamelCase
             * @method toCamelCase
             * @param  {String} name String [foo-bar]
             * @return {String} returns converted CamelCase [fooBar]
             */
            toCamelCase: function(name) {
                return name.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(all, letter) {
                    return letter.toUpperCase();
                });
            },
            /**
             * Checks whether Array or not
             * @method isArray
             * @param  {Array} obj
             * @return {Boolean} return true if Array
             */
            isArray: function(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            },
            /**
             * Sorting and removing duplicates
             * @method uniqueSort
             * @param  {Array} ary
             * @return {Array} Filtered array result
             */
            uniqueSort: function(ary) {
                var i, j, ele = [],
                    l = ary.length,
                    hasDuplicate = false,
                    compare;
                for (i = 0; i < l; i++) {
                    for (j = i + 1; j < l; j++) {
                        if (ary[i] === ary[j]) {
                            j = ++i;
                        }
                    }
                    ele.push(ary[i]);
                }
                ele = ele.sort(function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                        return 0;
                    }
                    compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                    if (compare) {
                        return compare;
                    }
                    compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
                    return compare & 4 ? -1 : 1;

                });
                return ele;
            },
            /**
             * Get the next, previous or sibling of an element or retrieve sibling that match a given selector
             * @method sibling
             * @param  {Object} ele
             * @param  {String} node
             * @return {Object} result of sibling
             */
            sibling: function(ele, node) {
                do {
                    ele = ele[node];
                } while (ele && ele.nodeType !== 1);
                return ele;
            },
            /**
             * Get the next, previous or all siblings of an element or retrieve siblings that match a given selector
             * @method siblings
             * @param  {Object} sibling
             * @param  {Object} elem
             * @return {Object} result of siblings
             */
            siblings: function(sibling, elem) {
                var siblings = [];
                for (; sibling; sibling = sibling.nextSibling) {
                    if (sibling.nodeType == 1 && sibling != elem) {
                        siblings.push(sibling);
                    }
                }
                return siblings;
            },
            /**
             * Get the next, previous or all siblings of an element or retrieve siblings that match a given selector
             * @method siblings
             * @param  {Object} ele
             * @param  {String} type
             * @return {Object} List of siblings
             */
            siblingsList: function(elem, type) {
                var matched = [];

                while ((elem = elem[type]) && elem.nodeType !== 9) {
                    if (elem.nodeType === 1) {
                        matched.push(elem);
                    }
                }
                return matched;
            },
            /**
             * filter specific element
             * @method filter
             * @param  {Object} nodes
             * @param  {String} selector
             * @return {Array} Filtered element
             */
            filter: function(nodes, selector) {
                var length = nodes.length,
                    i = 0,
                    matche = [];
                while (i < length) {
                    if (nodes[i].matches(selector)) {
                        matche.push(nodes[i]);
                    }
                    ++i;
                }
                return matche;
            },
            /**
             * Get and Set the computed style properties or set CSS properties for an element
             * @method setStyle
             * @param  {Object} el
             * @param  {String} property
             * @param  {String/Method} value
             * @param  {Number} index
             */
            setStyle: function(el, property, value, index) {
                if (dom.type(value) === 'string') {
                    var name = this.toCamelCase(property),
                        _value;
                    if (typeof value === 'number') {
                        value += cssNumber[name] ? '' : 'px';
                    } else if (typeof value === 'string' && (_value = value.match(/^(\d+)%?$/i)) !== null) {
                        value = cssNumber[name] ? '' : _value[0] + 'px';
                    }
                    if (value === undefined) return el.style[property];
                    try {
                        el.style[property] = value;
                    } catch (e) {}
                } else if (dom.type(value) === 'function') {
                    var style = this.computeStyle(el, property);
                    return value.call(el, index, style);
                }
            },
            /**
             * Showing and hiding an element can be achieved by toggling its display style
             * @method showHide
             * @param  {Object} el
             * @param  {Boolean} show
             */
            showHide: function(el, show) {
                var display = el.style.display;
                if (show) {
                    if (display === 'none') {
                        el.style.display = '';
                    } else if (display === '') {
                        el.style.display = 'block';
                    }
                } else if (display !== 'none') {
                    el.style.display = 'none';
                }
            },
            /**
             * Check the element's display property for rendering it visible or invisible
             * @method isHidden
             * @param  {Object} el
             * @return {Boolean}
             */
            isHidden: function(el) {
                return (window.getComputedStyle ? getComputedStyle(el, null) === 'none' : el.currentStyle).display === 'none';
            },
            /**
             * set the styles
             * @method computeStyle
             * @param  {Object} el
             * @param  {String} styles
             * @return {Object}
             */
            computeStyle: function(el, styles) {
                return window.getComputedStyle ? getComputedStyle(el, null)[styles] : el.currentStyle[styles];
            },
            focus: function(el) {
                return (focusable.test(el.nodeName) && document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(el.type || el.href || ~el.tabIndex));
            }
        },
        Events = {
            events: {},
            /**
             * add the events into an array for bind/unbind
             * @method add
             * @param  {String} selector
             * @param  {Object} target
             * @param  {Object} event
             * @param  {Method} callBack
             * @param  {Number} index
             */
            add: function(selector, target, event, callBack, index) {
                this.events[selector.replace(/\s+/g, '_') + index + event] = {
                    event: event,
                    callBack: callBack || fn,
                    target: target,
                    exist: 1
                };
            },
            /**
             * unbind the registered events and remove from events array
             * @method unbind
             * @param  {String} selector
             * @param  {Object} target
             * @param  {Object} event
             * @param  {Method} callBack
             * @param  {Number} index
             * @return {Object} filtered event
             */
            unbind: function(selector, target, event, callBack, index) {
                var bindedEvt, eventName = selector.replace(/\s+/g, '_') + index + event;
                bindedEvt = this.events[eventName] || { 'target': target, 'event': event, 'callBack': callBack || fn };
                if (bindedEvt.exist) {
                    delete this.events[eventName];
                }
                return bindedEvt;
            }
        },
        hasClass,
        addClass,
        removeClass,
        toggleClass;
    /**
     * @param  {Object} element
     * @param  {String} name
     * @return {Object} class filter
     */
    if ('classList' in document.documentElement) {
        hasClass = function(element, name) {
            return element.classList.contains(name);
        };
        addClass = function(element, name) {
            element.classList.add(name);
        };
        removeClass = function(element, name) {
            element.classList.remove(name);
        };
        toggleClass = function(element, name) {
            element.classList.toggle(name);
        };
    } else {
        hasClass = function(element, name) {
            return new RegExp('(^|\\s)' + name + '(\\s|dom)').test(element.className);
        };
        addClass = function(element, name) {
            if (!hasClass(element, name)) {
                element.className += (element.className ? ' ' : '') + name;
            }
        };
        removeClass = function(element, name) {
            if (hasClass(element, name)) {
                element.className = element.className.replace(new RegExp('(^|\\s)*' + name + '(\\s|dom)*', 'g'), '');
            }
        };
        toggleClass = function(element, name) {
            (hasClass(element, name) ? removeClass : addClass)(element, name);
        };
    }
    /**
     * Initialize the DOM method
     * @method DOM
     * @param  {Object} element
     * @param  {String} selector
     * @return {Object} Selected elements
     */
    function DOM(element, selector) {
        this.length = element ? element.length : 0;
        this.selector = selector || null;
        return selector ? dom.extend(this, element) : this;
    }
    /**
     * [DOM prototypes]
     * @type DOM properties
     */
    DOM.prototype = {
        /**
         * loop through a NodeList and do something with each element
         * @method each
         * @param  {Method} callBack
         * @return {Array/Object}
         */
        each: function(callBack) {
            return dom.each(this, callBack);
        },
        /**
         * Attach an event handler function for one or more events to the selected elements
         * @method on
         * @param  {String} event   name of the event
         * @param  {Method} callBack
         * @return {Object}
         */
        on: function(event, callBack) {
            return this.fire(event, callBack);
        },
        /**
         * fire the events
         * @method fire
         * @param  {String} event name of the event
         * @param  {Method} callBack event listener
         * @return {Object} DOM instance
         */
        fire: function(event, callBack) {
            var l = this.length,
                selector = this.selector;
            while (l--) {
                this[l][unbind](prefix + event, callBack, false);
                this[l][bind](prefix + event, callBack, false);
                Events.add(selector, this[l], event, callBack, l);
            }
            return this;
        },
        /**
         * Remove an event handler
         * @method off
         * @param  {String} event Name of the event
         * @param  {Method} callBack Event listener
         * @return {Object} DOM instance
         */
        off: function(event, callBack) {
            var l = this.length,
                bindedEvent,
                selector = this.selector;
            while (l--) {
                bindedEvent = Events.unbind(selector, this[l], event, callBack, l);
                bindedEvent.target[unbind](prefix + bindedEvent.event, bindedEvent.callBack, false);
            }
            return this;
        },
        /**
         * Read or write the HTML content of an element.
         * @method html
         * @param  {String} value Read or write the HTML content of an element.
         * @return {Object} DOM instance
         */
        html: function(value) {
            if (value === undefined) {
                return this.nodeType === 1 ? this.innerHTML.replace(/(?:null|\d+)/g, '') : this[0].innerHTML.replace(/(?:null|\d+)/g, '');
            }
            if (typeof value === 'string') {
                var i = 0,
                    l = this.length;
                for (; i < l; i++) {
                    this[i].innerHTML = value;
                }
            }
            return this;
        },
        /**
         * Get the combined text contents of an element, including its descendants, or set the text content of the element
         * @method text
         * @param  {String} value Text content
         * @return {Object} DOM instance
         */
        text: function(value) {
            var i = 0,
                l = this.length;
            if (value === undefined) {
                if (this.nodeType === 1) {
                    return this.innerText || this.textContent;
                } else {
                    return dom.each(this, function(i, el) {
                        return el.innerText;
                    });
                }
            }
            if (typeof value === 'string') {
                for (; i < l; i++) {
                    this[i].innerText = value;
                }
                return this;
            }
        },
        /**
         * Modify attributes, such as id, alt, title and more
         * @method attr
         * @param  {String} property Attributes name
         * @param  {String} value Attributes value
         * @return {Object} DOM instance
         */
        attr: function(property, value) {
            var el = this[0],
                nodeType;
            nodeType = el.nodeType;
            if (nodeType === 3 || nodeType === 8 || nodeType === 2) {
                return;
            }

            property = property.toLowerCase();
            return value !== undefined ? el.setAttribute(property, value) : el.getAttribute(property) || el.getAttributeNode(property);
        },
        /**
         * Read, write, or remove data values of an element.
         * @method data
         * @param  {String} property Data attributes name
         * @param  {String} value Data attributes value
         * @return {Object} DOM instance
         */
        data: function(property, value) {

            if (dom.type(property) === 'string') {
                property = property.replace(/[A-Z]/g, '-$&').toLowerCase();
                return property !== undefined ? this.attr('data-' + property, value) : this.attr('data', value);
            }
            var el = this[0],
                data = {},
                attrs,
                name;

            if (el.nodeType === 1) {
                attrs = el && el.attributes;
                dom.each(attrs, function(i, attr) {
                    name = attr.name;
                    if (/^data-/.test(name)) {
                        name = Util.toCamelCase(name.substr(5));
                        data[name] = attr.value;
                    }
                });
                return data;
            }
        },
        /**
         * Delete the given data attribute:
         * @method removeAttr
         * @param  {String} property Attribute name/property
         * @return {Object} DOM instance
         */
        removeAttr: function(property) {
            var l = this.length;
            property = property.toLowerCase();
            while (l--) {
                this[l].removeAttribute(property);
            }
            return this;
        },
        /**
         * Insert a new element or an HTML structure to the end of another element's content
         * @method append
         * @param  {String} html Html element
         * @return {Object} DOM instance
         */
        append: function(html) {
            var i = 0,
                l = this.length;
            for (; i < l; i++) {
                this[i].insertAdjacentHTML('beforeend', html);
            }
            return this;
        },
        /**
         * Insert a new element or an HTML structure to the beginning of another element's content
         * @method prepend
         * @param  {String} html HTML element
         * @return {Object} DOM instance
         */
        prepend: function(html) {
            var i = 0,
                l = this.length;
            for (; i < l; i++) {
                this[i].insertAdjacentHTML('afterbegin', html);
            }
            return this;
        },
        /**
         * Insert an HTML structure before a given DOM tree element.
         * @method before
         * @param  {String} html HTML element
         * @return {Object} DOM instance
         */
        before: function(html) {
            var i = 0,
                l = this.length;
            for (; i < l; i++) {
                this[i].insertAdjacentHTML('beforebegin', html);
            }
            return this;
        },
        /**
         * Insert an HTML structure after a given DOM tree element.
         * @method after
         * @param  {String} html HTML element
         * @return {Object} DOM instance
         */
        after: function(html) {
            var i = 0,
                l = this.length;
            for (; i < l; i++) {
                this[i].insertAdjacentHTML('afterend', html);
            }
            return this;
        },
        /**
         * Remove all child nodes of an element from the DOM.
         * @method empty
         * @return {Object} DOM instance
         */
        empty: function() {
            return this.each(function(i, el) {
                el.innerHTML = '';
            });
        },
        /**
         * Remove an element from the DOM tree.
         * @method remove
         * @param  {String} value Element attribute
         * @return {Object} DOM instance
         */
        remove: function(value) {
            var el = this;
            if (this.nodeType === 1) {
                this.parentNode.removeChild(el);
            } else {
                var i = 0,
                    l = this.length;
                for (; i < l; i++) {
                    el = this[i];
                    this[i].parentNode.removeChild(el);
                }
            }
            return this;
        },
        /**
         * Determine whether any of the matched elements are assigned the given class
         * @method hasClass
         * @param  {String} name Class name
         * @return {Boolean} true if class exist, else flse
         */
        hasClass: function(name) {
            if (this.nodeType === 1) {
                return hasClass(this, name);
            } else {
                var ele,
                    i = 0;
                while ((ele = this[i++])) {
                    if (hasClass(ele, name)) return true;
                }
                return false;
            }
        },
        /**
         * Adds the specified class(es) to each element in the set of matched elements
         * @method addClass
         * @param  {String} name Class name
         * @return {Object} DOM instance
         */
        addClass: function(name) {
            if (this.nodeType === 1) {
                addClass(this, name);
            } else {
                var l = this.length;
                while (l--) {
                    addClass(this[l], name);
                }
            }
            return this;
        },
        /**
         * Remove a single class, multiple classes, or all classes from each element in the set of matched elements.
         * @method removeClass
         * @param  {String} name Class name
         * @return {Object} DOM instance
         */
        removeClass: function(name) {
            if (this.nodeType === 1) {
                removeClass(this, name);
            } else {
                var l = this.length;
                while (l--) {
                    removeClass(this[l], name);
                }
            }
            return this;
        },
        /**
         * Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the state argument
         * @method toggleClass
         * @param  {String} name Class name
         * @return {Object} DOM instance
         */
        toggleClass: function(name) {
            if (this.nodeType === 1) {
                toggleClass(this, name);
            } else {
                var l = this.length;
                while (l--) {
                    toggleClass(this[l], name);
                }
            }
            return this;
        },
        /**
         * Getting the parent DOM node of an element.
         * @method parent
         * @return {Object} DOM instance
         */
        parent: function() {
            var parent = this[0].parentNode;
            return (parent && parent.nodeType !== 11) ? dom(parent) : null;
        },
        /**
         * Getting all parents DOM node of an element.
         * @method parents
         * @return {Object} DOM instance
         */
        parents: function() {
            var nodes = [],
                element = this[0];
            while (element.parentNode) {
                nodes.push(element.parentNode);
                element = element.parentNode;
            }
            return dom(nodes);
        },
        /**
         * Get the next of an element or retrieve siblings.
         * @method next
         * @return {Object} DOM instance
         */
        next: function() {
            return dom.each(this, function(i, el) {
                return Util.sibling(el, 'nextSibling');
            });
        },
        /**
         * Get all preceding siblings of an element, optionally filtered:
         * @method nextAll
         * @param  {String} selector Element selector name
         * @return {Object} DOM instance
         */
        nextAll: function(selector) {
            var elem = dom.each(this, function(i, el) {
                return Util.siblingsList(el, 'nextSibling');
            });
            elem = Util.filter(elem, selector);
            return dom(elem);
        },
        /**
         * Get the previous of an element or retrieve siblings.
         * @method prev
         * @return {Object} DOM instance
         */
        prev: function(elem) {
            return dom.each(this, function(i, el) {
                return Util.sibling(el, 'previousSibling');
            });
        },
        /**
         * Get all previous siblings of an element, optionally filtered:
         * @method prevAll
         * @param  {String} selector Element selector name
         * @return {Object} DOM instance
         */
        prevAll: function(selector) {
            var elem = dom.each(this, function(i, el) {
                return Util.siblingsList(el, 'previousSibling');
            });
            elem = Util.filter(elem, selector);
            return dom(elem);
        },
        /**
         * Get the all siblings of an element or retrieve siblings that match a given selector.
         * @method siblings
         * @return {Object} DOM instance
         */
        siblings: function() {
            var elem = dom.each(this, function(i, el) {
                return Util.siblings((el.parentNode || {}).firstChild, el);
            });
            if (1 < elem.length)
                elem = Util.uniqueSort(elem);
            return dom(elem);
        },
        /**
         * Getting the children of a DOM element.
         * @method children
         * @return {Object} DOM instance
         */
        children: function() {
            var elem = dom.each(this, function(i, el) {
                return Util.siblings(el.firstChild);
            });
            if (1 < elem.length)
                elem = Util.uniqueSort(elem);
            return dom(elem);
        },
        /**
         * Get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree
         * @method closest
         * @param  {String} selector DOM selector
         * @return {Object} Closest matched elements
         */
        closest: function(selector) {
            var i = 0,
                el,
                l = this.length,
                matched = [];
            for (; i < l; i++) {
                el = this[i].parentNode;
                if (el.nodeType < 11 && el.nodeType === 1 && el[Util.matches](selector)) {
                    matched.push(el);
                }
            }
            if (1 < matched.length)
                matched = Util.uniqueSort(matched);
            return matched;
        },
        /**
         * Bind an event handler to the 'focus' JavaScript event, or trigger that event on an element.
         * @method focus
         * @param  {Method} callBack Called after focus
         */
        focus: function(callBack) {
            if (Util.focus(this[0])) {
                if (dom.isFunction(callBack)) {
                    this.on('focus', callBack);
                } else {
                    this[0].focus();
                    return false;
                }
            }
        },
        /**
         * The focusin event is sent to an element when it, or any element inside of it, gains focus
         * @method focusIn
         * @param  {Method} callBack Called after focusIn
         */
        focusIn: function(callBack) {
            if (Util.focus(this[0])) {
                this.on('focusin', callBack);
            }
        },
        /**
         * The focusout event is sent to an element when it, or any element inside of it, loses focus.
         * @method focusOut
         * @param  {method} callBack Called after focusOut
         */
        focusOut: function(callBack) {
            if (Util.focus(this[0])) {
                this.on('focusout', callBack);
            }
        },
        /**
         * Selected Object from the first element in that set.
         * @method first
         * @return {Object} First element set
         */
        first: function() {
            return this.eq(0);
        },
        /**
         * Selected Object from the last element in that set.
         * @method last
         * @return {Object} Last element set
         */
        last: function() {
            return this.eq(-1);
        },
        /**
         * Object from one element within that set
         * @method eq
         * @param  {Number} i Index for get element
         * @return {Object} object one at the specified index.
         */
        eq: function(i) {
            var len = this.length;
            i = +i + (i < 0 ? len : 0);
            return $(this[i]);
        },
        /**
         * Retrieve the DOM elements matched by the DOM object
         * @method get
         * @param  {Number} index Index for get element
         * @return {Object} one at the specified index.
         */
        get: function(index) {
            return index !== undefined ? (index < 0 ? this[index + this.length] : this[index]) : [].slice.call(this);
        },
        /**
         * Get the computed style properties or set CSS properties for an element.
         * @method css
         * @param  {String} styles Style property of an element
         * @param  {String} value Style value of an element
         * @return {Object} DOM instance
         */
        css: function(styles, value) {
            dom.each(this, function(i, el) {
                if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style) {
                    return;
                }
                if (dom.type(styles) === 'string' && value !== undefined) {
                    return Util.setStyle(el, styles, value, i);
                }
                return dom.each(styles, function(style, property) {
                    return Util.setStyle(el, style, property, i);
                });
            });
            return this;
        },
        /**
         * Calculate particular element metrics
         * @method getElementMetrics
         * @return {Object} DOM instance
         */
        getElementMetrics: function() {
            var el = this[0],
                elOffset,
                elOffsetParent = el.offsetParent;

            for (elOffset = el, offsetTop = 0, offsetLeft = 0; elOffset.offsetParent; elOffset = elOffset.parentNode) {
                offsetTop += elOffset.offsetTop;
                offsetLeft += elOffset.offsetLeft;
            }

            return {
                height: el.offsetHeight,
                width: el.offsetWidth,
                absolute: {
                    bottom: wd[0] - (el.offsetHeight + offsetTop),
                    left: offsetLeft,
                    right: wd[1] - (el.offsetWidth + offsetLeft),
                    top: offsetTop
                },
                relative: {
                    bottom: elOffsetParent.offsetHeight - (el.offsetHeight + el.offsetTop),
                    left: el.offsetLeft,
                    right: elOffsetParent.offsetWidth - (el.offsetWidth + el.offsetLeft),
                    top: el.offsetTop
                }
            };
        },
        /**
         * Hiding an element can be achieved by display style:
         * @method hide
         * @return {Object} DOM instance
         */
        hide: function() {
            return dom.each(this, function(el) {
                Util.showHide(el);
            });
        },
        /**
         * Showing an element can be achieved by display style:
         * @method show
         * @return {Object} DOM instance
         */
        show: function() {
            return dom.each(this, function(el) {
                Util.showHide(el, true);
            });
        },
        /**
         * [isHidden description]
         * @method isHidden
         * @return {Boolean} [description]
         */
        isHidden: function() {

        },
        /**
         * Showing and hiding an element can be achieved by toggling its display style:
         * @method toggle
         * @param  {Boolean} Hide or show an element
         * @return {Object} DOM instance
         */
        toggle: function(state) {
            if (typeof state === 'boolean') {
                return state ? this.show() : this.hide();
            }
            return dom.each(this, function(i, el) {
                if (Util.isHidden(el)) {
                    Util.showHide(el, true);
                } else {
                    Util.showHide(el);
                }
            });
        },
        /**
         * Hide the matched elements by fading them to transparent
         * @method fadeOut
         * @param  {Time} duration Number determining how long the animation will run.
         * @param  {Method} callBack Success function
         * @return {Object} DOM instance
         */
        fadeOut: function(duration, callBack) {
            var length = this.length - 1,
                to;
            return dom.each(this, function(i, el) {
                to = 1;
                dom.animate({
                    duration: duration || 300,
                    delta: function(progress) {
                        return dom.easing.swing(progress);
                    },
                    complete: function() {
                        if (i === length) callBack();
                    },
                    step: function(delta) {
                        el.style.opacity = to - delta;
                    }
                });
            });
        },
        /**
         * Display the matched elements by fading them to opaque.
         * @method fadeIn
         * @param  {Time} duration Number determining how long the animation will run.
         * @param  {Method} callBack Success function
         * @return {Object} DOM instance
         */
        fadeIn: function(duration, callBack) {
            var length = this.length - 1,
                to;
            return dom.each(this, function(i, el) {
                to = 0;
                el.style.opacity = 0;
                el.style.display = 'block';
                dom.animate({
                    duration: duration || 300,
                    delta: function(progress) {
                        return dom.easing.swing(progress);
                    },
                    complete: function() {
                        if (i === length) callBack();
                    },
                    step: function(delta) {
                        el.style.opacity = to + delta;
                    }
                });
            });
        },
        /**
         * Remove white-space characters from the beginning and end of a string.
         * @method trim
         * @param  {String} str String to trim.
         * @return {Object} result
         */
        trim: function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        },
        /**
         * Takes a well-formed JSON string and returns the resulting JavaScript value.
         * @method trim
         * @param  {String} JSON string to parse..
         * @return {Object} parsed JSON
         */
        parseJSON: JSON.parse,
        /**
         * Convert JSON object to String
         * @method trim
         * @param  {Object} str JSON object to convert string.
         * @return {Object} JSON string
         */
        stringify: JSON.stringify,
        /**
         * display the log
         * @method log
         * @param  {String} msg Optional for log message
         * @return {Object} DOM instance
         */
        log: function(msg) {
            if (msg)
                msg = msg + '   ';
            console.info(msg, this);
            return this;
        }
    };
    /**
     * Global DOM for DOM selector
     * @method dom
     * @param  {String} selector DOM selector
     * @return {Object} Selected DOM object
     */
    var dom = function(selector) {
        var match, selectorActions = {
                '.': function() {
                    match = selector.match(matchEx.CLASS);
                    return (match && match[1]) ? document.getElementByClassName(match[1]) : document.querySelectorAll(selector);
                },
                '#': function() {
                    match = selector.match(matchEx.ID);
                    return (match && match[1]) ? [document.getElementById(match[1])] : document.querySelectorAll(selector);
                },
                '<': function() {
                    var nodeName;
                    match = selector.match(matchEx.TAG);
                    if (match === null || match === undefined) {
                        throw 'Invalid selector / Node';
                    }
                    nodeName = match[0].replace('<', '').replace('>', '');
                    return document.createElement(nodeName);
                }
            },
            element, token = selector[0];
        if (selector.nodeType) {
            element = [selector];
        } else if (typeof selectorActions[token] !== 'function') {
            element = (typeof selector === 'string') ? matchEx.TAGS.indexOf(selector) > -1 ? document.getElementsByTagName(selector) : document.querySelectorAll(selector) : selector;
        } else {
            element = selectorActions[token]();
        }
        return new DOM(element, selector);
    };
    /**
     * Determine when DOM is ready for do DOM manipulation
     * @method ready
     * @param  {Function} callBack [description]
     */
    dom.ready = dom.prototype.ready = function(callBack) {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            callBack();
        } else if (document.addEventListener) {
            // Use the handy event callBack
            document.addEventListener('DOMContentLoaded', callBack);
        } else {
            // Ensure firing before onload, maybe late but safe also for iframes
            document.attachEvent('onreadystatechange', callBack);
        }
    };
    /**
     * loop through a NodeList or  and do something with each element
     * @method each
     * @param  {Object} obj Object/Array for iterate
     * @param  {Method} callBack
     * @return {Array/Object}
     */
    dom.each = dom.prototype.each = function(obj, callBack) {
        var length, i = 0;
        if (this.isArray(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callBack.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callBack.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
        return obj;
    };
    /**
     * Extend or Merge a JavaScript object with the key/value pairs of another.
     * @method extend
     * @return {Object} DOM instance
     */
    dom.extend = dom.prototype.extend = function() {
        var target = arguments[0] || {},
            source = arguments[1],
            key, length = source.length;
        for (key = 0; key < length; key++) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    };
    /**
     * Determine whether its function or not
     * @method isFunction
     * @param  {Function} fn function
     * @return {Boolean} true if it's function, else false
     */
    dom.isFunction = dom.prototype.isFunction = function(fn) {
        return (fn instanceof Function || typeof fn == 'function');
    };
    /**
     * Promise
     * @method when
     * @param  {Function} fn function
     * @return {Object} then Promise
     */
    dom.when = dom.prototype.when = function(fn) {
        return new Promise(fn);
    };
    /**
     * Determine what type of value
     * @method type
     * @param  {String/Number/Object/Array/Function} val any type of value
     * @return {Object} specific type
     */
    dom.type = dom.prototype.type = function(val) {
        if (typeof val === 'undefined') return 'undefined';
        if (typeof val === 'object' && !val) return 'null';
        return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };
    /**
     * Check whether it's array or not
     * @method isArray
     * @param  {Array} obj Array to check
     * @return {Boolean} true if array, else false
     */
    dom.isArray = dom.prototype.isArray = function(obj) {
        var length = !!obj && 'length' in obj && obj.length,
            type = this.type(obj);
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
    };
    /**
     * Animation types
     * @type {Number} Easing value
     */
    dom.easing = dom.prototype.easing = {
        linear: function(progress) {
            return progress;
        },
        quadratic: function(progress) {
            return Math.pow(progress, 2);
        },
        swing: function(progress) {
            return 0.5 - Math.cos(progress * Math.PI) / 2;
        },
        circ: function(progress) {
            return 1 - Math.sin(Math.acos(progress));
        },
        bounce: function(progress) {
            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                if (progress >= (7 - 4 * a) / 11) {
                    return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                }
            }
        },
        elastic: function(progress, x) {
            return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
        }
    };
    /**
     * for animate the element
     * @method animate
     * @param  {Object} options Animation configuration
     * @param  {[type]} callBack success method
     */
    dom.animate = dom.prototype.animate = function(options, callBack) {
        var start = new Date(),
            id, delta, timePassed, progress;
        id = setInterval(function() {
            timePassed = new Date() - start;
            progress = timePassed / options.duration;
            if (progress > 1) {
                progress = 1;
            }
            options.progress = progress;
            delta = options.delta(progress);
            options.step(delta);
            if (progress == 1) {
                clearInterval(id);
                options.complete();
            }
        }, options.delay || 10);
    };
    /**
     * Merger two Array
     * @method merge
     * @param  {Array} first First array
     * @param  {Array} second Xecond Array
     * @return {Array} Merged array
     */
    dom.merge = dom.prototype.merge = function(first, second) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    };
    /**
     * Global dom instance
     */
    return dom;
});
