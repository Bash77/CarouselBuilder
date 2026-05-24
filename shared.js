/* ============================================
   ContentCore — Shared slide data + render + helpers
   ============================================ */

// ----- Font presets -----
const FONT_PRESETS = [
    { id: 'geist',     label: 'Geist',     sub: 'SF Pro feel · tech-modern',  swatch: { f: 'Geist', w: 800, sample: 'Ag' } },
    { id: 'modern',    label: 'Modern',    sub: 'Montserrat + Inter',         swatch: { f: 'Montserrat', w: 900, sample: 'Ag' } },
    { id: 'dynamic',   label: 'Dynamic',   sub: 'Bebas Neue + Inter',         swatch: { f: 'Bebas Neue', w: 400, sample: 'AG' } },
    { id: 'editorial', label: 'Editorial', sub: 'Playfair Display + Inter',   swatch: { f: 'Playfair Display', w: 800, italic: true, sample: 'Ag' } },
    { id: 'premium',   label: 'Premium',   sub: 'Space Grotesk + Plex Mono',  swatch: { f: 'Space Grotesk', w: 700, sample: 'Ag' } },
];
function applyFontPreset(id) {
    const body = document.body;
    FONT_PRESETS.forEach(p => body.classList.remove('preset-' + p.id));
    if (id && id !== 'geist') body.classList.add('preset-' + id);
}

// ----- Default seed deck -----
const DEFAULT_DECK = {
    title: "4 sentences. 10 carousels. 47 minutes.",
    handle: "@builtwithclaudai",
    brand: "BWC",
    slides: [
        {
            tag: "THE TRANSFORMATION",
            kind: "hook",
            headline: '<em>4 sentences.</em> 10 carousels. 47 minutes.',
            sub: "I rebuilt a SaaS brand's entire content engine from a single landing page.",
            align: "center", glow: true
        },
        {
            tag: "THE PROBLEM",
            kind: "text",
            headline: 'Most SaaS pages say <em>what</em> the product does.',
            sub: "They never explain why anyone should care.",
            align: "center", glow: true
        },
        {
            tag: "STEP 01",
            kind: "text",
            headline: 'Start with <em>pain-point extraction.</em>',
            sub: "Feed the landing page into Claude. Ask: \u201cWhat are the 5 biggest problems this product solves?\u201d",
            align: "left"
        },
        {
            tag: "THE PROMPT",
            kind: "code",
            headline: 'The <em>Claude prompt</em> I used.',
            code: "Role: SaaS content strategist\n\nAnalyze this landing page.\nExtract:\n  \u2192 5 customer pain points\n  \u2192 3 outcomes\n  \u2192 1 hook per pain point\n\nFormat: carousel copy,\n12 words max per slide.",
            align: "left"
        },
        {
            tag: "STEP 02",
            kind: "text",
            headline: '<em>Hook engineering</em> — slide 1 decides everything.',
            sub: "Three seconds. If slide 1 doesn't stop the scroll, slides 2–10 don't exist.",
            align: "left"
        },
        {
            tag: "BEFORE \u2192 AFTER",
            kind: "ba",
            headline: 'Same product. <em>Different framing.</em>',
            ba: {
                before: "\u201cOur AI-powered platform automates document management with enterprise-grade security.\u201d",
                after:  "\u201cStop losing 4 hours/week searching for files your team already uploaded.\u201d"
            },
            align: "left"
        },
        {
            tag: "THE RESULT",
            kind: "metric",
            metric: "10×",
            headline: 'Carousels from <em>4 sentences.</em>',
            sub: "Each one targets a different pain point. Each one scroll-stopping.",
            align: "center", glow: true
        },
        {
            tag: "THE SYSTEM",
            kind: "list",
            headline: 'The process, <em>repeated.</em>',
            list: [
                "Extract pain points with Claude",
                "Write hooks — 12 words max",
                "Design in Canva, dark template",
                "Before / After on every 3rd slide",
                "CTA on the final slide. Always."
            ],
            align: "left"
        },
        {
            tag: "FOLLOW FOR MORE",
            kind: "cta",
            headline: 'I document <em>every build</em> like this.',
            sub: "Save this post. Follow for the next breakdown.",
            cta: "Follow",
            align: "center", glow: true
        }
    ]
};

