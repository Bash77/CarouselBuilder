/* ===== v2 Reel — application logic ===== */

const state = {
    deck: JSON.parse(JSON.stringify(DEFAULT_DECK)),
    idx: 0,
    fontPreset: 'geist',
};

const KINDS = [
    { id: 'hook',   label: 'Hook',    ic: '◎' },
    { id: 'text',   label: 'Text',    ic: '¶' },
    { id: 'metric', label: 'Metric',  ic: '#' },
    { id: 'code',   label: 'Code',    ic: '{}' },
    { id: 'ba',     label: 'B/A',     ic: '⇋' },
    { id: 'list',   label: 'List',    ic: '☰' },
    { id: 'cta',    label: 'CTA',     ic: '→' },
];

const PRESETS = [
    "Why I stopped using Notion for content planning",
    "How to brief Claude like a Creative Director",
    "5 SaaS landing page mistakes I see weekly",
    "Junior devs: 3 highest-leverage skills in 2026",
];

const $ = sel => document.querySelector(sel);
const feedCards = $('#feed-cards');
const titleInput = $('#title');
const insp = $('#inspector');
const statusBar = $('#status');
const deckBadge = $('#deck-badge');

// ----- Card scaling: each preview card width → slide scales accordingly -----
function scaleCards() {
    document.querySelectorAll('.r-card .slide-wrap').forEach(wrap => {
        const w = wrap.clientWidth;
        const slide = wrap.querySelector('.ig-slide');
        if (slide && w) {
            const scale = w / 1080;
            slide.style.transform = `scale(${scale})`;
        }
    });
}
window.addEventListener('resize', scaleCards);

// ----- Render ALL -----
function renderAll() {
    renderFeed();
    renderInspector();
    renderStatus();
    renderDeckBadge();
}

function renderDeckBadge() {
    const n = state.deck.slides.length;
    deckBadge.innerHTML = `<span>4:5 · 1080×1350</span> · <span class="v">${n} slide${n!==1?'s':''}</span>`;
}

function renderFeed() {
    const slides = state.deck.slides;
    feedCards.innerHTML = '';
    slides.forEach((s, i) => {
        // Card
        const card = document.createElement('div');
        card.className = 'r-card' + (i === state.idx ? ' selected' : '');
        card.dataset.index = i;

        const gutter = document.createElement('div');
        gutter.className = 'gutter';
        gutter.innerHTML = `
            <div class="num">${String(i+1).padStart(2,'0')}</div>
            <div class="kind">${(s.kind||'text').toUpperCase()}</div>
        `;

        const wrap = document.createElement('div');
        wrap.className = 'slide-wrap editable';
        wrap.innerHTML = renderSlide(s, i, slides.length, {
            editable: (i === state.idx),
            brand: state.deck.brand,
            handle: state.deck.handle,
        });

        // Row actions
        const actions = document.createElement('div');
        actions.className = 'row-actions';
        actions.innerHTML = `
            <button class="act" data-act="up" title="Move up">↑</button>
            <button class="act" data-act="down" title="Move down">↓</button>
            <button class="act" data-act="dup" title="Duplicate">⎘</button>
            <button class="act danger" data-act="del" title="Delete">×</button>
        `;
        wrap.appendChild(actions);

        // Click to select
        wrap.addEventListener('click', (e) => {
            if (e.target.closest('[data-act]')) return;
            if (e.target.matches('[contenteditable]')) return;
            state.idx = i;
            renderAll();
            requestAnimationFrame(scaleCards);
        });

        actions.querySelectorAll('[data-act]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const a = btn.dataset.act;
                if (a === 'up')  moveSlide(i, i - 1);
                if (a === 'down') moveSlide(i, i + 1);
                if (a === 'dup') duplicateSlide(i);
                if (a === 'del') deleteSlide(i);
            });
        });

        // Hook editing
        if (i === state.idx) {
            wrap.querySelectorAll('[contenteditable]').forEach(el => {
                el.addEventListener('input', onEditInput);
                el.addEventListener('blur', commitEdits);
            });
        }

        card.appendChild(gutter);
        card.appendChild(wrap);
        feedCards.appendChild(card);

        // Insert "add row" between cards
        if (i < slides.length - 1) {
            const adder = document.createElement('div');
            adder.className = 'r-add-row';
            adder.innerHTML = `<span class="btn">＋ Add slide</span><span class="line"></span>`;
            adder.addEventListener('click', () => {
                addSlide(i);
                scrollToSlide(i + 1);
            });
            feedCards.appendChild(adder);
        }
    });

    // End marker
    const end = document.createElement('div');
    end.className = 'r-end';
    end.textContent = `End of carousel · ${slides.length} slides`;
    feedCards.appendChild(end);

    requestAnimationFrame(scaleCards);
}

