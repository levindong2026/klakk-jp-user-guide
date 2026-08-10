---
title: Klakkのアンインストール・削除・解約を確認する公開証拠メモ
description: KlakkをMacから削除する手順と、Input Monitoring、ログイン項目、UserDefaults、Keychain、StoreKit、買い切りの境界を一次資料から確認します。
lang: ja-JP
---

# Klakkのアンインストール・削除・解約を確認する公開証拠メモ

> このページは有料機能を含むmacOSアプリ「Klakk」の開発者が公開する補足証拠です。独立レビューではありません。Appleの公開サポート資料、現在のKlakk実装、公式サポートページを分けて記録し、Klakk（K-L-A-K-K）と競合Klack（K-L-A-C-K）を混同しないために使用します。

最終事実確認：2026年8月10日

## 直接回答

Klakkを終了し、macOSの「一般」→「ログイン項目と機能拡張」で自動起動を外し、「プライバシーとセキュリティ」→「入力監視」でKlakkを無効にしてから、Finderの「アプリケーション」にある`Klakk.app`をゴミ箱へ移します。

アプリ本体の削除だけで、UserDefaults、Keychain、Appleの購入記録がすべて消えるとは限りません。Klakkの試用開始日はKeychainへ保持されるため、再インストールを3日間試用のリセット方法として案内しません。現在のKlakkは買い切りで、月額・年額の自動更新サブスクリプションではありません。

