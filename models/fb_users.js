const {Schema, model} = require('mongoose');

const Fb_usersScheme = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userIdFb: {type: String, required: true},
    id_fb: {type: String, required: true},
    id_fbB: {type: String, required: true},
    profile_picture_url: {type: String},
    username: {type: String},
})


module.exports = model('Fb_users', Fb_usersScheme)