/*
 * Third Place デモ用 商品データ
 * ------------------------------------------------------------
 * - HTMLをダブルクリックで開いても動くよう、JSONではなくJSファイルで提供する。
 *   中身は「JSONとして書き出せる純粋なデータ」のみ（関数なし）。
 * - 項目名は Shopify の Product / Variant / Metafield に対応させている（README参照）。
 *     handle → handle / title → title / vendor → vendor / productType → product_type
 *     tags → tags / price → variants[].price / inventory → variants[].inventory_quantity
 *     images → images / fitment・partNumber 等 → metafields
 * - demo:false … 現行FC2カート掲載の実在商品（価格・在庫は source.fetchedAt 時点）
 *   demo:true  … デザイン確認用のサンプル。実在しない。価格・適合は記載しない。
 * - 不明な項目は null。推測で埋めない。
 */
window.TP_DATA = {
  meta: {
    shopName: "THIRD PLACE",
    fetchedAt: "2026-10-02",
    sourceSite: "https://thirdplace.cart.fc2.com/",
    imageBase: "assets/images/products/"
  },

  categories: [
    { id: "exhaust", label: "マフラー・エキゾースト", en: "EXHAUST" },
    { id: "handle", label: "ハンドル・グリップ", en: "HANDLEBAR" },
    { id: "dressup", label: "ドレスアップ・外装", en: "DRESS UP" },
    { id: "luggage", label: "ツアーパック・ラゲッジ", en: "LUGGAGE" },
    { id: "suspension", label: "サスペンション・足回り", en: "SUSPENSION" },
    { id: "engine", label: "エンジン・純正補修部品", en: "ENGINE" },
    { id: "tuning", label: "チューニング", en: "TUNING" },
    { id: "tools", label: "工具・メンテナンス", en: "TOOLS" },
    { id: "apparel", label: "アパレル・雑貨", en: "APPAREL" }
  ],

  models: [
    { id: "touring", label: "ツーリング", en: "TOURING" },
    { id: "softail", label: "ソフテイル", en: "SOFTAIL" },
    { id: "dyna", label: "ダイナ", en: "DYNA" },
    { id: "sportster", label: "スポーツスター", en: "SPORTSTER" },
    { id: "buell", label: "ビューエル", en: "BUELL" }
  ],

  products: [
    {
      handle: "king-tour-pak-cvo-color",
      title: "キングツアーパック 2023 CVOカラー塗装済 取付フルセット",
      vendor: "HOGWORKZ",
      productType: "luggage",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW", "ONE-OFF"],
      price: 350000,
      inventory: 1,
      images: [
        { src: "ca42_208_5.jpg", alt: "ダークプラチナに塗装したキングツアーパック 本体", fit: "cover" },
        { src: "ca42_208_6.jpg", alt: "キングツアーパック 側面", fit: "cover" },
        { src: "ca42_208_1.jpg", alt: "HOGWORKZ キングツアーパック 製品写真", fit: "contain" },
        { src: "ca42_208_2.jpg", alt: "HOGWORKZ ツアーパックラック", fit: "contain" },
        { src: "ca42_208_3.jpg", alt: "デタッチャブルキット 52300354", fit: "cover" }
      ],
      summary: "2023 CVOのダークプラチナに塗装し、ピンストライプ入り。ツアーパック・ラック・デタッチャブルの3点が揃った即装着セット。",
      description: [
        "2023 CVOストリートグライド／CVOロードグライドのカラー「ダークプラチナ」に塗装し、ピンストライプも入れています。",
        "HOGWORKZ キングツアーパック、デタッチャブル（52300354）、HOGWORKZ ツアーパックラックの3点が揃っているので、届いたその日に車両へ取り付けられます。",
        "新品ですが、遠目では分かりにくい小さな傷がいくつかあります。送料無料。"
      ],
      specs: {
        partNumber: "52300354（デタッチャブル）",
        oemNumber: null,
        color: "ダークプラチナ（ピンストライプ入り）",
        conditionNote: "新品・小傷あり",
        accessories: "ツアーパック本体／ツアーパックラック／デタッチャブル"
      },
      fitment: { models: ["touring"], years: "2014–2024", note: "2014〜2024 ツーリングに取り付け可能" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca42/208/p-r-s/",
      demo: false,
      sortId: 208
    },
    {
      handle: "bassani-roadrage-2in1-black",
      title: "バッサーニ ROADRAGE 2in1 マフラー ブラック",
      vendor: "Bassani",
      productType: "exhaust",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 184800,
      inventory: 1,
      images: [{ src: "ca1_178_1.jpg", alt: "バッサーニ ROADRAGE 2in1 マフラー ブラックを装着したソフテイル", fit: "contain" }],
      summary: "M8ソフテイル用の2in1マフラー。ブラック仕上げ。",
      description: [
        "M8ソフテイル（FLFB/S、FXBR/S、FXDRS）用の2in1マフラーです。",
        "2021年以降のソフテイルで、チューニングを行わない場合はO2キャンセラーが必要です。ご不明な点は適合相談からお問い合わせください。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "ブラック", conditionNote: "新品", accessories: null },
      fitment: { models: ["softail"], years: "2018–2023", note: "FLFB/S、FXBR/S、FXDRS ※2021年以降はチューニングしない場合O2キャンセラーが必要" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca1/178/p-r-s/",
      demo: false,
      sortId: 178
    },
    {
      handle: "kst-patriot-bagger-12in-black",
      title: "KST Patriot Bagger 12インチハンドル ブラック",
      vendor: "KST Kustoms",
      productType: "handle",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 91300,
      inventory: 1,
      images: [
        { src: "ca31_205_1.jpg", alt: "KST Patriot Bagger 12インチハンドル ブラック", fit: "contain" },
        { src: "ca31_205_3.jpg", alt: "KST Patriot Bagger ハンドルを装着したストリートグライド", fit: "contain" },
        { src: "ca31_205_2.jpg", alt: "KST Patriot Bagger ハンドル 装着イメージ", fit: "contain" }
      ],
      summary: "ストリートグライド等ツーリング用。幅が狭く、楽な姿勢で走れる12インチ。",
      description: [
        "1996〜2023年 ツーリングモデル用の12インチハンドル。ストリートグライド、エレクトラグライド、ウルトラクラシック／リミテッド、トライクに対応します。",
        "ハンドル幅が狭めで、快適な姿勢で走れます。6.5インチのプルバック。TBW以外のモデルにも適合します。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "ブラック", conditionNote: "新品", accessories: null },
      fitment: { models: ["touring"], years: "1996–2023", note: "2023 CVOモデルには適合しません" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca31/205/p-r-s/",
      demo: false,
      sortId: 205
    },
    {
      handle: "thrashin-front-master-cover-diamond-cut",
      title: "スラッシンサプライ フロントブレーキマスターシリンダーカバー ダイヤモンドカット",
      vendor: "Thrashin Supply",
      productType: "dressup",
      condition: "new",
      source: "original",
      tags: ["NEW", "DIAMOND CUT"],
      price: 22000,
      inventory: 1,
      images: [
        { src: "ca44_209_1.jpg", alt: "ダイヤモンドカット加工したスラッシンサプライのマスターシリンダーカバー", fit: "cover" },
        { src: "ca44_209_2.jpg", alt: "スラッシンサプライ マスターシリンダーカバー パッケージ", fit: "cover" }
      ],
      summary: "Thrashin Supplyのカバーに、当店でダイヤモンドカットを施した一品。",
      description: [
        "M8ソフテイル（2018年以降）用のフロントブレーキマスターシリンダーカバー。",
        "この商品をダイヤモンドカットして販売しているのは当店だけです。加工していない通常品は16,000〜18,000円で販売されています。",
        "取り付けねじ付属。ガスケットは純正を再利用します。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "ブラック × ダイヤモンドカット", conditionNote: "新品", accessories: "取り付けねじ" },
      fitment: { models: ["softail"], years: "2018–", note: "M8ソフテイル フロント用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca44/209/p-r-s/",
      demo: false,
      sortId: 209
    },
    {
      handle: "covingtons-rear-master-cover-diamond-cut",
      title: "コビントン リアマスターシリンダーカバー ダイヤモンドカット",
      vendor: "Covingtons",
      productType: "dressup",
      condition: "new",
      source: "original",
      tags: ["NEW", "DIAMOND CUT"],
      price: 16500,
      inventory: 1,
      images: [
        { src: "ca0_224_2.jpg", alt: "ダイヤモンドカット加工したコビントン リアマスターシリンダーカバー", fit: "cover" },
        { src: "ca0_224_1.jpg", alt: "コビントン リアマスターシリンダーカバー 製品写真", fit: "contain" }
      ],
      summary: "コビントンのカバーにダイヤモンドカット加工をした当店オリジナル。",
      description: ["新品のコビントン製カバーに、当店でダイヤモンドカット加工をしたオリジナル商品です。"],
      specs: { partNumber: null, oemNumber: null, color: "ブラック × ダイヤモンドカット", conditionNote: "新品", accessories: null },
      fitment: { models: ["touring"], years: "2008–2024", note: "2008〜2023 ツーリング／2024 FLHTK、FLTRK、FLHRXS" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca0/224/p-r-s/",
      demo: false,
      sortId: 224
    },
    {
      handle: "joker-machine-derby-cover-fin",
      title: "ジョーカーマシン ビレットダービーカバー Fin コントラスト",
      vendor: "Joker Machine",
      productType: "dressup",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 29150,
      inventory: 1,
      images: [{ src: "ca31_225_1.jpg", alt: "ジョーカーマシン ビレットダービーカバー Fin コントラストカット", fit: "contain" }],
      summary: "アルミ削り出しのダービーカバー。＋1万円でダイヤモンドカット加工も可能。",
      description: [
        "アルミ削り出しのダービーカバー。デザインはフィン、カラーはコントラストカットです。",
        "プラス1万円でダイヤモンドカット加工もできます。",
        "ダービーカバー内にクラッチ軽減パーツを付けている場合は適合しません。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "コントラストカット", conditionNote: "新品", accessories: null },
      fitment: { models: ["touring"], years: "2015–2022", note: "2016〜2022 FLHX、FLHT、FLTR、FLHR／2015 FLHTCUL、FLHTKL" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca31/225/p-r-s/",
      demo: false,
      sortId: 225
    },
    {
      handle: "ohlins-rear-shock-buell-xb",
      title: "オーリンズ リアショックアブソーバー S46HR1C1LS ビューエルXB用",
      vendor: "Öhlins",
      productType: "suspension",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 173448,
      inventory: 1,
      images: [{ src: "ca47_42_1.jpg", alt: "オーリンズ リアショック S46HR1C1LS", fit: "contain" }],
      summary: "ビューエルXBシリーズ用。日本正規品。伸び・圧・車高・プリロードを調整可能。",
      description: [
        "46mm口径ピストンを内蔵し、ホースで連結したリザーバータンクを備えます。",
        "伸び側・圧側の減衰調整、車高調整、ホース式油圧アジャスターによるプリロード調整が可能です。日本正規品。"
      ],
      specs: { partNumber: "S46HR1C1LS", oemNumber: null, color: null, conditionNote: "新品（日本正規品）", accessories: null },
      fitment: { models: ["buell"], years: "2002–2009", note: "XB12R・XB12S（2004〜2009）／XB9R（2003〜2009）／XB9S（2002〜2009）" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca47/42/p-r-s/",
      demo: false,
      sortId: 42
    },
    {
      handle: "quick-release-super-sport-windshield",
      title: "クイックリリース デタッチャブル スーパースポーツ ウインドシールド",
      vendor: null,
      productType: "dressup",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 25300,
      inventory: 1,
      images: [
        { src: "ca0_248_1.jpg", alt: "スーパースポーツ ウインドシールド ライトスモーク", fit: "cover" },
        { src: "ca0_248_2.jpg", alt: "スーパースポーツ ウインドシールド 裏面", fit: "cover" }
      ],
      summary: "ヘッドライトを回り込むスポーティーな形状。ドッキングハードウェア不要のクランプ式。",
      description: [
        "フロントヘッドライトを回り込むスポーティーなスタイル。ダイキャストのレバーロッキングクランプでフォークチューブに装着するため、ドッキングハードウェアは不要です。",
        "シールドのみの販売で、ハードウェアは付属しません。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "ライトスモーク", conditionNote: "新品", accessories: "シールドのみ（ハードウェアなし）", size: "H561 × W389mm（ヘッドライト上端からシールド上端まで409mm）", material: "ポリカーボネート" },
      fitment: { models: [], years: null, note: "カスタム倒立フロントフォークキット 46321-05／46321-05A、48646-06 装着車用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca0/248/p-r-s/",
      demo: false,
      sortId: 248
    },
    {
      handle: "samson-fishtail-slip-on-225",
      title: "SAMSON 2.25インチ フィッシュテイル スリップオンマフラー",
      vendor: "SAMSON",
      productType: "exhaust",
      condition: "new",
      source: "aftermarket",
      tags: ["RARE", "廃盤"],
      price: 110000,
      inventory: 1,
      images: [{ src: "ca1_155_1.jpg", alt: "SAMSON フィッシュテイル スリップオンマフラーを装着したハーレー", fit: "contain" }],
      summary: "廃盤・在庫限り。これを逃すと手に入らない、人気のフィッシュテイル。",
      description: [
        "廃盤のため在庫限りです。スリップオンなので、ノーマルのエキパイと組み合わせて使えます。社外の独立管とも組み合わせ可能です。",
        "長さは33インチと36インチがあり、こちらは33インチ。それでもサドルバッグ後方にエンドが伸びるので、旋回時・停止時はご注意ください。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "クローム", conditionNote: "新品・廃盤在庫", accessories: null, size: "33インチ" },
      fitment: { models: ["touring"], years: "1995–2016", note: "1995〜2016 ツーリング用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca1/155/p-r-s/",
      demo: false,
      sortId: 155
    },
    {
      handle: "chromeworks-slash-cut-sportster",
      title: "クロームワークス フルエキゾースト スラッシュカット クローム スポーツスター用",
      vendor: "Chrome Works",
      productType: "exhaust",
      condition: "new",
      source: "aftermarket",
      tags: ["RARE", "廃盤"],
      price: 129800,
      inventory: 1,
      images: [{ src: "ca1_85_1.jpg", alt: "クロームワークス スラッシュカット フルエキゾースト クローム", fit: "contain" }],
      summary: "廃盤・もう手に入らない一本。クロームワークス独特の重低音。",
      description: ["廃盤になっており、もう手に入りません。クロームワークス独特の重低音が魅力のフルエキゾーストです。"],
      specs: { partNumber: null, oemNumber: null, color: "クローム", conditionNote: "新品・廃盤在庫", accessories: null },
      fitment: { models: ["sportster"], years: "2004–2017", note: "2004〜2017 スポーツスター" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca1/85/p-r-s/",
      demo: false,
      sortId: 85
    },
    {
      handle: "bassani-firesweep-dyna",
      title: "バッサーニ フルエキゾースト ファイアースウィープ ダイナ用",
      vendor: "Bassani",
      productType: "exhaust",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 154000,
      inventory: 1,
      images: [{ src: "ca1_21_1.jpg", alt: "バッサーニ ファイアースウィープを装着したダイナ", fit: "contain" }],
      summary: "16ゲージのスチール構造。ミッド・フォワードコントロールどちらにも対応。",
      description: [
        "ミッドコントロール、フォワードコントロールに対応。16ゲージのスチール構造で、1.75インチ（44mm）ヘッドパイプに2.5インチ（64mm）のマフラーボディ。",
        "取り付け金具・ハードウェア、ヒートシールド、取り外し不可のバッフルが付属します。"
      ],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "新品", accessories: "取り付け金具・ハードウェア・ヒートシールド" },
      fitment: { models: ["dyna"], years: "2006–2017", note: "2006〜2017 ダイナ ※FLDは不可" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca1/21/p-r-s/",
      demo: false,
      sortId: 21
    },
    {
      handle: "hd-genuine-spacer-seal-45377-87",
      title: "スペーサーシール 45377-87 純正品",
      vendor: "Harley-Davidson 純正",
      productType: "engine",
      condition: "new",
      source: "oem",
      tags: ["GENUINE"],
      price: 993,
      inventory: 5,
      images: [
        { src: "ca0_229_2.jpg", alt: "純正 スペーサーシール 45377-87 パッケージ", fit: "cover" },
        { src: "ca0_229_1.jpg", alt: "純正 スペーサーシール 45377-87", fit: "cover" }
      ],
      summary: "純正補修部品。品番で探している方に。",
      description: ["ハーレーダビッドソン純正のスペーサーシールです。"],
      specs: { partNumber: "45377-87", oemNumber: "45377-87", color: null, conditionNote: "新品（純正）", accessories: null },
      fitment: { models: [], years: null, note: "適合は純正品番でご確認ください" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca0/229/p-r-s/",
      demo: false,
      sortId: 229
    },
    {
      handle: "hd-genuine-head-gasket-16770-84d",
      title: "シリンダーヘッドガスケット 16770-84D 純正品",
      vendor: "Harley-Davidson 純正",
      productType: "engine",
      condition: "new",
      source: "oem",
      tags: ["GENUINE"],
      price: 3300,
      inventory: 6,
      images: [
        { src: "ca31_227_1.jpg", alt: "純正 シリンダーヘッドガスケット 16770-84D", fit: "cover" },
        { src: "ca31_227_2.jpg", alt: "シリンダーヘッドガスケット 16770-84D 拡大", fit: "cover" }
      ],
      summary: "純正品。通常2枚必要です。",
      description: ["純正のシリンダーヘッドガスケットです。通常2枚必要です。", "代金引換の場合はスマートレターで送れないため送料が変わります。"],
      specs: { partNumber: "16770-84D", oemNumber: "16770-84D", color: null, conditionNote: "新品（純正）", accessories: null },
      fitment: { models: [], years: null, note: "適合は純正品番でご確認ください" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca31/227/p-r-s/",
      demo: false,
      sortId: 227
    },
    {
      handle: "hd-genuine-starter-spring-33449-94",
      title: "スターターシャフト ギアスプリング 33449-94 純正品",
      vendor: "Harley-Davidson 純正",
      productType: "engine",
      condition: "new",
      source: "oem",
      tags: ["GENUINE"],
      price: 1100,
      inventory: 7,
      images: [
        { src: "ca54_206_1.jpg", alt: "純正 スターターシャフト ギアスプリング 33449-94", fit: "cover" },
        { src: "ca54_206_2.jpg", alt: "スターターシャフト ギアスプリング 33449-94 別角度", fit: "cover" }
      ],
      summary: "1994〜2006年式ビッグツイン用の純正部品。",
      description: ["純正品番 33449-94。必ず純正品番をご確認ください。", "作業には専門の知識と技術、専用工具等が必要です。"],
      specs: { partNumber: "33449-94", oemNumber: "33449-94", color: null, conditionNote: "新品（純正）", accessories: null },
      fitment: { models: ["softail", "touring", "dyna"], years: "1994–2006", note: "FXST・FLST・FLT・FXD 1994〜（ビッグツイン）" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca54/206/p-r-s/",
      demo: false,
      sortId: 206
    },
    {
      handle: "m8-softail-rear-axle-nut",
      title: "M8 ソフテイル用 リアアクスルナット",
      vendor: null,
      productType: "dressup",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 8800,
      inventory: 8,
      images: [
        { src: "ca44_207_1.jpg", alt: "M8ソフテイル用 リアアクスルナット", fit: "cover" },
        { src: "ca44_207_2.jpg", alt: "リアアクスルナット 別角度", fit: "cover" },
        { src: "ca44_207_3.jpg", alt: "リアアクスルナット 側面", fit: "cover" }
      ],
      summary: "M8ソフテイルのリア用アクスルナット。足元の印象を引き締める。",
      description: ["M8ソフテイル用のリアアクスルナットです。"],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "新品", accessories: null },
      fitment: { models: ["softail"], years: "2018–", note: "M8ソフテイル リア用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca44/207/p-r-s/",
      demo: false,
      sortId: 207
    },
    {
      handle: "arlen-ness-diamond-grip-set",
      title: "アレンネス ダイヤモンドグリップセット",
      vendor: "Arlen Ness",
      productType: "handle",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW"],
      price: 16720,
      inventory: 0,
      images: [
        { src: "ca0_237_1.jpg", alt: "アレンネス ダイヤモンドグリップセット", fit: "contain" },
        { src: "ca0_237_2.jpg", alt: "アレンネス ダイヤモンドグリップ パッケージ", fit: "cover" },
        { src: "ca0_237_3.jpg", alt: "アレンネス グリップ エンドキャップ ゴールド", fit: "cover" }
      ],
      summary: "格子柄にナール模様を入れたビンテージルック。エンドキャップはビレットアルミ。",
      description: [
        "ケーブルスロットル車用のハンドグリップセット（左右ペア）。写真の赤い部分はゴールドになります。",
        "グリップラバーはダイヤモンド（格子柄）デザインで、各升の中に細かいナール模様が入ったビンテージルック。柔らかい握り心地で、しっかりグリップします。",
        "エンドキャップはビレットアルミ製・クロームフィニッシュで、アレンネスのロゴをレーザー刻印。接着剤不要で純正同様に取り付けられます。"
      ],
      specs: { partNumber: null, oemNumber: null, color: "ブラック × ゴールド", conditionNote: "新品", accessories: "左右ペア" },
      fitment: { models: [], years: null, note: "ケーブルスロットル車用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca0/237/p-r-s/",
      demo: false,
      sortId: 237
    },
    {
      handle: "hiro-koiso-m8-injector-disconnect-tool",
      title: "M8 インジェクター ディスコネクトツール",
      vendor: "HIRO KOISO RACING",
      productType: "tools",
      condition: "new",
      source: "aftermarket",
      tags: ["NEW", "TOOL"],
      price: 6160,
      inventory: 5,
      images: [{ src: "ca46_203_1.jpg", alt: "HIRO KOISO RACING M8 インジェクター ディスコネクトツール", fit: "cover" }],
      summary: "M8のインジェクターコネクターを傷めず外せる専用工具。",
      description: ["HIRO KOISO RACING（AF Tools）の専用工具。使い方はショップのInstagramで紹介しています。"],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "新品", accessories: null },
      fitment: { models: [], years: null, note: "M8エンジン用" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca46/203/p-r-s/",
      demo: false,
      sortId: 203
    },
    {
      handle: "hd-denim-jacket-97408-17vm",
      title: "ハーレーダビッドソン デニムジャケット グレー 97408-17VM",
      vendor: "Harley-Davidson 純正",
      productType: "apparel",
      condition: "new",
      source: "oem",
      tags: ["NEW", "GENUINE"],
      price: 16500,
      compareAtPrice: 24000,
      inventory: 1,
      images: [
        { src: "ca0_245_1.jpg", alt: "ハーレーダビッドソン デニムジャケット グレー", fit: "cover" },
        { src: "ca0_245_2.jpg", alt: "デニムジャケット 内側ボア", fit: "cover" },
        { src: "ca0_245_3.jpg", alt: "デニムジャケット タグ", fit: "cover" },
        { src: "ca0_245_4.jpg", alt: "デニムジャケット 裾のマーク", fit: "cover" }
      ],
      summary: "新品タグ付き・数量限定の正規品。内側はボア仕様。",
      description: ["新品タグ付き。ハーレーダビッドソン正規品の数量限定品です（定価24,000円）。", "内側はボアになっていて、裏の裾にマークが入っています。"],
      specs: { partNumber: "97408-17VM", oemNumber: "97408-17VM", color: "グレー", conditionNote: "新品タグ付き", accessories: null },
      fitment: null,
      sourceUrl: "https://thirdplace.cart.fc2.com/ca0/245/p-r-s/",
      demo: false,
      sortId: 245
    },
    {
      handle: "diamond-cut-initial-keyholder-small",
      title: "ダイヤモンドカット イニシャルキーホルダー（小）",
      vendor: "THIRD PLACE",
      productType: "apparel",
      condition: "new",
      source: "original",
      tags: ["ORIGINAL", "DIAMOND CUT"],
      price: 1562,
      inventory: 13,
      images: [
        { src: "ca15_215_1.jpg", alt: "ダイヤモンドカット イニシャルキーホルダー 一覧", fit: "cover" },
        { src: "ca15_215_2.jpg", alt: "ダイヤモンドカット イニシャルキーホルダー C D E F N O P T", fit: "cover" },
        { src: "ca15_215_3.jpg", alt: "ダイヤモンドカット イニシャルキーホルダー G H J U Y W", fit: "cover" }
      ],
      variants: ["B", "C", "D", "E", "F", "G", "H", "J", "N", "R", "U", "Y", "W"],
      summary: "アルミのアルファベットにダイヤモンドカット。ギフトにも。",
      description: ["アルミ素材のアルファベットにダイヤモンドカット加工をしたキーホルダーです。", "サイズは約2cm（文字により多少異なります）。"],
      specs: { partNumber: null, oemNumber: null, color: "シルバー", conditionNote: "新品", accessories: null, size: "約2cm" },
      fitment: null,
      sourceUrl: "https://thirdplace.cart.fc2.com/ca15/215/p-r-s/",
      demo: false,
      sortId: 215
    },
    {
      handle: "magic-series-full-set",
      title: "魔法シリーズ フルセット（車種別）",
      vendor: "THIRD PLACE",
      productType: "tuning",
      condition: "new",
      source: "original",
      tags: ["ORIGINAL"],
      price: 14300,
      priceMax: 19250,
      inventory: 9,
      images: [],
      variants: ["ツーリング ¥16,500", "ソフテイル ¥19,250", "ダイナ ¥14,300", "スポーツスター ¥16,500"],
      summary: "インジェクターチューニングボルト・サスボルト・魔法のネット・エイリアンオイルのセット。",
      description: [
        "当店オリジナル「魔法のねじ」シリーズのフルセット。車種ごとに、インジェクターチューニングボルト、フロント／リアサス用ボルト、魔法のネット、エイリアンオイル濃縮タイプを組み合わせています。",
        "年式・車種・エアクリーナーの種類により数量と金額が変わるため、ご注文時にお知らせください。",
        "なるべく1か所ずつ交換すると、どこがどう変わったか分かりやすくなります。"
      ],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "新品", accessories: "車種により構成が異なります" },
      fitment: { models: ["touring", "softail", "dyna", "sportster"], years: null, note: "ライザー等を社外品に交換している場合は付かないことがあります" },
      sourceUrl: "https://thirdplace.cart.fc2.com/ca20/65/p-r-s/",
      demo: false,
      sortId: 65
    },
    {
      handle: "third-place-alien-tee",
      title: "サードプレイス エイリアン Tシャツ",
      vendor: "THIRD PLACE",
      productType: "apparel",
      condition: "new",
      source: "original",
      tags: ["ORIGINAL"],
      price: 2000,
      inventory: null,
      images: [
        { src: "ca13_176_1.jpg", alt: "サードプレイス エイリアン Tシャツ バックプリント", fit: "cover" },
        { src: "ca13_176_2.jpg", alt: "サードプレイス エイリアン Tシャツ フロント", fit: "cover" }
      ],
      summary: "ショップオリジナルのTシャツ。",
      description: ["サードプレイスのオリジナルTシャツです。"],
      specs: { partNumber: null, oemNumber: null, color: "ブラック", conditionNote: "新品", accessories: null },
      fitment: null,
      sourceUrl: "https://thirdplace.cart.fc2.com/ca13/176/p-r-s/",
      demo: false,
      sortId: 176
    },
    {
      handle: "demo-used-genuine-solo-seat",
      title: "【DEMOサンプル】純正 ソロシート（中古）",
      vendor: "Harley-Davidson 純正",
      productType: "dressup",
      condition: "used",
      source: "oem",
      tags: ["USED", "DEMO"],
      price: null,
      inventory: 1,
      images: [],
      summary: "中古品の掲載イメージです。実在する商品ではありません。",
      description: [
        "このページは中古パーツの掲載イメージを確認するためのサンプルです。実在する商品ではありません。",
        "本番では、状態ランク・傷の位置の写真・取り外し車両の情報を掲載し、中古でも安心して買える構成にします。"
      ],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "（サンプル）状態ランク・傷の写真を掲載予定", accessories: null },
      fitment: { models: [], years: null, note: "サンプルのため未設定" },
      sourceUrl: null,
      demo: true,
      sortId: 1
    },
    {
      handle: "demo-used-genuine-cast-wheel",
      title: "【DEMOサンプル】純正 キャストホイール（中古）",
      vendor: "Harley-Davidson 純正",
      productType: "suspension",
      condition: "used",
      source: "oem",
      tags: ["USED", "DEMO"],
      price: null,
      inventory: 1,
      images: [],
      summary: "中古品の掲載イメージです。実在する商品ではありません。",
      description: ["このページは中古パーツの掲載イメージを確認するためのサンプルです。実在する商品ではありません。"],
      specs: { partNumber: null, oemNumber: null, color: null, conditionNote: "（サンプル）振れ・傷の有無を掲載予定", accessories: null },
      fitment: { models: [], years: null, note: "サンプルのため未設定" },
      sourceUrl: null,
      demo: true,
      sortId: 2
    }
  ]
};