// ----- Render a single slide into a target element -----
function renderSlide(slide, index, total, opts = {}) {
    const editable = !!opts.editable;
    const ed = (k, placeholder='') => editable ? `contenteditable="true" data-field="${k}" data-placeholder="${placeholder}"` : '';

    const align = slide.align || 'left';
    const bodyAlign = align === 'center' ? 'align-center' : 'align-left';

    let body = '';

    if (slide.kind === 'magazine-cover') {
        const bgText = slide.bgText !== undefined ? slide.bgText : 'PORTFOLIO';
        const metaLeft = slide.metaLeft !== undefined ? slide.metaLeft : 'JUNE 09, 2026';
        const metaRight = slide.metaRight !== undefined ? slide.metaRight : '@BASH77';
        const imgScale = slide.imgScale || 1;
        const imgYOffset = slide.imgYOffset || 0;
        const tag = slide.tag !== undefined ? slide.tag : 'GRAPHIC DESIGN';
        const headline = slide.headline !== undefined ? slide.headline : 'BRAND IDENTITY';
        const sub = slide.sub !== undefined ? slide.sub : 'Description goes here...';

        const tagAlignVal = slide.tagAlign || 'left';
        const tagFlex = tagAlignVal === 'center' ? 'center' : (tagAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const tagSizeVal = slide.tagSize || 24;

        const headlineAlignVal = slide.headlineAlign || 'left';
        const headlineFlex = headlineAlignVal === 'center' ? 'center' : (headlineAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const headlineSizeVal = slide.headlineSize || 56;

        const subAlignVal = slide.subAlign || 'left';
        const subFlex = subAlignVal === 'center' ? 'center' : (subAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const subSizeVal = slide.subSize || 24;

        const bgTextAlignVal = slide.bgTextAlign || 'center';
        const bgTextSizeVal = slide.bgTextSize || 230;

        const metaTextSizeVal = slide.metaTextSize || 20;

        body += `
            <div class="cover-meta-header" style="font-size: ${metaTextSizeVal}px; font-family: ${slide.metaTextFont || 'inherit'}; color: ${slide.metaTextColor || 'inherit'};">
                <span ${ed('metaLeft','')}>${escapeForCE(metaLeft)}</span>
                <span ${ed('metaRight','')}>${escapeForCE(metaRight)}</span>
            </div>
            <div class="cover-bg-text-wrapper">
                <div class="cover-bg-text" ${ed('bgText','')} style="font-size: ${bgTextSizeVal}px; text-align: ${bgTextAlignVal}; transform: translateY(${slide.bgTextYOffset || 0}px); font-family: ${slide.bgTextFont || 'inherit'}; color: ${slide.bgTextColor || 'inherit'};">${escapeForCE(bgText)}</div>
            </div>
            <div class="cover-subject-wrapper">
                ${slide.image ? `<img src="${slide.image}" class="cover-subject" style="transform: scale(${imgScale}) translateY(${imgYOffset}px);" />` : `<div class="img-placeholder img-upload-placeholder-slide"><span style="font-size:40px;">👤</span><span>Upload Subject Image</span></div>`}
            </div>
            <div class="cover-footer">
                <div class="cover-footer-tag" style="align-self: ${tagFlex}; text-align: ${tagAlignVal}; font-size: ${tagSizeVal}px; font-family: ${slide.tagFont || 'inherit'}; color: ${slide.tagColor || 'inherit'};"><span ${ed('tag','')}>${escapeForCE(tag)}</span></div>
                <div class="cover-footer-title" ${ed('headline','')} style="align-self: ${headlineFlex}; text-align: ${headlineAlignVal}; font-size: ${headlineSizeVal}px; font-family: ${slide.headlineFont || 'inherit'}; color: ${slide.headlineColor || 'inherit'};">${headline}</div>
                <div class="cover-footer-desc" ${ed('sub','')} style="align-self: ${subFlex}; text-align: ${subAlignVal}; font-size: ${subSizeVal}px; font-family: ${slide.subFont || 'inherit'}; color: ${slide.subColor || 'inherit'};">${escapeForCE(sub)}</div>
            </div>
        `;
    } 
    else if (slide.kind === 'floating-glass') {
        const imgScale = slide.imgScale || 1;
        const imgYOffset = slide.imgYOffset || 0;
        const badges = Array.isArray(slide.badges) ? slide.badges : ['Photoshop', 'Illustrator', 'CapCut', 'AI Models'];
        const headline = slide.headline !== undefined ? slide.headline : 'Elevate Your Identity';
        const sub = slide.sub !== undefined ? slide.sub : 'With Visual Design & Branding';

        const headlineAlignVal = slide.headlineAlign || 'left';
        const headlineFlex = headlineAlignVal === 'center' ? 'center' : (headlineAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const headlineSizeVal = slide.headlineSize || 56;

        const subAlignVal = slide.subAlign || 'left';
        const subFlex = subAlignVal === 'center' ? 'center' : (subAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const subSizeVal = slide.subSize || 24;

        const badgeSizeVal = slide.badgeSize || 22;
        const badgeFontVal = slide.badgeFont || 'inherit';
        const badgeColorVal = slide.badgeColor || 'inherit';
        const badgeIconColorVal = slide.badgeIconColor || 'var(--indigo)';

        let badgeHTML = '';
        badges.forEach((b, i) => {
            badgeHTML += `
                <div class="glass-card-badge glass-badge-${i}" style="font-size: ${badgeSizeVal}px; font-family: ${badgeFontVal}; color: ${badgeColorVal};">
                    <div class="badge-icon" style="background: ${badgeIconColorVal};">⚡</div>
                    <span ${ed('badge-'+i,'')}>${escapeForCE(b)}</span>
                </div>
            `;
        });

        body += `
            <div class="glass-container">
                ${slide.image ? `<img src="${slide.image}" class="glass-subject" style="transform: scale(${imgScale}) translateY(${imgYOffset}px);" />` : `<div class="img-placeholder img-upload-placeholder-slide"><span style="font-size:40px;">👤</span><span>Upload Subject Image</span></div>`}
                ${badgeHTML}
            </div>
            <div class="cover-footer" style="position: absolute; bottom: 80px; left: 96px; right: 96px; display: flex; flex-direction: column;">
                <div class="cover-footer-title" ${ed('headline','')} style="align-self: ${headlineFlex}; text-align: ${headlineAlignVal}; font-size: ${headlineSizeVal}px; font-family: ${slide.headlineFont || 'inherit'}; color: ${slide.headlineColor || 'inherit'};">${headline}</div>
                <div class="cover-footer-desc" ${ed('sub','')} style="align-self: ${subFlex}; text-align: ${subAlignVal}; font-size: ${subSizeVal}px; font-family: ${slide.subFont || 'inherit'}; color: ${slide.subColor || 'inherit'};">${escapeForCE(sub)}</div>
            </div>
        `;
    }
    else if (slide.kind === 'split-comparison') {
        const tag = slide.tag !== undefined ? slide.tag : 'BEFORE / AFTER';
        const headline = slide.headline !== undefined ? slide.headline : 'Same product. Different framing.';
        const leftLabel = slide.leftLabel !== undefined ? slide.leftLabel : 'Before';
        const rightLabel = slide.rightLabel !== undefined ? slide.rightLabel : 'After';
        const sub = slide.sub !== undefined ? slide.sub : 'Outcomes dictate everything.';

        const tagAlignVal = slide.tagAlign || 'left';
        const tagFlex = tagAlignVal === 'center' ? 'center' : (tagAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const tagSizeVal = slide.tagSize || 24;

        const headlineAlignVal = slide.headlineAlign || 'left';
        const headlineFlex = headlineAlignVal === 'center' ? 'center' : (headlineAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const headlineSizeVal = slide.headlineSize || 72;

        const subAlignVal = slide.subAlign || 'left';
        const subFlex = subAlignVal === 'center' ? 'center' : (subAlignVal === 'right' ? 'flex-end' : 'flex-start');
        const subSizeVal = slide.subSize || 28;

        body += `
            <div class="split-comp-header" style="display: flex; flex-direction: column;">
                <div class="ig-tag" style="align-self: ${tagFlex}; text-align: ${tagAlignVal}; font-size: ${tagSizeVal}px; font-family: ${slide.tagFont || 'inherit'}; color: ${slide.tagColor || 'inherit'};"><span ${ed('tag','')}>${escapeForCE(tag)}</span></div>
                <h1 class="ig-h1" style="font-size: ${headlineSizeVal}px; text-align: ${headlineAlignVal}; align-self: ${headlineFlex}; font-family: ${slide.headlineFont || 'inherit'}; color: ${slide.headlineColor || 'inherit'}; line-height: 1.1; margin-bottom: 0;" ${ed('headline','')}>${headline}</h1>
            </div>
            <div class="split-comp-grid">
                <div class="split-comp-col left-col">
                    <div class="split-comp-img-wrapper">
                        ${slide.leftImage ? `<img src="${slide.leftImage}" class="split-comp-img" />` : `<div class="img-placeholder img-upload-placeholder-slide"><span style="font-size:32px;">🖼️</span><span>Upload Left Image</span></div>`}
                    </div>
                    <div class="split-comp-col-label" ${ed('leftLabel','')}>${escapeForCE(leftLabel)}</div>
                </div>
                <div class="split-comp-col right-col">
                    <div class="split-comp-img-wrapper">
                        ${slide.rightImage ? `<img src="${slide.rightImage}" class="split-comp-img" />` : `<div class="img-placeholder img-upload-placeholder-slide"><span style="font-size:32px;">🖼️</span><span>Upload Right Image</span></div>`}
                    </div>
                    <div class="split-comp-col-label" ${ed('rightLabel','')}>${escapeForCE(rightLabel)}</div>
                </div>
            </div>
            ${slide.sub !== undefined ? `<p class="ig-sub" style="font-size: ${subSizeVal}px; text-align: ${subAlignVal}; align-self: ${subFlex}; font-family: ${slide.subFont || 'inherit'}; color: ${slide.subColor || 'inherit'}; line-height:1.45;" ${ed('sub','')}>${escapeForCE(sub)}</p>` : ''}
        `;
    }
    else {
        // Standard layouts
        if (slide.tag !== undefined) {
            const tagStyle = slide.tagSize ? `style="font-size: ${slide.tagSize}px"` : '';
            body += `<div class="ig-tag" ${tagStyle}><span ${ed('tag','TAG')}>${escapeForCE(slide.tag)}</span></div>`;
        }
        if (slide.kind === 'metric' && slide.metric) {
            body += `<div class="ig-metric" ${ed('metric','000')}>${escapeForCE(slide.metric)}</div>`;
        }
        if (slide.headline !== undefined && slide.kind !== 'subtext') {
            const headStyle = slide.headlineSize ? `style="font-size: ${slide.headlineSize}px"` : '';
            body += `<h1 class="ig-h1" ${headStyle} ${ed('headline','Your headline')}>${slide.headline}</h1>`;
        }
        // divider on simple text slides
        if (slide.kind === 'text' || slide.kind === 'hook' || slide.kind === 'cta' || slide.kind === 'metric' || slide.kind === 'subtext') {
            body += `<div class="ig-divider"></div>`;
        }
        if (slide.sub !== undefined && slide.kind !== 'code') {
            const subStyle = slide.subSize ? `style="font-size: ${slide.subSize}px"` : '';
            body += `<p class="ig-sub" ${subStyle} ${ed('sub','Subtext')}>${escapeForCE(slide.sub)}</p>`;
        }
        if (slide.kind === 'code' && slide.code !== undefined) {
            const codeBlock = `<pre class="ig-code" ${ed('code','// your prompt')}>${escapeForCE(slide.code)}</pre>`;
            const codeText = slide.sub !== undefined ? `<p class="ig-sub" ${slide.subSize ? `style="font-size: ${slide.subSize}px"` : ''} ${ed('sub','Subtext')}>${escapeForCE(slide.sub)}</p>` : '';
            body += slide.codeSwap ? `${codeText}${codeBlock}` : `${codeBlock}${codeText}`;
        }
        if (slide.kind === 'list' && Array.isArray(slide.list)) {
            body += `<ul class="ig-list">`;
            slide.list.forEach((item, i) => {
                body += `<li><span class="num">${String(i+1).padStart(2,'0')}</span><span ${ed('list-'+i,'List item')}>${escapeForCE(item)}</span></li>`;
            });
            body += `</ul>`;
        }
        if (slide.kind === 'ba' && slide.ba) {
            const beforeCard = `
                <div class="ig-ba-card before">
                    <div class="lbl">Before</div>
                    <div class="txt" ${ed('ba-before','Before copy')}>${escapeForCE(slide.ba.before)}</div>
                </div>
            `;
            const afterCard = `
                <div class="ig-ba-card after">
                    <div class="lbl">After</div>
                    <div class="txt" ${ed('ba-after','After copy')}>${escapeForCE(slide.ba.after)}</div>
                </div>
            `;
            body += `<div class="ig-ba">
                ${slide.baSwap ? afterCard + beforeCard : beforeCard + afterCard}
            </div>`;
        }
        if (slide.kind === 'cta' && slide.cta) {
            body += `<a class="ig-cta"><span ${ed('cta','Follow')}>${escapeForCE(slide.cta)}</span><span class="arr">→</span></a>`;
        }
        
        // Custom Text and Image Block rendering
        if (slide.extraText !== undefined) {
            const exStyle = `font-size: ${slide.extraTextSize || 28}px; color: var(--ink-2); margin-top: 20px; font-weight: 500;`;
            body += `<div class="ig-extra-text" style="${exStyle}" ${ed('extraText','Extra text')}>${escapeForCE(slide.extraText)}</div>`;
        }
        if (slide.image) {
            const imgStyle = `width: ${slide.imageWidth || 60}%; align-self: ${slide.imageAlign || 'center'}; border-radius: 8px; margin-top: 24px; max-height: 480px; object-fit: contain; box-shadow: ${slide.imageBorder ? '0 12px 40px rgba(0,0,0,0.45)' : 'none'};`;
            body += `<img src="${slide.image}" style="${imgStyle}" class="ig-image" />`;
        }
    }

    const showSwipe = (index < total - 1);
    const bgClass = slide.kind === 'cta' ? 'bg-deep' : '';
    
    // Toggleable styling settings
    const themeClass = opts.theme ? `theme-${opts.theme}` : '';
    const glowHTML = (slide.glow && !opts.hideGlow) ? `<div class="ig-glow tr"></div><div class="ig-glow bl"></div>` : '';
    const progressBarHTML = opts.hideProgress ? '' : `<div class="ig-progress" style="width:${((index + 1) / total) * 100}%"></div>`;
    const brandHTML = opts.hideLogo ? '<div></div>' : `<div class="ig-brand"><span class="b">&lt;</span> <span ${editable ? 'contenteditable="true" data-field="brand"' : ''}>${escapeForCE(opts.brand || 'BWC')}</span> <span class="b">/&gt;</span></div>`;
    const footerHTML = opts.hideFooter ? '' : `
        <div class="ig-foot">
            <div class="handle">${escapeForCE(opts.handle || '@builtwithclaudai')}</div>
            <div class="swipe">${showSwipe ? 'Swipe <span class="arrow">→</span>' : '· · ·'}</div>
        </div>
    `;

    const isCoverKind = (slide.kind === 'magazine-cover' || slide.kind === 'floating-glass');
    const headHTML = isCoverKind ? '' : `
        <div class="ig-head">
            ${brandHTML}
            <div class="ig-idx"><span class="now">${String(index+1).padStart(2,'0')}</span> <span>/ ${String(total).padStart(2,'0')}</span></div>
        </div>
    `;
    const footHTML = isCoverKind ? '' : footerHTML;

    return `
        <div class="ig-slide ${slide.kind || ''} ${bgClass} ${themeClass} ${editable ? 'editable' : ''}" data-slide-index="${index}">
            ${glowHTML}
            ${progressBarHTML}
            ${headHTML}
            <div class="ig-body ${bodyAlign}">
                ${body}
            </div>
            ${footHTML}
        </div>
    `;
}

function escapeForCE(s) {
    if (s === null || s === undefined) return '';
    return String(s);
}

// ----- Read edited fields back from a rendered slide DOM node -----
function readSlideEdits(slideEl, slide) {
    const out = { ...slide };
    const fields = slideEl.querySelectorAll('[contenteditable][data-field]');
    fields.forEach(el => {
        const f = el.dataset.field;
        const val = f === 'headline' ? el.innerHTML : el.textContent;
        if (f === 'tag') out.tag = val;
        else if (f === 'metric') out.metric = val;
        else if (f === 'headline') out.headline = val;
        else if (f === 'sub') out.sub = val;
        else if (f === 'code') out.code = val;
        else if (f === 'cta') out.cta = val;
        else if (f === 'extraText') out.extraText = val;
        else if (f === 'bgText') out.bgText = val;
        else if (f === 'metaLeft') out.metaLeft = val;
        else if (f === 'metaRight') out.metaRight = val;
        else if (f === 'leftLabel') out.leftLabel = val;
        else if (f === 'rightLabel') out.rightLabel = val;
        else if (f === 'ba-before') out.ba = { ...(out.ba||{}), before: val };
        else if (f === 'ba-after')  out.ba = { ...(out.ba||{}), after: val };
        else if (f.startsWith('badge-')) {
            const i = parseInt(f.slice(6), 10);
            out.badges = (out.badges||[]).slice();
            out.badges[i] = val;
        }
        else if (f.startsWith('list-')) {
            const i = parseInt(f.slice(5), 10);
            out.list = (out.list||[]).slice();
            out.list[i] = val;
        }
    });
    return out;
}

// ----- Word count -----
function countWords(slide) {
    const bag = [];
    if (slide.headline) bag.push(stripHTML(slide.headline));
    if (slide.sub) bag.push(slide.sub);
    if (slide.cta) bag.push(slide.cta);
    if (slide.metric) bag.push(slide.metric);
    const text = bag.join(' ').trim();
    if (!text) return 0;
    return text.split(/\s+/).filter(Boolean).length;
}
function stripHTML(s) {
    const d = document.createElement('div');
    d.innerHTML = s || '';
    return d.textContent || '';
}

// ----- AI generate -----
async function aiGenerateSlides(prompt) {
    if (!window.claude || typeof window.claude.complete !== 'function') {
        console.log("[AI Fallback] window.claude not available, simulating response using brief...");
        
        // Try to read client inputs from page if available
        const co = document.getElementById('c_company')?.value || 'TechViz';
        const pr = document.getElementById('c_product')?.value || 'A no-code metrics dashboard';
        const ic = document.getElementById('c_icp')?.value || 'Shopify store owners';
        const pa = document.getElementById('c_pain')?.value || 'ad spend waste, confusing data, drop in sales';
        const topic = document.getElementById('c_carousel_topic')?.value || prompt || 'Why SaaS content marketing fails';
        
        const painArr = pa.split(',').map(s => s.trim());
        const mainPain = painArr[0] || 'confusing analytics';
        
        return {
            title: topic,
            slides: [
                {
                    tag: "THE HOOK",
                    kind: "hook",
                    headline: `Why most SaaS startups <em>fail</em> at content.`,
                    sub: `Let's break down the exact strategy we used to fix it for ${co}.`,
                    align: "center",
                    glow: true
                },
                {
                    tag: "THE PROBLEM",
                    kind: "text",
                    headline: `Founders explain <em>how</em> the product works.`,
                    sub: `But your target customers (${ic}) only care what changes on Monday morning.`,
                    align: "left",
                    glow: false
                },
                {
                    tag: "THE PAIN",
                    kind: "text",
                    headline: `Struggling with <em>${mainPain}</em> daily?`,
                    sub: `Every day you stay invisible is another lead signing up for your louder competitor.`,
                    align: "left",
                    glow: true
                },
                {
                    tag: "THE PROMPT",
                    kind: "code",
                    headline: `The <em>Claude prompt</em> we run:`,
                    code: `Role: SaaS Content Strategist\n\nProduct: ${pr}\nPain points: ${pa}\nTopic: ${topic}\n\nFormat: 8 slides, 12 words max.`,
                    align: "left"
                },
                {
                    tag: "BEFORE ➔ AFTER",
                    kind: "ba",
                    headline: `Same product. <em>Different framing.</em>`,
                    ba: {
                        before: `"${pr} with enterprise-grade multi-tenant access control."`,
                        after: `"Stop sharing one login with your entire sales team."`
                    },
                    align: "left"
                },
                {
                    tag: "THE RESULT",
                    kind: "metric",
                    metric: "10x",
                    headline: `Increase in organic <em>SaaS pipeline</em>.`,
                    sub: `No designers. No blank screens. Just structured educational assets.`,
                    align: "center",
                    glow: true
                },
                {
                    tag: "THE PROCESS",
                    kind: "list",
                    headline: `How to build the <em>content loop</em>:`,
                    list: [
                        `Extract ICP pain points using AI`,
                        `Write high-converting scroll-stopping hooks`,
                        `Frame features as customer outcomes`,
                        `Verify text checks (under 12 words)`,
                        `Add clear, direct Call-to-Action`
                    ],
                    align: "left"
                },
                {
                    tag: "FOLLOW",
                    kind: "cta",
                    headline: `Get the exact <em>SaaS content playbooks</em>.`,
                    sub: `Save this post. Follow for weekly breakdowns.`,
                    cta: "Follow",
                    align: "center",
                    glow: true
                }
            ]
        };
    }

    const system = `You are a B2B SaaS carousel writer. You write like a creative director, not a chatbot.

Return ONLY valid JSON in this exact shape — no prose, no backticks, no commentary:

{
  "title": "<short title>",
  "slides": [
    { "tag": "HOOK", "kind": "hook",   "headline": "<\\u2264 12 words, wrap key phrase in <em></em>>", "sub": "<short>", "align": "center", "glow": true },
    { "tag": "STEP 01", "kind": "text", "headline": "...", "sub": "...", "align": "left" },
    { "tag": "PROMPT", "kind": "code", "headline": "The <em>prompt</em>:", "code": "Role: ...\\n...", "align": "left" },
    { "tag": "BEFORE \\u2192 AFTER", "kind": "ba", "headline": "Same product. <em>Different framing.</em>", "ba": { "before": "...", "after": "..." }, "align": "left" },
    { "tag": "RESULT", "kind": "metric", "metric": "10\\u00d7", "headline": "...", "sub": "...", "align": "center", "glow": true },
    { "tag": "SYSTEM", "kind": "list", "headline": "...", "list": ["item 1","item 2","item 3","item 4","item 5"], "align": "left" },
    { "tag": "FOLLOW", "kind": "cta", "headline": "...", "sub": "...", "cta": "Follow", "align": "center", "glow": true }
  ]
}

Rules:
- 8–10 slides
- 12 words MAX per headline; wrap the ONE pivotal phrase in <em></em>
- "kind" must be one of: hook, text, code, ba, metric, list, cta
- First slide kind = "hook". Last slide kind = "cta".
- Mix kinds: include at least one of "code" or "ba" or "list" or "metric"
- No emoji. No buzzwords. Direct, confident, dev-aesthetic tone.`;

    const resp = await window.claude.complete({
        messages: [
            { role: 'user', content: system + '\n\n---\n\nUSER BRIEF:\n' + prompt }
        ]
    });
    // tolerate fences
    let txt = String(resp || '').trim();
    txt = txt.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    // find first { ... last }
    const a = txt.indexOf('{');
    const b = txt.lastIndexOf('}');
    if (a >= 0 && b > a) txt = txt.slice(a, b + 1);
    return JSON.parse(txt);
}

// ----- PNG Export (uses html-to-image) -----
async function exportSlidesAsPNG(slides, deckMeta, onProgress) {
    // Build a hidden render container at full 1080×1350
    const stage = document.createElement('div');
    stage.style.cssText = 'position:fixed; left:-99999px; top:0; width:1080px; height:1350px; pointer-events:none;';
    document.body.appendChild(stage);

    const zip = new JSZip();
    for (let i = 0; i < slides.length; i++) {
        onProgress && onProgress(i, slides.length);
        stage.innerHTML = renderSlide(slides[i], i, slides.length, {
            editable: false,
            brand: deckMeta.brand,
            handle: deckMeta.handle,
            theme: deckMeta.theme,
            hideProgress: deckMeta.hideProgress,
            hideGlow: deckMeta.hideGlow,
            hideLogo: deckMeta.hideLogo,
            hideFooter: deckMeta.hideFooter
        });
        const node = stage.querySelector('.ig-slide');
        // Wait a tick for fonts
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const dataUrl = await htmlToImage.toPng(node, {
            width: 1080, height: 1350, pixelRatio: 1, cacheBust: true,
            style: { transform: 'none' }
        });
        const b64 = dataUrl.split(',')[1];
        zip.file(`slide-${String(i+1).padStart(2,'0')}.png`, b64, { base64: true });
    }
    onProgress && onProgress(slides.length, slides.length);
    document.body.removeChild(stage);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carousel-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// ----- Single Slide PNG Export -----
async function exportSingleSlideAsPNG(slide, index, total, deckMeta) {
    const stage = document.createElement('div');
    stage.style.cssText = 'position:fixed; left:-99999px; top:0; width:1080px; height:1350px; pointer-events:none;';
    document.body.appendChild(stage);

    const meta = {
        brand: deckMeta.brand,
        handle: deckMeta.handle,
        theme: deckMeta.theme,
        hideProgress: deckMeta.hideProgress,
        hideGlow: deckMeta.hideGlow,
        hideLogo: deckMeta.hideLogo,
        hideFooter: deckMeta.hideFooter
    };

    stage.innerHTML = renderSlide(slide, index, total, meta);
    const node = stage.querySelector('.ig-slide');
    // Wait a tick for fonts
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    const dataUrl = await htmlToImage.toPng(node, {
        width: 1080, height: 1350, pixelRatio: 1, cacheBust: true,
        style: { transform: 'none' }
    });
    document.body.removeChild(stage);

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `slide-${String(index+1).padStart(2,'0')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}
