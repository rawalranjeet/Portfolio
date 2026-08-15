(function () {
    document.addEventListener('contextmenu', function (e) {
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
        e.preventDefault(); return false;
    });
    document.addEventListener('dragstart', function (e) {
        const t = e.target;
        if (t && t.tagName === 'IMG') { e.preventDefault(); return false; }
    });
    document.addEventListener('selectstart', function (e) {
        const t = e.target;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
        if (t && t.closest && t.closest('.copy-toast')) return;
        e.preventDefault(); return false;
    });
    document.addEventListener('copy', function (e) {
        const sel = window.getSelection();
        const t = document.activeElement;
        if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
        if (sel && sel.toString() && sel.anchorNode && sel.anchorNode.parentElement && sel.anchorNode.parentElement.closest('.copy-toast')) return;
        e.preventDefault(); return false;
    });
})();

(function () {
    const luaIntro = document.getElementById('luaIntro');
    const luaCode = document.getElementById('luaIntroCode');
    const luaFill = document.getElementById('luaLoadingFill');
    const luaSkip = document.getElementById('luaSkip');
    if (!luaIntro) return;
    const lines = [
        { t: '# Loading Ranjeet\'s Python Backend Environment...', c: 'lua-cm' },
        { t: 'import asyncio', c: '' },
        { t: 'from typing import List, Dict', c: '' },
        { t: '', c: '' },
        { t: 'class PythonBackendDeveloper:', c: '' },
        { t: '    def __init__(self):', c: '' },
        { t: '        self.name = "Ranjeet Kumar"', c: '' },
        { t: '        self.role = "Python Backend & Full-Stack Engineer"', c: '' },
        { t: '        self.core_stack = ["Python", "REST APIs", "PostgreSQL", "MongoDB"]', c: '' },
        { t: '', c: '' },
        { t: '    async def initialize_system(self) -> bool:', c: '' },
        { t: '        print("Welcome to Ranjeet\'s Portfolio!")', c: '' },
        { t: '        await self.load_backend_services()', c: '' },
        { t: '        await self.connect_databases()', c: '' },
        { t: '        return True', c: '' },
        { t: '', c: '' },
        { t: '# High-performance Python backend ready', c: 'lua-cm' },
        { t: 'asyncio.run(PythonBackendDeveloper().initialize_system())', c: '' }
    ];
    function tokenize(line) {
        const kw = ['import', 'from', 'class', 'def', 'return', 'True', 'False', 'None', 'self', 'if', 'else', 'for', 'in', 'and', 'or', 'not', 'try', 'except', 'with', 'as', 'async', 'await'];
        let html = ''; let i = 0; const txt = line;
        while (i < txt.length) {
            if (txt[i] === '#') { html += '<span class="lua-cm">' + txt.substr(i).replace(/</g, '&lt;') + '</span>'; break; }
            if (txt[i] === '"' || txt[i] === "'") { const q = txt[i]; let j = i + 1; while (j < txt.length && txt[j] !== q) { j++; } html += '<span class="lua-str">' + txt.substring(i, j + 1) + '</span>'; i = j + 1; continue; }
            let m = txt.substr(i).match(/^[A-Za-z_][A-Za-z0-9_]*/);
            if (m) {
                const w = m[0];
                if (kw.indexOf(w) >= 0) { html += '<span class="lua-kw">' + w + '</span>'; }
                else if (txt[i + w.length] === '(') { html += '<span class="lua-fn">' + w + '</span>'; }
                else { html += '<span class="lua-var">' + w + '</span>'; }
                i += w.length; continue;
            }
            html += txt[i].replace('<', '&lt;'); i++;
        }
        return html;
    }
    let lineIdx = 0; let charIdx = 0; let currentText = ''; let done = false;
    function typeChar() {
        if (done) return;
        if (lineIdx >= lines.length) { finishIntro(); return; }
        const line = lines[lineIdx].t;
        if (charIdx < line.length) {
            charIdx++;
            const partial = line.substring(0, charIdx);
            const rendered = currentText + tokenize(partial) + '<span class="lua-cursor"></span>';
            luaCode.innerHTML = rendered;
            luaCode.scrollTop = luaCode.scrollHeight;
            const pct = Math.min(100, Math.round(((lineIdx + charIdx / Math.max(1, line.length)) / lines.length) * 100));
            if (luaFill) luaFill.style.width = pct + '%';
            setTimeout(typeChar, Math.random() * 18 + 10);
        } else {
            currentText += tokenize(line) + '\n';
            lineIdx++; charIdx = 0;
            setTimeout(typeChar, 80);
        }
    }
    function finishIntro() {
        if (done) return; done = true;
        if (luaFill) luaFill.style.width = '100%';
        luaIntro.classList.add('exit-anim');
        const flash = document.createElement('div'); flash.className = 'lua-intro-flash'; luaIntro.appendChild(flash);
        setTimeout(() => { luaIntro.style.display = 'none'; }, 1500);
    }
    function skipIntro() { if (done) return; done = true; luaIntro.classList.add('exit-anim'); const flash = document.createElement('div'); flash.className = 'lua-intro-flash'; luaIntro.appendChild(flash); setTimeout(() => { luaIntro.style.display = 'none'; }, 800); }
    luaIntro.addEventListener('click', skipIntro);
    document.addEventListener('keydown', function onKey(e) { if (!done) { skipIntro(); } }, { once: true });
    typeChar();
})();

