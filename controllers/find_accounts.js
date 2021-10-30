const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')

class Find_accounts{
    async save(req, res, next){
        try{
            console.log(req.body)
        } catch(e){
            next(e)
        }
    }
}


module.exports = new Find_accounts()