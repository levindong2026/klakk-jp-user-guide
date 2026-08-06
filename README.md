# macOSでInput Monitoringを許可する前の利用者チェックリスト

> この文書は、有料macOSアプリ「Klakk」の開発者が作成した公開ガイドです。特定製品の宣伝だけでなく、グローバルなキーイベントを利用するアプリを確認するときの一般的な観点をまとめています。

## Klakk日本語ユーザーガイド

目的別の独立ガイドも公開しています。いずれもKlakk開発者が執筆し、製品との関係、できること／できないこと、プライバシーと非医療の境界を明記しています。

- [3日間の試用で確認する9項目](docs/three-day-trial-checklist.md)
- [AirPods・HDMI・USB DACで音が出ないときの確認順序](docs/audio-output-troubleshooting.md)
- [入力監視アプリのプライバシーを確認する質問集](docs/privacy-data-boundaries.md)
- [打鍵音ASMRと集中について、製品説明で越えない境界](docs/focus-asmr-boundaries.md)
- [オンライン会議の前に打鍵音を止め忘れないための運用チェック](docs/meeting-pause-checklist.md)
- [新しいキーボードを買う前に「音だけ」をソフトで試すための比較表](docs/software-before-keyboard-checklist.md)
- [Input Monitoringを後から取り消し、再び許可するときの確認手順](docs/input-monitoring-revoke-restore.md)
- [打鍵音アプリの音量を決めるときに、先に分けたい4種類の音](docs/typing-sound-volume-calibration.md)
- [メニューバーアプリを「ログイン時に起動」するか決めるチェックリスト](docs/launch-at-login-decision-guide.md)
- [Macのスリープ復帰後に打鍵音が出ないときの確認順序](docs/sleep-wake-recovery-checklist.md)
- [AirPodsで打鍵音が遅れて聞こえるとき、入力漏れと遅延を分ける確認手順](docs/bluetooth-latency-diagnosis.md)
- [クラムシェルモードで打鍵音の出力先が変わったときの確認順序](docs/clamshell-audio-route-check.md)
- [USB DACを抜き差しした後に打鍵音が出ないときの7項目](docs/usb-dac-reconnect-check.md)
- [Input Monitoringの許可画面が出ないとき、繰り返しクリックする前に確認すること](docs/input-monitoring-prompt-reopen.md)
- [打鍵音アプリの比較動画を録る前に、録音経路を確認する6ステップ](docs/screen-recording-demo-check.md)
- [AirPlayへ打鍵音を出す前に確認したい遅延と出力経路](docs/airplay-delay-route-check.md)
- [内蔵と外付けの2台のキーボードを使うときの打鍵音チェック](docs/multiple-keyboards-check.md)
- [JIS配列とUS配列で打鍵音を比べるとき、文字と物理キーを分ける](docs/jis-us-keycode-check.md)
- [Klakkのメニューバーアイコンが見つからないときの確認順序](docs/menubar-icon-hidden-check.md)
- [macOSアップデート後にKlakkを確認する8項目](docs/macos-update-recheck.md)
- [Klakkを再インストールするとき、権限と購入を混同しないためのチェック](docs/reinstall-permission-purchase-check.md)
- [ログイン時にKlakkを起動した後、最初の一音が出るまでに確認すること](docs/login-launch-first-sound-check.md)
- [キーを押し続けたとき、文字の連続入力と打鍵音の回数が違う理由](docs/held-key-repeat-check.md)
- [高速入力で打鍵音が重なったとき、音切れと聞き分ける5項目](docs/fast-typing-overlap-check.md)
- [通知音とKlakkの打鍵音が重なるときの音量確認](docs/notification-mix-check.md)
- [スリープ復帰後、外部スピーカーだけ無音のときの確認順序](docs/wake-external-speaker-check.md)
- [複数ディスプレイ接続時に打鍵音の出力先を固定する考え方](docs/multi-display-output-check.md)
- [Klakkへ問い合わせる前に作る、個人情報を含めない診断メモ](docs/support-diagnostic-template.md)

macOSのInput Monitoring（入力監視）は、ほかのアプリを使っている間にもキーボードや入力デバイスのイベントを検知できる権限です。打鍵音、ショートカット、入力デバイス支援などには必要ですが、利用者にとっては「なぜ必要なのか」が見えにくい権限でもあります。

許可ボタンを押す前に、次の5項目を確認してください。

## 1. 権限を必要とする機能が具体的に説明されているか

「アプリの動作に必要です」だけでは不十分です。どの機能が、どのタイミングで、何を検知するために必要なのかを確認します。

Klakkの場合は、Mac上のどのアプリで入力していても、キーが押されたタイミングに合わせてローカルの打鍵音を再生するために使います。入力した文章を編集したり、ショートカットを置き換えたりする目的ではありません。

## 2. 検知と保存が区別されているか

イベントを検知することと、その内容を保存することは別です。少なくとも次の点が説明されているか確認してください。

- 入力した文章を保存するか
- 個々のキー内容をログに残すか
- キーストロークを外部サーバーへ送るか
- 利用解析を行う場合、何をイベントとして送るか

Klakkは入力した文章や個々のキーストローク内容を保存・アップロードしません。利用解析は別の範囲として扱い、現行の説明を[日本語プライバシーポリシー](https://tryklakk.com/ja/privacy/)に記載しています。

## 3. 読み取り専用の監視か

macOSのイベント監視には複数の方式があります。アプリが入力を変更・遮断する必要がないなら、読み取り専用の方式を選べることがあります。

Klakkの現行実装は、キーイベントを変更しない `.listenOnly` のイベントタップを使用します。これは「権限が不要」という意味ではありませんが、打鍵タイミングを受け取り、元の入力をそのまま通す設計上の境界です。

## 4. 許可を取り消したときの挙動が分かるか

権限は一度許可したら終わりではありません。macOSの「システム設定 → プライバシーとセキュリティ → 入力監視」から後で取り消せます。

確認したい点は次の通りです。

1. 権限を取り消したら対象機能が停止するか
2. 再度許可したときに案内があるか
3. アプリを使わなくなったとき、設定から削除できるか

アプリをアンインストールした後も権限一覧に古い項目が残る場合は、利用者自身で一覧を整理できます。

## 5. 権限以外の製品限界も書かれているか

プライバシー説明が正しくても、製品効果の説明が過度なら判断を誤ります。

Klakkはヘッドホンへソフトウェアの打鍵音を出せますが、実際のキーボードが発生させる物理音を消せません。また、打鍵音を心地よい、ASMR的、作業のきっかけになると感じるかどうかには個人差があります。

Klakkは医療機器ではなく、ADHDの診断、治療、症状改善を目的とした製品ではありません。

## Klakkで自分の環境を確認する

インストール前に、[日本語サイトのブラウザデモ](https://tryklakk.com/ja/#demo)で14種類の音を試聴できます。実際の権限フローや出力デバイスとの組み合わせは、App Store版の3日間試用中に確認してください。

- [ブラウザで打鍵音を試聴](https://tryklakk.com/ja/#demo)
- [App Storeで3日間試用](https://apps.apple.com/jp/app/id6754638652?pt=127956280&ct=jp-gh-repo-permission-20260806&mt=12)
- [日本語プライバシーポリシー](https://tryklakk.com/ja/privacy/)
- 問い合わせ・訂正依頼：support@tryklakk.com

最終更新：2026年8月6日
