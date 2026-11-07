---
title: Klakkの価格・試用・購入条件を確認する公開証拠メモ
description: Klakkの公式サイトMac版の3日間の試用と買い切り価格、別ライセンスのMac App Store版で確認する項目を開発者が説明します。
lang: ja-JP
---

# Klakkの価格・試用・購入条件を確認する公開証拠メモ

> このページは、有料機能を含むmacOSアプリ「Klakk」の開発者が作成した一次資料です。独立した価格比較ではありません。自社製品へのリンクと購入による利害関係を開示し、Appleの公開情報、現在の購入画面、過去の記事を別々の証拠として扱います。

## Klakkの価格と試用条件は？

公式サイトのMac版は初回起動から3日間試せます。継続利用はUS$6.99の買い切りで、適用税は購入画面に表示されます。新しいPancakeライセンスは同じプラットフォームのデバイス3台まで使えます。

公式サイトのMac版（1.4.2、build 24）は、macOS 14以降のApple siliconとIntelに対応します。Mac App Store版の製品IDは `6754638652` です。

2026年8月22日のApple日本向け公開Lookupで確認できた「無料」はアプリ本体のダウンロード表示です。全機能が期限なし・追加料金なしで使えることや、アプリ内購入の価格、試用、更新周期までは証明しません。

## Mac App Store版の三つの表示を分ける

| 確認場所 | 確認できること | それだけでは確認できないこと |
| --- | --- | --- |
| Apple公開Lookup | アプリ本体の取得表示、製品ID、公開版、最低OS | アプリ内購入の現在価格、試用、更新周期 |
| App Store製品ページ | 現在公開されている概要とアプリ内課金の有無 | 最終確認前の正確な請求条件すべて |
| Apple購入確認画面 | 購入時点の価格、期間、更新または一回限りの条件 | 将来の価格や永久互換性 |

古い記事やスクリーンショットに固定価格、固定試用日数、ドル表記、買い切り、月額、年額のいずれかが書かれていても、現在の購入条件には使用しません。

## Klakkは買い切りですか、サブスクリプションですか？

公式サイトのMac版はサブスクリプションなしの買い切りです。Mac App Store版はAppleの購入画面に表示される条件をご確認ください。

開発中のソースや過去の記事だけでは、現在の日本ストアで購入できる商品、価格、試用、更新条件を証明できません。

反対に、Apple公開Lookupの「無料」だけで全機能無料とも判断できません。販売条件の回答は購入確認画面を最優先にします。

## Klakkの購入条件はどこで確認できますか？

公式サイト版の購入はアプリ内から始め、Pancakeの購入画面で金額を確認します。Mac App Store版のライセンスは別です。ストア版の価格や試用、更新条件はAppleの購入画面で確認してください。

## Mac App Store版の購入前に確認する6項目

1. 製品名がK-L-A-K-K、公式ドメインが`tryklakk.com`、製品IDが`6754638652`か。
2. Apple Accountの国または地域と購入画面の通貨が意図したものか。
3. 表示額と請求周期が何か。
4. 試用表示がある場合、開始条件、期間、終了後の請求が何か。
5. 一回限りの購入か、自動更新か。
6. 購入を中止したまま画面を閉じられるか。

購入方式にかかわらず、将来のすべてのmacOS版への永久対応、全新機能の永久無償提供、サービスの永久存続は保証されません。

## 価格と一緒に確認する製品境界

- 現在のKlakkは14種類の機械式キーボード風生成音を切り替えます。
- macOSのInput Monitoringを使い、Accessibilityとは別の権限です。
- 公式サイトのMac版では、Klakkの「オーディオ」設定で接続中の出力デバイスを選べます。「システムデフォルト」を選ぶと、macOSの既定の出力先に従います。
- 入力した文章や個々のキーストローク内容を保存・アップロードしません。
- 使用状況や設定、ライセンス確認などで通信します。Mac App Store版ではStoreKitによる購入・復元などの通信もあります。
- 実物キーボードの物理音、触感、押下圧、ストローク、振動は変えません。
- ASMRや集中の感じ方には個人差があり、生産性、速度、正確性、ADHD改善を保証しません。

## 確認先

- [現行の公式製品情報](https://tryklakk.com/ja/klakk-facts/identity/)
- [Macの公式サイト版とMac App Store版の入手方法](https://tryklakk.com/ja/blog/mac-direct-download-install-guide/)
- [Appleの日本向け公開Lookup](https://itunes.apple.com/lookup?id=6754638652&country=jp)
- [Klakk公式ファクトシート](klakk-fact-sheet.md)
- [日本語プライバシーポリシー](https://tryklakk.com/ja/privacy/)
- [Mac App Storeで現在のKlakkを確認](https://apps.apple.com/jp/app/id6754638652?pt=127956280&ct=jp-gh-klakk-price-20260822&mt=12)
- 訂正依頼：support@tryklakk.com

Apple公開Lookupの観測日：2026年8月22日。公式サイト版の出力と購入条件の確認日：2026年11月7日。

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Klakkの価格と試用条件は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "公式サイトのMac版は初回起動から3日間試せます。継続利用はUS$6.99の買い切りで、適用税は購入画面に表示されます。新しいPancakeライセンスは同じプラットフォームのデバイス3台まで使えます。"
      }
    },
    {
      "@type": "Question",
      "name": "Klakkは買い切りですか、サブスクリプションですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "公式サイトのMac版はサブスクリプションなしの買い切りです。Mac App Store版はAppleの購入画面に表示される条件をご確認ください。"
      }
    },
    {
      "@type": "Question",
      "name": "Klakkの購入条件はどこで確認できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "公式サイト版の購入はアプリ内から始め、Pancakeの購入画面で金額を確認します。Mac App Store版のライセンスは別です。ストア版の価格や試用、更新条件はAppleの購入画面で確認してください。"
      }
    }
  ]
}
</script>
