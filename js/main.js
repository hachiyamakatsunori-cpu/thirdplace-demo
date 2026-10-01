/* ==========================================================================
   THIRD PLACE — 共通スクリプト
   - ヘッダー / モバイルメニュー / フッターを1か所で生成（全ページ共通）
   - 商品カード・プレースホルダー・適合相談フォームの部品
   - TOPページの商品セクション描画
   依存: data/products.js（window.TP_DATA）
   ========================================================================== */
(function () {
  "use strict";

  const DATA = window.TP_DATA;
  const IMG = DATA.meta.imageBase;

  /* ---------- ショップ情報（Shopifyではテーマ設定に移す想定） ---------- */
  const SHOP = {
    name: "THIRD PLACE",
    company: "株式会社 THIRDPLACE",
    address: "〒818-0054 福岡県筑紫野市杉塚2-14-12",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("福岡県筑紫野市杉塚2-14-12 サードプレイス"),
    tel: "092-287-3753",
    telHref: "tel:0922873753",
    mail: "hdthirdplace@gmail.com",
    hours: "月・木〜土 10:00–19:00 ／ 日・第2土 10:00–17:00",
    holiday: "水曜・第2日曜・祝日（火曜は作業集中日）",
    license: "古物商許可 第921180000230号",
    instagram: "https://www.instagram.com/hdthirdplace/",
    instagramHandle: "@hdthirdplace",
    x: "https://x.com/HDTHIRDPLACE",
    youtube: "https://www.youtube.com/channel/UCnUp7n3i-Hg94X7H3XlhjMg",
    laws: "https://thirdplace.cart.fc2.com/laws"
  };

  /* ---------- アイコン（24px stroke） ---------- */
  const PATHS = {
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 005.9 5.9l1.5-2 4 1.5v3a2 2 0 01-2 2A16.5 16.5 0 014.5 5.5a2 2 0 012-2z"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 7l8 6 8-6"/>',
    chat: '<path d="M4 5.5h16v10H9l-5 4v-14z"/><path d="M8 10.5h8"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/>',
    x: '<path d="M4.5 4.5l15 15M19.5 4.5l-15 15"/>',
    youtube: '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor"/>',
    shield: '<path d="M12 3.5l7 2.5v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V6l7-2.5z"/><path d="M9 12l2 2 4-4"/>',
    wrench: '<path d="M14.5 5.5a4 4 0 00-5 5L4 16v4h4l5.5-5.5a4 4 0 005-5l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z"/>',
    truck: '<path d="M3.5 6.5h10v9h-10zM13.5 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    check: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    diamond: '<path d="M6 4h12l3 5-9 11L3 9l3-5z"/><path d="M3 9h18M9 4l3 16 3-16"/>',
    store: '<path d="M4 9.5V20h16V9.5"/><path d="M3 9.5l2-5h14l2 5"/><path d="M9.5 20v-6h5v6"/>',
    yen: '<path d="M7 4l5 7 5-7M12 11v9M8 13h8M8 16.5h8"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (PATHS[name] || "") + "</svg>";
  }
  // オリジナルのロゴマーク（六角ナット＋3本線 = THIRD）
  const LOGO_MARK =
    '<svg class="logo__mark" viewBox="0 0 40 40" fill="none" stroke="currentColor" aria-hidden="true" focusable="false">' +
    '<path d="M20 2.5l15.2 8.75v17.5L20 37.5 4.8 28.75v-17.5L20 2.5z" stroke-width="2"/>' +
    '<circle cx="20" cy="20" r="9.5" stroke-width="1.4"/>' +
    '<path d="M14.5 16.2h11M15.5 20h9M16.8 23.8h6.4" stroke-width="2" stroke-linecap="square"/></svg>';

  /* ---------- ユーティリティ ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yen = (n) => "¥" + Number(n).toLocaleString("ja-JP");

  const catById = Object.fromEntries(DATA.categories.map((c) => [c.id, c]));
  const modelById = Object.fromEntries(DATA.models.map((m) => [m.id, m]));
  const byHandle = Object.fromEntries(DATA.products.map((p) => [p.handle, p]));

  function priceText(p) {
    if (p.price == null) return null;
    return p.priceMax ? yen(p.price) + "〜" : yen(p.price);
  }
  function productUrl(p) { return "product.html?id=" + encodeURIComponent(p.handle); }
  function fitShort(p) {
    if (!p.fitment) return (catById[p.productType] || {}).en || "";
    const m = (p.fitment.models || []).map((id) => (modelById[id] || {}).en).filter(Boolean);
    const models = m.length > 2 ? m.slice(0, 2).join(" / ") + " ほか" : m.join(" / ");
    const parts = [models, p.fitment.years].filter(Boolean);
    return parts.length ? parts.join(" · ") : (catById[p.productType] || {}).en || "";
  }
  function isRare(p) { return p.tags.includes("RARE"); }

  const TAG_CLASS = { RARE: "tag--rare", "廃盤": "tag--rare tag--jp", "DIAMOND CUT": "tag--diamond", USED: "tag--used", GENUINE: "tag--genuine", DEMO: "tag--demo", "SOLD OUT": "tag--soldout" };
  function tagHTML(t) { return '<span class="tag ' + (TAG_CLASS[t] || "") + '">' + esc(t) + "</span>"; }
  function displayTags(p, max) {
    let tags = p.tags.slice();
    if (p.inventory === 0) tags = ["SOLD OUT"].concat(tags.filter((t) => t !== "NEW"));
    return (max ? tags.slice(0, max) : tags).map(tagHTML).join("");
  }

  function placeholderHTML(p) {
    return '<div class="ph" role="img" aria-label="' + esc(p.title) + '（写真準備中）">' + LOGO_MARK.replace('class="logo__mark"', "") +
      '<span class="ph__label">PHOTO COMING SOON</span><span class="ph__cat">' + esc((catById[p.productType] || {}).label || "") + "</span></div>";
  }
  function imgTag(image, p, opts) {
    const o = opts || {};
    return '<img src="' + IMG + esc(image.src) + '" alt="' + esc(image.alt || p.title) + '"' +
      (o.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async" data-fallback="' + esc(p.handle) + '">';
  }
  function isPlate(image) { return image && image.fit === "contain"; }

  function cardHTML(p, opts) {
    const o = opts || {};
    const img = p.images[0];
    const price = priceText(p);
    return '<article class="card' + (p.inventory === 0 ? " is-soldout" : "") + ' reveal">' +
      '<a class="card__link" href="' + productUrl(p) + '" aria-label="' + esc(p.title) + ' の詳細を見る"></a>' +
      '<div class="card__media' + (isPlate(img) ? " is-plate" : "") + '">' +
        '<div class="card__tags">' + displayTags(p, 2) + "</div>" +
        (img ? imgTag(img, p, o) : placeholderHTML(p)) +
      "</div>" +
      '<div class="card__body">' +
        '<p class="card__vendor">' + esc(p.vendor || (catById[p.productType] || {}).en || "") + "</p>" +
        '<h3 class="card__title">' + esc(p.title) + "</h3>" +
        '<p class="card__fit">' + esc(fitShort(p)) + "</p>" +
        (price ? '<p class="card__price">' + price + "</p>" : '<p class="card__price card__price--ask">価格はお問い合わせ</p>') +
      "</div></article>";
  }

  // 画像が読めなかった場合は壊れた画像を見せずにプレースホルダーへ差し替え
  document.addEventListener("error", function (e) {
    const el = e.target;
    if (!(el instanceof HTMLImageElement) || !el.dataset.fallback) return;
    const p = byHandle[el.dataset.fallback];
    const box = el.parentElement;
    if (box) box.classList.remove("is-plate");
    el.outerHTML = placeholderHTML(p || { title: el.alt, productType: "" });
  }, true);

  /* ---------- 共通UI: ヘッダー / メニュー / フッター ---------- */
  const page = document.body.dataset.page || "";
  const NAV = [
    { href: "products.html", en: "SHOP", jp: "パーツを探す", key: "products" },
    { href: "products.html?type=rare", en: "RARE & VINTAGE", jp: "廃盤・希少パーツ", key: "" },
    { href: "index.html#diamond-cut", en: "DIAMOND CUT", jp: "ダイヤモンドカット加工", key: "" },
    { href: "about.html", en: "ABOUT", jp: "ショップについて", key: "about" },
    { href: "contact.html", en: "CONTACT", jp: "適合相談・お問い合わせ", key: "contact" }
  ];

  function headerHTML() {
    const cur = (n) => (n.key && n.key === page ? ' aria-current="page"' : "");
    return '<div class="demo-bar" role="note"><strong>DEMO SITE</strong>提案用デモ｜商品情報は' + esc(DATA.meta.fetchedAt.replace(/-/g, "/")) + '時点</div>' +
      '<header class="site-header' + (page === "home" ? " site-header--overlay" : "") + '" id="top">' +
        '<div class="container site-header__inner">' +
          '<a class="logo" href="index.html" aria-label="THIRD PLACE トップページ">' + LOGO_MARK +
            '<span class="logo__text"><span class="logo__name">THIRD PLACE</span><span class="logo__sub">HARLEY PARTS &amp; CUSTOM</span></span></a>' +
          '<nav class="gnav" aria-label="メインメニュー">' + NAV.map((n) => '<a href="' + n.href + '"' + cur(n) + ">" + n.en + "</a>").join("") + "</nav>" +
          '<div class="header-actions">' +
            '<a class="icon-btn" href="products.html?focus=search" aria-label="パーツを検索">' + icon("search") + "</a>" +
            '<button class="icon-btn" type="button" data-demo-cart aria-label="カート（デモ）">' + icon("bag") + '<span class="icon-btn__badge">0</span></button>' +
            '<a class="btn btn--primary header-cta" href="contact.html">適合を相談する</a>' +
            '<button class="icon-btn menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="mobile-menu">' + icon("menu") + "</button>" +
          "</div>" +
        "</div>" +
      "</header>" +
      '<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="メニュー">' +
        '<div class="mobile-menu__head"><a class="logo" href="index.html">' + LOGO_MARK + '<span class="logo__text"><span class="logo__name">THIRD PLACE</span></span></a>' +
          '<button class="icon-btn" type="button" data-menu-close aria-label="メニューを閉じる">' + icon("close") + "</button></div>" +
        '<div class="mobile-menu__body">' +
          '<nav class="mobile-menu__nav" aria-label="モバイルメニュー">' + NAV.map((n) => '<a href="' + n.href + '"' + cur(n) + '><span class="en">' + n.en + '</span><span class="jp">' + n.jp + "</span></a>").join("") + "</nav>" +
          '<div class="mobile-menu__cta">' +
            '<a class="btn btn--primary btn--block" href="contact.html">' + icon("wrench") + "適合を相談する</a>" +
            '<a class="btn btn--line btn--block" href="' + SHOP.telHref + '">' + icon("phone") + "電話する " + SHOP.tel + "</a>" +
          "</div>" +
          '<div class="mobile-menu__info"><p>' + esc(SHOP.address) + "</p><p>" + esc(SHOP.hours) + "</p><p>定休日：" + esc(SHOP.holiday) + "</p></div>" +
        "</div>" +
      "</div>";
  }

  function footerHTML() {
    return '<footer class="site-footer"><div class="container">' +
      '<div class="footer__grid">' +
        '<div class="footer__brand"><a class="logo" href="index.html">' + LOGO_MARK + '<span class="logo__text"><span class="logo__name">THIRD PLACE</span><span class="logo__sub">FUKUOKA JAPAN</span></span></a>' +
          "<p>福岡・筑紫野のハーレーダビッドソン専門ショップ。新品・廃盤・純正パーツの販売、チューニング、ダイヤモンドカット加工まで。</p>" +
          '<div class="footer__sns">' +
            '<a href="' + SHOP.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + icon("instagram") + "</a>" +
            '<a href="' + SHOP.x + '" target="_blank" rel="noopener" aria-label="X（旧Twitter）">' + icon("x") + "</a>" +
            '<a href="' + SHOP.youtube + '" target="_blank" rel="noopener" aria-label="YouTube">' + icon("youtube") + "</a>" +
          "</div></div>" +
        '<div><h2 class="footer__title">SHOP INFO</h2><dl class="footer__info">' +
          '<div><dt>所在地</dt><dd><a href="' + SHOP.mapUrl + '" target="_blank" rel="noopener">' + esc(SHOP.address) + "</a></dd></div>" +
          '<div><dt>電話</dt><dd><a href="' + SHOP.telHref + '">' + SHOP.tel + "</a></dd></div>" +
          "<div><dt>営業時間</dt><dd>" + esc(SHOP.hours) + "</dd></div>" +
          "<div><dt>定休日</dt><dd>" + esc(SHOP.holiday) + "</dd></div>" +
        "</dl></div>" +
        '<div><h2 class="footer__title">MENU</h2><nav class="footer__links" aria-label="フッターメニュー">' +
          '<a href="products.html">ONLINE STORE</a><a href="products.html?type=rare">RARE &amp; VINTAGE</a>' +
          '<a href="index.html#diamond-cut">DIAMOND CUT</a><a href="about.html">ABOUT</a>' +
          '<a href="contact.html">CONTACT</a><a href="' + SHOP.instagram + '" target="_blank" rel="noopener">INSTAGRAM</a>' +
          '<a class="jp" href="' + SHOP.laws + '" target="_blank" rel="noopener">特定商取引法に基づく表記</a>' +
        "</nav></div>" +
      "</div>" +
      '<div class="footer__bottom">' +
        "<p>" + esc(SHOP.company) + "　" + esc(SHOP.license) + "</p>" +
        "<p>Harley-Davidson は H-D U.S.A., LLC の商標です。当店は Harley-Davidson 社とは関係のない独立した専門ショップです。</p>" +
        "<p>このサイトは提案用のデモです。購入・送信機能は動作しません。</p>" +
        "<p>© " + new Date().getFullYear() + " THIRD PLACE</p>" +
      "</div>" +
    "</div></footer>";
  }

  function mountChrome() {
    const h = $('[data-chrome="header"]');
    if (h) h.outerHTML = headerHTML();
    const f = $('[data-chrome="footer"]');
    if (f) f.outerHTML = footerHTML();
    if (!$(".toast")) document.body.insertAdjacentHTML("beforeend", '<div class="toast" role="status" aria-live="polite"></div>');
  }

  function initHeader() {
    const header = $(".site-header");
    if (!header) return;
    if (header.classList.contains("site-header--overlay")) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    const menu = $("#mobile-menu");
    const toggle = $(".menu-toggle");
    const open = (state) => {
      menu.classList.toggle("is-open", state);
      toggle.setAttribute("aria-expanded", String(state));
      document.body.classList.toggle("is-locked", state);
      if (state) $(".mobile-menu__nav a", menu).focus(); else toggle.focus();
    };
    toggle.addEventListener("click", () => open(true));
    $("[data-menu-close]", menu).addEventListener("click", () => open(false));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) open(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) open(false); });
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => { if (e.matches && menu.classList.contains("is-open")) open(false); });

    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-demo-cart]")) toast("デモサイトのため、カート・決済機能は動作しません。本番ではここから購入できます。");
      const demoLink = e.target.closest("[data-demo-msg]");
      if (demoLink) { e.preventDefault(); toast(demoLink.dataset.demoMsg); }
    });
  }

  let toastTimer;
  function toast(msg) {
    const t = $(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-shown"), 3600);
  }

  /* ---------- スクロール時のフェードアップ（軽量） ---------- */
  let io;
  function observeReveal(root) {
    const els = $$(".reveal:not(.is-visible)", root);
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-visible")); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 適合相談フォーム（UIのみ・送信しない） ---------- */
  function yearOptions() {
    let html = '<option value="">選択してください</option>';
    for (let y = new Date().getFullYear() + 1; y >= 1984; y--) html += "<option>" + y + "</option>";
    return html + '<option value="1983以前">1983年以前</option><option value="不明">わからない</option>';
  }
  function fitmentFormHTML(id) {
    const f = (name) => id + "-" + name;
    return '<form class="form" novalidate data-fitment-form>' +
      '<div class="form__row form__row--2">' +
        '<div class="field"><label class="field__label" for="' + f("model") + '">車種 <span class="field__req">必須</span></label>' +
          '<select class="select" id="' + f("model") + '" name="model" required><option value="">選択してください</option>' +
          DATA.models.map((m) => '<option value="' + m.id + '">' + m.label + "（" + m.en + "）</option>").join("") +
          '<option value="other">その他・わからない</option></select><span class="field__error">車種を選んでください</span></div>' +
        '<div class="field"><label class="field__label" for="' + f("year") + '">年式 <span class="field__req">必須</span></label>' +
          '<select class="select" id="' + f("year") + '" name="year" required>' + yearOptions() + '</select><span class="field__error">年式を選んでください</span></div>' +
      "</div>" +
      '<div class="form__row form__row--2">' +
        '<div class="field"><label class="field__label" for="' + f("type") + '">型式 <span class="field__opt">任意</span></label>' +
          '<input class="input" id="' + f("type") + '" name="type" autocomplete="off" placeholder="例：FLHXS / FXBB"></div>' +
        '<div class="field"><label class="field__label" for="' + f("vin") + '">VIN（車台番号）下6桁 <span class="field__opt">任意</span></label>' +
          '<input class="input" id="' + f("vin") + '" name="vin" autocomplete="off" maxlength="6" placeholder="例：123456" inputmode="text">' +
          '<span class="field__error">英数字6桁で入力してください</span></div>' +
      "</div>" +
      '<div class="field"><label class="field__label" for="' + f("item") + '">気になる商品 <span class="field__opt">任意</span></label>' +
        '<input class="input" id="' + f("item") + '" name="item" autocomplete="off" placeholder="商品名や品番"></div>' +
      '<div class="field"><label class="field__label" for="' + f("message") + '">相談内容 <span class="field__req">必須</span></label>' +
        '<textarea class="textarea" id="' + f("message") + '" name="message" required placeholder="例：2019年式のストリートグライドに付きますか？ 社外ライザーに交換済みです。"></textarea>' +
        '<span class="field__error">相談内容を入力してください</span></div>' +
      '<div class="form__row form__row--2">' +
        '<div class="field"><label class="field__label" for="' + f("name") + '">お名前 <span class="field__req">必須</span></label>' +
          '<input class="input" id="' + f("name") + '" name="name" autocomplete="name" required><span class="field__error">お名前を入力してください</span></div>' +
        '<div class="field"><label class="field__label" for="' + f("contact") + '">メールまたは電話番号 <span class="field__req">必須</span></label>' +
          '<input class="input" id="' + f("contact") + '" name="contact" autocomplete="email" required><span class="field__error">連絡先を入力してください</span></div>' +
      "</div>" +
      '<button class="btn btn--primary btn--block" type="submit">' + icon("wrench") + "適合を相談する</button>" +
      '<p class="form__note">デモのため、入力内容は送信・保存されません。本番では店舗に届き、メールまたはお電話でお返事します。</p>' +
    "</form>" +
    '<div class="form-done" role="status" aria-live="polite" tabindex="-1">' +
      "<h3>" + icon("check") + "相談内容を受け付けました（デモ）</h3>" +
      '<p data-done-summary></p><p style="margin-top:8px">※ デモのため、実際には送信されていません。</p>' +
      '<button class="btn btn--line" type="button" data-form-reset style="margin-top:16px">もう一度入力する</button>' +
    "</div>";
  }
  function mountFitmentForms() {
    $$("[data-render='fitment-form']").forEach((box, i) => {
      box.innerHTML = fitmentFormHTML("fit" + i);
      const form = $("form", box);
      const done = $(".form-done", box);
      const params = new URLSearchParams(location.search);
      const item = params.get("item") && byHandle[params.get("item")];
      if (item) {
        form.item.value = item.title + (item.specs && item.specs.partNumber ? "（" + item.specs.partNumber + "）" : "");
        if (item.fitment && item.fitment.models.length === 1) form.model.value = item.fitment.models[0];
      }
      if (params.get("topic") === "diamond") form.message.value = "ダイヤモンドカット加工について相談したいです。\n加工したいパーツ：";

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let firstBad = null;
        const check = (el, ok) => {
          el.closest(".field").classList.toggle("is-invalid", !ok);
          if (!ok && !firstBad) firstBad = el;
        };
        ["model", "year", "message", "name", "contact"].forEach((n) => check(form[n], form[n].value.trim() !== ""));
        check(form.vin, form.vin.value.trim() === "" || /^[A-Za-z0-9]{6}$/.test(form.vin.value.trim()));
        if (firstBad) { firstBad.focus(); return; }
        const model = form.model.selectedOptions[0].textContent;
        $("[data-done-summary]", done).textContent = model + "・" + form.year.value + "年式" + (form.item.value ? "／" + form.item.value : "") + " についてのご相談を受け付けました。";
        form.hidden = true;
        done.classList.add("is-shown");
        done.focus();
      });
      form.addEventListener("input", (e) => { const fld = e.target.closest(".field"); if (fld) fld.classList.remove("is-invalid"); });
      $("[data-form-reset]", done).addEventListener("click", () => { form.reset(); form.hidden = false; done.classList.remove("is-shown"); form.model.focus(); });
    });
  }

  /* ---------- TOPページ ---------- */
  function renderHome() {
    const pick = (handles) => handles.map((h) => byHandle[h]).filter(Boolean);

    const featured = $("[data-render='featured']");
    if (featured) {
      featured.innerHTML = pick([
        "king-tour-pak-cvo-color", "bassani-roadrage-2in1-black", "thrashin-front-master-cover-diamond-cut", "kst-patriot-bagger-12in-black",
        "joker-machine-derby-cover-fin", "ohlins-rear-shock-buell-xb", "covingtons-rear-master-cover-diamond-cut", "quick-release-super-sport-windshield"
      ]).map((p, i) => cardHTML(p, { eager: i < 2 })).join("");
    }

    const rare = $("[data-render='rare']");
    if (rare) {
      rare.innerHTML = DATA.products.filter(isRare).map((p) =>
        '<a class="rare-card reveal" href="' + productUrl(p) + '">' +
          '<div class="rare-card__media"><span class="rare-card__stamp">DISCONTINUED</span>' + imgTag(p.images[0], p) + "</div>" +
          '<div class="rare-card__body"><p class="card__vendor">' + esc(p.vendor) + '</p><h3 class="rare-card__title">' + esc(p.title) + "</h3>" +
            '<p class="rare-card__text">' + esc(p.summary) + "</p>" +
            '<div class="rare-card__foot"><span class="rare-card__fit">' + esc(fitShort(p)) + '</span><span class="rare-card__price">' + priceText(p) + "</span></div></div></a>"
      ).join("");
    }
    const oem = $("[data-render='oem']");
    if (oem) {
      oem.innerHTML = DATA.products.filter((p) => p.source === "oem" && p.specs.oemNumber && p.productType === "engine").map((p) =>
        '<a class="oem-row" href="' + productUrl(p) + '"><span class="oem-row__pn">' + esc(p.specs.oemNumber) + '</span><span class="oem-row__name">' + esc(p.title.replace(p.specs.oemNumber, "").replace("純正品", "").trim()) + " — 純正品</span>" +
        '<span class="oem-row__price">' + priceText(p) + icon("arrow") + "</span></a>"
      ).join("");
    }

    const dc = $("[data-render='dc-products']");
    if (dc) {
      dc.innerHTML = pick(["thrashin-front-master-cover-diamond-cut", "covingtons-rear-master-cover-diamond-cut", "diamond-cut-initial-keyholder-small", "magic-series-full-set"])
        .map((p) => cardHTML(p)).join("");
    }

    const na = $("[data-render='new-arrivals']");
    if (na) {
      na.innerHTML = DATA.products.filter((p) => !p.demo && p.images.length).sort((a, b) => b.sortId - a.sortId).slice(0, 6).map((p) => {
        const img = p.images[0];
        return '<a class="tile reveal' + (isPlate(img) ? " is-plate" : "") + '" href="' + productUrl(p) + '">' +
          '<span class="tile__new">' + (p.inventory === 0 ? tagHTML("SOLD OUT") : tagHTML("NEW IN")) + "</span>" + imgTag(img, p) +
          '<span class="tile__info"><span class="tile__title">' + esc(p.title) + '</span><span class="tile__price">' + priceText(p) + "</span></span></a>";
      }).join("");
    }

    const gal = $("[data-render='gallery']");
    if (gal) {
      const shots = [
        ["ca44_209_1.jpg", "#DIAMONDCUT", "ダイヤモンドカットしたマスターシリンダーカバー"],
        ["ca42_208_5.jpg", "#カスタム塗装", "CVOカラーに塗装したツアーパック"],
        ["ca44_207_1.jpg", "#入荷", "入荷したアクスルナット"],
        ["ca15_215_1.jpg", "#オリジナル", "ダイヤモンドカットのキーホルダー"],
        ["ca0_224_2.jpg", "#加工品", "ダイヤモンドカット加工したリアマスターカバー"],
        ["ca13_176_1.jpg", "#ショップT", "サードプレイスのオリジナルTシャツ"]
      ];
      gal.innerHTML = shots.map((s) =>
        '<a href="' + SHOP.instagram + '" target="_blank" rel="noopener" class="reveal"><img src="' + IMG + s[0] + '" alt="' + esc(s[2]) + '" loading="lazy" decoding="async"><span class="gallery__tag">' + esc(s[1]) + "</span></a>"
      ).join("");
    }
  }

  /* ---------- 起動 ---------- */
  mountChrome();
  initHeader();
  if (page === "home") renderHome();
  mountFitmentForms();
  $$("[data-shop]").forEach((el) => { const v = SHOP[el.dataset.shop]; if (v) el.textContent = v; });
  observeReveal();

  window.TP = { DATA, SHOP, $, $$, esc, yen, icon, priceText, productUrl, fitShort, cardHTML, imgTag, isPlate, placeholderHTML, displayTags, tagHTML, catById, modelById, byHandle, observeReveal, toast };
})();
