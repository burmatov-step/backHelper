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
            const {data, text,username, currentTime} = req.body;
            const user = req.user;  
            let filePath = path.resolve(req.filePath, `${file.name}`);
            let pathUrl = process.env.API_URL  + '/' +  file.name
            console.log('filePath', filePath)
            const newPost = await Posts.create({user_id:user.id, date: data, username, text, filePath: pathUrl, currentTime, posting: false})
            if(newPost){
                file.mv(filePath)
                return res.json(newPost)
            }
        } catch(e){
            console.log(e)
        }
    }
    async getAll(req, res, next){
        try{
            console.log(33333)
            const allPosts = await Posts.find();
            console.log('allPosts', allPosts)
            return res.json(allPosts)
        } catch(e){
            console.log(e)
        }
    }

}


module.exports = new uploadPost()