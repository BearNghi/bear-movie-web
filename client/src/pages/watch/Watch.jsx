import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import "./watch.css";

export default function Watch() {
  // Lấy dữ liệu phim nếu được truyền từ trang chủ (nếu không có thì dùng ID giả để test)
  const location = useLocation();
  const movie = location.state?.movie;

  // ID này dùng để lưu bình luận vào Database. 
  // Nếu chưa có phim thật, nó sẽ lưu vào id "test_movie_id"
  const movieId = movie?._id || "test_movie_id_matrix";

  return (
    <div className="watch">
      {/* Nút Quay lại */}
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          <span>Trang chủ</span>
        </div>
      </Link>

      {/* Khu vực Video */}
      <div className="video-wrapper">
        <video
          className="video"
          autoPlay
          progress="true"
          controls
          src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
        />
      </div>

      {/* Khu vực Bình luận (Nằm dưới video) */}
      <div className="comment-section">
        <Comments movieId={movieId} />
      </div>
    </div>
  );
}