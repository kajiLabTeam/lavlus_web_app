lavlus_web_app
===

これは、[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) でブートストラップされた [Next.js](https://nextjs.org/) プロジェクトです。

## セットアップ

### 開発に使用しているバージョン
❯ npm -v　9.4.2

❯ node -v　v16.14.2

### 起動のさせ方

```bash

npm install

npm run dev
# or
yarn dev
```

 [http://localhost:3000](http://localhost:3000)　を開くことで、テスト用のWebサイトを開くことができます。
 
## Gitの運用

### 基本指針
[gitflow](https://www.atlassian.com/ja/git/tutorials/comparing-workflows/gitflow-workflow)を指針として採用します。

### develop
開発ブランチです。

### feature
機能ブランチです。developから派生します。

- issueの番号をサブブランチとします。feature/{番号}
- issueがない場合はサブブランチをケバブケースで命名すること (例:feature/some-feature)
- developにマージ、リモートの機能ブランチは削除

### release
リリース作業ブランチです。以下のサブブランチにて配信の自動配信に利用します。

### main
本番ブランチです。
プロダクション環境での動作保証、かつストアの公開状態と同じであることが求められます。releaseまたはhotfixをマージします。

