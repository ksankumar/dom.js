var selectorMatchExpression = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
var tagMatchExpression = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi;
var isWhiteSpace = (/[^\x20\t\r\n\f]+/g);
var typeNameSpace = /^([^.]*)(?:\.(.+)|)/;
var strTrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = '',
    fun = function() {};
prefix = bind !== 'addEventListener' ? 'on' : '';

var domContext = document,
    hasClass, addClass, removeClass, toggleClass,
    push = [].push,
    guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    },
    parentsPrev = /^(?:parents|prev(?:Until|All))/;
var concat = [].concat;
var slice = [].slice;


// matches polyfill
window.Element && function(ElementPrototype) {
    ElementPrototype.matches = ElementPrototype.matches ||
        ElementPrototype.matchesSelector ||
        ElementPrototype.webkitMatchesSelector ||
        ElementPrototype.msMatchesSelector ||
        function(selector) {
            var node = window,
                nodes = (node.parentNode || node.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && nodes[i] != node);
            return !!nodes[i];
        }
}(Element.prototype);

// closest polyfill
window.Element && function(ElementPrototype) {
    ElementPrototype.closest = ElementPrototype.closest || function(selector) {
        var el = window;
        while (el.matches && !el.matches(selector)) el = el.parentNode;
        return el.matches ? el : null;
    }
}(Element.prototype);


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

