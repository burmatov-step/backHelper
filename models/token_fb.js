const {Schema, model} = require('mongoose');

const TokenFb = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    tokenFb: {type: String, required: true},
    userIdFb: {type: String, required: true},
})


module.exports = model('TokenFb', TokenFb)