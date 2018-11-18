

let express = require('express');
let request = require('request');

// 使用express来创建本地服务
let app = express();

app.get('/query', (req, res) => {

    let type   = req.query.type;
    let postid = req.query.postid;

    // 接收前端的数据
    request( 'http://www.kuaidi100.com/query?type='+ type +'&postid='+ postid, (error, response, body) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

        // 把返回的内容发送给前端    
        res.send( response.body );
    } )

})

app.listen(3000);