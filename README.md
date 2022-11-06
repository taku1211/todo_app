# TODO APP

![picture 7](images/633fba4036ecf3b85c93ac11a8c9336d1cd24c6c2e3fdeb4ac6c3e2f838e1487.png)
![picture 9](images/a2a132fb6a4d528b80fff3a121967169845c3177f2826136846877e87c686118.png)  


タスク管理アプリTODO APPです。  
ラインのような操作感で、直感的にタスク管理を行うことができます。  
レスポンシブ対応をしており、基本的にはスマートフォンやタブレットで使用することを想定しています。  

アプリの紹介スライドを下記URLに掲載しています。  
READMEよりもわかりやすくまとめているので、ぜひご覧ください。  
[TODOAPP概要説明スライドはこちらから](https://docs.google.com/presentation/d/125RA0qxAItJHc842spg2OiHWJuDqJvwK/edit?usp=sharing&ouid=115836892461911264304&rtpof=true&sd=true)  

  # デモ画面

①SPAでの画面切り替え操作  

![TZSG2695 1](https://user-images.githubusercontent.com/93319825/200168428-3acc2ad4-2018-4f2d-952d-9bb6f37eae21.GIF)  

②TODO追加画面  

![OGYK6000 1](https://user-images.githubusercontent.com/93319825/200168750-d1722f7c-cae4-4686-870e-b8143a6839e3.GIF)  

③TODO一覧画面操作  

![GEKG7335 1](https://user-images.githubusercontent.com/93319825/200168793-b6cef18e-f431-4286-af3b-9250e4f92848.GIF)  

③TODO検索操作  

![KJUF4892 1](https://user-images.githubusercontent.com/93319825/200168412-0b2dcd5a-d55a-4e3f-95a7-8be95f6424e6.GIF)  

# URL

https://todos-app.com/  

下記のメールアドレスとパスワードで、ログインすることが可能です。  
メールアドレス：demo@gmail.com  
パスワード：demo0000  

# 使用技術

 - PHP 7.4  
 - Laravel 8.83  
 - MySQL  
 - Node.js 18.0  
 - npm 8.6.0  
 - Vue.js 2.6  
 - Viex 3.2.1  
 - Vue-router 3.5.4
 - jQuery 3.6.0
 - Apache  
 - AWS 
   - VPC
   - EC2
   - Route53
   - RDS
   - ALB
   - ACM
   - IAM
   - S3  
 - Google Maps API
 - axios


# AWS構成図

![AWS構成図](images/3c8e0b3186ec4c6c6cc1b6c89006931828c484889a75004583dc42e80cfd3925.png)  


# ER図

![ER図](images/f851fb66c837c5cecfab1ecb30493bb19d49f93445b9534838d09d56bc54aac0.png)  



# 機能一覧

 - TODO追加・編集機能
   - 詳細メモ追加機能
   - リスト・カテゴリーの選択機能
   - 各リスト・各カテゴリーからTODO追加した場合の、リスト・カテゴリーの自動紐づけ機能
   - カレンダーによる日付選択機能
   - TODOの時間選択機能
   - 日付を選択した場合の、TODOの繰り返し設定機能（14種類から選択）
   - 優先順位付け機能
   - 場所選択・地図表示機能（GoogleMapAPI）
   - 画像追加機能（AWS S3）
   - 画像プレビュー機能  
  
  
 - 認証機能
   - ユーザー登録、ログイン機能
   - ログアウト・退会機能
   - アカウント情報編集機能
   - パスワードリマインダー機能
 - リスト・カテゴリーの追加・編集機能
   - 表示アイコンカラー選択機能
   - リスト・カテゴリー削除機能
 - 画面UI
   - ハンバーガーメニュー
   - レスポンシブ対応
   - transition機能
   - フッターメニューでの画面遷移










 
