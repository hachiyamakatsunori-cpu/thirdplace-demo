/* ==========================================================================
   中古車両 詳細ページ: used.html?id=<bike id>
   未確定の項目は「確認中」と表示する（data/bikes.js の null）。
   ========================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, icon, bikeById, bikeName, bikeValue, bikePrice, bikePic, bikeSpecs, BIKE_STATUS, PENDING, SHOP, BIKES } = window.TP;

  const root = $("[data-used]");
  const id = new URLSearchParams(location.search).get("id") || (BIKES[0] && BIKES[0].id);
  const b = id && bikeById[id];
  if (!b) {
    root.innerHTML = '<div class="empty" style="margin-top:24px"><b>車両が見つかりませんでした</b>掲載が終了した可能性があります。' +
      '<div><a class="btn btn--primary" href="index.html#used">USED MOTORCYCLES へ</a></div></div>';
    document.title = "車両が見つかりません｜THIRD PLACE";
    return;
  }

  const pending = b.status === "pending";
  const name = bikeName(b);
  const ask = "contact.html?bike=" + encodeURIComponent(b.id);
  const val = (v) => (v === PENDING ? '<dd class="is-pending">' + PENDING + "</dd>" : "<dd>" + esc(v) + "</dd>");

  const specs = bikeSpecs(b).filter((s) => s[0] !== "PRICE")
    .map((s) => '<div><dt><span class="en">' + s[0] + "</span>" + s[1] + "</dt>" + val(s[2]) + "</div>").join("");

  const info = [
    ["車種", bikeValue(b.name)], ["年式", bikeValue(b.year)], ["型式", bikeValue(b.modelCode)], ["排気量", bikeValue(b.displacement)],
    ["走行距離", bikeValue(b.mileage)], ["車検", bikeValue(b.inspection)], ["販売価格", bikePrice(b)]
  ].map((r) => "<div><dt>" + r[0] + "</dt>" + val(r[1]) + "</div>").join("");

  const pendingText = (what) => '<p class="used-pending">' + what + "は現在確認中です。確定しだい掲載します。</p>";

  root.innerHTML =
    '<nav class="pdp__crumb" aria-label="パンくずリスト"><ol class="breadcrumb"><li><a href="index.html">HOME</a></li>' +
      '<li><a href="index.html#used">USED MOTORCYCLES</a></li><li>' + esc(name) + "</li></ol></nav>" +
    '<div class="used-top">' +
      // 1. メイン写真
      '<figure class="used-main">' + bikePic(b.images[0], "(min-width: 900px) 58vw, 100vw", { eager: true }) + "</figure>" +
      // 2. 車両名・価格・主要スペック
      '<div class="used-info">' +
        '<p class="used-status">' + esc(BIKE_STATUS[b.status] || "") + (pending ? "<span>車両詳細確認中</span>" : "") + "</p>" +
        '<h1 class="used-info__name">' + esc(name) + "</h1>" +
        (pending ? '<p class="used-info__lead">入庫した中古Harley-Davidson。車種・年式・走行距離・販売価格など、詳細は現在確認中です。</p>' : "") +
        '<div class="used-price"><span class="en">PRICE</span><span class="used-price__value' + (bikePrice(b) === PENDING ? " is-pending" : "") + '">' + esc(bikePrice(b)) + "</span></div>" +
        '<dl class="used-specs used-specs--detail">' + specs + "</dl>" +
        '<div class="pdp__actions"><a class="btn btn--primary btn--block" href="' + ask + '">' + icon("chat") + "この車両について問い合わせる</a>" +
          '<a class="btn btn--line btn--block" href="' + SHOP.telHref + '">' + icon("phone") + "電話で問い合わせる " + SHOP.tel + "</a></div>" +
      "</div>" +
    "</div>" +
    // 3. 写真ギャラリー
    '<section class="pdp__section" aria-labelledby="used-gallery"><h2 id="used-gallery">GALLERY <small>写真</small></h2>' +
      '<ul class="used-gallery">' + b.images.map((img, i) =>
        '<li><button type="button" class="used-gallery__btn" data-index="' + i + '" aria-label="写真' + (i + 1) + 'を拡大表示">' + bikePic(img, "(min-width: 900px) 30vw, 33vw") + "</button></li>").join("") + "</ul></section>" +
    // 4〜6
    '<div class="used-sections">' +
      '<section class="pdp__section" aria-labelledby="used-custom"><h2 id="used-custom">CUSTOM / EQUIPMENT <small>カスタム・装備</small></h2>' +
        (b.custom && b.custom.length ? '<ul class="used-list">' + b.custom.map((c) => "<li>" + esc(c) + "</li>").join("") + "</ul>" : pendingText("カスタム内容・装備")) + "</section>" +
      '<section class="pdp__section" aria-labelledby="used-condition"><h2 id="used-condition">CONDITION <small>車両の状態</small></h2>' +
        (b.condition ? '<p class="pdp__desc">' + esc(b.condition) + "</p>" : pendingText("車両の状態")) + "</section>" +
      '<section class="pdp__section" aria-labelledby="used-info"><h2 id="used-info">VEHICLE INFORMATION <small>車両情報</small></h2>' +
        '<dl class="spec">' + info + "</dl>" +
        '<p class="source-note">掲載写真は、ナンバープレートと背景の一部をぼかして加工しています。</p></section>' +
    "</div>" +
    // 7. 問い合わせ
    '<section class="used-cta" aria-labelledby="used-cta-title">' +
      '<p class="eyebrow">CONTACT</p><h2 class="h2" id="used-cta-title">ASK ABOUT<br>THIS BIKE.</h2>' +
      '<p class="used-cta__text">詳細が確定する前でもお問い合わせいただけます。見学のご希望もお気軽にどうぞ。</p>' +
      '<div class="used-cta__buttons"><a class="btn btn--primary" href="' + ask + '">この車両について問い合わせる</a>' +
      '<a class="btn btn--line" href="' + SHOP.telHref + '">' + icon("phone") + "電話で問い合わせる</a></div>" +
      '<p class="used-cta__info">' + SHOP.tel + "（受付は17時まで）／ " + esc(SHOP.holiday.replace(/（.*）/, "")) + "休み</p>" +
    "</section>";

  // スマホ用の固定バー（商品詳細と同じ部品）
  document.body.insertAdjacentHTML("beforeend",
    '<div class="sticky-buy used-sticky" aria-hidden="true"><div class="sticky-buy__price">' + esc(bikePrice(b)) + "<small>" + esc(name) + "</small></div>" +
    '<a class="btn btn--line" href="' + SHOP.telHref + '" tabindex="-1" aria-label="電話で問い合わせる">' + icon("phone") + "電話</a>" +
    '<a class="btn btn--primary" href="' + ask + '" tabindex="-1">問い合わせる</a></div>');
  document.body.classList.add("has-sticky-buy");
  const bar = $(".used-sticky");
  const actions = $(".pdp__actions", root);
  const cta = $(".used-cta", root);
  if ("IntersectionObserver" in window) {
    let actionsVisible = true, ctaVisible = false;
    const update = () => {
      const on = !actionsVisible && !ctaVisible;
      bar.classList.toggle("is-shown", on);
      bar.setAttribute("aria-hidden", String(!on));
      $$("a", bar).forEach((a) => (a.tabIndex = on ? 0 : -1));
    };
    new IntersectionObserver(([en]) => { actionsVisible = en.isIntersecting; update(); }).observe(actions);
    new IntersectionObserver(([en]) => { ctaVisible = en.isIntersecting; update(); }).observe(cta);
  }

  // ギャラリーの拡大表示（DIAMOND HEADS ページと同じ部品）
  const box = $(".dh-lightbox");
  if (box && typeof box.showModal === "function") {
    const cap = $("figcaption", box);
    let img = null, index = 0;
    const show = (i) => {
      if (!img) { img = document.createElement("img"); cap.before(img); }
      index = (i + b.images.length) % b.images.length;
      const p = b.images[index];
      img.src = "assets/used/" + p.name + ".jpg"; img.width = p.w; img.height = p.h; img.alt = p.alt;
      cap.textContent = p.alt + "（" + (index + 1) + " / " + b.images.length + "）";
    };
    root.addEventListener("click", (e) => {
      const btn = e.target.closest(".used-gallery__btn");
      if (!btn) return;
      show(Number(btn.dataset.index)); box.showModal(); document.body.classList.add("is-locked");
    });
    $(".dh-lightbox__close", box).addEventListener("click", () => box.close());
    $(".dh-lightbox__nav--prev", box).addEventListener("click", () => show(index - 1));
    $(".dh-lightbox__nav--next", box).addEventListener("click", () => show(index + 1));
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
    box.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") show(index + 1); if (e.key === "ArrowLeft") show(index - 1); });
    box.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
      const btn = $('.used-gallery__btn[data-index="' + index + '"]', root);
      if (btn) btn.focus();
    });
  }

  document.title = name + (pending ? "（車両詳細確認中）" : "") + "｜USED MOTORCYCLES｜THIRD PLACE";
})();
