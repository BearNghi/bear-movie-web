import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom"; // Nhập thư viện Link để chuyển trang
import "./navbar.css";
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Hiệu ứng: Khi lăn chuột xuống thì Navbar chuyển màu đen
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">

                {/* --- BÊN TRÁI: LOGO & MENU --- */}
                <div className="left">
                    {/* Bấm vào Logo thì về trang chủ */}
                    <Link to="/" className="link">
                        <h2 className="logo">BEARMOVIE</h2>
                    </Link>

                    <Link to="/" className="link">
                        <span>Trang chủ</span>
                    </Link>
                    <span>Phim bộ</span>
                    <span>Phim lẻ</span>
                    <span>Mới & Phổ biến</span>
                    <span>Danh sách của tôi</span>
                </div>

                {/* --- BÊN PHẢI: TÌM KIẾM & PROFILE --- */}
                <div className="right">
                    <Search className="icon" />
                    <span>TRẺ EM</span>
                    <Notifications className="icon" />

                    {/* Avatar (Ảnh đại diện) */}
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />

                    {/* Menu xổ xuống (Dropdown) */}
                    <div className="profile">
                        <ArrowDropDown className="icon" />

                        <div className="options">
                            {/* --- ĐÂY LÀ PHẦN TÔI ĐÃ THÊM VÀO --- */}
                            <Link to="/profile" className="link">
                                <span>Hồ sơ</span>
                            </Link>

                            <Link to="/login" className="link">
                                <span>Đăng xuất</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;