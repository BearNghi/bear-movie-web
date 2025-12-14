const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    movieId: { type: String, required: true },
    number: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });


RatingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Rating", RatingSchema);