(function () {
    const isMobile = window.matchMedia('(max-width:600px)').matches;
    const canvas = document.getElementById('bgCanvas');
    if (!canvas || isMobile) { if (canvas) canvas.style.display = 'none'; return; }
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789{}()[]<>=+-*/'.split('');
    const fontSize = 14; const cols = Math.floor(w / fontSize); const drops = new Array(cols).fill(1);
    function draw() {
        ctx.fillStyle = 'rgba(6,6,8,0.06)'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(45,255,110,0.35)'; ctx.font = fontSize + 'px Fira Code, monospace';
        for (let i = 0; i < drops.length; i++) {
            const t = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(t, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    let raf; function loop() { draw(); raf = requestAnimationFrame(loop); }
    loop();
    window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
})();

(function () {
    const glow = document.getElementById('mouseGlow');
    if (!glow) return;
    if (window.matchMedia('(max-width:600px)').matches) { glow.style.display = 'none'; return; }
    let tx = 0, ty = 0, pending = false;
    function update() { pending = false; glow.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)'; }
    window.addEventListener('mousemove', e => {
        tx = e.clientX - 175; ty = e.clientY - 175;
        if (!pending) { pending = true; requestAnimationFrame(update); }
    }, { passive: true });
})();

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const tgt = document.querySelector(href);
            if (tgt) { e.preventDefault(); tgt.scrollIntoView({ behavior: 'smooth', block: 'start' }); const mm = document.getElementById('mobilemenu'); const hb = document.getElementById('hamburger'); if (mm) mm.classList.remove('open'); if (hb) hb.classList.remove('active'); }
        }
    });
});

(function () {
    const hb = document.getElementById('hamburger');
    const mm = document.getElementById('mobilemenu');
    if (!hb || !mm) return;
    hb.addEventListener('click', () => { hb.classList.toggle('active'); mm.classList.toggle('open'); });
})();

(function () {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((ents) => {
        ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(el => io.observe(el));
})();

(function () {
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const decimals = parseInt(el.getAttribute('data-decimal') || '0');
        const dur = 1800; const start = performance.now();
        function step(now) {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            const cur = target * eased;
            el.textContent = prefix + cur.toFixed(decimals) + suffix;
            if (t < 1) requestAnimationFrame(step); else el.textContent = prefix + target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(step);
    }
    const cards = document.querySelectorAll('.stat-card');
    const cio = new IntersectionObserver((ents) => {
        ents.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('counted');
                const c = en.target.querySelector('.counter');
                if (c) animateCounter(c);
                cio.unobserve(en.target);
            }
        });
    }, { threshold: 0.3 });
    cards.forEach(c => cio.observe(c));
})();

(function () {
    const el = document.getElementById('typedText');
    if (!el) return;
    const phrases = [
        'python main.py --host 0.0.0.0 --port 8000',
        'git commit -m "Feat: Build scalable Python RESTful API microservice"',
        'docker-compose up -d postgresql mongodb redis backend',
        'echo "Engineering High-Performance Python Solutions"',
        'pytest tests/test_backend_api.py --cov=app'
    ];
    let p = 0, c = 0, deleting = false;
    function tick() {
        const cur = phrases[p];
        if (!deleting) {
            c++; el.textContent = cur.substring(0, c);
            if (c >= cur.length) { deleting = true; setTimeout(tick, 1600); return; }
        } else {
            c--; el.textContent = cur.substring(0, c);
            if (c <= 0) { deleting = false; p = (p + 1) % phrases.length; }
        }
        setTimeout(tick, deleting ? 40 : 75);
    }
    tick();
})();

