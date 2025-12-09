const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verify = require("../verifyToken");

// CẬP NHẬT THÔNG TIN (Đổi pass, avatar)
router.put("/:id", verify, async (req, res) => {
    // Chỉ cho phép sửa nếu là chính chủ hoặc là Admin
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true } // Trả về thông tin mới sau khi update
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Bạn chỉ được cập nhật tài khoản của mình!");
    }
});

// LẤY THÔNG TIN 1 USER (Để hiển thị lên trang Profile)
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc; // Giấu mật khẩu đi
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;