import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <Link to="/" className="link">
                        <h2 className="logo">BEARMOVIE</h2>
                    </Link>

                    <Link to="/" className="link">
                        <span>Trang chủ</span>
                    </Link>

                    {/* --- CẬP NHẬT 2 DÒNG NÀY --- */}
                    <Link to="/series" className="link">
                        <span>Phim bộ</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Phim lẻ</span>
                    </Link>

                    <span>Mới & Phổ biến</span>
                    <span>Danh sách của tôi</span>
                </div>

                <div className="right">
                    <Search className="icon" />
                    <span>TRẺ EM</span>
                    <Notifications className="icon" />
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <Link to="/profile" className="link"><span>Hồ sơ</span></Link>
                            <Link to="/admin/movies" className="link"><span>Quản lý Phim</span></Link>
                            <Link to="/admin/newList" className="link"><span>Tạo List mới</span></Link>
                            <Link to="/login" className="link"><span>Đăng xuất</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;