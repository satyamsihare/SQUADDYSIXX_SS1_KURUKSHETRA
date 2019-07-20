const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');

const landServices = require('../services/landService');
const bookmarkServices = require('../services/bookmarkService');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

/* GET home page. */
router.post('/getall', (req, res, next) => {
    var params = req.body;
    params.addedBy = "";
    console.log(params)
    jwt.verify(params.userToken, config.superSecret, function(err, user) {
        if(err) {
            res.json({
                success :false,
                message : "not Permitted, Please Login"
            });
        }else {
            params.addedBy = user.id;
            // console.log(params.addedBy)
            bookmarkServices.getAllBookmarks(params).then((bookmarks)=>{
                var k = 0;
                for (var bookmark in bookmarks) {
                    k ++;
                } 
                alllands = []
                for (var bookmark in bookmarks) {
                    landId = bookmarks[bookmark]['landId']
                    var params = {
                        "landId" : landId
                    }
                    console.log(params);
                    landServices.getOne(params).then(land => {
                        alllands.push(land)
                        console.log(land)
                        k --;
                    if(!k){
                        res.json ({
                            success: true,
                            bookmarks : alllands
                        })
                    }
                    }).catch(err => {
                        console.log(err);
                        k --;
                    if(!k){
                        res.json ({
                            success: true,
                            bookmarks : alllands
                        })
                    }
                    })
                    
                }  
            }).catch(err => {
                res.json ({
                    success: false,
                    message : err
                })
            })
        }
    });

    
});

router.post('/getOne', (req, res, next) => {
    const params = req.body;
    landServices.getOne(params).then((lands)=>{
        res.json ({
            success: true,
            lands : lands
        })
    }).catch(err => {
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/save', (req, res, next) => {
    var params = req.body;
    params.addedBy = "";
    jwt.verify(params.userToken, config.superSecret, function(err, user) {
        if(err) {
            res.json({
                success :false,
                message : "not Permitted Please Login"
            });
        }else {
            params.addedBy = user.id;
            console.log(params)
            bookmarkServices.addBookmark(params).then((lands)=>{
                res.json ({
                    success: true,
                    lands : lands
                })
            }).catch(err => {
                res.json ({
                    success: false,
                    messagee : err
                })
            })
        }
    });
});

module.exports = router;