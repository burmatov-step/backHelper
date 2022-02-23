const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')
const TokenFb = require('../models/token_fb')
const FindAccountModel = require('../models/find_accounts')
const request = require('request');
class Find_accounts{
    async create(req, res, next){
        try{
            const {userId, login, type} = req.body;
            function doRequest(url) {
                return new Promise(function (resolve, reject) {
                  request(url, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                      resolve(body);
                    } else {
                      reject(error);
                    }
                  });
                });
            }
            // const dataAccount = await TokenFb.findOne({user: userId})
            // if(dataAccount){
            //     const isAccount = doRequest(`https://graph.facebook.com/v11.0/${dataAccount.userIdFb}?fields=business_discovery.username(${login}){followers_count}}&access_token=${dataAccount.tokenFb}`)
            //     if(isAccount){
            //         const dataAccaunt = await FindAccountModel.create({user: userId, login, type})
            //         return res.json({
            //             success: true,
            //             data: dataAccaunt
            //         })
            //     }
            // }
            
            return res.json({
                success: false,
                message: 'Ошибка, аккаунт не доступен'
            })
            
        } catch(e){
            return res.json({
                success: false,
                message: 'Ошибка, аккаунт не доступен'
            })
        }
    }
    async findAll(req, res, next){
        try{
            
            const {userId, type} = req.body;
            const accounts = await FindAccountModel.find({user: userId, type});
            return res.json(accounts)
        } catch(e){
            next(e)
        }
    }
    async removeAccount(req, res, next){
        try{
            const {userId, idAccount} = req.body;
            const deleteAccount = await FindAccountModel.remove({ _id: idAccount, user: userId});
            return res.json(deleteAccount)
        } catch(e){
            next(e)
        }
    }

    async testFacebook (req, res, next){
        try{
            const {token, loginData} = req.body;
            let dataPosts = []
            function doRequest(url) {
                return new Promise(function (resolve, reject) {
                  request(url, function (error, res, body) {
                    if (!error && res.statusCode == 200) {
                      resolve(body);
                    } else {
                      reject(error);
                    }
                  });
                });
            }

            async function main(body) {
                for await (let item of loginData) {
                    let res = await doRequest(`https://graph.facebook.com/v11.0/${JSON.parse(body).data[0].instagram_business_account.id}?fields=business_discovery.username(${item.login}){followers_count,media_count,media{comments_count,caption,media_type,children{media_url,media_type},like_count,media_url}}&access_token=${token}`);
                    dataPosts = [...dataPosts, ...JSON.parse(res).business_discovery.media.data]
                } 
                console.log("dataPosts", dataPosts)
                return res.json(dataPosts)
            }
            if(token && loginData){

                request(`https://graph.facebook.com/v11.0/me/accounts?fields=instagram_business_account&access_token=${token}`, async(error, response, body) => {
                   await main(body)
                    console.log("body", body)
                });
            }

           
        }catch(e){
            console.log(e)
        }
    }
}


module.exports = new Find_accounts()