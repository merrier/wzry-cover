var express = require('express');
var Bagpipe = require('bagpipe');
var request = require('request');
var fs = require('fs');
const asyncWrapper = require('../../middleware').middleware.asyncWrapper;


//文件下载
var downloadPic=function(src, dest){

    // 判断是否存在media目录，不存在就创建
    fs.access(dest, (err) => {
        if(err){
            fs.mkdirSync(__dirname + dest.replace('.', ''), function (err) {
                if(err)
                throw err;
                // console.log('创建目录成功');
            });
        }
    });
    request(src).pipe(fs.createWriteStream(dest)).on('close',function(){
        // console.log('pic saved');
    })
};


function downloadImages (req, res) {

    const body = req.body;
    const imgList = body.imgList;

    //利用bagpipe控制并发执行
    var start = (new Date()).getTime();
    var bagpipe=new Bagpipe(10,{timeout: 5000});

    for(var i=0;i< imgList. length;i++){

        bagpipe.push( downloadPic , imgList[i], './wzry-cover/'+ imgList[i].name +'.jpg', function(err,data){
            var end=(new Date()).getTime();
            // console.log('下载花费时间:'+(end-start));
            res.json({
                message: 'success',
                spend: end-start,
            });
        })
    }
}

module.exports = {
    getRouter: function () {
        var router = express.Router();
        router
            .post('/', asyncWrapper(downloadImages));
        return router;
    }
};