function renderInspector() {
    const s = state.deck.slides[state.idx];
    if (!s) { insp.innerHTML = ''; return; }
    const total = state.deck.slides.length;
    const words = countWords(s);
    const wOk = words <= 12;
    const hookOk = state.deck.slides[0]?.kind === 'hook';
    const ctaOk = state.deck.slides[total - 1]?.kind === 'cta';

    insp.innerHTML = `
        <div class="r-ai" id="ai">
            <div class="row1">
                <span class="ic">✦</span>
                <span class="ttl">Generate with Claude</span>
                <span class="meta">8–10 slides</span>
            </div>
            <textarea id="ai-prompt" placeholder="Brief Claude — topic, audience, key pain point…"></textarea>
            <div class="chips" id="ai-chips">
                ${PRESETS.map(p => `<button class="chip">${escAttr(p)}</button>`).join('')}
            </div>
            <button class="go" id="ai-go"><span class="spinner"></span><span class="label">Generate slides ↵</span></button>
            <div class="err" id="ai-err">Generation failed — try a more specific brief.</div>
        </div>

        <div class="r-insp">
            <div class="r-insp-section">
                <div class="lbl">Typography <span class="v">${FONT_PRESETS.find(p => p.id === state.fontPreset)?.label || 'Geist'}</span></div>
                <div class="r-font-grid" id="font-grid">
                    ${FONT_PRESETS.map(p => `
                        <button class="r-font-card ${state.fontPreset === p.id ? 'on' : ''}" data-preset="${p.id}">
                            <span class="swatch" style="font-family:'${p.swatch.f}',sans-serif; font-weight:${p.swatch.w}; ${p.swatch.italic ? 'font-style:italic;' : ''}">${p.swatch.sample}</span>
                            <span class="info">
                                <span class="lbl-name">${p.label}</span>
                                <span class="lbl-sub">${p.sub}</span>
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="r-insp-section">
                <div class="lbl">Editing · slide <span class="v">${String(state.idx+1).padStart(2,'0')}</span></div>
                <div class="r-kind-grid" id="kind-grid">
                    ${KINDS.map(k => `
                        <button data-kind="${k.id}" class="${s.kind === k.id ? 'on' : ''}">
                            <span class="ic">${k.ic}</span>
                            <span>${k.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="r-insp-section">
                <div class="lbl">Alignment</div>
                <div class="r-seg" id="align-seg">
                    <button data-align="left" class="${s.align !== 'center' ? 'on' : ''}">Left</button>
                    <button data-align="center" class="${s.align === 'center' ? 'on' : ''}">Center</button>
                </div>
            </div>

            <div class="r-insp-section">
                <div class="lbl">Glow</div>
                <div class="r-seg" id="glow-seg">
                    <button data-glow="off" class="${!s.glow ? 'on' : ''}">Off</button>
                    <button data-glow="on" class="${s.glow ? 'on' : ''}">On</button>
                </div>
            </div>

            <div class="r-insp-section">
                <div class="lbl">Brand checks <span class="v ${wOk ? 'ok' : 'warn'}">${words}/12 words</span></div>
                <div class="r-checks">
                    <div class="r-check"><span class="dot"></span>Dark editorial palette<span class="k">#0d1117</span></div>
                    <div class="r-check"><span class="dot"></span>Geist · Geist Mono</div>
                    <div class="r-check"><span class="dot"></span>Indigo accent only<span class="k">#6366f1</span></div>
                    <div class="r-check ${wOk ? '' : 'fail'}"><span class="dot"></span>${wOk ? 'Under 12 words' : 'Over 12 words'}<span class="k">${words}/12</span></div>
                    <div class="r-check ${hookOk ? '' : 'fail'}"><span class="dot"></span>Hook on slide 01</div>
                    <div class="r-check ${ctaOk ? '' : 'fail'}"><span class="dot"></span>CTA on final slide</div>
                </div>
            </div>

            <div class="r-insp-section">
                <div class="lbl">Deck meta</div>
                <div class="r-meta-row">
                    <div class="k">Handle</div>
                    <input id="meta-handle" value="${escAttr(state.deck.handle)}">
                </div>
                <div class="r-meta-row">
                    <div class="k">Brand mark</div>
                    <input id="meta-brand" value="${escAttr(state.deck.brand)}">
                </div>
            </div>
        </div>
    `;

    // Wire AI
    const aiEl = insp.querySelector('#ai');
    const aiTA = insp.querySelector('#ai-prompt');
    const aiGo = insp.querySelector('#ai-go');
    insp.querySelectorAll('#ai-chips .chip').forEach(c => {
        c.addEventListener('click', () => { aiTA.value = c.textContent; aiTA.focus(); });
    });
    aiGo.addEventListener('click', async () => {
        const prompt = aiTA.value.trim();
        if (!prompt) { aiTA.focus(); return; }
        aiEl.classList.remove('err');
        aiEl.classList.add('busy');
        aiGo.disabled = true;
        try {
            const result = await aiGenerateSlides(prompt);
            if (result && Array.isArray(result.slides) && result.slides.length) {
                state.deck = {
                    title: result.title || state.deck.title,
                    handle: state.deck.handle,
                    brand: state.deck.brand,
                    slides: result.slides
                };
                state.idx = 0;
                titleInput.value = state.deck.title;
                renderAll();
                feedCards.parentElement.scrollTo({ top: 0, behavior: 'smooth' });
            } else { throw new Error('Empty result'); }
        } catch (err) {
            console.error(err);
            aiEl.classList.add('err');
        } finally {
            aiEl.classList.remove('busy');
            aiGo.disabled = false;
        }
    });
    aiTA.addEventListener('keydown', e => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) aiGo.click();
    });

    // Wire inspector controls
    insp.querySelectorAll('#kind-grid [data-kind]').forEach(b => {
        b.addEventListener('click', () => setKind(b.dataset.kind));
    });
    insp.querySelectorAll('#font-grid [data-preset]').forEach(b => {
        b.addEventListener('click', () => {
            state.fontPreset = b.dataset.preset;
            applyFontPreset(state.fontPreset);
            renderAll();
        });
    });
    insp.querySelectorAll('#align-seg [data-align]').forEach(b => {
        b.addEventListener('click', () => { s.align = b.dataset.align; renderAll(); });
    });
    insp.querySelectorAll('#glow-seg [data-glow]').forEach(b => {
        b.addEventListener('click', () => { s.glow = b.dataset.glow === 'on'; renderAll(); });
    });
    insp.querySelector('#meta-handle').addEventListener('input', e => {
        state.deck.handle = e.target.value; renderAll();
    });
    insp.querySelector('#meta-brand').addEventListener('input', e => {
        state.deck.brand = e.target.value; renderAll();
    });
}