var siblings = function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }
        return matched;
    },
    filter = function(selector, nodes) {
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
    uniqueSort = function(ary) {
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
    dir = function(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    },
    isType = function(val) {
        if (typeof val === 'undefined') return 'undefined';
        if (typeof val === 'object' && !val) return 'null';
        return ({}).toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },
    isArray = function(obj) {
        var length = !!obj && 'length' in obj && obj.length,
            type = isType(obj);
        return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
    },
    getText = function(elem) {
        var i = 0,
            ret = '',
            l = elem.length;
        var nodeType = elem.nodeType;
        if (!nodeType) {
            while ((node = elem[i++])) {
                ret += getText(node);
            }
        } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
            if (typeof elem.textContent === "string") {
                return elem.textContent;
            } else {
                // Traverse its children
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                    ret += getText(elem);
                }
            }
        } else if (nodeType === 3 || nodeType === 4) {
            return elem.nodeValue;
        }
        return ret;
    },
    showHide = function(el, show) {
        var display = el.style.display;
        if (show) {
            if (display === 'none' || display === '') {
                el.style.display = 'block';
            }
        } else if (display !== 'none') {
            el.style.display = 'none';
        }
    },
    isHidden = function(el) {
        return (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display === 'none';
    };


var dom = function(selector, attributes) {
    return new dom.fn.init(selector, attributes);
};

dom.fn = dom.prototype = {
    constructor: dom,
    each: function(callback) {
        return dom.each(this, callback);
    },
    map: function(callback) {
        return this.pushStack(dom.map(this, function(elem, i) {
            return callback.call(elem, i, elem);
        }));
    },
    pushStack: function(elements) {
        return dom.merge(this.constructor(), elements);
    },
    addClass: function(value) {
        if (typeof value === "string" && value) {
            value = value.match(isWhiteSpace) || [];
            var classLength = value.length;
            while (classLength--) {
                if (this.nodeType === 1) {
                    addClass(this, value[classLength]);
                } else {
                    var eleLength = this.length;
                    while (eleLength--) {
                        addClass(this[eleLength], value[classLength]);
                    }
                }
            }
        }
        return this;
    },
    removeClass: function(value) {
        if (value === undefined || value === null || value === '') {
            return this.attr('class', '');
        }

        if (typeof value === "string" && value) {
            value = value.match(isWhiteSpace) || [];
            var classLength = value.length;
            while (classLength--) {
                if (this.nodeType === 1) {
                    removeClass(this, value[classLength]);
                } else {
                    var eleLength = this.length;
                    while (eleLength--) {
                        removeClass(this[eleLength], value[classLength]);
                    }
                }
            }
        }
        return this;
    },
    toggleClass: function(value) {
        if (this.nodeType === 1) {
            toggleClass(this, value);
        } else {
            var l = this.length;
            while (l--) {
                toggleClass(this[l], value);
            }
        }
        return this;
    },
    remove: function(value) {
        var el = this;
        if (el.nodeType === 1) {
            el.parentNode.removeChild(el);
        } else {
            var i = 0,
                l = el.length;
            for (; i < l; i++) {
                el[i].parentNode.removeChild(el[i]);
            }
        }
        return el;
    },
    closest: function(selector) {
        var matches;

        return this.each(function() {
            var parentNode = this.parentNode;
            while ((matches = parentNode && parentNode.matches) && !parentNode.matches(selector)) {
                parentNode = parentNode.parentNode;
            }
            return matches ? parentNode : null;
        });
    },
    wrap: function(html) {
        var wrapper = domanipulation(html);
        wrapper = this.pushStack(wrapper);
        // The elements to wrap the target around
        if (this[0].parentNode) {
            wrapper.insertBefore(this[0]);
        }
        wrapper.map(function() {
            var elem = this;
            while (elem.firstElementChild) {
                elem = elem.firstElementChild;
            }
            return elem;
        }).append(this);
        return this;
    },
    html: function(html) {
        //setHTML paramater is undefined
        if (html === undefined) {
            //return the innerHTML of the element
            return this[0].innerHTML;
        }
        //set the html if the setHTML parameter is provided
        this[0].innerHTML = html;
        return this;
    },
    text: function(value) {
        return value === undefined ? getText(this) : this.each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value;
            }
        });
    },
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
    val: function(value) {
        if (this.length) {
            return value !== undefined ? this[0].value = value : this[0].value;
        }
        return;
    },
    get: function(num) {
        if (num === null || num === undefined) {
            return slice.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
    },
    eq: function(i) {
        var len = this.length,
            j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    not: function(selector) {
        return this.pushStack(windowFilter(this, selector || [], true));
    },
    clone: function() {
        var cloned = this[0].cloneNode(true);
        return this.pushStack([cloned]);
    },
    hide: function() {
        return this.each(function() {
            showHide(this);
        });
    },
    show: function() {
        return this.each(function() {
            showHide(this, true);
        });
    },
    isHidden: function() {
        return isHidden(this[0]);
    },
    toggle: function(state) {
        if (typeof state === 'boolean') {
            return state ? this.show() : this.hide();
        }
        return this.each(function() {
            if (isHidden(this)) {
                showHide(this, true);
            } else {
                showHide(this);
            }
        });
    },
    find: function(selector) {
        var i, ret,
            len = this.length,
            self = this;
        var dm = this.pushStack([]);
        for (i = 0; i < len; i++) {
            domfinder(selector, self[i], dm);
        }
        return len > 1 ? dom.uniqueSort(dm) : dm;
    }
};

function domfinder(selector, context, results) {
    context = context || document;
    results = results || [];
    var match = selectorMatchExpression.exec(selector);
    if (match) {
        if ((m = match[1])) {
            var elem = document.getElementById(m);
            if (elem) {
                results.push(context, [elem]);
            }
            return results;
            // TAG selector
        } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
            // Class selector
        } else if ((m = match[3]) && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
        }
    } else if (!attributes) {
        try {
            push.apply(results, context.querySelectorAll(selector));
            return results;
        } catch (domError) {}
    }
}


function windowFilter(elements, qualifier) {
    if (dom.isFunction(qualifier)) {
        return dom.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== true;
        });
    }
    if (qualifier.nodeType) {
        return dom.grep(elements, function(elem) {
            return (elem === qualifier) !== true;
        });
    }
}

function domanipulation(selector) {
    if (typeof selector === "string") {
        var fragment = domContext.createDocumentFragment(),
            tmp;
        tmp = fragment.appendChild(domContext.createElement("div"));
        tmp.innerHTML = "" + dom.htmlPrefilter(selector) + "";
        return tmp.childNodes;
    } else if (selector.nodeType) {
        return [selector];
    }
    return selector;
}

