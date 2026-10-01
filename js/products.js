/* ==========================================================================
   商品一覧ページ: 検索・絞り込み・並び替え（URLパラメータと同期）
   ========================================================================== */
(function () {
  "use strict";
  const { DATA, $, $$, esc, cardHTML, catById, modelById, observeReveal, icon } = window.TP;

  const TYPES = [
    { id: "", label: "すべて" },
    { id: "new", label: "新品" },
    { id: "rare", label: "中古・希少" },
    { id: "genuine", label: "純正" },
    { id: "diamond", label: "DIAMOND CUT" },
    { id: "original", label: "オリジナル" }
  ];
  const TYPE_TEST = {
    new: (p) => p.condition === "new",
    rare: (p) => p.tags.includes("RARE") || p.condition === "used" || (p.source === "oem" && p.productType === "engine"),
    genuine: (p) => p.source === "oem",
    diamond: (p) => p.tags.includes("DIAMOND CUT"),
    original: (p) => p.source === "original"
  };
  const SOURCE_LABEL = { oem: "純正品", aftermarket: "社外品", original: "ショップオリジナル" };
  const PRICE_LABEL = { "0-5000": "〜5,000円", "5000-30000": "5,000〜30,000円", "30000-100000": "30,000〜100,000円", "100000-": "100,000円〜" };
  const KEYS = ["q", "type", "model", "cat", "brand", "source", "price", "sort"];
  const DRAWER_KEYS = ["model", "cat", "brand", "source", "price"];

  const params = new URLSearchParams(location.search);
  const state = {};
  KEYS.forEach((k) => (state[k] = params.get(k) || ""));
  if (!TYPES.some((t) => t.id === state.type)) state.type = "";

  /* ---------- 検索用の正規化（全角→半角・記号除去） ---------- */
  const norm = (s) => String(s || "").normalize("NFKC").toLowerCase().replace(/[\s\-‐－–—_・／/()（）]/g, "");
  const haystack = new Map(DATA.products.map((p) => {
    const f = p.fitment || { models: [] };
    return [p.handle, norm([
      p.title, p.vendor, p.summary, (catById[p.productType] || {}).label, p.tags.join(" "),
      f.models.map((m) => (modelById[m] || {}).label + (modelById[m] || {}).en).join(" "), f.note, f.years,
      p.specs && p.specs.partNumber, p.specs && p.specs.oemNumber
    ].join(" "))];
  }));

  /* ---------- フィルター選択肢 ---------- */
  const count = (fn) => DATA.products.filter(fn).length;
  $("#f-model").innerHTML = '<option value="">すべての車種</option>' + DATA.models.map((m) =>
    '<option value="' + m.id + '">' + m.label + "（" + count((p) => p.fitment && p.fitment.models.includes(m.id)) + "）</option>").join("");
  $("#f-cat").innerHTML = '<option value="">すべてのカテゴリー</option>' + DATA.categories.map((c) =>
    '<option value="' + c.id + '">' + c.label + "（" + count((p) => p.productType === c.id) + "）</option>").join("");
  const brands = Array.from(new Set(DATA.products.map((p) => p.vendor).filter(Boolean))).sort((a, b) => a.localeCompare(b, "ja"));
  $("#f-brand").innerHTML = '<option value="">すべてのブランド</option>' + brands.map((b) => '<option value="' + esc(b) + '">' + esc(b) + "</option>").join("");
  $("[data-type-chips]").innerHTML = TYPES.map((t) =>
    '<button type="button" class="chip' + (/^[A-Z ]+$/.test(t.label) ? "" : " chip--jp") + '" data-type="' + t.id + '" aria-pressed="false">' + t.label + "</button>").join("");

  /* ---------- 絞り込み ---------- */
  function filtered() {
    const q = norm(state.q);
    let list = DATA.products.filter((p) => {
      if (q && !haystack.get(p.handle).includes(q)) return false;
      if (state.type && !TYPE_TEST[state.type](p)) return false;
      if (state.model && !(p.fitment && p.fitment.models.includes(state.model))) return false;
      if (state.cat && p.productType !== state.cat) return false;
      if (state.brand && p.vendor !== state.brand) return false;
      if (state.source && p.source !== state.source) return false;
      if (state.price) {
        if (p.price == null) return false;
        const [min, max] = state.price.split("-").map((v) => (v === "" ? Infinity : Number(v)));
        if (p.price < min || (max !== Infinity && p.price >= max)) return false;
      }
      return true;
    });
    const avail = (p) => (p.demo ? 2 : p.inventory === 0 ? 1 : 0);
    const sorters = {
      recommended: (a, b) => avail(a) - avail(b) || (b.images.length > 0) - (a.images.length > 0) || b.sortId - a.sortId,
      new: (a, b) => avail(a) - avail(b) || b.sortId - a.sortId,
      "price-asc": (a, b) => (a.price == null) - (b.price == null) || a.price - b.price,
      "price-desc": (a, b) => (a.price == null) - (b.price == null) || b.price - a.price
    };
    return list.sort(sorters[state.sort] || sorters.recommended);
  }

  function labelFor(key, val) {
    switch (key) {
      case "q": return "「" + val + "」";
      case "model": return (modelById[val] || {}).label || val;
      case "cat": return (catById[val] || {}).label || val;
      case "source": return SOURCE_LABEL[val] || val;
      case "price": return PRICE_LABEL[val] || val;
      default: return val;
    }
  }

  function render() {
    const list = filtered();
    $("[data-results]").innerHTML = list.length
      ? list.map((p, i) => cardHTML(p, { eager: i < 4 })).join("")
      : '<div class="empty" style="grid-column:1/-1"><b>条件に合うパーツが見つかりませんでした</b>条件を変えて探すか、お探しのパーツをお気軽にご相談ください。' +
        '<div><a class="btn btn--line" href="contact.html">' + icon("wrench") + "パーツを相談する</a></div></div>";
    $("[data-count]").textContent = list.length;
    $("[data-apply-label]").textContent = list.length + "件を表示";

    // 入力欄・チップの状態
    $("#q").value = state.q;
    $$("[data-filter]").forEach((el) => (el.value = state[el.dataset.filter] || (el.dataset.filter === "sort" ? "recommended" : "")));
    $$("[data-type]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.type === state.type)));

    // 適用中の条件
    const active = ["q"].concat(DRAWER_KEYS).filter((k) => state[k]);
    $("[data-filter-count]").textContent = DRAWER_KEYS.filter((k) => state[k]).length || "";
    $("[data-active-filters]").innerHTML = active.length
      ? active.map((k) => '<button type="button" class="pill" data-remove="' + k + '" aria-label="' + esc(labelFor(k, state[k])) + ' の条件を外す">' + esc(labelFor(k, state[k])) + icon("close") + "</button>").join("") +
        '<button type="button" class="pill pill--clear" data-clear-filters>すべてクリア</button>'
      : "";

    // URL・タイトルを同期（共有・戻る操作に対応）
    const out = new URLSearchParams();
    KEYS.forEach((k) => { if (state[k] && !(k === "sort" && state[k] === "recommended")) out.set(k, state[k]); });
    history.replaceState(null, "", location.pathname + (out.toString() ? "?" + out : ""));
    const scope = state.model ? (modelById[state.model] || {}).label + "用" : state.cat ? (catById[state.cat] || {}).label : "";
    document.title = (scope ? scope + "パーツ" : "パーツを探す") + "｜ハーレーダビッドソン パーツ通販 THIRD PLACE";

    observeReveal($("[data-results]"));
  }

  /* ---------- イベント ---------- */
  let timer;
  $("#q").addEventListener("input", (e) => { clearTimeout(timer); timer = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 200); });
  $("[data-search-form]").addEventListener("submit", (e) => { e.preventDefault(); state.q = $("#q").value.trim(); render(); $("#q").blur(); });
  $$("[data-filter]").forEach((el) => el.addEventListener("change", () => { state[el.dataset.filter] = el.value; render(); }));
  $("[data-type-chips]").addEventListener("click", (e) => { const b = e.target.closest("[data-type]"); if (b) { state.type = b.dataset.type; render(); } });

  const sheet = $("#filters");
  const backdrop = $(".sheet-backdrop");
  const openBtn = $("[data-open-filters]");
  function setSheet(open) {
    sheet.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    openBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("is-locked", open && window.matchMedia("(max-width: 899.98px)").matches);
    if (open) $("select", sheet).focus(); else if (document.activeElement && sheet.contains(document.activeElement)) openBtn.focus();
  }
  openBtn.addEventListener("click", () => setSheet(true));
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-filters]")) setSheet(false);
    const rm = e.target.closest("[data-remove]");
    if (rm) { state[rm.dataset.remove] = ""; render(); }
    if (e.target.closest("[data-clear-filters]")) { ["q"].concat(DRAWER_KEYS).forEach((k) => (state[k] = "")); state.type = ""; render(); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet.classList.contains("is-open")) setSheet(false); });

  render();
  if (params.get("focus") === "search") $("#q").focus();
})();
