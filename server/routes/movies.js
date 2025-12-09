const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

// Thêm phim (Chỉ Admin)
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});

// Lấy phim ngẫu nhiên (Cho trang chủ)
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

// Lấy tất cả phim
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});

module.exports = router;