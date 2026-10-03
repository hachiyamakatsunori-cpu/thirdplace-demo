/*
 * Third Place サイト共通データ（商品以外）
 * ------------------------------------------------------------
 * - 写真を差し替えるときは、該当フォルダに画像を置き、下の src にパスを書く。
 *   src が null のあいだは、デザインを崩さないプレースホルダーを表示する。
 *   （同名の .webp / .avif があれば自動で使う。無ければ webp/avif: false を指定）
 * - 第三者メディアの記事本文・写真・ロゴは使わない。要約と原記事へのリンクのみ。
 * - 事実の出典は 00_資料/掲載情報の出典_20261003.md を参照。
 */
window.TP_SITE = {
  founder: {
    name: "堤 美樹雄",
    en: "MIKIO TSUTSUMI",
    role: "FOUNDER & TUNER",
    // 例: { src: "assets/founder/tsutsumi.jpg", w: 900, h: 1200, alt: "THIRD PLACE 代表 堤 美樹雄" }
    photo: null
  },

  // THIRD PLACE が権利を持つボンネビルの写真を assets/bonneville/ に置いて指定する
  bonneville: [
    { src: null, caption: "BONNEVILLE SALT FLATS, UTAH" },
    { src: null, caption: "TEAM HIRO KOISO" },
    { src: null, caption: "TUNING ON THE SALT" }
  ],

  // DIAMOND HEADS JAPAN の施工例（DIAMOND HEADS JAPAN ブログ掲載写真）
  dhjGallery: [
    { src: "assets/diamond-heads/luxury-cut.jpg", w: 720, h: 960, label: "ENGINE", jp: "エンジンまわり", alt: "ダイヤモンドカットを施したエンジンまわりのパーツ" },
    { src: "assets/diamond-heads/derby-cover.jpg", w: 720, h: 960, label: "DERBY COVER", jp: "ダービーカバー", alt: "ダイヤモンドカットを施したダービーカバー" },
    { src: "assets/diamond-heads/fairing-trim.jpg", w: 720, h: 960, label: "FAIRING TRIM", jp: "ゲージトリム", alt: "ダイヤモンドカットを施したフェアリング内のゲージトリム" },
    { src: "assets/diamond-heads/muffler-end.jpg", w: 720, h: 960, label: "MUFFLER END", jp: "マフラーエンド", alt: "ダイヤモンドカットを施したマフラーエンド" }
  ],

  media: [
    {
      name: "CLUB HARLEY",
      via: "Dig-it",
      year: "2026",
      title: "【旅とハーレーと日々の風景】Continue to ride toward the west",
      desc: "CLUB HARLEY 2026年2月号の連載。カム交換とインジェクションチューニングを受けたロードグライドの旅が紹介されています。",
      url: "https://dig-it.media/clubharley/article/891694/"
    },
    {
      name: "VIRGIN HARLEY",
      via: "",
      year: "2013",
      title: "サードプレイス：熱い・弱い・らしくない、ハーレー負の３拍子を解決！",
      desc: "インジェクションチューニング特集の一本。純正の燃調とチューニングの考え方について、堤のインタビューが掲載されています。",
      url: "https://www.virginharley.com/feat/dynoman2014-03/"
    },
    {
      name: "TAK'S PERFORMANCE PARTS",
      via: "",
      year: "2018",
      title: "ダイヤモンドカット by DIAMOND HEADS JAPAN",
      desc: "DIAMOND HEADS JAPANでの施工事例とともに、米国DIAMOND HEADS社の研修を2014年に修了した経緯が紹介されています。",
      url: "https://www.taksperformanceparts.com/blog/2018/10/06/diamond-heads-japan/"
    }
  ],

  history: [
    { year: "2005", en: "THIRD PLACE START", jp: "長崎県佐世保市で営業開始" },
    { year: "2009", en: "DYNO TUNING", jp: "別府のショップでダイノマシンを借りてチューニング" },
    { year: "2010", en: "OWN DYNO INSTALLED", jp: "佐世保の店舗にダイノマシンを導入" },
    { year: "2012", en: "FUKUOKA / USA TRAINING", jp: "福岡・大野城に店舗を開設。Hiro Koiso氏の研修を受ける" },
    { year: "2014", en: "DIAMOND HEADS TRAINING", jp: "米国DIAMOND HEADS社の研修を修了" },
    { year: "2015", en: "DIAMOND HEADS JAPAN", jp: "DIAMOND HEADS JAPANとして施工を開始" },
    { year: "2017", en: "INCORPORATED", jp: "株式会社化" },
    { year: "2020", en: "CHIKUSHINO / NEW DYNO", jp: "筑紫野に移転し、ダイナモを新調" },
    { year: "2023", en: "TRIKE DYNO", jp: "トライクも測定できるシャシーダイナモを新設" },
    { year: "2026", en: "FEATURED IN CLUB HARLEY", jp: "CLUB HARLEY 2026年2月号に掲載" }
  ],

  /*
   * DIAMOND HEADS JAPAN 特集ページ（diamond-heads/）
   * 写真は assets/diamond-heads/<name>.jpg / -sm.jpg（＋ .webp / .avif）。
   * 追加するときは画像を同じ命名で置き、この配列に1行足すだけでよい。
   * cat は将来の絞り込み用（ENGINE / AIR CLEANER / COVER / CONTROL / WHEEL / FULL CUSTOM）。
   * 写真はすべて DIAMOND HEADS JAPAN 公式ブログ掲載の施工例。
   */
  diamondHeads: {
    possibilities: [
      { name: "cat-engine", w: 720, h: 960, en: "ENGINE", jp: "エンジン", alt: "ダイヤモンドカットを施した117エンジンまわり" },
      { name: "cat-air-cleaner", w: 720, h: 960, en: "AIR CLEANER", jp: "エアクリーナー", alt: "ダイヤモンドカットを施したパフォーマンスマシンのエアクリーナー" },
      { name: "cat-covers", w: 720, h: 960, en: "COVERS", jp: "カバー類", alt: "ダイヤモンドカットを施したタンクまわりのカバー" },
      { name: "cat-wheels", w: 720, h: 960, en: "WHEELS", jp: "ホイール周り", alt: "ショーカットで仕上げたアレンネスのホイール" },
      { name: "cat-controls", w: 720, h: 960, en: "CONTROLS", jp: "ハンドル・足回り", alt: "ダイヤモンドカットを施したグリップ" },
      { name: "cat-mirrors", w: 960, h: 720, en: "MIRRORS", jp: "ミラー", alt: "ダイヤモンドカットを施したミラー" },
      { name: "muffler-end", w: 720, h: 960, en: "EXHAUST", jp: "マフラー周り", alt: "ダイヤモンドカットを施したマフラーエンド", single: true },
      { name: "cat-custom", w: 960, h: 720, en: "CUSTOM PARTS", jp: "その他カスタムパーツ", alt: "ダイヤモンドカットを施したフロアボード" }
    ],
    gallery: [
      { name: "gallery-01", w: 720, h: 960, cat: "AIR CLEANER", caption: "エアクリーナー", alt: "ダイヤモンドカットを施したエアクリーナー（車両装着）" },
      { name: "gallery-02", w: 720, h: 960, cat: "ENGINE", caption: "スポーツスター エンジン", alt: "エンジンにダイヤモンドカットを施したスポーツスター" },
      { name: "gallery-03", w: 720, h: 960, cat: "WHEEL", caption: "トライク ホイール", alt: "ダイヤモンドカットを施したトライクのホイール" },
      { name: "gallery-04", w: 720, h: 960, cat: "CONTROL", caption: "ハンドルまわり", alt: "ダイヤモンドカットを施したハンドルまわりとエアクリーナー" },
      { name: "gallery-05", w: 960, h: 640, cat: "AIR CLEANER", caption: "スクリーミンイーグル エアクリーナー", alt: "黒い部分をすべてダイヤモンドカットしたエアクリーナー" },
      { name: "gallery-06", w: 720, h: 960, cat: "CONTROL", caption: "足回り", alt: "ダイヤモンドカットを施した足回りのパーツ" },
      { name: "gallery-07", w: 960, h: 720, cat: "ENGINE", caption: "ロッカーボックス", alt: "赤い塗装にダイヤモンドカットを施したロッカーボックス" },
      { name: "gallery-08", w: 720, h: 960, cat: "AIR CLEANER", caption: "アレンネス エアクリーナー", alt: "ダイヤモンドカットを施したアレンネスのエアクリーナー" },
      { name: "gallery-09", w: 720, h: 960, cat: "COVER", caption: "ダービーカバー", alt: "ダイヤモンドカットを施したダービーカバー" },
      { name: "gallery-10", w: 720, h: 960, cat: "CONTROL", caption: "スイッチ・グリップ", alt: "ダイヤモンドカットを施したハンドルスイッチとグリップ" },
      { name: "gallery-11", w: 960, h: 720, cat: "FULL CUSTOM", caption: "車両まるごと", alt: "車両全体のパーツにダイヤモンドカットを施したツーリングモデル" },
      { name: "gallery-12", w: 720, h: 960, cat: "FULL CUSTOM", caption: "ツーリングモデル", alt: "各部にダイヤモンドカットを施したツーリングモデル" }
    ]
  }
};
