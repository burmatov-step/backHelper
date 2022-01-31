const Router = require('express').Router;
const upload_post = require('../controllers/upload_post')
const router = new Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/upload', authMiddleware, upload_post.create);


module.exports = router