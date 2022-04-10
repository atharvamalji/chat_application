const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 32,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 32,
    },
    username: {
        type: String,
        required: true,
        min: 2,
        max: 32,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 64,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 256
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    connections: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    bio: {
        type: String,
        max: 256
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);