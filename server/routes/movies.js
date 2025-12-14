const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

router.get("/search", async (req, res) => {
    const query = req.query.q;
    try {
        const movies = await Movie.find({
            title: { $regex: query, $options: "i" }
        }).limit(20);
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie);
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});

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


router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (err) { res.status(500).json(err); }
    } else { res.status(403).json("Không có quyền!"); }
});


router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

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