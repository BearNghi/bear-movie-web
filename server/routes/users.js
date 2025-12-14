const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const verify = require("../verifyToken");
const Movie = require("../models/Movie");

router.put("/:id", verify, async (req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Bạn chỉ được cập nhật tài khoản của mình!");
    }
});

router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/mylist/:movieId", verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const movieId = req.params.movieId;

        if (user.myList.includes(movieId)) {
            await user.updateOne({ $pull: { myList: movieId } });
            res.status(200).json("Đã xóa khỏi danh sách!");
        } else {
            await user.updateOne({ $push: { myList: movieId } });
            res.status(200).json("Đã thêm vào danh sách!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/mylist/all", verify, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        const list = await Promise.all(
            user.myList.map((id) => {
                return Movie.findById(id);
            })
        );
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;