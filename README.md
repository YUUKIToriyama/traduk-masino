# traduk-masino

Google Translation API を試してみる

## 開発メモ

### ダウンロードとセットアップ

```bash
# Clone this repo
git clone https://github.com/YUUKIToriyama/traduk-masino.git
# Install dependencies
cd traduk-masino
npm install
```

### 認証情報の設定方法

1. Google Cloud Console で Translation API を有効化
2. 認証情報を作成し、ダウンロードした json ファイルをリネームし`secret.json`に上書き
3. プロジェクト ID を確認し、`src/main.js`の該当部分を修正
4. `node src/main.js`を実行
