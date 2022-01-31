const Router = require('express').Router;
const UserController = require('../controllers/user-controller')
const router = new Router();
const {body} = require('express-validator')
const Find_accounts = require('../controllers/find_accounts')
const authMiddleware = require('../middlewares/auth-middleware')


router.post('/registration', body('email').isEmail(),  body('password').isLength({min: 3, max: 32}), UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.post('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers);

module.exports = router