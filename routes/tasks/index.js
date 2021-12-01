const express = require('express');
const checkAuth = require("../../middlewares/check-auth");
const  fileUploadHandler = require("../../middlewares/file-upload-handler");


const router = express.Router({mergeParams: true})

// load all routers
let get = require('./get');
let post = require('./post');
let put = require('./put');
let del = require('./delete');

// routers initation 
router.get('/', get.getAll);
// router.post('/', post.getUserTask)
router.get('/:id', get.getById);

router.post('/', checkAuth, fileUploadHandler, post.createTask);
router.put('/:id', checkAuth, fileUploadHandler, put.updateTask);
router.delete('/:id', checkAuth, del.deleteTask);

module.exports =  router;