(function () {
    const isMobile = window.matchMedia('(max-width:900px)').matches;
    const items = document.querySelectorAll('.port-yt');
    function markImageLoaded(item, img) {
        img.classList.add('loaded');
        item.classList.add('img-loaded');
        item.classList.remove('priority-loading');
    }
    function promoteImagePriority(item) {
        const img = item.querySelector('.port-img');
        if (!img || item.classList.contains('img-loaded')) return;
        if (img.classList.contains('broken')) return;
        item.classList.add('priority-loading');
        img.setAttribute('fetchpriority', 'high');
        img.setAttribute('loading', 'eager');
        const currentSrc = img.getAttribute('src');
        if (currentSrc && !img.complete) {
            const reloadSrc = currentSrc + (currentSrc.indexOf('?') >= 0 ? '&' : '?') + '_p=1';
            img.src = reloadSrc;
        }
    }
    items.forEach(item => {
        const img = item.querySelector('.port-img');
        if (img) {
            img.addEventListener('load', function () {
                if (img.naturalWidth > 0) markImageLoaded(item, img);
            });
            img.addEventListener('error', function () {
                img.classList.add('broken');
                item.classList.remove('priority-loading');
                if (!item.querySelector('.port-yt-fallback')) {
                    const fb = document.createElement('div');
                    fb.className = 'port-yt-fallback';
                    fb.innerHTML = '<div class="port-yt-fallback-icon">&#127909;</div><div>' + (item.getAttribute('data-title') || 'Video') + '</div><div style="opacity:.5">Click to play</div>';
                    item.insertBefore(fb, item.firstChild);
                }
            });
            if (img.complete) {
                if (img.naturalWidth > 0) markImageLoaded(item, img);
                else img.dispatchEvent(new Event('error'));
            }
        }
        item.addEventListener('click', function () { promoteImagePriority(item); }, { capture: true });
        item.addEventListener('mouseenter', function () { promoteImagePriority(item); }, { once: true, capture: true });
        if (isMobile) return;
        let hoverTimer = null;
        item.addEventListener('mouseenter', () => {
            if (hoverTimer) clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                const yt = item.getAttribute('data-yt');
                if (!yt) return;
                const frame = item.querySelector('.port-yt-frame');
                if (!frame || frame.querySelector('iframe')) return;
                const iframe = document.createElement('iframe');
                iframe.src = 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&loop=1&playlist=' + yt + '&playsinline=1&disablekb=1&fs=0';
                iframe.allow = 'autoplay; encrypted-media';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('tabindex', '-1');
                frame.appendChild(iframe);
                item.classList.add('previewing');
            }, 250);
        });
        item.addEventListener('mouseleave', () => {
            if (hoverTimer) { clearTimeout(hoverTimer); hoverTimer = null; }
            item.classList.remove('previewing');
            const frame = item.querySelector('.port-yt-frame');
            if (frame) { setTimeout(() => { if (!item.classList.contains('previewing')) frame.innerHTML = ''; }, 400); }
        });
    });
})();

