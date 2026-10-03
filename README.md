# THIRD PLACE デモECサイト

福岡・筑紫野のハーレーダビッドソン専門ショップ「THIRD PLACE」向けの提案用デモサイトです。
現行の FC2 カート（https://thirdplace.cart.fc2.com/ ）を刷新した場合のイメージを、オーナーに見てもらうために作りました。
決済・ログイン・在庫連携などは入っていません（契約後のフェーズで構築）。

- 作成日: 2026-10-02
- 構成: HTML / CSS / Vanilla JavaScript のみ（ライブラリなし。フォントのみ Google Fonts）
- 商品データ: 現行ショップの実在商品21件（価格・在庫は2026-10-02時点）＋ 中古のDEMOサンプル2件

## 見かた

- **いちばん手軽**: `index.html` をダブルクリックしてブラウザで開く（サーバー不要で全機能が動きます）
- **スマホ実機で見る**: 同じWi-Fi内で `python -m http.server 8000` を実行し、スマホで `http://<PCのIPアドレス>:8000/` を開く
- 社外の人に見せる場合は、Netlify / GitHub Pages / Cloudflare Pages などにフォルダごと置くだけで公開できます

---

## 1. ファイル一覧

```
demo-site/
├─ index.html          TOPページ
├─ products.html       商品一覧（検索・絞り込み）
├─ product.html        商品詳細（product.html?id=<handle>）
├─ about.html          THIRD PLACE PERFORMANCE（代表・ボンネビル・実績・年表・メディア）
├─ contact.html        適合相談・お問い合わせ（フォームはUIのみ）
├─ diamond-heads/index.html  DIAMOND HEADS JAPAN／ダイヤモンドカット特集（<base href="../">で共通ファイルを参照）
├─ css/style.css       デザイン全体（CSS変数でトークン管理）
├─ js/main.js          共通: ヘッダー・メニュー・フッター生成、商品カード、適合相談フォーム、TOP描画
├─ js/products.js      一覧ページ: 検索・絞り込み・並び替え・URL同期
├─ js/product.js       詳細ページ: ギャラリー・スペック・固定購入バー・構造化データ
├─ js/diamond-heads.js 特集ページ: 施工カテゴリー・ギャラリー描画、ライトボックス、スマホ固定CTA
├─ data/products.js    商品データ（JSONと同じ構造。Shopifyの項目名に対応）
├─ data/site.js        メディア掲載・年表・施工例ギャラリー・差し替え用写真枠のデータ
└─ assets/
   ├─ images/favicon.svg
   ├─ images/products/ 現行ショップの商品画像（JPEG＋WebP＋AVIF）
   ├─ diamond-heads/   ダイヤモンドカット施工例（DIAMOND HEADS JAPANブログ掲載写真。JPEG/WebP/AVIF、-sm はスマホ用）
   ├─ bonneville/      ボンネビル写真の置き場（未提供のためプレースホルダー表示）
   └─ founder/         代表写真の置き場（未提供のためプレースホルダー表示）
```

`products.json` を `fetch` する方式ではなく `products.js` にしたのは、HTMLをダブルクリックで開いた（file://）ときにも確実に動かすためです。中身は関数を含まない純粋なデータなので、そのままJSONに書き出せます。

## 2. TOPページ構成

