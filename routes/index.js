const express = require('express')
const router =express.Router()
const wrapAsync = require('../utils/wrapAsync')
const signup = require('../controller/signup')
const login = require('../controller/login')
const authToken = require('../middleware/authtoken')
const userDetails = require('../controller/userDetails')
const Logout = require('../controller/userLogout')
const upload = require('../controller/upload')
const sendEmail = require('../controller/sendEmail')
const sendperEmail = require('../controller/sendperEmail')
const deleteFolder = require('../controller/deleteFolder');

router
    .route("/signup")
    .post(signup)

router
    .route("/login")
    .post(wrapAsync(login))    

router
    .route("/userDetails")
    .get(authToken, wrapAsync(userDetails.userDetails))

router
    .route("/logout")
    .get(authToken,wrapAsync(Logout))

router
    .route("/upload")
    .post(authToken, wrapAsync(upload))

router
    .route("/sendEmail")
    .post(authToken, wrapAsync(sendperEmail))

router
    .route("/clear-uploads")
    .post(authToken,wrapAsync(deleteFolder))    
module.exports=router 