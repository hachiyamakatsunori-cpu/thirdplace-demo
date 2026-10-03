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
    { src: "assets/diamond-heads/engine.jpg", w: 720, h: 960, label: "ENGINE", jp: "エンジンまわり", alt: "ダイヤモンドカットを施したエンジンまわりのパーツ" },
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
  ]
};