(function () {
    const items = document.querySelectorAll('.port-yt');
    if (!items.length) return;
    const vio = new IntersectionObserver(function (entries) {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const img = en.target.querySelector('.port-img');
                if (img && !img.complete && img.getAttribute('fetchpriority') === 'low') {
                    img.setAttribute('fetchpriority', 'auto');
                    img.setAttribute('loading', 'eager');
                }
                vio.unobserve(en.target);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    items.forEach(item => vio.observe(item));
    function idlePreload() {
        items.forEach(item => {
            const img = item.querySelector('.port-img');
            if (img && !img.complete && !img.classList.contains('broken')) {
                img.setAttribute('loading', 'eager');
            }
        });
    }
    if (window.requestIdleCallback) {
        window.requestIdleCallback(idlePreload, { timeout: 4000 });
    } else {
        setTimeout(idlePreload, 3000);
    }
})();

(function () {
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    const cf = document.getElementById('contactForm');
    if (cf) { cf.addEventListener('submit', e => { e.preventDefault(); const n = document.getElementById('fname').value; const em = document.getElementById('femail').value; const ms = document.getElementById('fmsg').value; const subj = encodeURIComponent('Project Inquiry from ' + n); const body = encodeURIComponent('From: ' + n + ' <' + em + '>\n\n' + ms); window.location.href = 'mailto:rawalranjeet765@gmail.com?subject=' + subj + '&body=' + body; }); }
    const ce = document.getElementById('copyEmail');
    if (ce) { ce.addEventListener('click', () => { const txt = 'rawalranjeet765@gmail.com'; if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(() => { ce.textContent = '✓ Copied!'; setTimeout(() => { ce.innerHTML = '&#128203; Copy Email'; }, 1500); }); } else { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); ce.textContent = '✓ Copied!'; setTimeout(() => { ce.innerHTML = '&#128203; Copy Email'; }, 1500); } }); }
    const dcv = document.getElementById('downloadCV');
    if (dcv) { dcv.addEventListener('click', e => { e.preventDefault(); window.open('Ranjeet_Resume_2026.pdf', '_blank'); }); }
    const ghb = document.getElementById('ghb');
    if (ghb) { ghb.addEventListener('click', e => { e.preventDefault(); window.open('https://github.com/rawalranjeet', '_blank'); }); }
    const lnk = document.getElementById('lnk');
    if (lnk) { lnk.addEventListener('click', e => { e.preventDefault(); window.open('https://www.linkedin.com/in/ranjeet-kumar-5b2940258', '_blank'); }); }
    const ag = document.getElementById('allGamesBtn');
    if (ag) { ag.addEventListener('click', e => { e.preventDefault(); window.open('https://github.com/rawalranjeet', '_blank'); }); }
})();

(function () {
    const usdBtn = document.getElementById('payUsd');
    const robuxBtn = document.getElementById('payRobux');
    const calcSec = document.getElementById('robuxCalcSection');
    if (!usdBtn || !robuxBtn) return;
    function setMode(mode) {
        if (mode === 'usd') { usdBtn.classList.add('active'); robuxBtn.classList.remove('active'); document.querySelectorAll('.price-usd').forEach(e => e.style.display = ''); document.querySelectorAll('.price-robux').forEach(e => e.style.display = 'none'); if (calcSec) calcSec.style.display = 'none'; }
        else { robuxBtn.classList.add('active'); usdBtn.classList.remove('active'); document.querySelectorAll('.price-usd').forEach(e => e.style.display = 'none'); document.querySelectorAll('.price-robux').forEach(e => e.style.display = ''); if (calcSec) calcSec.style.display = ''; }
    }
    usdBtn.addEventListener('click', () => setMode('usd'));
    robuxBtn.addEventListener('click', () => setMode('robux'));
    const tf = document.getElementById('termFull'); const th = document.getElementById('termHalf');
    if (tf && th) { tf.addEventListener('click', () => { tf.classList.add('pay-term-active'); th.classList.remove('pay-term-active'); }); th.addEventListener('click', () => { th.classList.add('pay-term-active'); tf.classList.remove('pay-term-active'); }); }
})();

function calcRobux() {
    const inp = document.getElementById('robuxUsdInput');
    const base = document.getElementById('robuxBase');
    const tax = document.getElementById('robuxTax');
    const total = document.getElementById('robuxTotal');
    const bd = document.getElementById('robuxBreakdown');
    if (!inp) return;
    const usd = parseFloat(inp.value) || 0;
    if (usd <= 0) { if (base) base.textContent = '-'; if (tax) tax.textContent = '-'; if (total) total.textContent = '-'; if (bd) bd.innerHTML = ''; return; }
    const baseR = Math.round((usd / 380) * 100000);
    const totalR = Math.ceil(baseR / 0.7);
    const taxR = totalR - baseR;
    if (base) base.textContent = 'R$ ' + baseR.toLocaleString();
    if (tax) tax.textContent = '+R$ ' + taxR.toLocaleString();
    if (total) total.textContent = 'R$ ' + totalR.toLocaleString();
    if (bd) bd.innerHTML = '$' + usd + ' = <span class="br-neon">R$ ' + baseR.toLocaleString() + '</span> base + <span class="br-red">R$ ' + taxR.toLocaleString() + ' (30% tax)</span> = <span class="br-amber">R$ ' + totalR.toLocaleString() + '</span>';
}
(function () { const inp = document.getElementById('robuxUsdInput'); if (inp) { inp.addEventListener('input', calcRobux); calcRobux(); } })();

