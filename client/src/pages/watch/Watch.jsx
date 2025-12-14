import { ArrowBackOutlined, Star, Add, Check } from "@mui/icons-material"; // Thêm icon Add, Check
import { Link, useLocation } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import "./watch.css";

export default function Watch() {
  const location = useLocation();
  const movie = location.state?.movie;
  const movieId = movie?._id || "unknown";

  const [value, setValue] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false); // Trạng thái đã lưu hay chưa

  // Lấy thông tin user từ LocalStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Kiểm tra xem phim này đã có trong danh sách của user chưa
    if (user && user.myList && user.myList.includes(movieId)) {
      setIsSaved(true);
    }

    const getRatings = async () => {
      if (!movie) return;
      try {
        const resAvg = await axios.get(`http://localhost:5000/api/ratings/${movieId}`);
        setAvgRating(resAvg.data.avg);
        setCount(resAvg.data.count);

        if (user) {
          const resMy = await axios.get(`http://localhost:5000/api/ratings/my/${movieId}/${user._id}`);
          setValue(resMy.data);
        }
      } catch (err) { console.log(err); }
    };
    getRatings();
  }, [movieId, user?._id]); // Chạy lại khi ID phim thay đổi

  // Hàm xử lý Lưu / Bỏ lưu
  const handleToggleList = async () => {
    if (!user) return alert("Vui lòng đăng nhập!");
    try {
      // Gọi API cập nhật
      await axios.put(`http://localhost:5000/api/users/mylist/${movieId}`, {}, {
        headers: { token: "Bearer " + user.accessToken }
      });

      // Cập nhật giao diện
      const newStatus = !isSaved;
      setIsSaved(newStatus);

      // Cập nhật luôn vào LocalStorage để đồng bộ dữ liệu
      let updatedList = user.myList ? [...user.myList] : [];
      if (newStatus) {
        updatedList.push(movieId); // Thêm vào mảng
        alert("✅ Đã thêm vào Danh sách của tôi!");
      } else {
        updatedList = updatedList.filter(id => id !== movieId); // Xóa khỏi mảng
        alert("❌ Đã xóa khỏi Danh sách!");
      }

      const updatedUser = { ...user, myList: updatedList };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (err) { console.log(err); }
  };

  const handleRatingChange = async (event, newValue) => {
    if (!user) return alert("Vui lòng đăng nhập để đánh giá!");
    setValue(newValue);
    try {
      await axios.post("http://localhost:5000/api/ratings", {
        movieId: movieId,
        number: newValue
      }, {
        headers: { token: "Bearer " + user.accessToken }
      });
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (err) { console.log(err); }
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(movie?.video);

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          <span>Trang chủ</span>
        </div>
      </Link>

      <div className="video-wrapper">
        {youtubeId ? (
          <iframe
            className="video"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0`}
            title={movie?.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video className="video" autoPlay progress="true" controls src={movie?.video} />
        )}
      </div>

      <div className="rating-section">
        <div className="rating-left">
          <div className="title-row">
            <h2>{movie?.title || "Đang tải..."}</h2>
            {/* Nút Lưu Phim */}
            <button
              className={`save-btn ${isSaved ? "saved" : ""}`}
              onClick={handleToggleList}
            >
              {isSaved ? <Check /> : <Add />}
              {isSaved ? "Đã Lưu" : "Lưu Phim"}
            </button>
          </div>

          <div className="avg-rating">
            <Star className="star-icon" />
            <span>{avgRating || 0}/5</span>
            <small>({count || 0} lượt đánh giá)</small>
          </div>
        </div>

        <div className="rating-right">
          <span>Đánh giá của bạn:</span>
          <Rating
            name="simple-controlled"
            value={value || 0}
            onChange={handleRatingChange}
            size="large"
            sx={{
              "& .MuiRating-iconFilled": { color: "#e50914" },
              "& .MuiRating-iconEmpty": { color: "gray" }
            }}
          />
        </div>
      </div>

      <div className="comment-section">
        <Comments movieId={movieId} />
      </div>
    </div>
  );
}