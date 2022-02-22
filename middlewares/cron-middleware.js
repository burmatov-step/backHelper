let cron = require('node-cron');
const Posts = require('../models/posts')
const Fb_users = require('../models/fb_users')
const TokenFb = require('../models/token_fb')
const request = require('request');
const path = require('path');
const fs = require('fs')

function startCron(){
    const doRequest = (url) => {
        return new Promise(function (resolve, reject) {
          request.post(url, function (error, res, body) {
            if (!error && res.statusCode == 200) {
              resolve(body);
            } else {
                console.log(error)
              reject(error);
            }
          });
        });
    }

    const  publishContent = async(url) => {
        return new Promise(async(resolve) => {
            let count = 0
            var id = setInterval(async() => {
                if(count <=5){
                    request.post(url, function (error, res, body) {
                        if (!error && JSON.parse(body).id) {
                          resolve(body);
                          clearInterval(id)
                        } else if(error) {
                            console.log(error, 'errorPublish')
                            reject(error);
                            clearInterval(id)
                        }
                    });
                }else{
                    clearInterval(id)
                }
                count++ 
            }, 5000);
        });
    }
    
    cron.schedule('* * * * *', async() => {
        try{
            const posts = await Posts.find({
                posting: false
            })
            if(posts.length > 0){
                for await (let post of posts) {
                    const date = post.date
                    let dates = new Date();
                    const isPosting = +date - +dates
                    if(isPosting <= 0){
                        const instUser = await Fb_users.findOne({username: post.username})
                        const token = await TokenFb.findOne({user: post.user_id})
                        if(instUser && token){
                            let text = post.text;
                            let mediaType = post.mimetype == 'video/mp4' ? 'media_type=VIDEO&video_url' : 'image_url';
                            const respMedia = await doRequest(`https://graph.facebook.com/${instUser.id_fbB}/media?${mediaType}=${post.filePath}&caption=${encodeURIComponent(text)}${post.currentTime ? `&thumb_offset=${+post.currentTime}` : ''}&access_token=${token.tokenFb}`)
                            if(JSON.parse(respMedia).id){
                                const jsonMediaID = JSON.parse(respMedia).id;
                                const ddd = await publishContent(`https://graph.facebook.com/${instUser.id_fbB}/media_publish?creation_id=${jsonMediaID}&access_token=${token.tokenFb}`);
                                post.posting = true
                                post.save()
                                const fileName = post.filePath.split('/')[post.filePath.split('/').length - 1]
                                fs.unlinkSync(path.resolve(__dirname, '..', 'files', fileName))
                            }
                        }
                    }
                   
                }
                

            }
            
        }catch(e){
            console.log(e)
        }
        // var timeInMs = new Date()
        // console.log(timeInMs);
        // var x = new Date();
        // var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
        // console.log(currentTimeZoneOffsetInHours)
      });
}

module.exports = startCron