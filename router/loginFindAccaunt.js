const Router = require('express').Router;
const router = new Router();
const Find_accounts = require('../controllers/find_accounts')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/create_find_account',authMiddleware,  Find_accounts.create);
router.post('/findAll_account', authMiddleware, Find_accounts.findAll);
router.post('/delete_account', authMiddleware,  Find_accounts.removeAccount);
router.post('/test_fb', authMiddleware, Find_accounts.testFacebook);

module.exports = router