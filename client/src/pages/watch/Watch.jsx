import { ArrowBackOutlined, Star } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating } from "@mui/material";
import BASE_API_URL from "../../config";
import "./watch.css";

export default function Watch() {
  const location = useLocation();
  const movie = location.state?.movie;
  const movieId = movie?._id || "test_movie_id_matrix";

  const [value, setValue] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [count, setCount] = useState(0);


  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getRatings = async () => {
      try {

        const resAvg = await axios.get(`${BASE_API_URL}/ratings/${movieId}`);
        setAvgRating(resAvg.data.avg);
        setCount(resAvg.data.count);

        if (user) {
          const resMy = await axios.get(`${BASE_API_URL}/ratings/my/${movieId}/${user._id}`);
          setValue(resMy.data);
        }
      } catch (err) { console.log(err); }
    };
    getRatings();
  }, [movieId, user?._id]);

  const handleRatingChange = async (event, newValue) => {
    if (!user) return alert("Vui lòng đăng nhập để đánh giá!");
    setValue(newValue);
    try {
      await axios.post(`${BASE_API_URL}/ratings`, {
        movieId: movieId,
        number: newValue
      }, {
        headers: { token: "Bearer " + user.accessToken }
      });
      alert("Cảm ơn bạn đã đánh giá!");
    } catch (err) { console.log(err); }
  };


  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          <span>Trang chủ</span>
        </div>
      </Link>

      <div className="video-wrapper">
        <video
          className="video"
          autoPlay
          progress="true"
          controls
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
        />
      </div>


      <div className="rating-section">
        <div className="rating-left">
          <h2>{movie?.title || "The Matrix"}</h2>
          <div className="avg-rating">
            <Star className="star-icon" />
            <span>{avgRating}/5</span>
            <small>({count} lượt đánh giá)</small>
          </div>
        </div>

        <div className="rating-right">
          <span>Đánh giá của bạn:</span>
          <Rating
            name="simple-controlled"
            value={value}
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