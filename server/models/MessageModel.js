const {model, Schema} = require('mongoose')

const Messages = new Schema({
    username:{type: String, required: true},
    email:{type: String, required: true},
    message:{type: String}
})

module.exports=model('Message', Messages)