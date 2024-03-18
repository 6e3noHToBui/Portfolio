const {model, Schema} = require('mongoose')

const Projects = new Schema({
    name:{type: String, require:true},
    description:{type: String, require:true},
    images:[{url:{type: String}}],
    git_link:{type:String}
})

module.exports = model('Project', Projects)