const router = require("express").Router();

// import your models here
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// add a message
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        const currentConversation = await Conversation.updateOne(
            { _id: req.body.conversationId }, 
            {$currentDate: {
                updatedAt: true
            }}
        );
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
})

// getting messages
router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});


// delete all message
router.get("/delete/:conversationId", async (req, res) => {
    try {
        const messages = await Message.deleteMany({coversationId: req.params.coversationId})
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
