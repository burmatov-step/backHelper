let cron = require('node-cron');
const Posts = require('../models/posts')
const Fb_users = require('../models/fb_users')
const TokenFb = require('../models/token_fb')
const request = require('request');

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
    
    cron.schedule('* * * * *', async() => {
        try{
            const posts = await Posts.find({
                posting: false
            })
            console.log(posts)
            if(posts.length > 0){
                const date = posts[0].date
                let dates = new Date();
                const isPosting = +date - +dates
                if(isPosting <= 0){
                    const instUser = await Fb_users.findOne({username: posts[0].username})
                    const token = await TokenFb.findOne({user: posts[0].user_id})
                    if(instUser && token){
                        console.log('posts[0].text', posts[0].text)
                        let text = posts[0].text;
                        const respMedia = await doRequest(`https://graph.facebook.com/${instUser.id_fbB}/media?media_type=VIDEO&video_url=${posts[0].filePath}&caption=${encodeURIComponent(text)}&thumb_offset=14000&access_token=${token.tokenFb}`)
                        if(JSON.parse(respMedia).id){
                            const jsonMediaID = JSON.parse(respMedia).id;
                            const intervalSetup = setInterval(async () => {
                                const respPublish = await doRequest(`https://graph.facebook.com/${instUser.id_fbB}/media_publish?creation_id=${jsonMediaID}&access_token=${token.tokenFb}`)
                                if(JSON.parse(respPublish).id){
                                    clearInterval(intervalSetup)
                                }
                                console.log(respPublish)
                            }, 5000)
                        }
                        
                    }
                }

            }
            
        }catch(e){
            console.log(e)
        }
        console.log(posts)
        // var timeInMs = new Date()
        // console.log(timeInMs);
        // var x = new Date();
        // var currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
        // console.log(currentTimeZoneOffsetInHours)
      });
}

module.exports = startCron