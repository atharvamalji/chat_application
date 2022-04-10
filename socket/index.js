const io = require("socket.io")(8900, {
    cors: {
        origin: true,
    }
});

let users = [];

const addUser = (userId, socketId) => {
    // if (!users.some(user => user.userId === userId)) {
        
    // }
    users.push({ userId, socketId });
    console.log(users);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (recieverId) => {``
    return users.find(user => user.userId === recieverId);
}


io.on("connection", (socket) => {
    // when connected
    console.log("a user connected");
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, recieverId, messageText }) => {
        try {
            const reciever = getUser(recieverId);
            console.log(users);
            io.to(reciever.socketId).emit("getMessage", {
                senderId: senderId,
                messageText: messageText
            })
        } catch (err) {
            console.log("error occuered");
        }
    });

    // when disconnected
    socket.on("disconnect", () => {
        console.log("a user disconnected");
        removeUser(socket.id);
        console.log(users);
        io.emit("getUsers", users);
    })
});