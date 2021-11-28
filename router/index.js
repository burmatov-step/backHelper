const Router = require('express').Router;
const UserController = require('../controllers/user-controller')
const router = new Router();
const {body} = require('express-validator')
const Save_video = require('../controllers/save_video')
const Find_accounts = require('../controllers/find_accounts')
const authMiddleware = require('../middlewares/auth-middleware')


router.post('/registration', body('email').isEmail(),  body('password').isLength({min: 3, max: 32}), UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.post('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers);
router.post('/save_video',  Save_video.save);
// router.post('/create_find_account',  Find_accounts.create);
// router.post('/findAll_account',  Find_accounts.findAll);
// router.post('/delete_account',  Find_accounts.removeAccount);

module.exports = router