import mongoose from 'mongoose';



const adminsSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: tru
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: 'admin',
        default: 'admin'
    },
    otp: {
        type: String,

    },
    optExpire: {
        type: Date
    }
}, {
    timestamps: true
});
const admin = mongoose.model('admin', adminsSchema);
export default admin;