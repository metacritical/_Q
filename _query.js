const _ = (function() {
    /**
     * Main Query constructor function
     * @param {string|array|object} input - Input selector string, array or object
     * @returns {D|C} DOM Collection or regular Collection instance
     */
    function Q(input) {
        if (!(this instanceof Q)) {
            return new Q(input);
        }

        // Check if input is a DOM selector string
        if (typeof input === 'string' && (
            input.includes('.') ||
            input.includes('#') ||
            input.includes('[') ||
            input.includes('<')
        )) {
            return new D([...document.querySelectorAll(input)]);
        }

        return new C(input);
    }

    class D {
        constructor(elements) {
            this.el = elements;         // elements array
            this.length = elements.length;
            elements.forEach((el, i) => this[i] = el);
        }

        // Core DOM Methods
        each(fn) {
            this.el.forEach(fn);
            return this;
        }

        // Content Methods
        html(content) {
            if (content === undefined) {
                return this.el[0]?.innerHTML || '';
            }
            return this.each(el => el.innerHTML = content);
        }

        txt(content) {
            if (content === undefined) {
                return this.el[0]?.textContent || '';
            }
            return this.each(el => el.textContent = content);
        }

        attr(name, value) {
            if (value === undefined) {
                return this.el[0]?.getAttribute(name) || '';
            }
            return this.each(el => el.setAttribute(name, value));
        }

        // Class Methods
        ac(...classes) {
            return this.each(el => el.classList.add(...classes));
        }

        rc(...classes) {
            return this.each(el => el.classList.remove(...classes));
        }

        tc(className) {
            return this.each(el => el.classList.toggle(className));
        }

        // Event Methods
        on(event, callback) {
            return this.each(el => el.addEventListener(event, callback));
        }

        off(event, callback) {
            return this.each(el => el.removeEventListener(event, callback));
        }

        // Style Methods
        css(prop, value) {
            if (typeof prop === 'object') {
                return this.each(el => Object.assign(el.style, prop));
            }
            if (value === undefined) {
                return getComputedStyle(this.el[0])[prop];
            }
            return this.each(el => el.style[prop] = value);
        }

        // Traversal Methods
        sel(selector) {
            const found = [];
            this.each(el => {
                found.push(...el.querySelectorAll(selector));
            });
            return new D([...new Set(found)]);
        }

        clos(selector) {
            return new D(
                Array.from(this.el)
                    .map(el => el.closest(selector))
                    .filter(Boolean)
            );
        }

        par() {
            return new D(
                [...new Set(Array.from(this.el)
                    .map(el => el.parentElement)
                    .filter(Boolean))]
            );
        }

        kids() {
            const children = [];
            this.each(el => children.push(...el.children));
            return new D([...new Set(children)]);
        }
    }

    class C {
        constructor(collection) {
            this.wrap = collection;
        }

        // Core Collection Methods
        each(fn) {
            if (Array.isArray(this.wrap)) {
                this.wrap.forEach(fn);
            } else if (typeof this.wrap === 'object') {
                Object.entries(this.wrap).forEach(([key, value]) => fn(value, key));
            }
            return this;
        }

        map(fn) {
            return new C(
                Array.isArray(this.wrap)
                    ? this.wrap.map(fn)
                    : Object.entries(this.wrap).map(([k, v]) => fn(v, k))
            );
        }

        find(predicate) {
            return Array.isArray(this.wrap)
                ? this.wrap.find(predicate)
                : Object.entries(this.wrap).find(([k, v]) => predicate(v, k))?.[1];
        }

        filt(predicate) {
            return new C(
                Array.isArray(this.wrap)
                    ? this.wrap.filter(predicate)
                    : Object.fromEntries(Object.entries(this.wrap).filter(([k, v]) => predicate(v, k)))
            );
        }

        where(properties) {
            return this.filt(item =>
                Object.entries(properties).every(([key, value]) => item[key] === value)
            );
        }

        findW(properties) {
            return this.find(item =>
                Object.entries(properties).every(([key, value]) => item[key] === value)
            );
        }

        rej(predicate) {
            return this.filt(item => !predicate(item));
        }

        evry(predicate) {
            return Array.isArray(this.wrap)
                ? this.wrap.every(predicate)
                : Object.values(this.wrap).every(predicate);
        }

        some(predicate) {
            return Array.isArray(this.wrap)
                ? this.wrap.some(predicate)
                : Object.values(this.wrap).some(predicate);
        }

        cont(value) {
            return Array.isArray(this.wrap)
                ? this.wrap.includes(value)
                : Object.values(this.wrap).includes(value);
        }

        pluk(key) {
            return new C(this.wrap.map(item => item[key]));
        }

        // Array Methods
        frst(n) {
            if (n === undefined) return this.wrap[0];
            return new C(this.wrap.slice(0, n));
        }

        last(n) {
            if (n === undefined) return this.wrap[this.wrap.length - 1];
            return new C(this.wrap.slice(-n));
        }

        init(n = 1) {
            return new C(this.wrap.slice(0, -n));
        }

        rest(index = 1) {
            return new C(this.wrap.slice(index));
        }

        comp() {
            return new C(this.wrap.filter(Boolean));
        }

        flat(depth = Infinity) {
            const flatten = arr => {
                return arr.reduce((acc, val) => {
                    return acc.concat(
                        Array.isArray(val) && depth > 0
                            ? flatten(val, depth - 1)
                            : val
                    );
                }, []);
            };
            return new C(flatten(this.wrap));
        }

        val() {
            return this.wrap;
        }
    }

    // Static Methods
    Q.range = (start, stop, step = 1) => {
        if (stop === undefined) {
            stop = start;
            start = 0;
        }
        const arr = [];
        for (let i = start; i < stop; i += step) {
            arr.push(i);
        }
        return new C(arr);
    };

    Q.memo = (fn) => {
        const cache = new Map();
        return (...args) => {
            const key = JSON.stringify(args);
            if (!cache.has(key)) {
                cache.set(key, fn(...args));
            }
            return cache.get(key);
        };
    };

    // Version and naming
    Q.VERSION = '1.0.0';
    Q.NAME = '_Query';

    //_ and _Q globally callable fn.
    window._ = Q;
    window._Q = Q;

    return Q;
})();
