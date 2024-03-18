const { check, validationResult } = require("express-validator");
const { sendBotMessage } = require("./DiscordBot");
const Messages = require('../models/MessageModel')

exports.addMessage = [
    check('email', "Incorrect email").trim().isEmail(),
    check('username', "Login is incorrect").trim().isLength({ min: 4, max: 20 }),
    check('message', "Message is incorrect").trim().escape().notEmpty(), async (req, res) => {
        const { username, email, message } = req.body;

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const validate_error = errors.errors.map(err => err.msg);
                return res.status(400).json({ validate_error });
            }
            const existMessage = await Messages.findOne({email:email})
            if(!existMessage){
                const Message = new Messages({
                    username,
                    email,
                    message
                });
                await Message.save();
                console.log('Add new message')
                sendBotMessage(username, email, message, true);
                res.status(200).json({ error: "Message sent successfully" });
            }
            else{
                existMessage.username = username;
                existMessage.message = message;
                await existMessage.save()
                console.log("Message updated")
                sendBotMessage(username, email, message, false);
                res.status(200).json({ error: "Update message successfully" });
            }
        } catch (error) {
            console.log('Error adding new message:', error);
            res.status(500).json({ error: "Server Error" });
        }
    }
];
