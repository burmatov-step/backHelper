const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')
const Fb_users = require('../models/fb_users')
const request = require('request');
const doRequest = (url) => {
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
class Find_accounts{
    async check(req, res, next){
        try{
            const {userId, token, userIdFb} = req.body;
            const arrDataUser = []

            request(`https://graph.facebook.com/v12.0/me/accounts?access_token=${token}`, async(error, response, body) => {
                let fbAccount = JSON.parse(body).data
                
                for await (let item of fbAccount) {
                    let data = {
                        'user': userId,
                        'id_fb': `${item.id}`,
                        'userIdFb': `${userIdFb}`
                    }
                    const userFb = await Fb_users.findOne(data);
                    if(userFb){
                        arrDataUser.push(item.id)
                    }else{
                        const getBusinessUsers = await doRequest(`https://graph.facebook.com/v11.0/${item.id}?fields=instagram_business_account&access_token=${token}`);
                        if(getBusinessUsers && JSON.parse(getBusinessUsers).instagram_business_account){
                                data['id_fbB'] =  JSON.parse(getBusinessUsers).instagram_business_account.id
                                const userBus = await Fb_users.create(data);
                                arrDataUser.push(item.id)
                        }
                    }

                }
                req.allUsers = arrDataUser;
                next()
             });

        } catch(e){
            next(e)
        }
    }


    async getDataAccount(req, res, next){
        const {userId, token} = req.body;
        if(req.allUsers && req.allUsers.length > 0){

            for await (let item of req.allUsers) {
                const getDataFbUsers = await Fb_users.findOne({
                        user: userId,
                        id_fb: item
                    })
                    if(getDataFbUsers && getDataFbUsers.id_fbB){
                        const dataUserInsta = await doRequest(`https://graph.facebook.com/v11.0/${getDataFbUsers.id_fbB}?fields=profile_picture_url,username&access_token=${token}`);
                        if(dataUserInsta){
                            console.log('dataUserInsta', dataUserInsta)
                            getDataFbUsers.profile_picture_url = JSON.parse(dataUserInsta).profile_picture_url
                            getDataFbUsers.username = JSON.parse(dataUserInsta).username
                        }
                        getDataFbUsers.save()
                    }
            }

        }

        next()

    }

    async getAllfbAccount(req, res, next){
        const {userId, userIdFb} = req.body;
        const allDataUsers = await Fb_users.find({user: userId, userIdFb});
        return res.json(allDataUsers)
    }


}


module.exports = new Find_accounts()