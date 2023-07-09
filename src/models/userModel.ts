import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username has already taken by someone else"]
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'This email is already in use']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifiyToken: String,  
})


const User = mongoose.models.users || mongoose.model("Users", userSchema)

export default User;