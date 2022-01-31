const Router = require('express').Router;
const router = new Router();
const Token_fb = require('../controllers/token_fb')

router.post('/createToken',  Token_fb.create);

module.exports = router