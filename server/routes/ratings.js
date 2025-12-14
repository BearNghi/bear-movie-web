const router = require("express").Router();
const Rating = require("../models/Rating");
const verify = require("../verifyToken");

router.post("/", verify, async (req, res) => {
    try {

        const updatedRating = await Rating.findOneAndUpdate(
            { userId: req.user.id, movieId: req.body.movieId },
            { number: req.body.number },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedRating);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:movieId", async (req, res) => {
    try {
        const ratings = await Rating.find({ movieId: req.params.movieId });
        if (ratings.length === 0) return res.status(200).json({ avg: 0, count: 0 });

        const sum = ratings.reduce((acc, curr) => acc + curr.number, 0);
        const avg = (sum / ratings.length).toFixed(1);

        res.status(200).json({ avg: avg, count: ratings.length });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/my/:movieId/:userId", async (req, res) => {
    try {
        const myRating = await Rating.findOne({
            movieId: req.params.movieId,
            userId: req.params.userId
        });
        res.status(200).json(myRating ? myRating.number : 0);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;