import { useState } from "react";
import "./navbar.css";
import { Search, Notifications, ArrowDropDown } from "@mui/icons-material"; // Import icon
import { Link } from "react-router-dom";

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
                {/* Bên Trái: Logo và Menu */}
                <div className="left">
                    <h2 className="logo">BEARMOVIE</h2>
                    <span>Trang chủ</span>
                    <span>Phim bộ</span>
                    <span>Phim lẻ</span>
                    <span>Mới & Phổ biến</span>
                    <span>Danh sách của tôi</span>
                </div>

                {/* Bên Phải: Tìm kiếm, Thông báo, Avatar */}
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
                            <span>Cài đặt</span>
                            {/* Link để test chuyển trang */}
                            <Link to="/login" className="link"><span>Đăng xuất</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;