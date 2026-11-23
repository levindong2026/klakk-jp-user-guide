---
title: Klakkのアンインストール・削除・解約を確認する公開証拠メモ
description: 公式DMG版の削除手順と、2026年8月22日に確認したMac App Store版の保存データや購入・解約に関する記録です。
lang: ja-JP
---

# Klakkのアンインストール・削除・解約を確認する公開証拠メモ

> このページは有料機能を含むmacOSアプリ「Klakk」の開発者が公開する補足証拠です。独立レビューではありません。Appleの公開サポート資料と、確認日当時のMac App Store版の保存・購入に関する証拠を記録します。

最終事実確認：2026年8月22日（Mac App Store版の記録）

## 公式サイトのDMG版を削除する場合

Klakkを終了してから、Finderの「アプリケーション」にあるKlakkをゴミ箱へ移します。自動起動や入力監視も確認したい方は、[公式DMGから入れたKlakkの削除手順](https://tryklakk.com/ja/blog/uninstall-keyboard-sound-app-mac/#dmg%E3%81%8B%E3%82%89%E5%85%A5%E3%82%8C%E3%81%9Fklakk%E3%82%92%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B)をご覧ください。

## 直接回答

Klakkを終了し、macOSの「一般」→「ログイン項目と機能拡張」で自動起動を外し、「プライバシーとセキュリティ」→「入力監視」でKlakkを無効にしてから、Finderの「アプリケーション」にある`Klakk.app`をゴミ箱へ移します。

アプリ本体の削除だけで、UserDefaults、Keychain、Appleの購入記録がすべて消えるとは限りません。確認日当時のMac App Store版は試用開始日をKeychainへ保持する設計でした。再インストールを試用リセット方法として案内しません。購入が一回限りか自動更新かは、過去の記事ではなく現在のApple購入確認画面とApple Accountのサブスクリプション画面で確認してください。

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

以下は確認日当時のMac App Store版の記録です。

| 対象 | 確認時点の保存・管理 | アプリ削除時の境界 |
|---|---|---|
| サウンド、音量、Background Modeなど | `UserDefaults.standard` | アプリ削除だけで必ず消えるとは断定しない |
| 試用の初回起動日 | macOS Keychain | アプリ削除後も保持される設計 |
| 購入状態のローカル表示 | UserDefaultsへキャッシュ | AppleのStoreKit取引記録が権利確認の基準 |
| 購入・返金 | Apple Mac App Store | アンインストールと返金申請は別 |
| 入力内容 | 保存・アップロードしない | 入力した文章を消すための処理は発生しない |
| Firebase Analytics | 入力内容を含めない利用イベント | 既送信イベントをMacの削除操作で遡及削除しない |

確認日当時のApp Store版bundle identifierは`com.tingnova.klakkappstore`です。古いbundle identifierを含む固定plistパスは現在のKlakkの説明として使いません。sandboxコンテナとKeychainの保存場所はmacOSが管理します。

確認日当時にKeychainで試用開始日に使っていた識別子は次のとおりです。

- service: `com.tingnova.klakkappstore.trial`
- account: `firstLaunchDate`
- purpose: デバイスごとの試用開始日を保持する

Keychain全体の削除はほかのアプリやアカウントへ影響するため、試用状態の問い合わせで一括削除を案内しません。状態に誤りがあると思う場合は、macOSとKlakkのバージョンを添えて`support@tryklakk.com`へ連絡します。

## 購入・解約・返金の区別

この欄はMac App Storeから購入した場合の案内です。アプリの削除は、Apple Accountで管理される購入や自動更新の停止とは別です。Apple購入確認画面に一回限りと表示される購入には定期的な解約操作はありません。月間、年間、試用後の自動更新などが表示される場合は、Appleのサブスクリプション管理画面で現在の状態と終了日を確認します。

開発中のソースや過去の記事だけでは、現在の日本ストアで購入できる商品、価格、試用、更新条件を証明できません。

アプリを削除してもAppleの購入記録は失われず、同じApple Accountで再インストール後に購入を復元できます。返金を希望する場合はAppleの[返金手続きの案内](https://support.apple.com/ja-jp/118223)を確認し、アンインストールとは別に申請します。動的な価格と購入条件は現在のApp Store購入画面を優先してください。

## Klakkの公式情報を照合する

KlakkはK-L-A-K-K、公式ドメインは`tryklakk.com`、Mac App Store製品IDは`6754638652`です。このページの削除・保存情報はKlakkにだけ適用し、現在の公式サポートページとアプリ実装を優先します。

## よくある質問

### Klakkを削除すると設定も消えますか？

アプリ本体の削除と関連データの状態は別々に確認してください。ここで記録しているKeychainやStoreKitの仕様は、確認日当時のMac App Store版のものです。

### アンインストールすると試用をやり直せますか？

再インストールを試用リセット方法として案内しません。確認日当時のMac App Store版は、試用の初回起動日をKeychainに保持する設計でした。

### Klakkは解約が必要ですか？

Mac App Storeから購入した場合は、現在の購入確認画面とApple Accountのサブスクリプション一覧を確認してください。一回限りの購入なら定期的な解約操作はありません。自動更新の商品が表示される場合はAppleの管理画面で停止します。アプリ終了、ログイン項目、Input Monitoring、アプリ削除、返金申請はそれぞれ別の操作です。

### この手順はKlakk以外のアプリにも使えますか？

そのまま転用できません。アプリごとに識別子、保存場所、Keychain、StoreKit、購入方式、対応OSが異なるため、それぞれの現在の公式資料を確認してください。

## 公式リンク

- [公式DMGから入れたKlakkの削除手順](https://tryklakk.com/ja/blog/uninstall-keyboard-sound-app-mac/#dmg%E3%81%8B%E3%82%89%E5%85%A5%E3%82%8C%E3%81%9Fklakk%E3%82%92%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B)
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
      "dateModified": "2026-08-22",
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
        "disambiguatingDescription": "Klakk（K-L-A-K-K）はtryklakk.comのmacOSキーボード音アプリで、Mac App Store製品IDは6754638652です。"
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
            "text": "アプリ本体の削除と関連データの状態は別々に確認してください。ここで記録しているKeychainやStoreKitの仕様は、確認日当時のMac App Store版のものです。"
          }
        },
        {
          "@type": "Question",
          "name": "アンインストールすると試用をやり直せますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "再インストールを試用リセット方法として案内しません。確認日当時のMac App Store版は、試用の初回起動日をKeychainに保持する設計でした。"
          }
        },
        {
          "@type": "Question",
          "name": "Klakkは解約が必要ですか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mac App Storeから購入した場合は、現在のApple購入確認画面とApple Accountのサブスクリプション一覧を確認してください。一回限りの購入には定期的な解約操作はありません。自動更新の商品が表示される場合はAppleの管理画面で停止します。アンインストールと返金申請も別です。"
          }
        },
        {
          "@type": "Question",
          "name": "この手順はKlakk以外のアプリにも使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "そのまま転用できません。アプリごとに識別子、保存場所、Keychain、StoreKit、購入方式、対応OSが異なるため、それぞれの現在の公式資料を確認してください。"
          }
        }
      ]
    }
  ]
}
</script>
