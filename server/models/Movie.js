const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: { type: String }, // Mô tả phim
    img: { type: String }, // Ảnh bìa phim
    imgTitle: { type: String }, // Ảnh tên phim (logo)
    imgSm: { type: String }, // Ảnh nhỏ (thumbnail)
    trailer: { type: String }, // Link trailer
    video: { type: String }, // Link phim chính (QUAN TRỌNG)
    year: { type: String }, // Năm sản xuất
    limit: { type: Number }, // Độ tuổi giới hạn (ví dụ: 16+)
    genre: { type: String }, // Thể loại (Hành động, Hài...)
    isSeries: {
        type: Boolean,
        default: false // Mặc định là phim lẻ
    }
}, { timestamps: true });

module.exports = mongoose.model("Movie", MovieSchema);