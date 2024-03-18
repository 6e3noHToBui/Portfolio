const router = require('express').Router()
const {addMessage} = require('../controllers/MessagesCont')
const {login} = require('../controllers/UserCont')
const {addProject, getProjects} = require('../controllers/ProjectCont')
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer');
const upload = multer();

router.post('/send-message', addMessage)
router.post('/login', login)
router.post('/add-project', authMiddleware,upload.array('images'), addProject)
router.get('/get-projects', getProjects)

module.exports = router