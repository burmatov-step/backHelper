const Router = require('express').Router;
const router = new Router();
const Type_account = require('../controllers/type_find_account')

router.post('/create_type_account',  Type_account.create);
router.post('/findAll_type_account',  Type_account.findAll);
router.post('/delete_type_account',  Type_account.removeAccount);

module.exports = router