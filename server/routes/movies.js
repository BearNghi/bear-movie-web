const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// 1. TÌM KIẾM PHIM (Mới thêm)
router.get("/search", async (req, res) => {
    const query = req.query.q; // Lấy từ khóa ?q=...
    try {
        const movies = await Movie.find({
            title: { $regex: query, $options: "i" } // Tìm gần đúng, không phân biệt hoa thường
        }).limit(20);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 2. THÊM PHIM (Admin)
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});

// 3. LẤY PHIM NGẪU NHIÊN (Cho Banner)
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
        } else {
            movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
        }
        res.status(200).json(movie);
    } catch (err) { res.status(500).json(err); }
});

// 4. LẤY TẤT CẢ PHIM
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});

// 5. LẤY 1 PHIM CHI TIẾT
router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 6. XÓA PHIM (Admin)
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Phim đã được xóa...");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Bạn không có quyền xóa phim!");
    }
});

module.exports = router;