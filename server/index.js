const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const commentRoute = require("./routes/comments");
const ratingRoute = require("./routes/ratings");
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const userRoute = require("./routes/users");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Đã kết nối MongoDB thành công!"))
    .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));


app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/comments", commentRoute);
app.use("/api/users", userRoute);
app.use("/api/ratings", ratingRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});