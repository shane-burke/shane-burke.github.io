
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const intros = { enabled: false };
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function each(items, fn) {
        let str = '';
        for (let i = 0; i < items.length; i += 1) {
            str += fn(items[i], i);
        }
        return str;
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.38.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var candidates = [
    	{
    		candidate: "Eric Adams",
    		age: 60,
    		gender: "man",
    		home: "Bed-Stuy, Brooklyn",
    		professional: "Adams is currently the Brooklyn Borough President. He previously served as a New York State Senator. He started his career as a policeman with the NYPD for over two decades.",
    		issue1: "Public health",
    		issue2: "The economy",
    		issue3: "Public safety",
    		controversy: "Others, including Yang, have accused Adams of not actually being a resident of Brooklyn. Instead, they say he lives more than half-time in his Fort Lee, New Jersey condo, which would disqualify him from office. A tour of Adams' Bed-Stuy abode did little to shake suspicions -- Twitter sleuths noticed his son's sneakers next to the bed and salmon in his (vegan) fridge.",
    		endorsements: "Local politicians, the New York Post editorial board, unions for police, fire and transit",
    		image: "https://pyxis.nymag.com/v1/imgs/2b6/43f/2da735ee1f1eb5a02872746d7d5d84d45f-eric-adams.rsquare.w1200.jpg"
    	},
    	{
    		candidate: "Shaun Donovan",
    		age: 54,
    		gender: "man",
    		home: "Boerum Hill, Brooklyn",
    		professional: "Donovan is a former U.S. Secretary of Housing and Urban Development. He also served as the Director of the U.S. Office of Management and Budget, in addition to other positions in the federal government.",
    		issue1: "Pandemic recovery",
    		issue2: "Fixing the racial wealth gap",
    		issue3: "Urban planning innovation",
    		controversy: "When asked the median price of a home in Brooklyn, the ex-Housing Secretary assumed it was less than $100,000. It's nine times that.",
    		endorsements: "Several former mayors of cities that were not New York (Fresno, Philadelphia, New Orleans)",
    		image: "https://i.ibb.co/q03xSVn/donovan.jpg"
    	},
    	{
    		candidate: "Kathryn Garcia",
    		age: 50,
    		gender: "woman",
    		home: "Park Slope, Brooklyn",
    		professional: "Before running for mayor, Garcia served as the commissioner for the New York City Department of Sanitation. During COVID-19, she served as the city's food czar, aiming to fight food insecurity. She has worked in public administration since her first internship with the Department of Sanitation in college.",
    		issue1: "Pandemic recovery",
    		issue2: "Affordable housing",
    		issue3: "Climate change",
    		controversy: "In an especially dramatic race, Garcia has remained unscathed. The closest to controversy she has seen is criticism for teaming up with Yang for his number two ranked voters.",
    		endorsements: "The New York Times editorial board, local politicians",
    		image: "https://www.cityandstateny.com/sites/default/files/styles/mobile_home_page_header__360x362_/public/kathryn-garcia-2021-submitted-x2.jpg"
    	},
    	{
    		candidate: "Raymond McGuire",
    		age: 63,
    		gender: "man",
    		home: "Upper West Side, Manhattan",
    		professional: "Before running for mayor, McGuire was an executive at Citigroup. He served as the co-head of global investment banking. Prior to Citigroup, he worked at a variety of other firms on Wall Street. In addition to business, McGuire is trained as a lawyer.",
    		issue1: "Jobs",
    		issue2: "Public safety",
    		issue3: "Schools",
    		controversy: "The businessman thought the median price of a home in Brooklyn was $100,000. It's nine times that.",
    		endorsements: "Jay-Z, Diddy, and Valerie Jarrett (former Obama advisor)",
    		image: "https://i.ibb.co/t3Vs1z0/mcguire.png"
    	},
    	{
    		candidate: "Dianne Morales",
    		age: 52,
    		gender: "woman",
    		home: "Bed-Stuy, Brooklyn",
    		professional: "Most recently, Morales served as a non-profit administrator for a social services charity in the South Bronx. Before that, she worked as an administrator in New York City's Department of Education.",
    		issue1: "Universal housing",
    		issue2: "Reinvesting in community",
    		issue3: "Schools",
    		controversy: "The progressive's campaign fired striking staffers who attempted to unionize. The candidate says it was due to legal requirements on payroll and work stoppages for publicly-funded candidates. Before that, there were allegations of bias and sexual harassment among her campaign workers.",
    		endorsements: "Local progressive lawmakers, Sunrise Movement, Working Families Party",
    		image: "https://2mppoq4bdzx53l2j3q1b47zi-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/Dianne-Morales-circle-crop-500x500.png"
    	},
    	{
    		candidate: "Paperboy Prince",
    		age: 29,
    		gender: "nonbinary person",
    		home: "Bushwick, Brooklyn",
    		professional: "Prince is an artist, rapper and activist. Last year, they ran for Congress in their district, but lost with 20% of the vote. When they were younger, they interned in Congress and the Supreme Court.",
    		issue1: "Universal basic income ($2000/month)",
    		issue2: "Universal housing and healthcare",
    		issue3: "Love",
    		controversy: "Their girlfriend broke up with them for spending too much time campaigning. Andrew Yang offered his condolences.",
    		endorsements: "",
    		image: "https://www.nyccfb.info/media/1585/cgd07_paperboy-prince_photo.jpg"
    	},
    	{
    		candidate: "Scott Stringer",
    		age: 60,
    		gender: "man",
    		home: "FiDi, Manhattan",
    		professional: "Stringer has been the New York City Comptroller since 2014. Before that, he served as Manhattan Borough President and a New York State Assemblyman.",
    		issue1: "Pandemic recovery",
    		issue2: "Affordable housing",
    		issue3: "Childcare",
    		controversy: "An ex-staffer accused Stringer of sexually harassing her. Stringer denies the assertions.",
    		endorsements: "Mostly rescinded after accusations",
    		image: "https://theislandnow.com/wp-content/uploads/2018/12/NYC-comptroller.jpg"
    	},
    	{
    		candidate: "Maya Wiley",
    		age: 56,
    		gender: "woman",
    		home: "Prospect Park South, Brooklyn",
    		professional: "Wiley is a lawyer, civil rights activist and professor at the New School. She served as legal counsel to Mayor Bill de Blasio.",
    		issue1: "More public jobs",
    		issue2: "Funding caretakers",
    		issue3: "Public safety and police accountability",
    		controversy: "Adams called Wiley a hypocrite for seeking to lower the police budget despite her neighborhood association paying for private security. Additionally, some progressives have accused Wiley of having a more moderate political history than her campaign suggests.",
    		endorsements: "AOC, local progressive politicians, Senator Elizabeth Warren",
    		image: "https://avatars.sched.co/0/04/8963354/avatar.jpg"
    	},
    	{
    		candidate: "Andrew Yang",
    		age: 45,
    		gender: "man",
    		home: "Hell's Kitchen, Manhattan",
    		professional: "Yang is a venture capitalist and former Democratic presidential candidate. He formerly worked in the education and healthcare industries, as well as for Venture for America, which seeks to fund startups in struggling cities. He is also trained as a lawyer.",
    		issue1: "Pandemic recovery",
    		issue2: "Safe neighborhoods",
    		issue3: "Poverty alleviation",
    		controversy: "The candidate recently made comments on mental health and homelessness that did not land well with advocates. Beyond that, he has faced criticism for leaving the city for his house upstate during the worst parts of the pandemic.",
    		endorsements: "Various local lawmakers and clubs",
    		image: "https://pbs.twimg.com/profile_images/1349521906706354177/mMpGU3vk_400x400.jpg"
    	}
    ];

    /* src/App.svelte generated by Svelte v3.38.2 */
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (32:1) {:else}
    function create_else_block(ctx) {
    	let h1;
    	let t1;
    	let h2;
    	let t3;
    	let table;
    	let t4;
    	let p;
    	let t5;
    	let a;
    	let t7;
    	let each_value = candidates;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Democratic Candidates for NYC Mayor";
    			t1 = space();
    			h2 = element("h2");
    			h2.textContent = "Select a candidate below to learn more";
    			t3 = space();
    			table = element("table");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			p = element("p");
    			t5 = text("Find your polling place ");
    			a = element("a");
    			a.textContent = "here";
    			t7 = text("!");
    			attr_dev(h1, "class", "svelte-10tkiea");
    			add_location(h1, file, 33, 3, 1143);
    			attr_dev(h2, "class", "svelte-10tkiea");
    			add_location(h2, file, 34, 3, 1191);
    			set_style(table, "width", "25%");
    			attr_dev(table, "class", "svelte-10tkiea");
    			add_location(table, file, 35, 3, 1242);
    			attr_dev(a, "href", "https://findmypollsite.vote.nyc");
    			add_location(a, file, 44, 29, 1653);
    			add_location(p, file, 44, 2, 1626);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, table, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}

    			insert_dev(target, t4, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t5);
    			append_dev(p, a);
    			append_dev(p, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedCandidate, candidates*/ 1) {
    				each_value = candidates;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(table);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(32:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:1) {#if selectedCandidate}
    function create_if_block(ctx) {
    	let p0;
    	let a;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let div1;
    	let h1;
    	let t3_value = /*selectedCandidate*/ ctx[0].candidate + "";
    	let t3;
    	let t4;
    	let p1;
    	let t5_value = /*selectedCandidate*/ ctx[0].candidate + "";
    	let t5;
    	let t6;
    	let t7_value = /*selectedCandidate*/ ctx[0].age + "";
    	let t7;
    	let t8;
    	let t9_value = /*selectedCandidate*/ ctx[0].gender + "";
    	let t9;
    	let t10;
    	let t11_value = /*selectedCandidate*/ ctx[0].home + "";
    	let t11;
    	let t12;
    	let t13;
    	let p2;
    	let t14_value = /*selectedCandidate*/ ctx[0].professional + "";
    	let t14;
    	let t15;
    	let div0;
    	let ol;
    	let p3;
    	let b0;
    	let t17;
    	let p4;
    	let li0;
    	let t18_value = /*selectedCandidate*/ ctx[0].issue1 + "";
    	let t18;
    	let t19;
    	let p5;
    	let li1;
    	let t20_value = /*selectedCandidate*/ ctx[0].issue2 + "";
    	let t20;
    	let t21;
    	let p6;
    	let li2;
    	let t22_value = /*selectedCandidate*/ ctx[0].issue3 + "";
    	let t22;
    	let t23;
    	let p7;
    	let b1;
    	let t25_value = /*selectedCandidate*/ ctx[0].controversy + "";
    	let t25;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			a = element("a");
    			a.textContent = "← Learn about another candidate";
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			div1 = element("div");
    			h1 = element("h1");
    			t3 = text(t3_value);
    			t4 = space();
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = text(" is a ");
    			t7 = text(t7_value);
    			t8 = text("-year-old ");
    			t9 = text(t9_value);
    			t10 = text(" living in ");
    			t11 = text(t11_value);
    			t12 = text(".");
    			t13 = space();
    			p2 = element("p");
    			t14 = text(t14_value);
    			t15 = space();
    			div0 = element("div");
    			ol = element("ol");
    			p3 = element("p");
    			b0 = element("b");
    			b0.textContent = "Their top three priorities as mayor would be:";
    			t17 = space();
    			p4 = element("p");
    			li0 = element("li");
    			t18 = text(t18_value);
    			t19 = space();
    			p5 = element("p");
    			li1 = element("li");
    			t20 = text(t20_value);
    			t21 = space();
    			p6 = element("p");
    			li2 = element("li");
    			t22 = text(t22_value);
    			t23 = space();
    			p7 = element("p");
    			b1 = element("b");
    			b1.textContent = "Recent controversy: ";
    			t25 = text(t25_value);
    			add_location(a, file, 15, 18, 394);
    			attr_dev(p0, "align", "left");
    			add_location(p0, file, 15, 2, 378);
    			if (img.src !== (img_src_value = /*selectedCandidate*/ ctx[0].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "height", "250px");
    			attr_dev(img, "id", "candidate-img");
    			attr_dev(img, "class", "svelte-10tkiea");
    			add_location(img, file, 17, 2, 482);
    			attr_dev(h1, "class", "svelte-10tkiea");
    			add_location(h1, file, 19, 2, 585);
    			add_location(p1, file, 20, 2, 626);
    			add_location(p2, file, 21, 2, 766);
    			add_location(b0, file, 23, 30, 839);
    			add_location(p3, file, 23, 27, 836);
    			attr_dev(li0, "class", "svelte-10tkiea");
    			add_location(li0, file, 24, 6, 902);
    			add_location(p4, file, 24, 3, 899);
    			attr_dev(li1, "class", "svelte-10tkiea");
    			add_location(li1, file, 25, 6, 948);
    			add_location(p5, file, 25, 3, 945);
    			attr_dev(li2, "class", "svelte-10tkiea");
    			add_location(li2, file, 26, 6, 994);
    			add_location(p6, file, 26, 3, 991);
    			add_location(ol, file, 23, 23, 832);
    			attr_dev(div0, "id", "priorities");
    			attr_dev(div0, "class", "svelte-10tkiea");
    			add_location(div0, file, 23, 2, 811);
    			add_location(b1, file, 29, 5, 1056);
    			add_location(p7, file, 29, 2, 1053);
    			attr_dev(div1, "id", "candidate-block");
    			attr_dev(div1, "class", "svelte-10tkiea");
    			add_location(div1, file, 18, 2, 556);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, a);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, img, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h1);
    			append_dev(h1, t3);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    			append_dev(p1, t7);
    			append_dev(p1, t8);
    			append_dev(p1, t9);
    			append_dev(p1, t10);
    			append_dev(p1, t11);
    			append_dev(p1, t12);
    			append_dev(div1, t13);
    			append_dev(div1, p2);
    			append_dev(p2, t14);
    			append_dev(div1, t15);
    			append_dev(div1, div0);
    			append_dev(div0, ol);
    			append_dev(ol, p3);
    			append_dev(p3, b0);
    			append_dev(ol, t17);
    			append_dev(ol, p4);
    			append_dev(p4, li0);
    			append_dev(li0, t18);
    			append_dev(ol, t19);
    			append_dev(ol, p5);
    			append_dev(p5, li1);
    			append_dev(li1, t20);
    			append_dev(ol, t21);
    			append_dev(ol, p6);
    			append_dev(p6, li2);
    			append_dev(li2, t22);
    			append_dev(div1, t23);
    			append_dev(div1, p7);
    			append_dev(p7, b1);
    			append_dev(p7, t25);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedCandidate*/ 1 && img.src !== (img_src_value = /*selectedCandidate*/ ctx[0].image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*selectedCandidate*/ 1 && t3_value !== (t3_value = /*selectedCandidate*/ ctx[0].candidate + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*selectedCandidate*/ 1 && t5_value !== (t5_value = /*selectedCandidate*/ ctx[0].candidate + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*selectedCandidate*/ 1 && t7_value !== (t7_value = /*selectedCandidate*/ ctx[0].age + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*selectedCandidate*/ 1 && t9_value !== (t9_value = /*selectedCandidate*/ ctx[0].gender + "")) set_data_dev(t9, t9_value);
    			if (dirty & /*selectedCandidate*/ 1 && t11_value !== (t11_value = /*selectedCandidate*/ ctx[0].home + "")) set_data_dev(t11, t11_value);
    			if (dirty & /*selectedCandidate*/ 1 && t14_value !== (t14_value = /*selectedCandidate*/ ctx[0].professional + "")) set_data_dev(t14, t14_value);
    			if (dirty & /*selectedCandidate*/ 1 && t18_value !== (t18_value = /*selectedCandidate*/ ctx[0].issue1 + "")) set_data_dev(t18, t18_value);
    			if (dirty & /*selectedCandidate*/ 1 && t20_value !== (t20_value = /*selectedCandidate*/ ctx[0].issue2 + "")) set_data_dev(t20, t20_value);
    			if (dirty & /*selectedCandidate*/ 1 && t22_value !== (t22_value = /*selectedCandidate*/ ctx[0].issue3 + "")) set_data_dev(t22, t22_value);
    			if (dirty & /*selectedCandidate*/ 1 && t25_value !== (t25_value = /*selectedCandidate*/ ctx[0].controversy + "")) set_data_dev(t25, t25_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(img);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(15:1) {#if selectedCandidate}",
    		ctx
    	});

    	return block;
    }

    // (37:3) {#each candidates as candidate}
    function create_each_block(ctx) {
    	let tr;
    	let th0;
    	let a0;
    	let t0_value = /*candidate*/ ctx[4].candidate + "";
    	let t0;
    	let t1;
    	let th1;
    	let a1;
    	let img;
    	let img_src_value;
    	let t2;
    	let mounted;
    	let dispose;

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[2](/*candidate*/ ctx[4]);
    	}

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[3](/*candidate*/ ctx[4]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			th0 = element("th");
    			a0 = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			th1 = element("th");
    			a1 = element("a");
    			img = element("img");
    			t2 = space();
    			add_location(a0, file, 38, 25, 1337);
    			attr_dev(th0, "id", "candidates");
    			attr_dev(th0, "class", "svelte-10tkiea");
    			add_location(th0, file, 38, 5, 1317);
    			if (img.src !== (img_src_value = /*candidate*/ ctx[4].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "height", "100px");
    			attr_dev(img, "id", "candidate-img");
    			attr_dev(img, "alt", "Portait of candidate");
    			attr_dev(img, "class", "svelte-10tkiea");
    			add_location(img, file, 39, 78, 1496);
    			add_location(a1, file, 39, 28, 1446);
    			attr_dev(th1, "id", "candidate-img");
    			attr_dev(th1, "class", "svelte-10tkiea");
    			add_location(th1, file, 39, 5, 1423);
    			add_location(tr, file, 37, 4, 1307);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, th0);
    			append_dev(th0, a0);
    			append_dev(a0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, th1);
    			append_dev(th1, a1);
    			append_dev(a1, img);
    			append_dev(tr, t2);

    			if (!mounted) {
    				dispose = [
    					listen_dev(a0, "click", click_handler_1, false, false, false),
    					listen_dev(a1, "click", click_handler_2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(37:3) {#each candidates as candidate}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link;
    	let t;
    	let main;

    	function select_block_type(ctx, dirty) {
    		if (/*selectedCandidate*/ ctx[0]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			link = element("link");
    			t = space();
    			main = element("main");
    			if_block.c();
    			document.title = "NYC Mayoral Race Cheat Sheet";
    			attr_dev(link, "rel", "icon");
    			attr_dev(link, "type", "image/png");
    			attr_dev(link, "href", "https://i.pinimg.com/originals/f7/1b/4f/f71b4ffaeb2ee9832e3f9c9ff5a0a84d.png");
    			add_location(link, file, 9, 2, 204);
    			attr_dev(main, "class", "svelte-10tkiea");
    			add_location(main, file, 12, 1, 342);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);
    			if_block.m(main, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(main, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let selectedCandidate;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, selectedCandidate = null);
    	const click_handler_1 = candidate => $$invalidate(0, selectedCandidate = candidate);
    	const click_handler_2 = candidate => $$invalidate(0, selectedCandidate = candidate);

    	$$self.$capture_state = () => ({
    		each,
    		intros,
    		candidates,
    		selectedCandidate
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedCandidate" in $$props) $$invalidate(0, selectedCandidate = $$props.selectedCandidate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [selectedCandidate, click_handler, click_handler_1, click_handler_2];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'bestie'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
