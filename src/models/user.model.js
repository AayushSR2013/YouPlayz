import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        require: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,   // Using cloudinary URL
        required: true,
    },
    coverImage: {
        type: String,   // Using cloudinary URL
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video",
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

// pre is a builtin hook which is use to run just after saving the password and we use normal function in this as arrow has no access of the fields like this.password and all
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) next();
    this.password = bcrypt.hash(this.password, 10)
    next();
})

// it is a method which is selfmade used to check that the password is correct or not entered by user
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
            // This is payload
            // fullName is payload name of key and
            // this.fullName is comes fom database and all these also
            _id:this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}



export const User = mongoose.model("User", userSchema)