const DISCORD_USER_ID = "988042610050482256";
const DISCORD_INVITE_URL = "https://discord.gg/533S32PZd7";
function getSelectedPaymentTerm() {
    const fullCard = document.getElementById('termFull');
    const halfCard = document.getElementById('termHalf');
    if (fullCard && fullCard.classList.contains('pay-term-active')) return 'FULL_UPFRONT';
    if (halfCard && halfCard.classList.contains('pay-term-active')) return 'HALF_SPLIT';
    return 'FULL_UPFRONT';
}
const PAYMENT_TERM_TEXT = {
    FULL_UPFRONT: "Payment terms: 100% upfront (qualifying for up to 10% discount)",
    HALF_SPLIT: "Payment terms: 50% upfront deposit + 50% on completion (before file delivery)"
};
function buildPricingMessage(tier) {
    const term = getSelectedPaymentTerm();
    const termLine = PAYMENT_TERM_TEXT[term];
    const templates = {
        'Entry Level': "Hi Ranjeet! I'm interested in the Bug Fix / Script tier.\n\n" + termLine + "\n\nProject context:\n- Backend / Odoo feature: \n- Issue or fix needed: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
        'Standard': "Hi Ranjeet! I'm interested in the Custom Odoo Module & API Integration tier.\n\n" + termLine + "\n\nProject context:\n- API / E-commerce platform: \n- Feature/system needed: \n- Expected output: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
        'Premium': "Hi Ranjeet! I'm interested in the Full ERP / Complex Python Backend Architecture tier.\n\n" + termLine + "\n\nProject context:\n- Enterprise Scope: \n- Custom Odoo / Webhooks / Gateways: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
        'Partnership': "Hi Ranjeet! I'd like to discuss a Full-Time / Contract Engineering Partnership.\n\n" + termLine + "\n\nProject overview:\n- Company/Project: \n- Tech stack requirements: \n- Target timeline: \n\nLooking forward to building something great together!",
        'General': "Hi Ranjeet! I found your portfolio and would love to connect regarding Python / Odoo development.\n\n- About me: \n- Project / Role description: \n- Timeline: \n\nLooking forward to chatting!"
    };
    return templates[tier] || templates['Standard'];
}
const PRICING_MESSAGES = {
    'Entry Level': "Hi Ranjeet! I'm interested in the Bug Fix / Script tier.\n\nProject context:\n- Backend / Odoo feature: \n- Issue or fix needed: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
    'Standard': "Hi Ranjeet! I'm interested in the Custom Odoo Module & API Integration tier.\n\nProject context:\n- API / E-commerce platform: \n- Feature/system needed: \n- Expected output: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
    'Premium': "Hi Ranjeet! I'm interested in the Full ERP / Complex Python Backend Architecture tier.\n\nProject context:\n- Enterprise Scope: \n- Custom Odoo / Webhooks / Gateways: \n- Timeline: \n- Budget: \n\nLooking forward to working together!",
    'Partnership': "Hi Ranjeet! I'd like to discuss a Full-Time / Contract Engineering Partnership.\n\nProject overview:\n- Company/Project: \n- Tech stack requirements: \n- Target timeline: \n\nLooking forward to building something great together!",
    'General': "Hi Ranjeet! I found your portfolio and would love to connect regarding Python / Odoo development.\n\n- About me: \n- Project / Role description: \n- Timeline: \n\nLooking forward to chatting!"
};
function showCopyToast(success, isMobile, tier) {
    let overlay = document.getElementById('copyToastOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'copyToastOverlay';
        overlay.className = 'copy-toast-overlay';
        document.body.appendChild(overlay);
    }
    let toast = document.getElementById('copyToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copyToast';
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const isTouchDevice = isMobile || /Mobi|Android/i.test(navigator.userAgent);
    const pasteHint = isTouchDevice ? 'long-press the message field &amp; tap <strong>Paste</strong>' : 'press <span class="toast-kbd">' + (isMac ? '&#8984; Cmd' : 'Ctrl') + '</span>+<span class="toast-kbd">V</span> to paste';
    const actions = '<div class="toast-actions"><button class="toast-btn toast-btn-primary toast-btn-large" onclick="(function(){window._discordRetry();const t=document.getElementById(\'copyToast\');const o=document.getElementById(\'copyToastOverlay\');if(t){t.classList.remove(\'show\');clearTimeout(t._timer);}if(o)o.classList.remove(\'show\');document.body.style.overflow=\'\';})()"><img class="btn-icon-img" src="DiscordIcon.jpg" alt="Discord"> Open Discord DM &rarr;</button><button class="toast-btn toast-btn-secondary" onclick="window._discordCopyLink(this)">&#128279; Copy DM Link Instead</button></div>';
    const dismissBtn = '<button class="toast-dismiss" aria-label="Close" onclick="(function(){const t=document.getElementById(\'copyToast\');const o=document.getElementById(\'copyToastOverlay\');if(t){t.classList.remove(\'show\');clearTimeout(t._timer);}if(o)o.classList.remove(\'show\');document.body.style.overflow=\'\';})()">&times;</button>';
    if (success) {
        toast.innerHTML = dismissBtn + '<span class="toast-icon">&#128203;</span><div class="toast-title">Message Copied!</div><div class="toast-sub">Click the button below to open my Discord DM, then ' + pasteHint + ' &amp; send.</div>' + actions;
    } else {
        toast.innerHTML = dismissBtn + '<span class="toast-icon">&#9888;&#65039;</span><div class="toast-title">Could Not Auto-Copy</div><div class="toast-sub">No worries — click below to open Discord, then write your inquiry manually.</div>' + actions;
    }
    toast.classList.toggle('toast-mobile', !!isTouchDevice);
    toast.classList.remove('show');
    overlay.classList.remove('show');
    void toast.offsetWidth;
    overlay.classList.add('show');
    toast.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearTimeout(toast._timer);
    overlay.onclick = function () {
        toast.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    };
}
function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
    }
    return Promise.resolve(fallbackCopy(text));
}
function fallbackCopy(text) {
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (e) { return false; }
}
function openDiscordPricing(tier, event) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const msg = buildPricingMessage(tier);
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    copyTextToClipboard(msg).then(ok => { showCopyToast(ok, isMobile, tier); });
    return false;
}
window._discordRetry = function () {
    const webUrl = 'https://discord.com/users/' + DISCORD_USER_ID;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
        const mobileDeepLink = 'discord://users/' + DISCORD_USER_ID;
        const fallbackTimer = setTimeout(() => { window.open(webUrl, '_blank'); }, 1500);
        window.addEventListener('blur', function onBlur() { clearTimeout(fallbackTimer); window.removeEventListener('blur', onBlur); }, { once: true });
        window.location.href = mobileDeepLink;
    } else {
        const desktopUrl = 'discord://-/users/' + DISCORD_USER_ID;
        const tempLink = document.createElement('a');
        tempLink.href = desktopUrl;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        setTimeout(() => { window.open(webUrl, '_blank'); }, 800);
    }
};
window._discordCopyLink = function (btn) {
    const link = 'https://discord.com/users/' + DISCORD_USER_ID;
    copyTextToClipboard(link).then(ok => {
        if (ok && btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = '&#10003; Link Copied!';
            setTimeout(() => { if (btn) btn.innerHTML = orig; }, 2000);
        }
    });
};
(function () {
    const db = document.getElementById('discordBtn');
    if (db) { db.addEventListener('click', function (e) { e.preventDefault(); window.open(DISCORD_INVITE_URL, '_blank'); }); }
})();