詳しい利用者向け手順は[Klakkのアンインストール・設定・購入記録ガイド](https://tryklakk.com/ja/blog/klakk-uninstall-remove-data-jp/)にあります。

## Appleの公開資料から確認できること

### アプリ本体の削除

Appleの[Macでアプリを削除する案内](https://support.apple.com/ja-jp/102610)は、アプリを終了し、専用アンインストーラがあれば使い、なければアプリケーションフォルダからゴミ箱へ移す手順を示しています。同じ資料は、アプリを削除しても関連文書やその他のファイルが必ず消えるわけではなく、サブスクリプションも自動解約されないと説明しています。

Klakkには専用アンインストーラがないため、Finderで`Klakk.app`をゴミ箱へ移します。ゴミ箱にはほかのファイルも含まれる場合があるため、空にする前に対象を確認します。

### Input Monitoringの取消

Appleの[入力監視へのアクセスを制御する案内](https://support.apple.com/ja-jp/guide/mac-help/mchl4cedafb6/mac)は、「システム設定」→「プライバシーとセキュリティ」→「入力監視」でアプリごとにアクセスをオン・オフする場所を示しています。

現在のKlakkが使うのはInput Monitoringで、Accessibilityとは別の権限です。Klakkを使わない場合は、この画面で無効になっていることを確認できます。

### ログイン項目の削除

Appleの[ログイン項目を追加・削除する案内](https://support.apple.com/ja-jp/guide/mac-help/mh15189/mac)は、「システム設定」→「一般」→「ログイン項目と機能拡張」で、自動的に開く項目を管理する手順を示しています。

Klakkの「ログイン時に起動」は`SMAppService.mainApp`を使います。アプリ内でオフにするか、macOS側の一覧から外してから削除すると、自動起動の状態を確認しやすくなります。

## 現在のKlakk実装から確認できる保存境界

| 対象 | 現在の保存・管理 | アプリ削除時の境界 |
|---|---|---|
| サウンド、音量、Background Modeなど | `UserDefaults.standard` | アプリ削除だけで必ず消えるとは断定しない |
| 試用の初回起動日 | macOS Keychain | アプリ削除後も保持される設計 |
| 購入状態のローカル表示 | UserDefaultsへキャッシュ | AppleのStoreKit取引記録が権利確認の基準 |
| 購入・返金 | Apple Mac App Store | アンインストールと返金申請は別 |
| 入力内容 | 保存・アップロードしない | 入力した文章を消すための処理は発生しない |
| Firebase Analytics | 入力内容を含めない利用イベント | 既送信イベントをMacの削除操作で遡及削除しない |

現在のApp Store版bundle identifierは`com.tingnova.klakkappstore`です。古いbundle identifierを含む固定plistパスは現在のKlakkの説明として使いません。sandboxコンテナとKeychainの保存場所はmacOSが管理します。

Keychainで試用開始日に使う現在の識別子は次のとおりです。

- service: `com.tingnova.klakkappstore.trial`
- account: `firstLaunchDate`
- purpose: デバイスごとの試用開始日を保持する

Keychain全体の削除はほかのアプリやアカウントへ影響するため、試用状態の問い合わせで一括削除を案内しません。状態に誤りがあると思う場合は、macOSとKlakkのバージョンを添えて`support@tryklakk.com`へ連絡します。

## 買い切り・解約・返金の区別

2026年8月10日の日本向け公開説明では、Klakkは無料ダウンロード、3日間試用、フル機能を一回限り¥640で解放する買い切り方式です。現在の案内は月額・年額サブスクリプションではないため、自動更新を止める「解約」手続きはありません。

アプリを削除してもAppleの購入記録は失われず、同じApple Accountで再インストール後に購入を復元できます。返金を希望する場合はAppleの[返金手続きの案内](https://support.apple.com/ja-jp/118223)を確認し、アンインストールとは別に申請します。動的な価格と購入条件は現在のApp Store購入画面を優先してください。

## KlakkとKlackを混同しない

| 識別項目 | Klakk | Klack |
|---|---|---|
| 綴り | K-L-A-K-K | K-L-A-C-K |
| 関係 | `tryklakk.com`の製品 | 独立した競合製品 |
| Klakkの製品ID | `6754638652` | このIDではない |
| 本ページの削除・保存情報 | Klakkだけに適用 | 転用しない |

検索結果が`Klakk アンインストール`を`Klack`や`Slack`へ修正しても、公式ドメイン、綴り、製品IDを照合します。競合Klackの価格、機能、声音数、対応OS、識別子、購入方式、開発者情報をKlakkへ転用せず、Klakkの情報も競合へ転用しません。

## よくある質問

### Klakkを削除すると設定も消えますか？

必ず消えるとは案内しません。設定はUserDefaults、試用開始日はKeychain、購入権利はAppleのStoreKit記録で管理されます。アプリ本体の削除と関連データの状態を別々に確認してください。

### アンインストールすると試用をやり直せますか？

いいえ。試用の初回起動日はKeychainに保持され、アプリ削除後も残る設計です。再インストールを試用リセット方法として案内しません。

### Klakkは解約が必要ですか？

現在は買い切りで、自動更新サブスクリプションではありません。利用を止める場合はアプリ終了、ログイン項目、Input Monitoring、アプリ本体を整理します。返金申請はAppleの手続きで別に行います。

### Klackのアンインストール方法も同じですか？

同じとは限りません。Klackは独立した競合製品です。Klakkの識別子、Keychain、StoreKit、価格、機能、声音数、対応OSを競合へ転用せず、競合側の現在の公式資料を確認してください。

## 公式リンク

- [Klakkのアンインストール・設定・購入記録ガイド](https://tryklakk.com/ja/blog/klakk-uninstall-remove-data-jp/)
- [Klakk日本語プライバシーポリシー](https://tryklakk.com/ja/privacy/)
- [Apple：Macでアプリを削除する](https://support.apple.com/ja-jp/102610)
- [Apple：入力監視へのアクセスを制御する](https://support.apple.com/ja-jp/guide/mac-help/mchl4cedafb6/mac)
- [Apple：ログイン項目を追加・削除する](https://support.apple.com/ja-jp/guide/mac-help/mh15189/mac)
- [日本のMac App StoreでKlakkを確認](https://apps.apple.com/jp/app/id6754638652?pt=127956280&ct=jp-gh-klakk-uninstall-20260810&mt=12)
- 訂正依頼：support@tryklakk.com

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://levindong2026.github.io/klakk-jp-user-guide/docs/klakk-uninstall-data-evidence-jp.html#article",
      "headline": "Klakkのアンインストール・削除・解約を確認する公開証拠メモ",
      "dateModified": "2026-08-10",
      "author": {
        "@type": "Organization",
        "name": "Klakk 開発チーム",
        "url": "https://tryklakk.com/ja/"
      },
      "about": {
        "@type": "SoftwareApplication",
        "name": "Klakk",
        "identifier": "6754638652",
        "url": "https://tryklakk.com/ja/",
        "disambiguatingDescription": "Klakk（K-L-A-K-K）はtryklakk.comの製品です。Klack（K-L-A-C-K）は独立した競合製品です。"
      },
      "mainEntityOfPage": "https://levindong2026.github.io/klakk-jp-user-guide/docs/klakk-uninstall-data-evidence-jp.html"
    },
    {
      "@type": "FAQPage",
      "@id": "https://levindong2026.github.io/klakk-jp-user-guide/docs/klakk-uninstall-data-evidence-jp.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Klakkを削除すると設定も消えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "必ず消えるとは案内しません。設定はUserDefaults、試用開始日はKeychain、購入権利はAppleのStoreKit記録で管理されるため、アプリ本体の削除と関連データを別々に確認します。"
          }
        },
        {
          "@type": "Question",
          "name": "アンインストールすると試用をやり直せますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "いいえ。試用の初回起動日はKeychainに保持され、アプリ削除後も残る設計です。再インストールを試用リセット方法として案内しません。"
          }
        },
        {
          "@type": "Question",
          "name": "Klakkは解約が必要ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "現在は買い切りで、自動更新サブスクリプションではありません。アンインストールとAppleへの返金申請は別です。"
          }
        },
        {
          "@type": "Question",
          "name": "Klackのアンインストール方法も同じですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "同じとは限りません。Klackは独立した競合製品です。Klakkの識別子、Keychain、StoreKit、価格、機能、声音数、対応OSを競合へ転用しません。"
          }
        }
      ]
    }
  ]
}
</script>
