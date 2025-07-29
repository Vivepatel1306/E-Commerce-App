import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true
        }, 
        phone: {
            type: String,
            unique: true,
            required: true
        }, role: {
            type: Number,
            default: 0
        }
    }, {
    timestamps: true
}
)
const user = mongoose.model("user", userSchema);
export default user;