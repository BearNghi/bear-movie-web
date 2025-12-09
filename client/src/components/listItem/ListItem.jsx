import "./listItem.css";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to="/watch" className="link">
            <div
                className="listItem"
                style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Nếu không có ảnh thì dùng ảnh mặc định */}
                <img
                    src={item.img || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"}
                    alt=""
                />

                {isHovered && (
                    <>
                        <video src={item.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon play" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{item.duration || "1 giờ 30 phút"}</span>
                                <span className="limit">+{item.limit || "16"}</span>
                                <span>{item.year || "2077"}</span>
                            </div>
                            <div className="desc">
                                {item.desc || "Một bộ phim viễn tưởng về tương lai Cyberpunk đầy kịch tính."}
                            </div>
                            <div className="genre">{item.genre || "Sci-fi"}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}