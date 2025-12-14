import { Notifications, Search, Settings } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" && input.length > 0) {
            navigate(`/search?q=${input}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.replace("/login");
    };

    // Kiểm tra quyền Admin khi bấm icon Bánh răng
    const handleAdminClick = () => {
        if (user && user.isAdmin) {
            navigate("/admin/movies");
        } else {
            alert("⛔ Chức năng này chỉ dành cho Admin!");
        }
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link"><h2 className="logo">BEARMOVIE</h2></Link>
                    <Link to="/" className="link"><span>Trang chủ</span></Link>
                    <span>Mới & Phổ biến</span>
                    <Link to="/mylist" className="link"><span>Danh sách của tôi</span></Link>
                </div>

                <div className="right">
                    {/* Ô Tìm kiếm */}
                    <div className={`searchBox ${showSearch ? "active" : ""}`}>
                        <Search className="icon" onClick={() => setShowSearch(!showSearch)} />
                        <input
                            type="text" placeholder="Tìm phim..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>

                    {/* Icon Admin */}
                    <Settings
                        className="icon"
                        onClick={handleAdminClick}
                        style={{ cursor: "pointer", color: user?.isAdmin ? "#e50914" : "white" }}
                        titleAccess="Quản lý Phim (Admin)"
                    />

                    {/* Nút Đăng Xuất */}
                    <span onClick={handleLogout} style={{ cursor: "pointer", fontWeight: "bold", fontSize: "14px", margin: "0 10px" }}>
                        ĐĂNG XUẤT
                    </span>

                    <Notifications className="icon" />

                    {/* Avatar (Bấm vào để Đổi mật khẩu/Avatar) */}
                    <Link to="/profile">
                        <img
                            src={user?.profilePic || "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png"}
                            alt=""
                            style={{ border: "1px solid white" }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;