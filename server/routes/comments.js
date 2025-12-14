const router = require("express").Router();
const Comment = require("../models/Comment");
const verify = require("../verifyToken");


router.post("/", verify, async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:movieId", async (req, res) => {
    try {

        const comments = await Comment.find({ movieId: req.params.movieId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete("/:id", verify, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json("Không tìm thấy bình luận!");


        if (req.user.isAdmin || req.user.id === comment.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Đã xóa bình luận!");
        } else {
            res.status(403).json("Bạn không có quyền xóa bình luận này!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;