function renderStatus() {
    const slides = state.deck.slides;
    const totalWords = slides.reduce((sum, s) => sum + countWords(s), 0);
    const over = slides.filter(s => countWords(s) > 12).length;
    statusBar.innerHTML = `
        <span class="item"><span class="k">Slides</span> <span class="v">${slides.length}</span></span>
        <span class="item"><span class="k">Words</span> <span class="v">${totalWords}</span></span>
        <span class="item"><span class="k">Over</span> <span class="v ${over ? 'warn' : 'ok'}">${over}</span></span>
        <span class="spacer"></span>
        <span class="item save">●  saved</span>
    `;
}

// ----- Edits -----
let editTimer = null;
function onEditInput() {
    clearTimeout(editTimer);
    editTimer = setTimeout(() => {
        commitEdits();
        renderStatus();
        // re-render the inspector counts only — avoid full re-render to preserve cursor
        renderInspector();
    }, 350);
}
function commitEdits() {
    const sel = `.r-card.selected .slide-wrap .ig-slide`;
    const node = document.querySelector(sel);
    if (!node) return;
    state.deck.slides[state.idx] = readSlideEdits(node, state.deck.slides[state.idx]);
}

// ----- Slide ops -----
function setKind(kind) {
    const s = state.deck.slides[state.idx];
    s.kind = kind;
    if (kind === 'metric' && !s.metric) s.metric = '10×';
    if (kind === 'code' && !s.code) s.code = 'Role: ...\nTask: ...\nFormat: ...';
    if (kind === 'list' && !Array.isArray(s.list)) s.list = ['Step one','Step two','Step three'];
    if (kind === 'ba' && !s.ba) s.ba = { before: 'Before copy.', after: 'After copy.' };
    if (kind === 'cta' && !s.cta) s.cta = 'Follow';
    renderAll();
}
function duplicateSlide(i) {
    const copy = JSON.parse(JSON.stringify(state.deck.slides[i]));
    state.deck.slides.splice(i + 1, 0, copy);
    state.idx = i + 1;
    renderAll();
    scrollToSlide(state.idx);
}
function deleteSlide(i) {
    if (state.deck.slides.length <= 1) return;
    state.deck.slides.splice(i, 1);
    if (state.idx >= state.deck.slides.length) state.idx = state.deck.slides.length - 1;
    renderAll();
}
function moveSlide(from, to) {
    if (to < 0 || to >= state.deck.slides.length) return;
    const [it] = state.deck.slides.splice(from, 1);
    state.deck.slides.splice(to, 0, it);
    state.idx = to;
    renderAll();
    scrollToSlide(to);
}
function addSlide(afterIndex) {
    state.deck.slides.splice(afterIndex + 1, 0, {
        tag: 'NEW SLIDE',
        kind: 'text',
        headline: 'Add your <em>headline</em> here.',
        sub: 'Click anywhere on the slide to edit it inline.',
        align: 'left'
    });
    state.idx = afterIndex + 1;
    renderAll();
}
function scrollToSlide(i) {
    requestAnimationFrame(() => {
        const card = feedCards.querySelector(`.r-card[data-index="${i}"]`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ----- Title -----
titleInput.addEventListener('input', e => state.deck.title = e.target.value);

// ----- Add slide button (top) -----
$('#add-end').addEventListener('click', () => {
    addSlide(state.deck.slides.length - 1);
    scrollToSlide(state.idx);
});

// ----- Export -----
$('#export').addEventListener('click', async () => {
    commitEdits();
    const toast = document.createElement('div');
    toast.className = 'export-toast';
    toast.innerHTML = `
        <div class="spinner"></div>
        <span class="check">✓</span>
        <div class="txt">Rendering slides…<div class="sub" id="exp-prog">0 / ${state.deck.slides.length}</div></div>
    `;
    document.body.appendChild(toast);
    try {
        await exportSlidesAsPNG(state.deck.slides, state.deck, (done, total) => {
            toast.querySelector('#exp-prog').textContent = `${done} / ${total}`;
        });
        toast.classList.add('done');
        toast.querySelector('.txt').firstChild.textContent = 'Done — ZIP downloaded';
        toast.querySelector('#exp-prog').textContent = `${state.deck.slides.length} slides · 1080×1350`;
        setTimeout(() => toast.remove(), 2500);
    } catch (err) {
        console.error(err);
        toast.querySelector('.txt').firstChild.textContent = 'Export failed';
        setTimeout(() => toast.remove(), 2500);
    }
});

// ----- Utils -----
function escAttr(s) { return String(s||'').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

// ----- Init -----
titleInput.value = state.deck.title;
applyFontPreset(state.fontPreset);
renderAll();
window.addEventListener('load', scaleCards);
setTimeout(scaleCards, 80);
