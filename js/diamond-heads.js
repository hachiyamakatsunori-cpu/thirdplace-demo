/* ==========================================================================
   DIAMOND HEADS JAPAN 特集ページ（diamond-heads/）
   - 施工カテゴリー・ギャラリーを data/site.js から描画
   - ギャラリーのライトボックス（<dialog>）
   - スマホ用の固定問い合わせバー
   ========================================================================== */
(function () {
  "use strict";
  const { $, $$, esc, observeReveal } = window.TP;
  const DH = (window.TP_SITE || {}).diamondHeads;
  if (!DH) return;
  const BASE = "assets/diamond-heads/";

  // スマホ用(-sm)とPC用の2サイズを AVIF / WebP / JPEG で出し分け
  function pic(item, sizes) {
    const n = BASE + item.name;
    const set = (ext) => (item.single ? n + "." + ext : n + "-sm." + ext + " 560w, " + n + "." + ext + " " + item.w + "w");
    return "<picture>" +
      '<source type="image/avif" srcset="' + set("avif") + '" sizes="' + sizes + '">' +
      '<source type="image/webp" srcset="' + set("webp") + '" sizes="' + sizes + '">' +
      '<img src="' + n + '.jpg" srcset="' + set("jpg") + '" sizes="' + sizes + '" width="' + item.w + '" height="' + item.h + '" alt="' + esc(item.alt) + '" loading="lazy" decoding="async"></picture>';
  }

  const cats = $("[data-render='dh-possibilities']");
  if (cats) {
    cats.innerHTML = DH.possibilities.map((c) =>
      '<figure class="dhj-item dh-cat reveal">' + pic(c, "(min-width: 900px) 25vw, 50vw") +
      '<figcaption><span class="en">' + esc(c.en) + "</span>" + esc(c.jp) + "</figcaption></figure>").join("");
  }

  const gallery = $("[data-render='dh-gallery']");
  if (gallery) {
    gallery.innerHTML = DH.gallery.map((g, i) =>
      '<li class="dh-gallery__item reveal" data-cat="' + esc(g.cat) + '">' +
        '<button type="button" class="dh-gallery__btn" data-index="' + i + '" aria-label="' + esc(g.caption) + ' を拡大表示">' +
          pic(g, "(min-width: 900px) 33vw, 50vw") +
          '<span class="dh-gallery__cap"><span class="en">' + esc(g.cat) + "</span>" + esc(g.caption) + "</span>" +
        "</button></li>").join("");
  }
  observeReveal();

  /* ---------- ライトボックス ---------- */
  const box = $(".dh-lightbox");
  if (box && gallery && typeof box.showModal === "function") {
    const cap = $("figcaption", box);
    let img = null;  // 未設定の<img>を置かないよう、最初に開くときに作る
    let index = 0;
    const show = (i) => {
      if (!img) { img = document.createElement("img"); cap.before(img); }
      index = (i + DH.gallery.length) % DH.gallery.length;
      const g = DH.gallery[index];
      img.src = BASE + g.name + ".jpg";
      img.width = g.w; img.height = g.h;
      img.alt = g.alt;
      cap.textContent = g.cat + " — " + g.caption + "（" + (index + 1) + " / " + DH.gallery.length + "）";
    };
    gallery.addEventListener("click", (e) => {
      const btn = e.target.closest(".dh-gallery__btn");
      if (!btn) return;
      show(Number(btn.dataset.index));
      box.showModal();
      document.body.classList.add("is-locked");
    });
    $(".dh-lightbox__close", box).addEventListener("click", () => box.close());
    $(".dh-lightbox__nav--prev", box).addEventListener("click", () => show(index - 1));
    $(".dh-lightbox__nav--next", box).addEventListener("click", () => show(index + 1));
    box.addEventListener("click", (e) => { if (e.target === box) box.close(); });  // 背景クリックで閉じる
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "ArrowLeft") show(index - 1);
    });
    box.addEventListener("close", () => {
      document.body.classList.remove("is-locked");
      const btn = $('.dh-gallery__btn[data-index="' + index + '"]');
      if (btn) btn.focus();
    });
    // スワイプで前後へ
    let x0 = null;
    box.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  /* ---------- スマホ用 固定問い合わせバー ---------- */
  // ヒーローを過ぎたら表示し、最後の問い合わせ欄が見えている間は隠す
  const bar = $(".dh-sticky");
  const hero = $(".hero");
  const lastCta = $("#contact-cta");
  if (bar && hero && lastCta && "IntersectionObserver" in window) {
    document.body.classList.add("has-sticky-buy");
    let pastHero = false, ctaVisible = false;
    const update = () => {
      const on = pastHero && !ctaVisible;
      bar.classList.toggle("is-shown", on);
      bar.setAttribute("aria-hidden", String(!on));
      $$("a", bar).forEach((a) => (a.tabIndex = on ? 0 : -1));
    };
    new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting && en.boundingClientRect.top < 0; update(); }).observe(hero);
    new IntersectionObserver(([en]) => { ctaVisible = en.isIntersecting; update(); }).observe(lastCta);
  }
})();
