const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')


const https = require('https')
const fs = require('fs');


class Save_video{
    async save(req, res, next){
        try{
            console.log(req.filePath)
            console.log('save',req.body)
            const url = req.body.link
            https.get(url, resp => resp.pipe(fs.createWriteStream(req.filePath  + '\\' + 'test.mp4')));
        } catch(e){
            next(e)
        }
    }
}


module.exports = new Save_video()