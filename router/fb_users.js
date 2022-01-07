const Router = require('express').Router;
const router = new Router();
const Fb_users = require('../controllers/fb_users')

router.post('/check',  Fb_users.check, Fb_users.getDataAccount, Fb_users.getAllfbAccount);


module.exports = router