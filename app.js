require('dotenv').config();
const express = require('express');
const{Pool} = require('pg');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
//ルート１ :トップページ
app.get('/',(req, res) => {
    res.send('トップページです');
    });
//ルート2 :自己紹介ページ
app.get('/about', (req,res) => {
    res.send('自己紹介ページ');
});
//ルート3 :現在時刻を返す
app.get('/time' , (req, res)=> {
    const now = new Date().toLocaleString('ja-JP');
    res.send('現在時刻:' + now);
});

app.get('/api/test',(req, res) => {
    res.json({message: 'APIが動いています',status : 'ok'});
})
app.get('/status', (req, res) => {
    res.json({status: 'ok', message:'サーバーは正常に動作しています'});
});
const messages = [];
//GET：メゾット一覧を取得
app.get('/api/messages', async(req,res) => {
    const result =  await pool.query(
        'SELECT * FROM messages ORDER BY created_at ASC'
    );
    res.json(result.rows);
});

//POST:メッセージを追加
app.post('/api/messages',  async(req,res) =>{
    const {username, text}= req.body;
    const result = await pool.query(
        'INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *',
        [username, text]
    );
    res.json(result.rows[0]);
});
app.listen(process.env.PORT || 3000, () => {
    console.log(`サーバーが起動しました: http://localhost:${process.env.PORT ||3000}`);
});
