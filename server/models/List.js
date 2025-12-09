const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // Tên danh sách (VD: Phim Hành Động)
    type: { type: String }, // Loại (Phim lẻ hay Phim bộ)
    genre: { type: String }, // Thể loại
    content: { type: Array } // Chứa danh sách ID các phim nằm trong danh sách này
}, { timestamps: true });

module.exports = mongoose.model("List", ListSchema);