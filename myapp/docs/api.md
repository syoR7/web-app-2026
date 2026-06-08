# API仕様

## POST /api/○○
説明：〜〜する

リクエスト：
{ "weather" : "rain", "text":今日の天気は雨です。 }

レスポンス：
{ "id" : 1 , "weather": "rain", "text":今日の天気は雨です。 }

## GET /api/○○
説明：〜〜の一覧を返す

レスポンス：
[{ "フィールド名": "例の値" }]
> 本番開発では `openapi.yaml`（OpenAPI仕様）という機械可読な形式が業界標準だが、ここでは読みやすいMarkdown形式で記述する。