(function () {
    if (!window.matchMedia('(max-width:600px)').matches) return;
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('.game-overlay a')) return;
            e.stopPropagation();
            const wasActive = card.classList.contains('mobile-active');
            document.querySelectorAll('.game-card.mobile-active').forEach(c => c.classList.remove('mobile-active'));
            if (!wasActive) card.classList.add('mobile-active');
        });
    });
    document.addEventListener('click', function (e) {
        if (e.target.closest('.game-card')) return;
        document.querySelectorAll('.game-card.mobile-active').forEach(c => c.classList.remove('mobile-active'));
    });
})();

(function () {
    let ytApiReady = false;
    let ytApiLoading = false;
    const ytApiQueue = [];
    function loadYouTubeAPI() {
        if (ytApiReady || ytApiLoading) return;
        ytApiLoading = true;
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const first = document.getElementsByTagName('script')[0];
        first.parentNode.insertBefore(tag, first);
    }
    window.onYouTubeIframeAPIReady = function () {
        ytApiReady = true;
        ytApiLoading = false;
        while (ytApiQueue.length) { const cb = ytApiQueue.shift(); cb(); }
    };
    function whenYTReady(cb) {
        if (ytApiReady) { cb(); return; }
        ytApiQueue.push(cb);
        loadYouTubeAPI();
    }
    let currentPlayer = null;
    let progressTimer = null;
    let hideTimer = null;
    function fmt(s) {
        s = Math.max(0, Math.floor(s || 0));
        const m = Math.floor(s / 60), sec = s % 60;
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }
    function destroyCurrentPlayer() {
        if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
        if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
        if (currentPlayer) {
            try { currentPlayer.destroy(); } catch (e) { }
            currentPlayer = null;
        }
    }
    function initYouTubePlayer(wrap, videoId) {
        whenYTReady(function () {
            const host = wrap.querySelector('#ytPlayerHost');
            if (!host) return;
            host.id = 'ytPlayerHost_' + Date.now();
            currentPlayer = new YT.Player(host.id, {
                videoId: videoId,
                host: 'https://www.youtube-nocookie.com',
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                    rel: 0,
                    modestbranding: 1,
                    showinfo: 0,
                    iv_load_policy: 3,
                    playsinline: 1,
                    disablekb: 0,
                    fs: 1,
                    cc_load_policy: 0,
                    origin: window.location.origin
                },
                events: {
                    onReady: function (e) { onPlayerReady(wrap, e); },
                    onStateChange: function (e) { onPlayerStateChange(wrap, e); },
                    onPlaybackQualityChange: function (e) { onQualityChange(wrap, e); }
                }
            });
        });
    }
    function onPlayerReady(wrap, event) {
        const loading = wrap.querySelector('.yt-loading');
        if (loading) loading.style.display = 'none';
        try { event.target.unMute(); event.target.setVolume(80); event.target.playVideo(); } catch (e) { }
    }
    function onPlayerStateChange(wrap, event) { }
    function onQualityChange(wrap, event) { }
    window._lightboxYTHelpers = { initYouTubePlayer: initYouTubePlayer, destroyCurrentPlayer: destroyCurrentPlayer };
})();

