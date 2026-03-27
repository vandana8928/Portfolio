import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const HTML_CONCEPTS = [
  { icon: '🏗️', name: 'Document Structure',   sublabel: 'html · head · body',                  level: 'Beginner',     pct: 99, tags: ['<!DOCTYPE>', '<html>', '<head>', '<body>'],              desc: 'Every HTML page starts with a doctype and a root structure of head (metadata) and body (content).' },
  { icon: '📝', name: 'Semantic Elements',    sublabel: 'header · main · section · article',   level: 'Beginner',     pct: 97, tags: ['<header>', '<main>', '<section>', '<footer>'],            desc: 'Semantic tags describe meaning, not just appearance. They help screen readers, SEO, and developers.' },
  { icon: '🔗', name: 'Links & Images',       sublabel: '<a> · <img> · <picture>',             level: 'Beginner',     pct: 98, tags: ['href', 'src', 'alt', 'target', 'loading'],               desc: 'Link to pages and resources with <a>. Display images with <img> — always include alt text.' },
  { icon: '📋', name: 'Forms & Inputs',       sublabel: '<form> · <input> · <label>',          level: 'Intermediate', pct: 94, tags: ['<form>', '<input>', '<label>', 'action', 'method'],      desc: 'Collect user data with forms. Every input needs a linked label for accessibility.' },
  { icon: '🗂️', name: 'Lists & Tables',       sublabel: 'ul · ol · table',                     level: 'Intermediate', pct: 96, tags: ['<ul>', '<ol>', '<li>', '<table>', '<thead>'],             desc: 'Use lists for groups of items, and tables for structured tabular data — never for layout.' },
  { icon: '🎬', name: 'Media Elements',       sublabel: 'video · audio · iframe',              level: 'Intermediate', pct: 88, tags: ['<video>', '<audio>', '<source>', '<iframe>'],             desc: 'Embed video, audio, and external content. Use <source> for multiple format fallbacks.' },
  { icon: '♿', name: 'Accessibility (a11y)',  sublabel: 'ARIA · roles · tabindex',             level: 'Advanced',     pct: 85, tags: ['aria-label', 'role', 'tabindex', 'alt', 'lang'],         desc: 'Make content usable for everyone. ARIA attributes bridge gaps where HTML semantics fall short.' },
  { icon: '🔍', name: 'Meta & SEO',           sublabel: '<meta> · Open Graph · canonical',     level: 'Advanced',     pct: 87, tags: ['<meta>', 'og:title', 'description', 'canonical'],        desc: 'Control how your page appears in search engines and social previews with meta tags.' },
  {
  icon: '🧩',
  name: 'HTML5 Elements',
  sublabel: 'Modern Markup',
  level: 'Advanced',
  pct: 95,
  tags: ['header', 'main', 'section', 'article', 'footer'],
  desc: 'Using modern HTML5 elements to structure web pages with clean and meaningful markup.'
},
{
  icon: '📊',
  name: 'HTML Tables',
  sublabel: 'Data Structure',
  level: 'Intermediate',
  pct: 85,
  tags: ['table', 'thead', 'tbody', 'tr', 'td'],
  desc: 'Creating structured tables to display tabular data clearly and effectively.'
},
{
  icon: '🔗',
  name: 'Links & Navigation',
  sublabel: 'Page Routing',
  level: 'Advanced',
  pct: 95,
  tags: ['anchor', 'href', 'navigation'],
  desc: 'Creating internal and external links to navigate between pages and resources.'
},
{
  icon: '🖥️',
  name: 'Iframes & Embeds',
  sublabel: 'External Content',
  level: 'Intermediate',
  pct: 80,
  tags: ['iframe', 'embed', 'external content'],
  desc: 'Embedding external content such as maps, videos, and documents inside web pages.'
},
{
  icon: '⭐',
  name: 'Favicon & Meta Setup',
  sublabel: 'Head Configuration',
  level: 'Intermediate',
  pct: 85,
  tags: ['favicon', 'meta tags', 'viewport'],
  desc: 'Configuring the head section with meta tags, favicon, and responsive viewport settings.'
}

]

