/* ==========================================================================
   商品詳細ページ: product.html?id=<handle>
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, SHOP, $, $$, esc, yen, icon, priceText, productUrl, cardHTML, imgTag, pictureHTML, isPlate, placeholderHTML, displayTags, tagHTML, catById, modelById, byHandle, observeReveal, toast } = window.TP;

  const root = $("[data-pdp]");
  const id = new URLSearchParams(location.search).get("id");
  const p = id && byHandle[id];

  if (!p) {
    root.innerHTML = '<div class="empty" style="margin-top:24px"><b>商品が見つかりませんでした</b>URLが変わったか、販売が終了した可能性があります。' +
      '<div><a class="btn btn--primary" href="products.html">パーツ一覧へ</a></div></div>';
    document.title = "商品が見つかりません｜THIRD PLACE";
    return;
  }

  const cat = catById[p.productType] || {};
  const fit = p.fitment;
  const price = priceText(p);
  const modelLabels = fit ? fit.models.map((m) => (modelById[m] || {}).label).filter(Boolean) : [];

  function stockHTML() {
    if (p.demo) return '<p class="stock stock--unknown">サンプル表示</p>';
    if (p.inventory === 0) return '<p class="stock stock--out">SOLD OUT（再入荷はお問い合わせください）</p>';
    if (p.inventory == null) return '<p class="stock stock--unknown">在庫はお問い合わせください</p>';
    if (p.inventory === 1) return '<p class="stock stock--low">在庫あり・残り1点</p>';
    if (p.inventory <= 3) return '<p class="stock stock--low">在庫あり・残りわずか</p>';
    return '<p class="stock">在庫あり</p>';
  }

  /* ---------- ギャラリー ---------- */
  const images = p.images;
  const slides = images.length
    ? images.map((img, i) => '<div class="g-slide' + (isPlate(img) ? " is-plate" : "") + '">' + imgTag(img, p, { eager: i === 0 }) + "</div>").join("")
    : '<div class="g-slide">' + placeholderHTML(p) + "</div>";
  const thumbs = images.length > 1
    ? '<div class="g-thumbs" role="tablist" aria-label="商品画像">' + images.map((img, i) =>
        '<button type="button" class="g-thumb' + (isPlate(img) ? " is-plate" : "") + '" data-go="' + i + '" aria-label="画像' + (i + 1) + 'を表示"' + (i === 0 ? ' aria-current="true"' : "") + '>' + pictureHTML(DATA.meta.imageBase + img.src, "", { w: img.w, h: img.h }) + "</button>").join("") + "</div>"
    : "";

  /* ---------- スペック ---------- */
  const specRows = [
    ["メーカー", p.vendor],
    ["品番", p.specs.partNumber],
    ["OEM番号", p.specs.oemNumber],
    ["適合モデル", modelLabels.join("、") || (fit ? null : "—（車両用パーツではありません）")],
    ["適合年式", fit && fit.years],
    ["適合の補足", fit && fit.note],
    ["カラー", p.specs.color],
    ["状態・傷", p.specs.conditionNote],
    ["付属品", p.specs.accessories],
    ["サイズ", p.specs.size],
    ["素材", p.specs.material],
    ["カテゴリー", cat.label]
  ].filter((r, i) => r[1] || i < 8);
  const specHTML = '<dl class="spec">' + specRows.map((r) =>
    "<div><dt>" + r[0] + "</dt>" + (r[1] ? "<dd>" + esc(r[1]) + "</dd>" : '<dd class="is-empty">—</dd>') + "</div>").join("") + "</dl>";

  const fitBox = fit
    ? '<div class="fit-box">' +
        '<div class="fit-box__head"><span class="fit-box__title">FITMENT</span>' + (fit.years ? '<span class="fit-box__years">' + esc(fit.years) + "</span>" : "") + "</div>" +
        (modelLabels.length ? '<div class="fit-box__models">' + fit.models.map((m) => tagHTML((modelById[m] || {}).en || m)).join("") + "</div>" : "") +
        (fit.note ? '<p class="fit-box__note">' + esc(fit.note) + "</p>" : "") +
        '<a class="fit-box__ask" href="contact.html?item=' + encodeURIComponent(p.handle) + '">この商品は自分の車両に装着できますか？' + icon("arrow") + "</a>" +
      "</div>"
    : "";

  const variantHTML = p.variants
    ? '<div class="variant-field field"><label class="field__label" for="variant">' + (p.productType === "tuning" ? "車種" : "種類") + '</label><select class="select" id="variant">' +
      p.variants.map((v) => "<option>" + esc(v) + "</option>").join("") + "</select></div>"
    : "";

  const soldOut = p.inventory === 0;
  const cartBtn = p.demo
    ? ""
    : soldOut
      ? '<a class="btn btn--line btn--block" href="contact.html?item=' + encodeURIComponent(p.handle) + '">再入荷・取り寄せを相談する</a>'
      : '<button class="btn btn--primary btn--block" type="button" data-add-cart>' + icon("bag") + "カートに入れる</button>";
  const askBtn = '<a class="btn ' + (soldOut || p.demo ? "btn--primary" : "btn--line") + ' btn--block" href="contact.html?item=' + encodeURIComponent(p.handle) + '">' + icon("wrench") + "この商品の適合を相談する</a>";

  const sourceNote = p.demo
    ? '<p class="source-note source-note--demo"><b>DEMO サンプル：</b>中古パーツの掲載イメージを確認するための架空の商品です。実在する商品ではなく、価格・適合情報も設定していません。</p>'
    : '<p class="source-note">掲載情報は ' + esc(DATA.meta.fetchedAt.replace(/-/g, "/")) + ' 時点の現行オンラインショップの内容をもとにしたデモ表示です。価格・在庫は変動します。' +
      (p.sourceUrl ? '<br><a href="' + esc(p.sourceUrl) + '" target="_blank" rel="noopener">現行ショップの商品ページを見る</a>' : "") + "</p>";

  /* ---------- 関連商品 ---------- */
  const related = DATA.products
    .filter((x) => x.handle !== p.handle && !x.demo)
    .map((x) => ({ x, score: (x.productType === p.productType ? 2 : 0) + (fit && x.fitment && x.fitment.models.some((m) => fit.models.includes(m)) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.x.sortId - a.x.sortId)
    .slice(0, 4).map((r) => r.x);

  /* ---------- 描画 ---------- */
  root.innerHTML =
    '<nav class="pdp__crumb" aria-label="パンくずリスト"><ol class="breadcrumb"><li><a href="index.html">HOME</a></li><li><a href="products.html">パーツを探す</a></li>' +
      '<li><a href="products.html?cat=' + esc(p.productType) + '">' + esc(cat.label || "") + "</a></li><li>" + esc(p.title) + "</li></ol></nav>" +
    '<div class="pdp__layout">' +
      '<div class="pdp__gallery"><div class="g-main"><div class="g-track" tabindex="0" aria-label="商品画像（横にスワイプ）">' + slides + "</div>" +
        (images.length > 1 ? '<span class="g-count" aria-hidden="true"><span data-g-index>1</span> / ' + images.length + "</span>" : "") + "</div>" + thumbs + "</div>" +
      '<div class="pdp__info">' +
        '<div class="pdp__tags">' + displayTags(p) + "</div>" +
        (p.vendor ? '<p class="pdp__vendor">' + esc(p.vendor) + "</p>" : "") +
        '<h1 class="pdp__title">' + esc(p.title) + "</h1>" +
        '<div class="pdp__price">' + (price ? '<span class="now">' + price + "</span>" : '<span class="now" style="font-family:var(--font-jp);font-size:1.25rem">価格はお問い合わせください</span>') +
          (p.compareAtPrice ? '<span class="was">' + yen(p.compareAtPrice) + "</span>" : "") + "</div>" +
        stockHTML() +
        (p.summary ? '<p class="pdp__summary">' + esc(p.summary) + "</p>" : "") +
        variantHTML +
        '<div class="pdp__actions">' + cartBtn + askBtn + "</div>" +
        fitBox +
        '<ul class="pdp__ship">' +
          "<li>" + icon("truck") + "<span>送料 全国一律1,000円（宅配便）／ご注文確認後2日以内に発送</span></li>" +
          "<li>" + icon("yen") + "<span>お支払い：銀行振込・代金引換</span></li>" +
          "<li>" + icon("shield") + "<span>納品日より3日以内は返品のご相談が可能です（不良・品違いは当店負担）</span></li>" +
        "</ul>" +
      "</div>" +
    "</div>" +
    '<div class="pdp__body">' +
      '<section class="pdp__section"><h2>DETAILS <small>商品説明</small></h2><div class="pdp__desc">' + p.description.map((d) => "<p>" + esc(d) + "</p>").join("") + "</div>" + sourceNote + "</section>" +
      '<section class="pdp__section"><h2>SPEC <small>仕様・適合</small></h2>' + specHTML + "</section>" +
    "</div>" +
    '<section class="pdp__section" aria-labelledby="related-title"><h2 id="related-title">RELATED <small>関連パーツ</small></h2><div class="product-grid product-grid--4">' + related.map((x) => cardHTML(x)).join("") + "</div></section>";

  // スマホ用の固定購入バー
  document.body.insertAdjacentHTML("beforeend",
    '<div class="sticky-buy" aria-hidden="true"><div class="sticky-buy__price">' + (price || "ASK") + "<small>" + esc(p.title) + "</small></div>" +
    '<a class="btn btn--line" href="contact.html?item=' + encodeURIComponent(p.handle) + '" tabindex="-1">適合相談</a>' +
    (soldOut || p.demo ? "" : '<button class="btn btn--primary" type="button" data-add-cart tabindex="-1">カートへ</button>') + "</div>");
  document.body.classList.add("has-sticky-buy");
  const bar = $(".sticky-buy");
  if (soldOut || p.demo) bar.style.gridTemplateColumns = "1fr auto";
  const actions = $(".pdp__actions");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => {
      const show = !en.isIntersecting;
      bar.classList.toggle("is-shown", show);
      bar.setAttribute("aria-hidden", String(!show));
      $$("a, button", bar).forEach((el) => (el.tabIndex = show ? 0 : -1));
    }).observe(actions);
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-add-cart]")) toast("デモのため購入はできません。本番ではこのままカート・決済へ進めます。");
  });

  /* ---------- ギャラリー操作（CSSスクロールスナップ＋サムネイル） ---------- */
  const track = $(".g-track");
  const idx = $("[data-g-index]");
  const thumbBtns = $$(".g-thumb");
  let ticking = false;
  track.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (idx) idx.textContent = i + 1;
      thumbBtns.forEach((b, j) => b.setAttribute("aria-current", String(i === j)));
      ticking = false;
    });
  }, { passive: true });
  thumbBtns.forEach((b) => b.addEventListener("click", () => track.scrollTo({ left: Number(b.dataset.go) * track.clientWidth, behavior: "smooth" })));
  track.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    track.scrollBy({ left: (e.key === "ArrowRight" ? 1 : -1) * track.clientWidth, behavior: "smooth" });
  });

  /* ---------- SEO: タイトル・説明・構造化データ ---------- */
  const fitText = [modelLabels.join("・"), fit && fit.years].filter(Boolean).join(" ");
  document.title = p.title + (fitText ? "（" + fitText + "）" : "") + "｜THIRD PLACE";
  const desc = [p.vendor, p.title, p.specs.partNumber && "品番 " + p.specs.partNumber, fitText && "適合 " + fitText, p.summary].filter(Boolean).join("／");
  $('meta[name="description"]').setAttribute("content", desc);
  if (!p.demo) {
    const ld = {
      "@context": "https://schema.org", "@type": "Product", name: p.title, description: p.summary,
      image: images.map((i) => new URL(DATA.meta.imageBase + i.src, location.href).href),
      sku: p.specs.partNumber || p.handle, mpn: p.specs.oemNumber || undefined,
      brand: p.vendor ? { "@type": "Brand", name: p.vendor } : undefined,
      offers: p.price != null ? {
        "@type": "Offer", priceCurrency: "JPY", price: p.price,
        availability: "https://schema.org/" + (p.inventory === 0 ? "OutOfStock" : "InStock"),
        itemCondition: "https://schema.org/" + (p.condition === "used" ? "UsedCondition" : "NewCondition"),
        seller: { "@type": "Organization", name: SHOP.name }
      } : undefined
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  observeReveal(root);
})();
