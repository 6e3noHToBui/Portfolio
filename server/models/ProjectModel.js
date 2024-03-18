const {model, Schema} = require('mongoose')

const Projects = new Schema({
    name:{type: String, required:true},
    description:{type:{en:String,pl:String,ru:String},required:true},
    images:[{url:{type: String}}],
    git_link:{type:String}
})

module.exports = model('Project', Projects)