| # | セクション | 内容 |
|---|---|---|
| 1 | HERO | HARLEY-DAVIDSON PARTS & CUSTOM / NEW・USED・RARE・DIAMOND CUT。背景はダイヤモンドカット加工品の実写 |
| – | AUTHORITY STRIP | EST. 2005／DYNO TUNING SINCE 2009／USA TRAINED／BONNEVILLE 10 YEARS／DIAMOND HEADS JAPAN |
| 2 | FIND YOUR PARTS | 車種（ワンタップで一覧へ）・カテゴリー・新品・中古/希少 |
| 3 | FEATURED PARTS | おすすめ8件 |
| 4 | RARE & VINTAGE | 廃盤マフラー2件の大型カード＋純正品番で探す補修部品リスト |
| 5 | DIAMOND HEADS JAPAN | FROM LAS VEGAS TO FUKUOKA。出典付きの経緯、施工例4点（スクロール時に弱い光が横切る）、オリジナル商品 |
| 6 | NEW ARRIVALS | 新着6件（Instagram風タイル） |
| 7 | THIRD PLACE PERFORMANCE | FROM FUKUOKA TO BONNEVILLE.／代表の言葉／ROAD GLIDE 85→117HP（注記付き） |
| 8 | FITMENT SUPPORT | WILL THIS FIT MY BIKE? 適合相談フォーム（車種・年式・型式・VIN下6桁・相談内容）＋電話・LINE |
| 9 | FEATURED / MEDIA | CLUB HARLEY・Virgin Harley・TAK'S PERFORMANCE PARTS（文字のみ・原記事リンク） |
| 10 | INSTAGRAM | @hdthirdplace へのギャラリー導線 |
| 11 | FOOTER | 所在地・電話・営業時間・定休日・メニュー・SNS・商標の注記 |

### DIAMOND HEADS JAPAN 特集（diamond-heads/）
HERO「光を、削り出す。」→ WHAT IS DIAMOND CUT? → BEFORE / AFTER → THREE CUT STYLES → THE POSSIBILITIES（8カテゴリー）→ ENGINE FEATURE → GALLERY（12枚・タップで拡大）→ BRAND STORY → NOT ONLY HARLEY → HOW TO ORDER → FAQ（7問）→ MAKE IT YOURS.（CTA）。スマホは画面下に小型の固定CTA。
ナビの「DIAMOND CUT」とTOPのDIAMOND HEADS JAPAN欄のFEATUREカードからリンク。出典・使用写真・不足写真は `00_資料/DIAMOND_HEADS特集_出典と写真_20261003.md`。

### ABOUTページ（THIRD PLACE PERFORMANCE）
BUILT IN JAPAN. / TESTED BY EXPERIENCE. / CONNECTED TO BONNEVILLE. → 代表 堤美樹雄の物語 → BONNEVILLE EXPERIENCE → PERFORMANCE, PROVEN.（85→117HP、130HP+） → HISTORY（2005〜2026） → FEATURED → SERVICES → SHOP INFO。
掲載事実の出典は `00_資料/掲載情報の出典_20261003.md`。

## 3. 実装した機能

- **商品一覧**: キーワード検索（全角・ハイフンなしの品番でもヒット。例「１６７７０８４ｄ」→ 16770-84D）、状態チップ（新品／中古・希少／純正／DIAMOND CUT／オリジナル）、車種・カテゴリー・ブランド・純正/社外・価格帯の絞り込み、並び替え、適用中条件のピル表示、0件時の案内
- **URL連動**: `products.html?model=softail&cat=exhaust` のように条件がURLに残るので、共有・戻る操作・TOPからの直リンクに対応
- **商品詳細**: スワイプできる画像ギャラリー＋サムネイル、タグ、価格、在庫状態、車種別バリエーション、適合ボックス（FITMENT）、スペック表（メーカー・品番・OEM番号・適合モデル・年式・カラー・状態/傷・付属品）、送料・支払・返品、関連パーツ、現行ショップの元ページへのリンク
- **適合相談フォーム**: 商品詳細から来ると商品名と車種を自動入力。必須チェック・VIN形式チェック・完了表示（送信はしない）
- **写真がない商品**: 壊れた画像を出さず、ロゴ入りの「PHOTO COMING SOON」を表示（例: 魔法シリーズ、DEMOサンプル）。読み込み失敗時も自動で差し替え
- **デモ表示の明示**: 上部の「DEMO SITE」帯、DEMOサンプル商品の注記、カート・LINEボタンは「デモのため動作しません」と案内
- **SEO**: ページごとの title / description、H1は各ページ1つ、alt、パンくず、商品詳細は「商品名（車種 年式）」のタイトルと schema.org Product の構造化データを自動生成
- **画像**: AVIF → WebP → JPEG の順で配信（`<picture>`）、width/height 指定でレイアウトのずれ防止、lazy loading
- **構造化データ**: TOPに MotorcycleRepair（住所・営業時間・創業者）、ABOUTに AboutPage
- **アニメーション**: ページ読み込みのフェード、スクロール時のフェードアップ、PCのみのホバー。`prefers-reduced-motion` で無効化

