const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')
const FindAccountModel = require('../models/find_accounts')
class Find_accounts{
    async create(req, res, next){
        try{
            const {userId, login} = req.body;
            const dataAccaunt = await FindAccountModel.create({user: userId, login})
            console.log(dataAccaunt)

        } catch(e){
            next(e)
        }
    }
    async findAll(req, res, next){
        try{
            
            const {userId} = req.body;
            const accounts = await FindAccountModel.find({user: userId});
            return res.json(accounts)
        } catch(e){
            next(e)
        }
    }
}


module.exports = new Find_accounts()