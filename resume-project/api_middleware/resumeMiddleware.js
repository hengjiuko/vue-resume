/************
 * 日期：2018/12/28
 * 名称：在线简历编辑器的，mongoDB的接口
 * 作者：老尚
 * 备注：null
 */

var express = require('express');
var app = express();

// 这里为了防止写错，我就复制了
// 在nodeJs当中，引入mongoDB模块，获得客户端对象:MongoClient
var MongoClient = require('mongodb').MongoClient;
// console.log( MongoClient );

// 得到连接mongoDB的字符串，变量名DB_CONN_STR，不要自己瞎写
var DB_CONN_STR = 'mongodb://127.0.0.1:27017'

// 解决跨域问题，网上成熟的解决方案，我是直接拷贝的
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 插入个人信息数据
app.get('/resume/submit-my-info',function(req, res){
    // console.log( req.query );
    var _msgObj = req.query;

    // 固定的格式
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxresume');

          _collection.insertOne( _msgObj, function(err, result){
              if(err) throw err;
              console.log('插入成功');

              // 关闭数据库连接，因为连接数有限
              db.close();
              res.end();
          });

    });
});

// 获取个人信息
app.get('/resume/find-my-info',function(req, res){

    // 固定的格式，你就直接复制，不要自己写
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxresume');

          _collection.find().toArray( function(err, result){
              if(err) throw err;
              console.log('获取数据成功');
              res.send( result )
              // 关闭数据库连接，因为连接数有限
              db.close();
              res.end();
          });

    });
});

// 增加简历
app.get('/resume/resume-insert',function(req, res){
    // console.log( req.query );
    var _msgObj = req.query;

    // 固定的格式，
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxeducation');

          _collection.insertOne( _msgObj, function(err, result){
              if(err) throw err;
              console.log('插入成功');

              // 关闭数据库连接，因为连接数有限
              db.close();
              res.end();
          });

    });
});

// 获取教育经历
app.get('/resume/education-list',function(req, res){

    // 固定的格式，你就直接复制，不要自己写
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxeducation');

          _collection.find().toArray( function(err, result){
              if(err) throw err;
              console.log('获取教育经历-成功');
              res.send( result );
              // 关闭数据库连接，因为连接数有限
              db.close();
              res.end();
          });

    });
});

// 删除简历
app.get('/resume/remove-data',function(req, res){
    // console.log( req.query );
    // 这是一个字符串
    var _idString = req.query._id;

    // 生成 MongoDB 的 _id 对象，
    var _ObjectID = require('mongodb').ObjectID;
    var _delObjectId = _ObjectID.createFromHexString( _idString );

    // 固定的格式
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxeducation');

          _collection.remove({
                "_id" : _delObjectId
          }, function(err, result){
              if(err) throw err;
              console.log('删除数据成功');

              // 关闭数据库连接，因为连接数有限
              db.close();
              res.end();
          });

    });
});

// 根据id查询 
app.get('/resume/education-list-id',function(req, res){
    // console.log( req.query );
    // 这是一个字符串
    var _idString = req.query._id;

    // 生成 MongoDB 的 _id 对象
    var _ObjectID = require('mongodb').ObjectID;
    var _findObjectId = _ObjectID.createFromHexString( _idString );

    // 固定的格式
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxeducation');

          _collection.findOne({
                          "_id" : _findObjectId
                    }, {}, function(err, result){
                        if(err) throw err;
                        console.log('根据id查询数据成功');

                        res.send( result )
                        // 关闭数据库连接，因为连接数有限
                        db.close();
                        res.end();
                    });
    });
});

// 根据id，更新简历
app.get('/resume/edit-data-id',function(req, res){
    // console.log( req.query );
    // 这是一个字符串
    var _idString = req.query._id;
    var _editMsg = JSON.parse(req.query.editMsg);

    // 生成 MongoDB 的 _id 对象
    var _ObjectID = require('mongodb').ObjectID;
    var _saveObjectId = _ObjectID.createFromHexString( _idString );

    // 固定的格式
    MongoClient.connect( DB_CONN_STR, function(err, db){
          // db，数据库对象
          // console.log( db )

          // resume1102，数据库名
          var _dbo = db.db('resume1102');

          // 集合名
          var _collection = _dbo.collection('xxeducation');

          _collection.save({
                          "_id" : _saveObjectId,
                          "startTime" : _editMsg.startTime,
                          "endTime" : _editMsg.endTime,
                          "school" : _editMsg.school,
                          "major" : _editMsg.major,
                          "summary" : _editMsg.summary,
                    }, function(err, result){
                        if(err) throw err;
                        console.log('根据id，更新简历，成功');

                        // 关闭数据库连接，因为连接数有限
                        db.close();
                        res.end();
                    });
    });
});

// 在线简历编辑器
app.listen(1258, function(){
	console.log( '在线简历编辑器--中间件，1258，已经启动，' )
});