## 4. スマホ対応

- モバイルファーストで設計。ブレークポイントは 600px / 900px / 1200px の3つだけ
- 320〜390px で横スクロールなし（自動検査で全ページ×5幅を確認）
- 商品カードは2列、写真は正方形で大きく。白背景の製品写真は明るいプレートに載せて統一感を出す
- ボタン・チップ・入力欄は高さ44〜52px。入力欄は16pxでiPhoneの自動ズームを防止
- ヘッダーは固定。380px未満はロゴを縮めてアイコンを収める
- ハンバーガーメニュー（全画面・Escで閉じる・背景スクロール固定）
- 一覧の絞り込みはスマホでは下から出るシート（「◯件を表示」で結果件数が分かる）
- 商品詳細は価格・「適合相談」・「カートへ」の固定バーを画面下に表示
- 見出しはスマホで最大2〜3行に収まるサイズに調整

### 監査結果（2026-10-03更新、ヘッドレスChromeで自動検査）

| 幅 | 横スクロール | JSエラー | 画像切れ | 12px未満の文字 |
|---|---|---|---|---|
| 1440 / 1280 / 390 / 360 / 320 | なし | 0 | 0 | 0 |

対象: TOP・一覧・一覧（ソフテイル絞り込み）・詳細3種（通常／写真なし／DEMO）・ABOUT・CONTACT。
メニュー開閉、絞り込み、品番検索、フォームの検証と完了、ギャラリー切替、固定バー、404商品の表示も操作して確認済み。

## 5. Shopify等へ移行するとき再利用できる部分

| デモの要素 | Shopifyでの移行先 |
|---|---|
| `data/products.js` の `handle / title / vendor / productType / tags / price / compareAtPrice / inventory / images / variants` | 商品CSVインポートの同名列にそのまま対応 |
| `fitment`（models / years / note）、`specs`（partNumber / oemNumber / color / conditionNote / accessories） | メタフィールド（例: `custom.fitment_models`, `custom.oem_number`）。車種・年式での絞り込みは Search & Discovery アプリで実装 |
| `condition` / `source` / `tags`（RARE, DIAMOND CUT, GENUINE, USED） | タグまたはメタフィールド。一覧の状態チップと同じ分類で使える |
| `css/style.css` のCSS変数（色・フォント・余白） | テーマの `settings_schema` と CSS にそのまま移植 |
| 商品カード・ギャラリー・適合ボックス・固定購入バー・適合相談フォーム | テーマのセクション／スニペット（Liquid）として作り直す際の設計図 |
| `SHOP` 定数（住所・電話・営業時間・SNS） | テーマ設定 |
| 商品画像（最適化済み） | 商品画像としてアップロード |

## 本番前にオーナーへ確認が必要なこと

- 代表の写真、ボンネビルの写真（THIRD PLACEが権利を持つもの）の提供 → `data/site.js` で差し替え
- DIAMOND HEADS JAPANブログの施工写真4点（顧客車両を含む）をサイトに使ってよいか
- 「世界で初めて技術皆伝を許された」（TAK'S記事の表現）をサイト本文に載せるか。現状は「技術の伝授を許され」と控えめに要約
- Virgin Harley記事の見出しにある代表の言葉を、代表の言葉としてサイトに使ってよいか
- 主に使うInstagramアカウント（@hdthirdplace / @thirdplace_japan）
- 掲載画像の利用許可（一部メーカーサイトのスクリーンショットを含む）
- 価格が税込表示かどうか
- LINE公式アカウントのURL
