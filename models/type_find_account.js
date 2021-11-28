const {Schema, model} = require('mongoose');

const TypeFindAccount = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, required: true},
})


module.exports = model('TypeFindAccount', TypeFindAccount)