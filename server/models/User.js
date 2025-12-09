const mongoose = require('mongoose');

// Tạo khung dữ liệu cho người dùng
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Bắt buộc phải có tên
        unique: true    // Không được trùng tên
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
    profilePic: {
        type: String,
        default: "" // Nếu không có ảnh thì để rỗng
    },
    isAdmin: {
        type: Boolean,
        default: false // Mặc định là người dùng thường, không phải Admin
    }
}, { timestamps: true }); // Tự động lưu thời gian tạo và cập nhật

module.exports = mongoose.model("User", UserSchema);