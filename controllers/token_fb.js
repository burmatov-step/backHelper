
const TokenFbModel = require('../models/token_fb')
class TokenFb{
    async create(req, res, next){
        try{
            const {userId, tokenFb, userIdFb} = req.body;
            const tokenInfo =  await TokenFbModel.findOne({user:userId, userIdFb});
            if(tokenInfo){
                tokenInfo.tokenFb = tokenFb
                tokenInfo.save()
                return res.json(tokenInfo)
            }else{
                const newToken = await TokenFbModel.create({user:userId, tokenFb, userIdFb})
                return res.json(newToken)
            }
            
        } catch(e){
            next(e)
        }
    }
}


module.exports = new TokenFb()