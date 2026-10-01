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
├─ about.html          ショップについて
├─ contact.html        適合相談・お問い合わせ（フォームはUIのみ）
├─ css/style.css       デザイン全体（CSS変数でトークン管理）
├─ js/main.js          共通: ヘッダー・メニュー・フッター生成、商品カード、適合相談フォーム、TOP描画
├─ js/products.js      一覧ページ: 検索・絞り込み・並び替え・URL同期
├─ js/product.js       詳細ページ: ギャラリー・スペック・固定購入バー・構造化データ
├─ data/products.js    商品データ（JSONと同じ構造。Shopifyの項目名に対応）
└─ assets/images/
   ├─ favicon.svg
   └─ products/        現行ショップの商品画像（最大1200pxに最適化済み）
```

`products.json` を `fetch` する方式ではなく `products.js` にしたのは、HTMLをダブルクリックで開いた（file://）ときにも確実に動かすためです。中身は関数を含まない純粋なデータなので、そのままJSONに書き出せます。

## 2. TOPページ構成

| # | セクション | 内容 |
|---|---|---|
| 1 | HERO | HARLEY-DAVIDSON PARTS & CUSTOM / NEW・USED・RARE・DIAMOND CUT。背景はダイヤモンドカット加工品の実写 |
| – | 信頼バー | 福岡の実店舗／適合相談／送料一律1,000円／古物商許可番号（3秒で「専門店」と伝える） |
| 2 | FIND YOUR PARTS | 車種（ワンタップで一覧へ）・カテゴリー・新品・中古/希少 |
| 3 | FEATURED PARTS | おすすめ8件 |
| 4 | RARE & VINTAGE | 廃盤マフラー2件の大型カード＋純正品番で探す補修部品リスト |
| 5 | DIAMOND CUT（SHOP ORIGINAL） | 店の最大の武器であるダイヤモンドカット加工の紹介＋加工済みオリジナル商品 |
| 6 | NEW ARRIVALS | 新着6件（Instagram風タイル） |
| 7 | ABOUT THIRD PLACE | 短いステートメントと実績数字 |
| 8 | FITMENT SUPPORT | WILL THIS FIT MY BIKE? 適合相談フォーム（車種・年式・型式・VIN下6桁・相談内容）＋電話・LINE |
| 9 | INSTAGRAM | @hdthirdplace へのギャラリー導線 |
| 10 | FOOTER | 所在地・電話・営業時間・定休日・メニュー・SNS・商標の注記 |

## 3. 実装した機能

- **商品一覧**: キーワード検索（全角・ハイフンなしの品番でもヒット。例「１６７７０８４ｄ」→ 16770-84D）、状態チップ（新品／中古・希少／純正／DIAMOND CUT／オリジナル）、車種・カテゴリー・ブランド・純正/社外・価格帯の絞り込み、並び替え、適用中条件のピル表示、0件時の案内
- **URL連動**: `products.html?model=softail&cat=exhaust` のように条件がURLに残るので、共有・戻る操作・TOPからの直リンクに対応
- **商品詳細**: スワイプできる画像ギャラリー＋サムネイル、タグ、価格、在庫状態、車種別バリエーション、適合ボックス（FITMENT）、スペック表（メーカー・品番・OEM番号・適合モデル・年式・カラー・状態/傷・付属品）、送料・支払・返品、関連パーツ、現行ショップの元ページへのリンク
- **適合相談フォーム**: 商品詳細から来ると商品名と車種を自動入力。必須チェック・VIN形式チェック・完了表示（送信はしない）
- **写真がない商品**: 壊れた画像を出さず、ロゴ入りの「PHOTO COMING SOON」を表示（例: 魔法シリーズ、DEMOサンプル）。読み込み失敗時も自動で差し替え
- **デモ表示の明示**: 上部の「DEMO SITE」帯、DEMOサンプル商品の注記、カート・LINEボタンは「デモのため動作しません」と案内
- **SEO**: ページごとの title / description、H1は各ページ1つ、alt、パンくず、商品詳細は「商品名（車種 年式）」のタイトルと schema.org Product の構造化データを自動生成
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

### 監査結果（2026-10-02、ヘッドレスChromeで自動検査）

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

- 営業時間（10:00開始か10:30開始か。HPとブログで表記が違う）
- 「世界で2ヶ所しかできない」等、ダイヤモンドカットの訴求表現をどこまで使うか
- 主に使うInstagramアカウント（@hdthirdplace / @thirdplace_japan）
- 掲載画像の利用許可（一部メーカーサイトのスクリーンショットを含む）
- 価格が税込表示かどうか
- LINE公式アカウントのURL
