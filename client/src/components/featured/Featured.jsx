import { Link } from "react-router-dom";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.css";

export default function Featured({ type }) {
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "PHIM ĐIỆN ẢNH" : "PHIM BỘ"}</span>
                    <select name="genre" id="genre">
                        <option>Thể loại</option>
                        <option value="action">Hành động</option>
                        <option value="sci-fi">Viễn tưởng</option>
                        <option value="horror">Kinh dị</option>
                    </select>
                </div>
            )}

            {/* Ảnh nền Full HD - Cyberpunk City */}
            <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
                alt=""
                className="featuredImg"
            />

            {/* Lớp phủ màu để làm dịu ảnh nền */}
            <div className="overlay"></div>

            {/* Hộp thông tin (Glass Card) */}
            <div className="info-card">
                {/* Logo phim dạng chữ Neon */}
                <h1 className="movie-title">THE MATRIX</h1>

                <div className="meta-data">
                    <span className="match">98% Phù hợp</span>
                    <span className="year">1999</span>
                    <span className="age">18+</span>
                    <span className="season">Sci-Fi Masterpiece</span>
                </div>

                <span className="desc">
                    Trong một tương lai phản địa đàng, nhân loại bị mắc kẹt trong thực tế mô phỏng tên là Ma Trận. Neo - một hacker tài năng - là người được chọn để giải phóng loài người.
                </span>

                <div className="buttons">
                    {/* Bọc nút play bằng thẻ Link */}
                    <Link to="/watch">
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