const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcrypt");

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Đã kết nối DB...");

        // Xóa admin cũ nếu có để tránh trùng
        await User.findOneAndDelete({ email: "admin@gmail.com" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);

        const newAdmin = new User({
            username: "SuperAdmin",
            email: "admin@gmail.com",
            password: hashedPassword,
            profilePic: "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png",
            isAdmin: true, // <--- ĐÂY LÀ CHÌA KHÓA QUYỀN LỰC
        });

        await newAdmin.save();
        console.log("👑 Đã tạo tài khoản Admin thành công!");
        console.log("Email: admin@gmail.com");
        console.log("Pass: 123456");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit();
    }
};

createAdmin();