var init = dom.fn.init = function(selector, attributes) {
    if (!selector) {
        return this;
    }

    var match, context = this,
        m;

    if (typeof selector === "string") {

        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
            var parsed = tagMatchExpression.exec(selector);
            if (parsed) {
                push.apply(context, [domContext.createElement(parsed[1])]);
            } else {
                tmp = domanipulation(selector);
                context = dom.merge(context, tmp);
            }
            if ((tagMatchExpression).test(match[1]) && this.isPlainObject(attributes)) {
                for (var key in attributes) {
                    // Properties of context are called as methods if possible
                    if (this.isFunction(this[key])) {
                        this[key](attributes[key]);
                        // ...and otherwise set as attributes
                    } else {
                        this.attr(key, attributes[key]);
                    }
                }
            }
            return context;
        } else {
            match = selectorMatchExpression.exec(selector);
        }
        if (match) {
            if ((m = match[1])) {
                var elem = document.getElementById(m);
                if (elem) {
                    push.apply(context, [elem]);
                }
                return context;
                // TAG selector
            } else if (match[2]) {
                push.apply(context, domContext.getElementsByTagName(selector));
                return context;
                // Class selector
            } else if ((m = match[3]) && domContext.getElementsByClassName) {
                push.apply(context, domContext.getElementsByClassName(m));
                return context;
            }
        } else if (!attributes) {
            try {
                push.apply(context, domContext.querySelectorAll(selector));
                return context;
            } catch (domError) {}
        }
    } else if (selector.nodeType) {
        push.apply(context, [selector]);
        return context;
    }
    return selector;
};

init.prototype = dom.fn;

dom.extend = dom.fn.extend = function() {
    var target = this || {},
        len = arguments.length,
        args,
        i = 0;
    if (!len)
        return target;
    for (; i < len; i++) {
        args = arguments[i];
        for (var key in args) {
            target[key] = args[key];
        }
    }
    args = null;
    return target;
};
dom.isFunction = dom.fn.isFunction = function(fun) {
    return (fun instanceof Function || typeof fun == 'function');
};

dom.isPlainObject = dom.fn.isPlainObject = function(obj) {
    // Basic check for Type object that's not null
    if (typeof obj == 'object' && obj !== null) {
        // If Object.getPrototypeOf supported, use it
        if (typeof Object.getPrototypeOf == 'function') {
            var proto = Object.getPrototypeOf(obj);
            return proto === Object.prototype || proto === null;
        }
        // Otherwise, use internal class
        // This should be reliable as if getPrototypeOf not supported, is pre-ES5
        return Object.prototype.toString.call(obj) == '[object Object]';
    }
    // Not an object
    return false;
};

dom.extend({
    each: function(obj, callback) {
        var length, i = 0;
        if (isArray(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                    break;
                }
            }
        }
        return obj;
    },
    map: function(elems, callback, arg) {
        var length, value,
            i = 0,
            ret = [];
        // Go through the array, translating each of the items to their new values
        if (isArray(elems)) {
            length = elems.length;
            for (; i < length; i++) {
                value = callback(elems[i], i, arg);

                if (value !== null) {
                    ret.push(value);
                }
            }
            // Go through every key on the object,
        } else {
            for (i in elems) {
                value = callback(elems[i], i, arg);

                if (value !== null) {
                    ret.push(value);
                }
            }
        }
        // Flatten any nested arrays
        return concat.apply([], ret);
    },
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
    merge: function(first, second) {
        var len = +second.length,
            j = 0,
            i = first.length || 0;

        for (; j < len; j++) {
            first[i++] = second[j];
        }

        first.length = i;

        return first;
    },
    grep: function(elems, callback, invert) {
        var callbackInverse,
            matches = [],
            i = 0,
            length = elems.length,
            callbackExpect = !invert;

        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
            }
        }

        return matches;
    },
    htmlPrefilter: function(html) {
        return html.replace(rxhtmlTag, "<$1></$2>");
    },
    trim: function(text) {
        return text === null ? "" : (text + "").replace(strTrim, "");
    }
});

