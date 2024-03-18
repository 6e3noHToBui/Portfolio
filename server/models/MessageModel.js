const {model, Schema} = require('mongoose')

const Messages = new Schema({
    username:{type: String, require: true},
    email:{type: String, require: true},
    message:{type: String}
})

module.exports=model('Message', Messages)