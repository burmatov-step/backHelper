const Router = require('express').Router;
const Save_video = require('../controllers/save_video')
const router = new Router();
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.get('/save_video', authMiddleware, Save_video.save);


module.exports = router