const CSS_CONCEPTS = [
  { icon: '🎯', name: 'Selectors',         sublabel: 'Target elements',                        level: 'Beginner',     pct: 99, tags: ['element', '.class', '#id', ':hover', ':nth-child'],         desc: 'Pick which elements to style using tag names, classes, IDs, and state-based pseudo-classes.' },
  { icon: '📦', name: 'Box Model',         sublabel: 'content · padding · border · margin',    level: 'Beginner',     pct: 98, tags: ['padding', 'margin', 'border', 'box-sizing'],                desc: 'Every element is a box. Padding is inside the border, margin is outside. Always use border-box.' },
  { icon: '🌊', name: 'Transitions',       sublabel: 'Animate between states',                 level: 'Beginner',     pct: 96, tags: ['transition', 'duration', 'ease', 'delay'],                  desc: 'Smoothly animate a property when a state changes — on hover, focus, or class toggle.' },
  { icon: '📐', name: 'Position',          sublabel: 'static · relative · absolute · sticky',  level: 'Intermediate', pct: 87, tags: ['relative', 'absolute', 'fixed', 'sticky', 'z-index'],       desc: 'Control where elements sit. Absolute positions relative to the nearest positioned ancestor.' },
  { icon: '📦', name: 'Flexbox',           sublabel: 'display: flex',                          level: 'Intermediate', pct: 98, tags: ['justify-content', 'align-items', 'gap', 'flex-wrap'],       desc: 'One-dimensional layout: lay items in a row or column and control spacing and alignment easily.' },
  { icon: '🏗️', name: 'CSS Grid',          sublabel: 'display: grid',                          level: 'Intermediate', pct: 93, tags: ['grid-template-columns', 'fr', 'auto-fill', 'span'],         desc: 'Two-dimensional layout — rows AND columns at once. Ideal for page layout and galleries.' },
  { icon: '🎭', name: 'Animations',        sublabel: '@keyframes',                             level: 'Advanced',     pct: 91, tags: ['@keyframes', 'animation', 'fill-mode', 'iteration'],        desc: 'Define multi-step animations and attach them with the animation shorthand property.' },
  { icon: '🎨', name: 'CSS Variables',     sublabel: 'Custom properties',                      level: 'Advanced',     pct: 94, tags: ['--var()', ':root', 'theming', 'dynamic'],                   desc: 'Store reusable values that cascade through the stylesheet and can be changed with JS.' },
 {
  icon: '🎨',
  name: 'Media Query',
  sublabel: 'Responsive Design',
  level: 'Intermediate',
  pct: 95,
  tags: ['1920px', '1440px', '1366px', '1280px', '1024px', '768px', '480px'],
  desc: 'Used to create responsive layouts for different screen sizes and devices. Media queries allow websites to adapt their design for desktops, tablets, and mobile screens.'
},
{
  icon: '📱',
  name: 'Responsive Design',
  sublabel: 'Mobile First',
  level: 'Advanced',
  pct: 95,
  tags: ['Mobile', 'Tablet', 'Desktop'],
  desc: 'Design approach that ensures websites work well across all screen sizes and devices.'
}

]

