import { Link } from "react-router-dom";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.css";

// Nhận prop "movie" từ Home
export default function Featured({ type, movie }) {
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "PHIM LẺ" : "PHIM BỘ"}</span>
                    <select name="genre" id="genre">
                        <option>Thể loại</option>
                        <option value="action">Hành động</option>
                        <option value="sci-fi">Viễn tưởng</option>
                        <option value="horror">Kinh dị</option>
                    </select>
                </div>
            )}

            {/* Hiển thị ảnh phim mới nhất */}
            <img
                src={movie?.img || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"}
                alt=""
                className="featuredImg"
            />

            <div className="overlay"></div>

            <div className="info-card">
                {/* Logo hoặc Tên phim */}
                {movie?.imgTitle ? (
                    <img src={movie.imgTitle} alt={movie.title} style={{ width: "100%", marginBottom: "10px" }} />
                ) : (
                    <h1 className="movie-title">{movie?.title || "Phim Mới Nhất"}</h1>
                )}

                <div className="meta-data">
                    <span className="match">Vừa cập nhật</span>
                    <span className="year">{movie?.year || "2025"}</span>
                    <span className="age">{movie?.limit || "16"}+</span>
                    <span className="season">{movie?.genre || "Phim Hot"}</span>
                </div>

                <span className="desc">
                    {movie?.desc || "Chưa có mô tả cho bộ phim này..."}
                </span>

                <div className="buttons">
                    {/* Bấm xem ngay */}
                    <Link to="/watch" state={{ movie: movie }}>
                        <button className="play">
                            <PlayArrow />
                            <span>XEM NGAY</span>
                        </button>
                    </Link>

                    <button className="more">
                        <InfoOutlined />
                        <span>CHI TIẾT</span>
                    </button>
                </div>
            </div>
        </div>
    );
}