const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const commentRoute = require("./routes/comments");

// Import đầy đủ các routes
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const userRoute = require("./routes/users");

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Chỉ cho phép trang web của bạn truy cập
    methods: ["GET", "POST", "PUT", "DELETE"], // Các quyền được phép
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Đã kết nối MongoDB thành công!"))
    .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// Sử dụng các routes
app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(5000, () => {
    console.log("Server đang chạy tại http://localhost:5000");
});
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);