const JS_CONCEPTS = [
  { icon: '📝', name: 'Variables & Types',        sublabel: 'let · const · typeof',                  level: 'Beginner',     pct: 99, tags: ['let', 'const', 'string', 'number', 'boolean'],            desc: 'Store data in variables. Use const by default, let when you need to reassign the value.' },
  { icon: '🧩', name: 'Functions',                 sublabel: 'declaration · arrow · default params',  level: 'Beginner',     pct: 98, tags: ['function', 'arrow fn', 'default params', 'return'],       desc: 'Package reusable logic into functions. Arrow functions are concise and capture outer `this`.' },
  { icon: '🔁', name: 'Loops & Iteration',         sublabel: 'for · while · forEach',                 level: 'Beginner',     pct: 97, tags: ['for', 'for...of', 'forEach', 'while'],                    desc: 'Repeat code over arrays, numbers, or any iterable. Use for...of for clean modern syntax.' },
  { icon: '🧩', name: 'Destructuring & Spread',    sublabel: 'Unpack values cleanly',                 level: 'Intermediate', pct: 97, tags: ['destructure', 'spread ...', 'rest', 'default values'],    desc: 'Pull values from objects and arrays into named variables in one clean, expressive line.' },
  { icon: '📋', name: 'Array Methods',             sublabel: 'map · filter · reduce',                 level: 'Intermediate', pct: 95, tags: ['map()', 'filter()', 'reduce()', 'find()'],                 desc: 'Transform, filter, and aggregate arrays declaratively without mutating the original.' },
  { icon: '⏳', name: 'Promises & Async/Await',    sublabel: 'Handle async operations',               level: 'Intermediate', pct: 93, tags: ['Promise', 'async', 'await', 'Promise.all'],               desc: 'Run async tasks without callback hell. Await pauses execution until the promise resolves.' },
  { icon: '🔗', name: 'Closures',                  sublabel: 'Functions remember their scope',        level: 'Advanced',     pct: 91, tags: ['lexical scope', 'private state', 'factory fn'],           desc: 'Inner functions remember variables from their outer scope even after it has returned.' },
  { icon: '🎪', name: 'Higher-Order Functions',    sublabel: 'Functions as values',                   level: 'Advanced',     pct: 90, tags: ['compose', 'curry', 'memoize', 'partial application'],     desc: 'Functions that accept or return other functions — the foundation of functional programming.' },
  {
  icon: '⬆️',
  name: 'Hoisting',
  sublabel: 'JavaScript Execution Context',
  level: 'Intermediate',
  pct: 85,
  tags: ['var', 'let', 'const', 'function declarations'],
  desc: 'JavaScript behavior where variable and function declarations are moved to the top of their scope during the execution phase.'
},
{
  icon: '🔁',
  name: 'Array Methods',
  sublabel: 'map / filter / forEach',
  level: 'Intermediate',
  pct: 90,
  tags: ['map()', 'filter()', 'forEach()', 'reduce()'],
  desc: 'JavaScript array methods used to transform, filter, and iterate through data efficiently.'
},
{
  icon: '🔁',
  name: 'Event Loop',
  sublabel: 'Async JavaScript',
  level: 'Intermediate',
  pct: 85,
  tags: ['Call Stack', 'Callback Queue', 'Promises'],
  desc: 'JavaScript mechanism that handles asynchronous operations by managing the call stack and callback queue.'
}
]

const REACT_CONCEPTS = [
  { icon: '⚛️', name: 'JSX',                   sublabel: 'HTML inside JavaScript',          level: 'Beginner',     pct: 99, tags: ['JSX', 'className', 'expressions {}', 'fragments'],           desc: 'JSX lets you write HTML-like syntax in JS files. It compiles to React.createElement() calls.' },
  { icon: '🧱', name: 'Components & Props',    sublabel: 'Building blocks of UI',           level: 'Beginner',     pct: 99, tags: ['props', 'children', 'default props', 'composition'],         desc: 'Components are functions that return UI. Props pass data from parent to child — one way only.' },
  { icon: '🪝', name: 'useState',              sublabel: 'Local reactive state',            level: 'Beginner',     pct: 97, tags: ['useState', 'setter', 'functional update', 'batching'],        desc: 'Declare reactive state in a component. React re-renders whenever the state value changes.' },
  { icon: '⚡', name: 'useEffect',             sublabel: 'Side effects after render',       level: 'Intermediate', pct: 94, tags: ['deps array', 'cleanup', 'data fetching', 'subscriptions'],   desc: 'Run code after a render — fetch data, add listeners. Return a cleanup function to avoid leaks.' },
  { icon: '🌍', name: 'useContext',            sublabel: 'Share state globally',            level: 'Intermediate', pct: 91, tags: ['createContext', 'Provider', 'useContext', 'prop-drilling'],   desc: 'Share values across the component tree (auth, theme, locale) without drilling props.' },
  { icon: '⚙️', name: 'Custom Hooks',          sublabel: 'Reusable stateful logic',         level: 'Advanced',     pct: 93, tags: ['use prefix', 'composable', 'reusable', 'testable'],           desc: 'Extract component logic into a `use`-prefixed function. Share and test logic independently.' },
  { icon: '🧠', name: 'useMemo & useCallback', sublabel: 'Performance memoization',         level: 'Advanced',     pct: 86, tags: ['useMemo', 'useCallback', 'deps', 'referential equality'],     desc: 'Skip expensive recalculations and stabilize function references between renders.' },
  { icon: '🎭', name: 'Component Patterns',    sublabel: 'Compound · HOC · Render Props',  level: 'Advanced',     pct: 90, tags: ['compound', 'render props', 'HOC', 'children as fn'],         desc: 'Build flexible, reusable UI with compound components, slot patterns, and render props.' },
]

