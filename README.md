# 点滴滴下数計算アプリ

iPhoneのSafariで使うことを想定した、点滴の滴下数を計算するシンプルなWebアプリです。

## できること

- 点滴量を 500mL / 250mL / 100mL / 50mL から選択
- 投与時間を「時間」「分」で入力
- 輸液セットを 成人用 20滴/mL / 小児用 60滴/mL から選択
- 1分あたり、10秒あたり、1時間あたりの輸液量を計算
- iPhoneのホーム画面に追加してアプリのように起動

## ファイル構成

```text
icons/
  icon-180.png
  icon-192.png
  icon-512.png
index.html
manifest.json
script.js
service-worker.js
style.css
README.md
```

## GitHub Pagesで公開する手順

1. GitHubで新しいリポジトリを作成します。
2. このフォルダ内のファイル一式をリポジトリにアップロードします。
3. GitHubのリポジトリ画面で `Settings` を開きます。
4. 左メニューの `Pages` を開きます。
5. `Build and deployment` の `Source` を `Deploy from a branch` にします。
6. `Branch` を `main`、フォルダを `/root` にして保存します。
7. 数分後に表示されるGitHub PagesのURLを開きます。

## iPhoneでホーム画面に追加する手順

1. iPhoneのSafariでGitHub PagesのURLを開きます。
2. 画面下の共有ボタンを押します。
3. `ホーム画面に追加` を選びます。
4. 名前を確認して `追加` を押します。

## 注意

このアプリは滴下数計算の補助ツールです。実際の投与設定は、医師の指示、施設のルール、使用する輸液セットの規格を必ず確認してください。
