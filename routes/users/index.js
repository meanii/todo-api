const express = require('express');

const router = express.Router({mergeParams: true})

// load post router
let post = require('./post');

// routers initation 
router.post('/login', post.login);
router.post('/signup', post.signup);

module.exports =  router;