const TW_CONCEPTS = [
  { icon: '📦', name: 'Utility-First Basics',   sublabel: 'Style with class names',          level: 'Beginner',     pct: 99, tags: ['text-', 'bg-', 'p-', 'm-', 'rounded-'],                     desc: 'Apply single-purpose utility classes directly in HTML. No writing CSS, no naming conflicts.' },
  { icon: '🎨', name: 'Colors & Typography',    sublabel: 'text · bg · font',                level: 'Beginner',     pct: 98, tags: ['text-{color}', 'bg-{color}', 'font-bold', 'tracking-'],     desc: 'Control text size, weight, color, and line spacing with predictable, consistent class names.' },
  { icon: '🎭', name: 'Hover & State Variants', sublabel: 'hover: focus: active:',           level: 'Beginner',     pct: 97, tags: ['hover:', 'focus:', 'active:', 'focus-visible:', 'disabled:'],desc: 'Apply styles on interaction states without any extra CSS. Chain multiple variants freely.' },
  { icon: '📱', name: 'Responsive Prefixes',    sublabel: 'sm: md: lg: xl:',                 level: 'Intermediate', pct: 96, tags: ['sm:', 'md:', 'lg:', 'xl:', 'mobile-first'],                  desc: 'Every utility can be scoped to a breakpoint. No prefix = all screens (mobile-first approach).' },
  { icon: '🌙', name: 'Dark Mode',              sublabel: 'dark: variant',                   level: 'Intermediate', pct: 93, tags: ['dark:', 'class strategy', 'media', 'prefers-color-scheme'],  desc: 'Add dark variants with a single prefix. One element, two themes, no extra stylesheet.' },
  { icon: '🧩', name: 'Group & Peer',           sublabel: 'Relational state styling',        level: 'Intermediate', pct: 87, tags: ['group', 'group-hover:', 'peer', 'peer-checked:'],            desc: 'Style children based on parent hover (group) or siblings based on their state (peer).' },
  { icon: '⚡', name: 'Arbitrary Values',       sublabel: 'Escape hatch with [ ]',           level: 'Advanced',     pct: 94, tags: ['w-[px]', 'bg-[hex]', 'top-[calc()]', 'shadow-[custom]'],    desc: 'Use one-off values without writing CSS. Square brackets let you use any valid CSS value.' },
  { icon: '🎨', name: 'Custom Theme Config',    sublabel: 'tailwind.config.js',              level: 'Advanced',     pct: 90, tags: ['extend', 'colors', 'fontFamily', 'keyframes', 'animation'],  desc: 'Extend Tailwind with your own brand tokens — colors, fonts, shadows, and custom animations.' },
]

