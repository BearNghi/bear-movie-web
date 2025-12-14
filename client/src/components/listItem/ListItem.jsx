import "./listItem.css";
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined, Check } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../../config";

export default function ListItem({ index, item }) {
    const [isHovered, setIsHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.put(`${BASE_API_URL}/users/mylist/${item._id}`, {}, {
                headers: { token: "Bearer " + user.accessToken }
            });
            setAdded(!added);
            alert(added ? "Đã xóa khỏi danh sách!" : "Đã thêm vào danh sách!");
        } catch (err) { console.log(err); }
    };

    return (
        <Link to="/watch" state={{ movie: item }} className="link">
            <div
                className="listItem"
                style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={item.img || "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"} alt="" />

                {isHovered && (
                    <>
                        <video src={item.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon play" />

                                <div className="icon" onClick={handleAdd}>
                                    {added ? <Check /> : <Add />}
                                </div>
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{item.duration || "1h 30m"}</span>
                                <span className="limit">+{item.limit || "16"}</span>
                                <span>{item.year || "2024"}</span>
                            </div>
                            <div className="desc">{item.desc}</div>
                            <div className="genre">{item.genre}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
}