# 株式会社リンクワーク 自社HP プロジェクトメモ

## プロジェクト概要

就労継続支援事業所「株式会社リンクワーク」のコーポレートサイト。
軽作業・IT業務を通じて障害のある方の就労を支援する事業所。

## ファイル構成

```
80_自社HP/
├── index.html        ← トップページ（メイン）
├── business.html     ← 事業内容ページ
├── script.js         ← スクロールアニメーション・ヘッダー制御
├── css/
│   ├── reset.css     ← リセット
│   ├── style.css     ← 共通スタイル
│   ├── work.css      ← index.html のメインCSS
│   └── business.css  ← business.html のCSS
└── img/              ← 画像・動画素材
```

## デザイン仕様

### カラー変数（work.css の :root）

| 変数 | 値 | 用途 |
|------|----|----|
| `--ink` | `#171b20` | メイン文字色 |
| `--muted` | `#66707a` | サブ文字色・補足テキスト |
| `--green` | `#3a6b5e` | ブランドカラー・CTAボタン |
| `--copper` | `#d86f45` | アクセント橙・装飾 |
| `--bg` | `#fafaf7` | ベース背景 |
| `--line` | `rgba(23,27,32,0.12)` | 罫線・区切り |

### フォント

- **Noto Sans JP** → 本文・ナビ（日本語全般）
- **Shippori Mincho** → 大見出し（明朝体・高級感）
- **Inter** → 英字ラベル・数字（"01" など）

---

## index.html の構成

| セクション | クラス名 | 内容 |
|-----------|---------|------|
| ヒーロー | `.home_hero` | 3枚クロスフェード背景＋テキストアニメーション |
| About | `.home_about` | 画像＋テキスト2カラム |
| サービス | `.home_services` | 軽作業・IT業務の2カードグリッド |
| Work Scene | `.home_work` | 背景動画（`背景画像用３人がデスクで話す(私服).mp4`）＋緑オーバーレイ |
| フロー | `.home_flow` | 利用までの流れ（タイムライン4ステップ） |
| FAQ | `.home_faq` | `<details><summary>` アコーディオン |
| コンタクト | `.home_contact` | お問い合わせフォーム（グラスモーフィズム） |

### js_soft_reveal について

`js_soft_reveal` クラスを付けた要素は初期状態で `opacity: 0`。
`script.js` の IntersectionObserver が画面内に入ったとき `is_visible` クラスを付与してふわっと表示。

---

## business.html の構成

| セクション | 内容 |
|-----------|------|
| ヒーロー | キャッチコピー＋2ボタン＋右側画像 |
| 作業風景ギャラリー | 横スクロールアニメーション（写真4枚ループ） |
| 軽作業 | 動画（`軽作業風景_2.mp4`）＋作業内容グリッド |
| IT業務 | 動画（`オフィスで話あっている動画.mp4`）＋サービス2種 |
| 1日の流れ | タイムライン形式（9:15〜15:00） |
| CTA | お問い合わせ誘導 |

> ⚠ 「支援のしくみ」セクションは削除済み（本物の利用者の声が集まった時点で追加予定）

---

## これまでの主な作業内容

### work.css のリファクタリング
- `rgba(23,27,32,0.08/0.12)` → `var(--line)` に統一
- `--bg-card` 変数（未使用）削除
- `.home_page .header.header_scrolled` の重複ルール削除
- `nth-child(1,3)/(2,4)` → `nth-child(odd/even)` に書き換え
- 緑の透明度 `0.32` / `0.35` → `0.33` に統一

### index.html の変更
- ヒーロー右下パネルを3列 → 2列（`home_hero_panel_two`）に変更
- About セクションに「見学の相談をする」ボタン追加
- Work Scene セクションの背景を画像 → 動画に変更

### business.html の変更
- 軽作業セクションの画像 → 動画（`軽作業風景_2.mp4`）に変更
- 「支援のしくみ」セクション削除（ナビ・CSS・descriptionも含む）

---

## 動画埋め込みの定石パターン

```css
/* 親 */
.親要素 {
  position: relative;
  min-height: 52rem; /* absoluteの子は親の高さを押し広げないので必須 */
}

/* 子（動画） */
.親要素 video {
  position: absolute;
  inset: 0;           /* 親の四隅に張り付く */
  width: 100%;
  height: 100%;
  object-fit: cover;  /* 黒帯なし・縦横比保持 */
}
```

```html
<video autoplay muted loop playsinline aria-hidden="true">
  <source src="img/動画ファイル名.mp4" type="video/mp4" />
</video>
```

---

## 今後やること（候補）

- [ ] 利用者の声・事業者の声（本物の声が集まり次第追加）
- [ ] business.html の「支援のしくみ」代替コンテンツ検討
- [ ] スマホ表示の最終確認
- [ ] フォームの送信先設定（現状 `action="#"` でダミー）
- [ ] 住所・電話番号・メールアドレスの本番データへの差し替え
