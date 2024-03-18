const {model, Schema} = require('mongoose')

const Users = new Schema({
    login:{type: String, unieque:true, require:true},
    password:{type: String, require:true}
})

module.exports = model('User', Users)