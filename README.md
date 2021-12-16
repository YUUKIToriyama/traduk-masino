# traduk-masino

Google Translation API を試してみるリポジトリです。

## 準備

このリポジトリのコードを試してみるには２つの方法があります。

- リポジトリをクローンしてローカルで実行する
- RunKit を使ってオンラインで実行してみる

### リポジトリをクローンしてローカルで実行する

コードをローカルにダウンロードして実行します。
このコマンドを実行するためには Git と Node.js がシステムにインストールされている必要があります。
これらをインストールし、`git`コマンドと`node`コマンドが実行できることを確認したら、コマンドプロンプトあるいは Powershell を開いて次のコマンドを実行してください。

```bash
# Clone this repo
git clone https://github.com/YUUKIToriyama/traduk-masino.git
# Install dependencies
cd traduk-masino
npm install
```

### RunKit を使ってオンラインで実行してみる

RunKit はオンラインで実行できる Node.js 環境です。
Node.js のインストール方法がわからない場合こちらを使ってみてください。

[https://npm.runkit.com/%40google-cloud%2Ftranslate](https://npm.runkit.com/%40google-cloud%2Ftranslate)

ただ、Google cloud を使う際に必要な認証情報をどう読み込ませるか考える必要があります(=コピペでは動かない)。

## Google Cloud 側の設定

コードを実行する前に Google Cloud 側の設定を済ませておく必要があります。

1. 新しいプロジェクトを作成
2. 「IAM と管理」->「サービスアカウント」->「サービスアカウントを作成」からサービスアカウントを作成
3. 作成されたサービスアカウントの「メール」をクリック->「キー」->「鍵を追加」->「新しい鍵を作成」->「JSON」を選択し鍵をダウンロード
4. ダウンロードした鍵ファイルを`secret.json`にリネームし、クローンしたリポジトリの`package.json`と同じディレクトリにコピー
5. [https://console.developers.google.com/apis/api/translate.googleapis.com/overview](https://console.developers.google.com/apis/api/translate.googleapis.com/overview)にアクセスし Translation API を有効化

これらの設定をすべて完了すると、`src/translation.js`が実行できるようになります。

```bash
node src/translation.js 私の好きな食べ物はハンバーグです。
```

```text
[
  'My favorite food is hamburger steak.',
  { data: { translations: [Array] } }
]
```

## カスタム用語集を登録する

カスタム用語集を追加して翻訳を改良する方法を解説します。
用語集は CSV 形式で次のように作成します。

```csv
ja,en
高天原,the plain of high heaven
天之御中主神,the Deity Muster-of-the-August-Centre-of-Heaven
高御産巣日神,the High-August-Producing-Wondrous Deity
神産巣日神,the Divine-Producing-Wondrous-Deity
```

1. メニューから「ストレージ」->「Cloud Storage」->「バケットを作成」
2. 「データの保存場所の選択」ではロケーションタイプを「Region」に、ロケーションを「us-central1(アイオワ)」に設定
3. 作成したバケットをクリック->「ファイルをアップロード」
4. アップロードしたファイルをクリック->「gsutil URI」をコピー

これで CSV ファイルを Google Translation API に用語集として登録する準備ができました。
では、`src/setGlossary.js`を実行し用語集を登録してみましょう。

```bash
node src/setGlossary.js "コピーしたgsutil URL"
```

```text
projects/1234567890/locations/us-central1/glossaries/glos*******lation
```

コードを実行すると生成された用語集の ID が発行されるのでこれをメモしておいてください。

## カスタム用語集を使って翻訳する

用語集を登録できたらそれを使って翻訳をしてみましょう。

```bash
node src/translationWithGlossary.js "コピーしたGlossary ID" これが世話狂言である
```

```text
[
  {
    translatedText: 'This is a care kyogen.',
    model: '',
    glossaryConfig: null,
    detectedLanguageCode: ''
  }
]
[
  {
    translatedText: 'This is a Sewa Kyogen.',
    model: '',
    glossaryConfig: {
      glossary: 'projects/1234567890/locations/us-central1/glossaries/gloss*******lation',
      ignoreCase: false
    },
    detectedLanguageCode: ''
  }
]
```

実行すると上記のようなオブジェクトが返ってきます。配列のひとつめが用語集を使わない翻訳、ふたつめが用語集を用いた翻訳の結果です

## 参考リンク

- [https://groups.google.com/g/google-translate-api/c/JLkWkxkIGWU](https://groups.google.com/g/google-translate-api/c/JLkWkxkIGWU)
- [https://cloud.google.com/translate/docs/advanced/glossary#translate_v3_translate_text_with_glossary-nodejs](https://cloud.google.com/translate/docs/advanced/glossary#translate_v3_translate_text_with_glossary-nodejs)
- [https://daleonai.com/improving-machine-translation-with-the-google-translation-api-advanced](https://daleonai.com/improving-machine-translation-with-the-google-translation-api-advanced)

## 開発メモ

### ダウンロードとセットアップ

### 認証情報の設定方法

1. Google Cloud Console で Translation API を有効化
2. 認証情報を作成し、ダウンロードした json ファイルをリネームし`secret.json`に上書き
3. プロジェクト ID を確認し、`src/main.js`の該当部分を修正
4. `node src/main.js`を実行