const WP_CONCEPTS = [
  { icon: '🏠', name: 'Dashboard Overview',       sublabel: 'Admin panel basics',          level: 'Beginner',     pct: 95, tags: ['Posts', 'Pages', 'Media', 'Appearance', 'Plugins'],           desc: 'The WordPress admin is your control panel. Manage all content, themes, and plugins from here.' },
  { icon: '📝', name: 'Posts vs Pages',           sublabel: 'Content types',               level: 'Beginner',     pct: 97, tags: ['Posts', 'Pages', 'categories', 'tags', 'static'],             desc: 'Posts are dated blog entries with categories & tags. Pages are static (About, Contact, Home).' },
  { icon: '🎨', name: 'Themes',                   sublabel: 'Appearance & templates',      level: 'Beginner',     pct: 92, tags: ['theme', 'child theme', 'template hierarchy', 'style.css'],    desc: 'Themes control the visual design. Always use a child theme to preserve customizations on updates.' },
  { icon: '🔌', name: 'Plugins',                  sublabel: 'Extend functionality',        level: 'Beginner',     pct: 94, tags: ['install', 'activate', 'hooks', 'shortcodes', 'WooCommerce'],  desc: 'Plugins add features without editing core files. Install from the dashboard or upload a zip.' },
  { icon: '⚙️', name: 'Custom Post Types',        sublabel: 'register_post_type()',        level: 'Intermediate', pct: 82, tags: ['register_post_type', 'CPT', 'labels', 'supports', 'rewrite'], desc: 'Create custom content types beyond posts & pages — portfolios, testimonials, events.' },
  { icon: '🪝', name: 'Hooks: Actions & Filters', sublabel: 'add_action · add_filter',    level: 'Intermediate', pct: 80, tags: ['add_action', 'add_filter', 'do_action', 'apply_filters'],     desc: 'WordPress hooks let you modify behaviour without editing core. Actions do, filters change values.' },
  { icon: '🔧', name: 'functions.php',            sublabel: 'Theme customization file',    level: 'Advanced',     pct: 83, tags: ['functions.php', 'wp_enqueue_scripts', 'theme support'],       desc: 'The theme\'s functions.php is where you enqueue scripts, register menus, and add theme support.' },
  { icon: '🔒', name: 'Security Basics',          sublabel: 'Sanitize · Escape · Nonces',  level: 'Advanced',     pct: 85, tags: ['nonces', 'sanitize', 'escape', 'user roles', 'SSL'],          desc: 'Always sanitize inputs, escape outputs, use nonces for forms, and keep WordPress updated.' },
]

const SHOPIFY_CONCEPTS = [
  { icon: '🏪', name: 'Store Structure',          sublabel: 'Admin overview',                      level: 'Beginner',     pct: 96, tags: ['Products', 'Orders', 'Customers', 'Analytics', 'Themes'],       desc: 'Shopify admin organizes everything into Products, Orders, Customers, and Analytics sections.' },
  { icon: '🛍️', name: 'Products & Variants',     sublabel: 'Listings & options',                  level: 'Beginner',     pct: 97, tags: ['variants', 'SKU', 'inventory', 'collections', 'tags'],            desc: 'Products have variants for options like size and color. Each variant can have its own price.' },
  { icon: '🎨', name: 'Themes & Customizer',     sublabel: 'Online Store > Themes',               level: 'Beginner',     pct: 93, tags: ['Dawn', 'theme editor', 'sections', 'blocks', 'presets'],           desc: 'Shopify themes use a visual customizer with sections and blocks — similar to page builders.' },
  { icon: '💳', name: 'Checkout & Payments',     sublabel: 'Shopify Payments & gateways',         level: 'Intermediate', pct: 90, tags: ['Shopify Payments', 'PayPal', 'checkout', 'discount codes'],        desc: 'Shopify handles the checkout flow. Enable Shopify Payments to avoid extra transaction fees.' },
  { icon: '📦', name: 'Shipping & Fulfillment',  sublabel: 'Zones · rates · apps',                level: 'Intermediate', pct: 88, tags: ['shipping zones', 'rates', 'weight-based', 'fulfillment'],          desc: 'Set shipping rates per zone (country/region). Offer free shipping over a cart threshold.' },
  { icon: '🔌', name: 'Apps & Integrations',     sublabel: 'Shopify App Store',                   level: 'Intermediate', pct: 91, tags: ['apps', 'webhooks', 'Klaviyo', 'reviews', 'upsell'],                desc: 'Extend Shopify with apps for email marketing, reviews, loyalty, upsells, analytics, and more.' },
  { icon: '💻', name: 'Liquid Templating',       sublabel: "Shopify's template language",         level: 'Advanced',     pct: 78, tags: ['{{ }}', '{% %}', 'objects', 'filters', 'tags'],                    desc: "Liquid is Shopify's templating language. Output variables with {{ }}, logic with {% %}." },
  { icon: '🔧', name: 'Metafields & Custom Data',sublabel: 'Extra product data',                  level: 'Advanced',     pct: 80, tags: ['metafields', 'metaobjects', 'custom data', 'theme editor'],        desc: 'Metafields let you add custom data to products, orders, and pages beyond the default fields.' },
]

