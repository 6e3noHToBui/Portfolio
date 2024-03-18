const Projects = require('../models/ProjectModel')
const { promisify } = require('util')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

AWS.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY,
    region: process.env.AWS_REGION,
})

const s3 = new AWS.S3()
const s3Upload = promisify(s3.upload).bind(s3)

exports.addProject = async (req, res) => {
    const { name, description, git_link} = req.body
    const files = req.files

    try {
        const imageUrls = []

        for (const file of files) {
            const existingImage = await Projects.findOne({ 'images.url': file.originalname })
            if (existingImage) {
                imageUrls.push({ url: existingImage.images[0].url })
            } else {
                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: `portfolio/${file.originalname}`, 
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }
                const uploadResult = await s3Upload(params)
                const imageUrl = uploadResult.Location
                imageUrls.push({ url: imageUrl })
            }
        }
        const projectExist = await Projects.findOne({name:name})
        if(projectExist){
                projectExist.name = name,
                projectExist.description= description,
                projectExist.images= imageUrls,
                projectExist.git_link= git_link
                await projectExist.save();
                res.status(200).json({ message: 'Project update successfully', projectExist })
            }
        else{
            const Project = new Projects({
                name: name,
                description: description,
                images: imageUrls,
                git_link: git_link
            });
            await Project.save();
            res.status(200).json({ message: 'Project added successfully', Project })
        }
    } catch (error) {
        console.log('Error adding project:', error)
        res.status(500).json({ error: "Server Error" })
    }
}

exports.getProjects = async (req, res) => {
    const lang = req.query.lang
    try {
        const projects = await Projects.find().select(`name description.${lang} git_link images.url -_id`);
        if (!projects || projects.length === 0) {
            return res.status(400).json({ error: "Projects not found" });
        }
        const formattedProjects = projects.map(project => ({
            name: project.name,
            description: project.description,
            git_link: project.git_link,
            images: project.images.map(image => image.url)
        }));
        res.status(200).json(formattedProjects );
    } catch (error) {
        console.log('Error fetching projects:', error);
        res.status(500).json({ error: "Server Error" });
    }
}

