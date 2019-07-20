const fs = require('fs');

const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const request = require('request');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
// var nodemailer = require("nodemailer");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "delispices987@gmail.com",
      pass: "spicesDeli123"
    }
});


module.exports = {
    getToken: function(user) {
        let expiresIn = 7 * 60 * 60 
        
        const token = jwt.sign({
            mobile: user.mobile,
            name: user.name,
            id: user.id,
            email: user.email
        }, config.superSecret, {
            expiresIn: expiresIn
        });
        return token;
    },
    isInt: function(value) {
        return !isNaN(value) 
                && (parseInt(Number(value)) == value) 
                && (!isNaN(parseInt(value, 10)));
    },
    sendEmail: function(user) {
        const token = utilityService.getToken(user);
        var mailOptions = {
            from: "delispices987@gmail.com",
            to: user.email,
            subject: 'Verification',
            text: `Please verify your email http://localhost:4000/verify?token=` + token
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return error;
            } else {    
                console.log('Email sent: ' + info.response);
                return info;
            }
        });
    }





};