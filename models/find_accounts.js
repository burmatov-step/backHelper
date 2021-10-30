const {Schema, model} = require('mongoose');

const AllFindAccount = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    login: {type: String, required: true},
})


module.exports = model('FindAccount', AllFindAccount)