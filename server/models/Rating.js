const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Ai chấm?
    movieId: { type: String, required: true }, // Phim nào?
    number: { type: Number, required: true, min: 1, max: 5 }, // Mấy điểm?
}, { timestamps: true });

// Đảm bảo 1 người chỉ chấm 1 lần cho 1 phim
RatingSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Rating", RatingSchema);