// ─────────────────────────────────────────────────────────────────────────────
// TAB CONFIG — fresh color palette
// ─────────────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'html',      label: 'HTML',       icon: '🌐', color: '#FB923C', data: HTML_CONCEPTS    },
  { id: 'css',       label: 'CSS',        icon: '💅', color: '#A78BFA', data: CSS_CONCEPTS     },
  { id: 'js',        label: 'JavaScript', icon: '📜', color: '#FCD34D', data: JS_CONCEPTS      },
  { id: 'react',     label: 'React',      icon: '⚛️',  color: '#67E8F9', data: REACT_CONCEPTS   },
  { id: 'tailwind',  label: 'Tailwind',   icon: '🌬️', color: '#6EE7B7', data: TW_CONCEPTS      },
  { id: 'wordpress', label: 'WordPress',  icon: '📰', color: '#93C5FD', data: WP_CONCEPTS      },
  { id: 'shopify',   label: 'Shopify',    icon: '🛒', color: '#86EFAC', data: SHOPIFY_CONCEPTS },
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const LEVEL_CFG = {
  Beginner:     { dots: 2, color: '#94A3B8', ring: 'rgba(148,163,184,0.15)', text: '#94A3B8',  label: 'bg-slate-500/10  text-slate-400  border-slate-500/20'  },
  Intermediate: { dots: 3, color: '#FDBA74', ring: 'rgba(253,186,116,0.15)', text: '#FDBA74',  label: 'bg-orange-400/10 text-orange-300 border-orange-400/20'  },
  Advanced:     { dots: 5, color: '#34D399', ring: 'rgba(52,211,153,0.15)',  text: '#34D399',  label: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT CARD — modern glassmorphism style
// ─────────────────────────────────────────────────────────────────────────────

function ConceptCard({ item, animate, delay, tabColor }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const lvl = LEVEL_CFG[item.level]

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={`h-full transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-default"
        style={{
          background: hovered
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.02)',
          border: `1px solid ${hovered ? item.color + '35' : 'rgba(255,255,255,0.07)'}`,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)` : 'none',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* gradient top accent */}
        <div
          className="h-0.5 w-full shrink-0 transition-all duration-300"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${item.color}, ${item.color}44)`
              : `linear-gradient(90deg, ${item.color}66, transparent)`,
          }}
        />

        <div className="flex flex-col flex-1 p-5">

          {/* ── top row: name + badge ── */}
          <div className="flex items-start justify-between gap-3 mb-4">
            {/* name + sublabel */}
            <div className="min-w-0">
              <div
                className="font-bold text-[14px] leading-snug transition-colors duration-200"
                style={{ color: hovered ?'rgba(255,255,255,0.88)' :'rgb(0, 212, 170)' }}
              >
                {item.name}
              </div>
              <div
                className="font-mono text-[10px] mt-0.5 truncate"
                style={{ color: item.color + '90' }}
              >
                {item.sublabel}
              </div>
            </div>

            {/* level badge — pill */}
            <span
              className="shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase"
              style={{
                background: lvl.ring,
                color: lvl.text,
                border: `1px solid ${lvl.color}25`,
              }}
            >
              {item.level}
            </span>
          </div>

          {/* ── description ── */}
          <p
            className="text-[12.5px] leading-relaxed mb-4"
            style={{ color: 'rgba(255,255,255,0.48)' }}
          >
            {item.desc}
          </p>

          {/* ── tags ── */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map(t => (
              <span
                key={t}
                className="text-[9.5px] font-mono px-2.5 py-0.75 rounded-lg transition-all duration-200"
                style={{
                  background: hovered ? item.color + '18' : item.color + '0D',
                  color: item.color + 'bb',
                  border: `1px solid ${item.color}${hovered ? '30' : '18'}`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* ── proficiency — pushed to bottom ── */}
          <div className="mt-auto space-y-2">
            <div className="flex justify-between items-center">
              {/* dot indicators */}
              <div className="flex gap-[5px] items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width:      i < lvl.dots ? 7 : 5,
                      height:     i < lvl.dots ? 7 : 5,
                      background: i < lvl.dots
                        ? hovered ? item.color : lvl.color
                        : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              {/* percentage */}
              <span
                className="text-[11px] font-bold tabular-nums"
                style={{ color: hovered ? item.color : lvl.color }}
              >
                {animate ? `${item.pct}%` : '—'}
              </span>
            </div>

            {/* progress track */}
            <div
              className="h-1.25 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: animate ? `${item.pct}%` : '0%',
                  background: hovered
                    ? `linear-gradient(90deg, ${item.color}, ${item.color}bb)`
                    : lvl.color,
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LEVEL SECTION — cleaner divider
// ─────────────────────────────────────────────────────────────────────────────

function LevelSection({ level, items, animate, tabColor }) {
  const cfg = LEVEL_CFG[level]
  if (!items.length) return null

  return (
    <div className="mb-12">
      {/* section label */}
      <div className="flex items-center gap-3 mb-6">
        {/* dot cluster */}
        <div className="flex gap-1.25 items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width:      i < cfg.dots ? 9 : 6,
                height:     i < cfg.dots ? 9 : 6,
                background: i < cfg.dots ? cfg.color : 'rgba(255,255,255,0.08)',
              }}
            />
          ))}
        </div>

        <span
          className="text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-full"
          style={{ background: cfg.ring, color: cfg.text, border: `1px solid ${cfg.color}25` }}
        >
          {level}
        </span>

        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {items.length} concept{items.length !== 1 ? 's' : ''}
        </span>

        {/* line */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(90deg, ${cfg.color}25, transparent)` }}
        />
      </div>

      {/* equal-height grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        style={{ gridAutoRows: '1fr', alignItems: 'stretch' }}
      >
        {items.map((item, i) => (
          <ConceptCard
            key={item.name}
            item={item}
            animate={animate}
            delay={i * 55}
            tabColor={tabColor}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef            = useRef(null)
  const [animate, setAnimate] = useState(false)
  const [activeTab, setTab]   = useState('html')
  const [search, setSearch]   = useState('')

  const currentTab = TABS.find(t => t.id === activeTab)

  const filtered = currentTab.data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.sublabel.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )

  const grouped = LEVELS.map(level => ({
    level,
    items: filtered.filter(d => d.level === level),
  }))

  function switchTab(id) { setTab(id); setSearch('') }

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true) },
      { threshold: 0.04 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const stats = [
    { icon: currentTab.icon, value: currentTab.data.length,                                           label: 'Total'        },
    { icon: '🟢',            value: currentTab.data.filter(d => d.level === 'Beginner').length,       label: 'Beginner'     },
    { icon: '🟡',            value: currentTab.data.filter(d => d.level === 'Intermediate').length,   label: 'Intermediate' },
    { icon: '🏆',            value: currentTab.data.filter(d => d.level === 'Advanced').length,       label: 'Advanced'     },
    {
      icon: '⚡',
      value: `${Math.round(currentTab.data.reduce((a, d) => a + d.pct, 0) / currentTab.data.length)}%`,
      label: 'Avg score',
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-10 px-4 sm:px-6 max-w-7xl mx-auto"
    >

      {/* ═══════════════════════════════════════
          HEADING — redesigned with accent word
      ═══════════════════════════════════════ */}
      <div className="mb-12">

        {/* eyebrow pill */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex gap-1">
            {[1,2,3].map(i => (
              <span
                key={i}
                className="rounded-full"
                style={{ width: i * 4 + 4, height: 4, background: currentTab.color, opacity: i === 3 ? 1 : 0.4 }}
              />
            ))}
          </div>
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: currentTab.color }}
          >
            Knowledge Base
          </span>
        </div>

        {/* main heading — split colour accent */}
        <h2
          className="font-black tracking-tight leading-none mb-4"
          style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontFamily: 'Syne, sans-serif',
          }}
        >
          <span className="text-white">My </span>
          <span
            className="relative inline-block"
            style={{ color: currentTab.color }}
          >
            Skills
            {/* underline accent */}
            <span
              className="absolute left-0 -bottom-1 h-0.75 w-full rounded-full"
              style={{ background: currentTab.color, opacity: 0.35 }}
            />
          </span>
          <span className="text-white"> & Concepts</span>
        </h2>

        {/* subtitle */}
        <p
          className="text-[15px] max-w-xl"
          style={{ color: 'rgba(255,255,255,0.38)', lineHeight: 1.7 }}
        >
          {currentTab.data.length} {currentTab.label} concepts, ordered from basics to advanced.
          Hover a card to explore.
        </p>
      </div>

      {/* ═══════════════════════════════════════
          TAB BAR — pill style
      ═══════════════════════════════════════ */}
      <div
        className="flex items-center gap-2 mb-8 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* tab pills */}
        <div
          className="flex items-center gap-1.5 p-1 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {TABS.map(tab => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background:  active ? tab.color + '20' : 'transparent',
                  color:       active ? tab.color : 'rgba(255,255,255,0.35)',
                  border:      `1px solid ${active ? tab.color + '35' : 'transparent'}`,
                }}
              >
                <span style={{ fontSize: 14 }}>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: active ? tab.color + '25' : 'rgba(255,255,255,0.06)',
                    color:      active ? tab.color : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {tab.data.length}
                </span>
              </button>
            )
          })}
        </div>

        {/* search */}
        <div className="relative ml-auto shrink-0">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.22)', fontSize: 13 }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="rounded-xl pl-8 pr-4 py-2 text-[13px] text-white placeholder-white/20 outline-none w-36 sm:w-44 transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${search ? currentTab.color + '40' : 'rgba(255,255,255,0.08)'}`,
              caretColor: currentTab.color,
            }}
          />
        </div>
      </div>

      {/* ── level legend ── */}
      <div className="flex flex-wrap gap-5 mb-10 items-center">
        {Object.entries(LEVEL_CFG).map(([lvl, cfg]) => (
          <div key={lvl} className="flex items-center gap-2">
            <div className="flex gap-[4px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 6, height: 6,
                    background: i < cfg.dots ? cfg.color : 'rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold" style={{ color: cfg.text }}>{lvl}</span>
          </div>
        ))}
        <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
          — ordered basics → advanced
        </span>
      </div>

      {/* ═══════════════════════════════════════
          CARDS
      ═══════════════════════════════════════ */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <div className="text-5xl mb-5">🔍</div>
          <div className="font-bold text-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>
            No concepts found
          </div>
          <div className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Try a different search term
          </div>
        </div>
      ) : (
        grouped.map(({ level, items }) => (
          <LevelSection
            key={level}
            level={level}
            items={items}
            animate={animate}
            tabColor={currentTab.color}
          />
        ))
      )}

      {/* ═══════════════════════════════════════
          STATS ROW — redesigned
      ═══════════════════════════════════════ */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 cursor-default group"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = currentTab.color + '30'
              e.currentTarget.style.background  = currentTab.color + '08'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
            }}
          >
            <div className="text-lg mb-2">{s.icon}</div>
            <div
              className="text-[28px] font-black leading-none mb-1 transition-colors duration-200"
              style={{ color: currentTab.color, fontFamily: 'Syne, sans-serif' }}
            >
              {s.value}
            </div>
            <div
              className="text-[10.5px] font-medium uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}