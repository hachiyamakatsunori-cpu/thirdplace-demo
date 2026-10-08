/*
 * Third Place 中古車両データ（USED MOTORCYCLES）
 * ------------------------------------------------------------
 * - 1台＝1オブジェクト。台数が増えたら配列に追加する（TOPは先頭の1台を大きく表示）。
 * - 値が null の項目はサイト上で「確認中」と表示する。写真から推測して埋めない。
 * - 価格: price に数値（税込・円）を入れると「¥1,234,000」表示。
 *         金額を出さずに問い合わせ制にする場合は priceLabel: "ASK" のように文字で指定（price より優先）。
 * - 写真: assets/used/<name>.jpg / -sm.jpg（＋ .webp / .avif）。公開用はナンバー・第三者の看板をぼかし済み。
 *         focus は一覧（TOP）で横長にトリミングするときの中心位置（CSS object-position）。
 */
window.TP_BIKES = [
  {
    id: "bike-001",
    status: "pending",          // pending = 車両詳細確認中 / available = 販売中 / sold = 売約済
    name: null,                 // 車種名（例: 確定後に記入）
    year: null,                 // 年式
    modelCode: null,            // 型式
    displacement: null,         // 排気量
    mileage: null,              // 走行距離
    inspection: null,           // 車検
    price: null,                // 販売価格（数値）
    priceLabel: null,           // 価格の文字表示（"ASK" など）
    custom: [],                 // カスタム・装備（確定した項目を文字列で追加）
    condition: null,            // 車両状態の説明
    images: [
      { name: "bike-001-01", w: 1200, h: 1600, focus: "50% 56%", alt: "入庫した中古ハーレーダビッドソン（右前方）" },
      { name: "bike-001-02", w: 1200, h: 1600, focus: "45% 62%", alt: "入庫した中古ハーレーダビッドソン（正面）" },
      { name: "bike-001-03", w: 1200, h: 1600, focus: "40% 60%", alt: "入庫した中古ハーレーダビッドソン（左後方）" }
    ]
  }
];
