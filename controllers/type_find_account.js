const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')
const TypeAccountModel = require('../models/type_find_account')
class Type_accounts{
    async create(req, res, next){
        try{
            const {userId, type} = req.body;
            console.log('userId', userId)
            const dataAccaunt = await TypeAccountModel.create({user: userId, type})
            return res.json(dataAccaunt)
        } catch(e){
            next(e)
        }
    }
    async findAll(req, res, next){
        try{
            
            const {userId} = req.body;
            const types = await TypeAccountModel.find({user: userId});
            return res.json(types)
        } catch(e){
            next(e)
        }
    }
    async removeAccount(req, res, next){
        try{
            const {userId, idAccount} = req.body;
            const deleteAccount = await TypeAccountModel.remove({ _id: idAccount, user: userId});
            return res.json(deleteAccount)
        } catch(e){
            next(e)
        }
    }
}


module.exports = new Type_accounts()