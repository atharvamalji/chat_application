const router = require("express").Router();

// import your models here
const User = require("../models/User");
const { route } = require("./messages");

// create your routes here
// router.get("/", (req, res) => {
//     res.send("This is Users route");
// });

// update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set: req.body
            });
            res.status(200).json("account updated sucessfully");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("permission denied");
    }
})

// update password


// delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("account deleted sucessfully");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        return res.status(403).json("permission denied");
    }
})

// follow user
router.post("/:id/follow", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.userId !== req.body.followUserId) {
            try {
                const followUser = await User.findById(req.body.followUserId);
                const user = await User.findById(req.body.userId);

                if (!user.following.includes(req.body.followUserId)) {
                    // adding followUser to the following list
                    await user.updateOne({
                        $push: {
                            following: req.body.followUserId
                        }
                    });
                    // adding user to the followers list
                    await followUser.updateOne({
                        $push: {
                            followers: req.body.userId
                        }
                    });
                    res.status(200).json("user has been followed");
                } else {
                    res.status(403).json("you already follow this user");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            return res.status(403).json("permission denied 2");
        }
    } else if (req.body.userId === req.body.followUserId) {
        return res.status(403).json("you cannot follow yourself");
    } else {
        return res.status(403).json("permission denied 1");
    }
})

// unfollow user
router.post("/:id/unfollow", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.userId !== req.body.unfollowUserId) {
            try {
                const unfollowUser = await User.findById(req.body.unfollowUserId);
                const user = await User.findById(req.body.userId);

                if (user.following.includes(req.body.unfollowUserId)) {
                    // adding followUser to the followers list
                    await user.updateOne({
                        $pull: {
                            following: req.body.unfollowUserId
                        }
                    });
                    // adding user to the following list
                    await unfollowUser.updateOne({
                        $pull: {
                            followers: req.body.userId
                        }
                    });
                    res.status(200).json("user has been unfollowed");
                } else {
                    res.status(403).json("you don't follow this user");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            return res.status(403).json("permission denied 2");
        }
    } else if (req.body.userId === req.body.followUserId) {
        return res.status(403).json("you cannot unfollow yourself");
    } else {
        return res.status(403).json("permission denied 1");
    }
})

// get user
// router.get("/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         try {
//             const user = await User.findById(req.params.userId);
//             const { password, isAdmin, ...other } = user._doc;
//             res.status(200).json(other);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     } else {
//         return res.status(403).json("permission denied");
//     }
// })

// get user by username
router.get("/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username }).select(["-password", "-updatedAt", "-__v"]);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// search users
router.get("/", async (req, res) => {

    const regex = "^".concat(req.query.q, ".*");

    if (req.query) {
        if (req.query.q !== "") {

            const query = {
                $or: [
                    { username: { "$regex": regex, "$options": "i" } },
                    { firstName: { "$regex": regex, "$options": "i" } },
                    { lastName: { "$regex": regex, "$options": "i" } }
                ]
            }

            const searchResults = await User.find(query).select(["-password", "-createdAt", "-followers", "-following", "-email", "-isAdmin", "-createdAt", "-updatedAt", "-__v"]);
            return res.status(200).json(searchResults);
        } else {
            return res.status(200).json([]);
        }
    } else {
        return res.status(200).json("you entered nothing in search query")
    }
})

router.get("/friends/:id", async (req, res) => {
    if (req.params.id !== null || req.params.id === "") {
        const user = await User.findById(req.params.id);
        const friends = [];
        for (let person of user.friends) {
            const result = await User.findById(person).select(["-password", "-createdAt", "-followers", "-following", "-email", "-isAdmin", "-createdAt", "-updatedAt", "-__v"]);
            friends.push(result);
        }
        return res.status(200).json(friends);
    } else {
        return res.status(500).json("error occured");
    }
})

router.get("/friends/:id/id", async (req, res) => {
    if (req.params.id !== null || req.params.id === "") {
        const user = await User.findById(req.params.id);
        const friends = [];
        for (let person of user.friends) {
            const result = await User.findById(person).select(["_id"]);
            friends.push(result._id);
        }
        return res.status(200).json(friends);
    } else {
        return res.status(500).json("error occured");
    }
})


// follow user
router.post("/:id/addFriend", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.userId !== req.body.addFriendUserId) {
            try {
                const addFriendUser = await User.findById(req.body.addFriendUserId);
                const user = await User.findById(req.body.userId);

                if (!user.friends.includes(req.body.addFriendUserId)) {
                    // adding followUser to the following list
                    await user.updateOne({
                        $push: {
                            friends: req.body.addFriendUserId
                        }
                    });
                    // adding user to the followers list
                    await addFriendUser.updateOne({
                        $push: {
                            friends: req.body.userId
                        }
                    });
                    res.status(200).json("user has been added as friend");
                } else {
                    res.status(403).json("you are already friend with this user");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            return res.status(403).json("permission denied 2");
        }
    } else if (req.body.userId === req.body.addFriendUserId) {
        return res.status(403).json("you cannot add yourself as friend");
    } else {
        return res.status(403).json("permission denied 1");
    }
})

// unfollow user
router.post("/:id/removeFriend", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.userId !== req.body.removeFriendUserId) {
            try {
                const removeFriendUser = await User.findById(req.body.removeFriendUserId);
                const user = await User.findById(req.body.userId);

                if (user.friends.includes(req.body.removeFriendUserId)) {
                    // adding followUser to the followers list
                    await user.updateOne({
                        $pull: {
                            friends: req.body.removeFriendUserId
                        }
                    });
                    // adding user to the following list
                    await removeFriendUser.updateOne({
                        $pull: {
                            friends: req.body.userId
                        }
                    });
                    res.status(200).json("user has been removed from friends");
                } else {
                    res.status(403).json("you are not friends with this user");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            return res.status(403).json("permission denied 2");
        }
    } else if (req.body.userId === req.body.removeFriendUserId) {
        return res.status(403).json("you cannot remove yourself as friend");
    } else {
        return res.status(403).json("permission denied 1");
    }
})

    module.exports = router;