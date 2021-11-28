const express = require('express');
const multer = require('multer')

const  MINE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        console.log(name)
        const ext = MINE_TYPE_MAP[file.mimetype];
        cb(null,`${name}-${Date.now()}.${ext}`);
    },
    destination: (req, file, cb) => {
        const isValid = MINE_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mine type');
        if(isValid){
            error = null;
        }
        cb(error, 'images'); // image dir
    }
})
const router = express.Router({mergeParams: true})

// load all routers
let get = require('./get');
let post = require('./post');
let put = require('./put');
let del = require('./delete');

// routers initation 
router.get('/', get.getAll);
router.get('/:id', get.getById);
router.post('/', multer({storage: storage}).single('image'), post.createTask);
router.put('/:id', multer({storage: storage}).single('image'), put.updateTask);
router.delete('/:id', del.deleteTask);

module.exports =  router;