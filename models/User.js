import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
        type: String,
        required: true,
        unique : true
        },
        email: {
        type: String,
        required: true,
        unique: true
        },
        password: {
        type: String,
        required: true
        },
        refreshToken: {
          type: String,
          default: null
        },
        roles: [
          {
            type: String,
            enum: ["user", "admin"], 
            default: ["user"], 
          },
        ],
  }
);

export default mongoose.model('User', UserSchema);