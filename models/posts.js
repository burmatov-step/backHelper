const {Schema, model} = require('mongoose');

const Posts = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: String, required: true},
    filePath: {type: String, required: true},
    username: {type: String, required: true},
    currentTime: {type:String},
    text: {type: String, required: true},
    mimetype: {type: String, required: true},
    posting:{type: Boolean, required: true}
})

module.exports = model('Posts', Posts)