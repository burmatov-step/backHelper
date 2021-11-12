const Router = require('express').Router;
const router = new Router();
const Find_accounts = require('../controllers/find_accounts')

router.post('/create_find_account',  Find_accounts.create);
router.post('/findAll_account',  Find_accounts.findAll);
router.post('/delete_account',  Find_accounts.removeAccount);

module.exports = router