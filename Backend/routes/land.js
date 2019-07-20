const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');

const landServices = require('../services/landService');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

var multer = require('multer');
var filename ;
var landStorage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images/'); 
    },
    filename: function(req, file, callback){
    	filename = Date.now() + '.jpg';
        callback(null, filename); 
    }
});
var uploadLandPics = multer({storage: landStorage});

/* GET home page. */
router.post('/getall', (req, res, next) => {
    console.log("called")
    landServices.getAllLands().then((lands)=>{
        // console.log(lands);
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
router.post('/getbyprice', (req, res, next) => {

    landServices.getByPrice().then((lands)=>{
        res.json ({
            success: true,
            lands : lands
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/getallprices', (req, res, next) => {
    landServices.getPricesAll().then((prices)=>{
        res.json ({
            success: true,
            prices : prices
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/getalllocation', (req, res, next) => {
    console.log("start")
    landServices.getAllLocation().then((location)=>{
        res.json ({
            success: true,
            location : location
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/getbyarea', (req, res, next) => {
    landServices.getByArea().then((lands)=>{
        res.json ({
            success: true,
            lands : lands
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/getpricebtwn', (req, res, next) => {
    var params = req.body;
    landServices.getPriceBtwn(params).then((lands)=>{
        res.json ({
            success: true,
            lands : lands
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/getareabtwn', (req, res, next) => {
    var params = req.body;
    params.maxArea = "2000"
    landServices.getAreaBtwn(params).then((lands)=>{
        res.json ({
            success: true,
            lands : lands
        })
    }).catch(err => {
        console.log(err)
        res.json ({
            success: false,
            message : err
        })
    })
});
router.post('/add', (req, res, next) => {
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
            landServices.addLand(params).then((lands)=>{
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

router.post('/delete', (req, res, next) => {
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
            landServices.deleteOne(params).then((ok)=>{
                res.json ({
                    success: true,
                    ok : ok
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


router.post('/uploadpics',uploadLandPics.array('landpics', 1),  (req, res) => {
    var filename = req.files[0].filename;
    var params = req.body;
    params.filename = filename;
    landServices.updatePictureUrl(params).then(land=> {
        res.json({
            success: true,
            url: filename
        })
    }).catch(err => {
        res.json({
            success: true,
            message: err
        })
    })
});



module.exports = router;