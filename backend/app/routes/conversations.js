const router = require("express").Router();

// import your models here
const User = require("../models/User");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// new conversation
router.post("/", async (req, res) => {
    const exisitingConveration = await Conversation.find({
        members: { $all: [req.body.senderId, req.body.recieverId] }
    });

    if (exisitingConveration.length === 0) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.recieverId]
        });
    
        try {
            const friend = await User.findById(req.body.recieverId).select(["-password", "-createdAt", "-followers", "-following", "-email", "-isAdmin", "-createdAt", "-updatedAt", "-__v"]);
            const savedConversation = await newConversation.save();
            const response = {
                conversationId: savedConversation._id,
                friend: friend
                // updatedAt: exisitingConveration.updatedAt,
                // lastMessage: lastMessage[0]
            }
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json(err);
        }   
    } else {
        const friend = await User.findById(req.body.recieverId).select(["-password", "-createdAt", "-followers", "-following", "-email", "-isAdmin", "-createdAt", "-updatedAt", "-__v"]);
        const lastMessage = await Message.find({conversationId: exisitingConveration._id}).select(["-_id", "-updatedAt", "-__v", "-conversationId"]).sort( [['_id', -1]] ).limit(1);
        const response = {
            conversationId: exisitingConveration[0]._id,
            friend: friend
            // updatedAt: exisitingConveration.updatedAt,
            // lastMessage: lastMessage[0]
        }
        res.status(200).json(response);
    }
})

// get conversation of a user
router.get("/:id", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.id] }
        });
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/temp/:id", async (req, res) => {
    try {
        const response = [];
        const conversations = await Conversation.find({
            members: { $in: [req.params.id] }
        });
        for (let conversation of conversations) {
            const userId = conversation.members.filter((member) => member !== req.params.id);
            const user = await User.findById(userId[0]).select(["-password", "-createdAt", "-followers", "-following", "-email", "-isAdmin", "-createdAt", "-updatedAt", "-__v"]);
            const lastMessage = await Message.find({conversationId: conversation._id}).select(["-_id", "-updatedAt", "-__v", "-conversationId"]).sort( [['_id', -1]] ).limit(1);
            const res = {
                friend: user,
                conversationId: conversation._id,
                updatedAt: conversation.updatedAt,
                lastMessage: lastMessage[0]
            }
            response.push(res);
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