dom.fn.extend({
    // text: function(value) {
    //     return access(this, function(value) {
    //         return value === undefined ?
    //             jQuery.text(this) :
    //             this.empty().each(function() {
    //                 if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
    //                     this.textContent = value;
    //                 }
    //             });
    //     }, null, value, arguments.length);
    // },

    append: function(elem) {
        return this.each(function() {

            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                elem = domanipulation(elem);
                this.appendChild(elem[0]);
            }
        });
    },

    prepend: function(elem) {
        return this.each(function() {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                elem = domanipulation(elem);
                target.insertBefore(elem[0], this.firstChild);
            }
        });
    },
    before: function(elem) {
        return this.each(function() {
            if (this.parentNode) {
                elem = domanipulation(elem);
                this.parentNode.insertBefore(elem[0], this);
            }
        });
    },

    after: function(elem) {
        return this.each(function() {
            if (this.parentNode) {
                elem = domanipulation(elem);
                this.parentNode.insertBefore(elem[0], this.nextSibling);
            }
        });
    }
});

dom.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after"
    //  replaceAll: "replaceWith"
}, function(name, original) {
    dom.fn[name] = function(selector) {
        var elems,
            ret = [],
            insert = dom(selector),
            last = insert.length - 1,
            i = 0;

        for (; i <= last; i++) {
            elems = i === last ? this : this.clone(true);
            dom(insert[i])[original](elems);
            push.apply(ret, elems.get());
        }

        return this.pushStack(ret);
    };
});

function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
}
dom.each({
    parent: function(elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function(elem) {
        return dir(elem, "parentNode");
    },
    parentsUntil: function(elem, i, until) {
        return dir(elem, "parentNode", until);
    },
    next: function(elem) {
        return sibling(elem, "nextSibling");
    },
    prev: function(elem) {
        return sibling(elem, "previousSibling");
    },
    nextAll: function(elem) {
        return dir(elem, "nextSibling");
    },
    prevAll: function(elem) {
        return dir(elem, "previousSibling");
    },
    nextUntil: function(elem, i, until) {
        return dir(elem, "nextSibling", until);
    },
    prevUntil: function(elem, i, until) {
        return dir(elem, "previousSibling", until);
    },
    siblings: function(elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function(elem) {
        return siblings(elem.firstChild);
    }
}, function(name, fun) {
    dom.fn[name] = function(selector) {
        var matched = dom.map(this, fun, selector);
        if (selector && typeof selector === "string") {
            matched = filter(selector, matched);
        }
        if (this.length > 1) {
            // Remove duplicates
            if (!guaranteedUnique[name]) {
                dom.uniqueSort(matched);
            }
            // Reverse order for parents* and prev-derivatives
            if (parentsPrev.test(name)) {
                matched.reverse();
            }
        }
        return this.pushStack(matched);
    };
});


function addEvent(elem, eventType, selector, callback) {
    if (typeof selector === "string") {
        elem.addEventListener(eventType, function(event) {
            if ((event.target).closest(selector)) {
                callback(event);
            }
        });
    }
    if (dom.isFunction(selector)) {
        callback = selector;
        eventType = (eventType || "").match(isWhiteSpace) || [""];
        var l = eventType.length;
        while (l--) {
            eventType = typeNameSpace.exec(eventType[l])[1] || [];
            elem[bind](prefix + eventType, callback || fun, false);
        }
    }
}

dom.each(("blur focus click change select").split(" "), function(i, name) {
    // Handle event binding
    dom.fn[name] = function(selector, callback) {
        return arguments.length > 0 ? this.on(name, selector, callback) : this.fire(name, callback);
    };
});

dom.fn.extend({
    on: function(eventType, selector, callback) {
        return this.each(function() {
            addEvent(this, eventType, selector, callback);
        });
    },
    fire: function(event, callBack) {
        this.each(function() {
            fireEvent(this, event);
        });
    }
});


function fireEvent(node, eventName) {
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc, docEvent;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9) {
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }

    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";
        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
            case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;
            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;
            default:
                throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
        }
        docEvent = doc.createEvent(eventClass);
        var bubbles = eventName == "change" ? false : true;
        docEvent.initEvent(eventName, bubbles, true); // All events created as bubbling and cancelable.
        docEvent.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(docEvent, true);
    } else if (node.fireEvent) {
        // IE-old school style
        docEvent = doc.createEventObject();
        docEvent.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, docEvent);
    }
}
var $ = dom;
