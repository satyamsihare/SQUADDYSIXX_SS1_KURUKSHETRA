const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');
const validationService = require('../services/validationService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
var nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "delispices987@gmail.com",
      pass: "spicesDeli123"
    }
});


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/sendemail', (req, res, next) => {
	const token = utilityService.getToken({"nk" : "email.com"});
	var mailOptions = {
        from: "delispices987@gmail.com",
        to: "nk0kumawat@gmail.com",
        subject: 'Verification',
        text: `Please verify your email http://localhost:4000/verify?token=` + token
	};
	
	transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {    
            console.log('Email sent: ' + info.response);
		}
		res.json({
			sent: "sent"
		})
	});

});

router.get('/verify', (req, res, next) => {
	const token = req.query
	console.log(token)
	jwt.verify(token.token, config.superSecret, function(err, decoded) {
		if(err) {
			res.json({
				success: false,
				message: err
			})
		}else {
			decoded.deactivated = false;
			userService.updateUser(decoded).then(user => {
				res.json({
					success: true,
					message: "activated please login"
				})
			}).catch(err => {
				res.json({
					success: true,
					message: err
				})
			})
			
		}
	});
});
// router.get('/signup', (req, res, next) => {
//     res.render('signup', {});
// });

router.post('/login', (req, res, next) => {
	const params = req.body;
	userService.loginUser(params)
		.then(user => {
			const token = utilityService.getToken(user);
			res.json({
				success: true,
				userToken : token,
				user : user
			});
		}).catch(err => {
			res.json({
				success: false,
				message: err
			});
		});
});
router.post('/signup', function(req, res, next) {
	const params = req.body;
	userService.signup(params).then(user => {
		const token = utilityService.getToken(user);
		var msg = userService.sendMail(user);
		res.json({
			success: true,
			message: msg
		})
		
	}).catch(err => {
		res.json({
			success: false,
			message: err
		});
	}); 
});


module.exports = router;