(function () {
    const overlay = document.getElementById('lightbox');
    if (!overlay) return;
    const content = document.getElementById('lbContent');
    const counter = document.getElementById('lbCounter');
    const caption = document.getElementById('lbCaption');
    const closeBtn = document.getElementById('lbClose');
    const prevBtn = document.getElementById('lbPrev');
    const nextBtn = document.getElementById('lbNext');
    const items = [];
    const selectors = [
        '.roblox-img-area img',
        '.process-img-thumb img',
        '.side-thumb img',
        '.community-thumb img',
        '.game-thumb img.game-img-default'
    ];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            const src = el.getAttribute('src');
            if (src && src.trim() !== '') {
                items.push({ type: 'image', src: src, alt: el.getAttribute('alt') || '', el: el });
            }
        });
    });
    document.querySelectorAll('.port-yt').forEach(media => {
        const yt = media.getAttribute('data-yt');
        const title = media.getAttribute('data-title') || 'Video';
        if (yt && yt.trim() !== '') {
            items.push({ type: 'youtube', ytId: yt, alt: title, el: media });
        }
    });
    let currentIdx = 0;
    function setupItem(item, index) {
        if (!item.el) return;
        item.el.style.cursor = 'zoom-in';
        const handler = function (e) {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(index);
        };
        const parent = item.el.closest('.port-yt,.port-media,.game-thumb,.community-thumb,.side-thumb,.process-img-thumb,.roblox-img-area');
        if (parent) {
            parent.style.cursor = 'zoom-in';
            parent.addEventListener('click', function (e) {
                if (e.target.closest('a')) return;
                if (e.target.closest('.game-overlay')) return;
                e.preventDefault();
                e.stopPropagation();
                openLightbox(index);
            });
        } else {
            item.el.addEventListener('click', handler);
        }
    }
    items.forEach((it, i) => setupItem(it, i));
    function openLightbox(idx) {
        currentIdx = idx;
        showCurrent();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('video').forEach(v => { if (!v.closest('.lightbox-overlay')) v.pause(); });
        document.querySelectorAll('.port-yt.previewing').forEach(p => {
            p.classList.remove('previewing');
            const f = p.querySelector('.port-yt-frame');
            if (f) f.innerHTML = '';
        });
    }
    function closeLightbox() {
        if (window._lightboxYTHelpers && window._lightboxYTHelpers.destroyCurrentPlayer) { window._lightboxYTHelpers.destroyCurrentPlayer(); }
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        content.innerHTML = '<div class="lightbox-loading" id="lbLoading"></div>';
    }
    function showCurrent() {
        if (items.length === 0) return;
        if (window._lightboxYTHelpers && window._lightboxYTHelpers.destroyCurrentPlayer) { window._lightboxYTHelpers.destroyCurrentPlayer(); }
        const item = items[currentIdx];
        content.innerHTML = '<div class="lightbox-loading"></div>';
        counter.textContent = (currentIdx + 1) + ' / ' + items.length;
        caption.textContent = item.alt || '';
        caption.style.display = item.alt ? '' : 'none';
        if (item.type === 'youtube') {
            const wrap = document.createElement('div');
            wrap.className = 'lightbox-yt-wrap';
            wrap.innerHTML = '<div class="yt-iframe-host"><div id="ytPlayerHost"></div></div><div class="yt-loading"></div>';
            const sp = content.querySelector('.lightbox-loading');
            if (sp) sp.remove();
            content.appendChild(wrap);
            window._lightboxYTHelpers.initYouTubePlayer(wrap, item.ytId);
        } else if (item.type === 'video' || item.videoSrc) {
            const v = document.createElement('video');
            v.className = 'lightbox-video';
            v.controls = true;
            v.autoplay = true;
            v.loop = true;
            v.playsInline = true;
            v.src = item.videoSrc || item.src;
            v.addEventListener('loadeddata', () => {
                const sp = content.querySelector('.lightbox-loading');
                if (sp) sp.remove();
            });
            content.appendChild(v);
        } else {
            const img = new Image();
            img.className = 'lightbox-img';
            img.alt = item.alt || '';
            img.onload = function () {
                const sp = content.querySelector('.lightbox-loading');
                if (sp) sp.remove();
                content.appendChild(img);
            };
            img.onerror = function () {
                const sp = content.querySelector('.lightbox-loading');
                if (sp) sp.remove();
                content.innerHTML = '<div style="color:#9191a3;font-family:Fira Code,monospace;font-size:14px">Failed to load image</div>';
            };
            img.src = item.src;
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                img.classList.toggle('zoomed');
            });
        }
        prevBtn.disabled = items.length <= 1;
        nextBtn.disabled = items.length <= 1;
    }
    function next() { if (items.length === 0) return; currentIdx = (currentIdx + 1) % items.length; showCurrent(); }
    function prev() { if (items.length === 0) return; currentIdx = (currentIdx - 1 + items.length) % items.length; showCurrent(); }
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) return closeLightbox();
        if (e.target.classList && (e.target.classList.contains('lightbox-container') || e.target.classList.contains('lightbox-content'))) {
            return closeLightbox();
        }
    });
    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowRight' && !e.shiftKey) next();
        else if (e.key === 'ArrowLeft' && !e.shiftKey) prev();
    });
    let lbHideTimer = null;
    function showLightboxControls() {
        overlay.classList.remove('controls-hidden');
        if (lbHideTimer) { clearTimeout(lbHideTimer); }
        lbHideTimer = setTimeout(() => {
            if (overlay.classList.contains('active')) { overlay.classList.add('controls-hidden'); }
        }, 3000);
    }
    function cancelLightboxHide() {
        if (lbHideTimer) { clearTimeout(lbHideTimer); lbHideTimer = null; }
        overlay.classList.remove('controls-hidden');
    }
    overlay.addEventListener('mousemove', showLightboxControls);
    overlay.addEventListener('touchstart', showLightboxControls, { passive: true });
    [closeBtn, prevBtn, nextBtn].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('mouseenter', cancelLightboxHide);
        btn.addEventListener('focus', cancelLightboxHide);
    });
    const _origOpen = openLightbox;
    openLightbox = function (idx) { _origOpen(idx); showLightboxControls(); };
    const _origClose = closeLightbox;
    closeLightbox = function () { if (lbHideTimer) { clearTimeout(lbHideTimer); lbHideTimer = null; } overlay.classList.remove('controls-hidden'); _origClose(); };
})();
