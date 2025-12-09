const router = require("express").Router();
const Comment = require("../models/comment");
const verify = require("../verifyToken"); // Cần đăng nhập mới được bình luận

// 1. VIẾT BÌNH LUẬN MỚI
router.post("/", verify, async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) { res.status(500).json(err); }
});

// 2. LẤY TẤT CẢ BÌNH LUẬN CỦA 1 PHIM
router.get("/:movieId", async (req, res) => {
    try {
        const comments = await Comment.find({ movieId: req.params.movieId }).sort({ createdAt: -1 }); // Mới nhất lên đầu
        res.status(200).json(comments);
    } catch (err) { res.status(500).json(err); }
});

// 3. XÓA BÌNH LUẬN (Chỉ Admin hoặc Chủ comment)
router.delete("/:id", verify, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        // Nếu là Admin HOẶC là người viết comment đó thì được xóa
        if (req.user.isAdmin || req.user.id === comment.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("Đã xóa bình luận!");
        } else {
            res.status(403).json("Bạn không có quyền xóa!");
        }
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;