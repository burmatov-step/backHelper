const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exeptions/api-error')
const Posts = require('../models/posts')
const path = require('path')
const https = require('https')
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'files/' })

class uploadPost{
    async create(req, res, next){
        try{
            const file = req.files.file;
            const {data, text,username} = req.body;
            const user = req.user;  
            let filePath = path.resolve(req.filePath, `${file.name}`);
            // let filePath = '\\' + 'app' + '\\' + 'files' + '\\' + file.name;
            // let filePath = process.env.API_URL + '\\' + file.name;
            let pathUrl = process.env.API_URL  + '/' +  file.name
            console.log('filePath', filePath)
            const newPost = await Posts.create({user_id:user.id, date: data, username, text, filePath: pathUrl, posting: false})
            if(newPost){
                // upload.single(file.name)
                file.mv(filePath)
                return res.json(newPost)
            }
            
            // const url = req.body.link
            // https.get(url, resp => resp.pipe(fs.createWriteStream(process.env.API_URL  + '\\' + 'test.mp4')));
        } catch(e){
            console.log(e)
        }
    }

}


module.exports = new uploadPost()