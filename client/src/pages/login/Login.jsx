import { useState } from "react";
import { Link } from "react-router-dom"; // Bỏ useNavigate đi, không cần nữa
import axios from "axios";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const navigate = useNavigate(); // <-- Xóa hoặc comment dòng này

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            // Lưu thông tin user
            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Đăng nhập thành công!");

            // THAY ĐỔI Ở ĐÂY: Dùng window.location để tải lại trang
            // Cách này giúp App.jsx đọc lại được localStorage ngay lập tức
            window.location.replace("/");

        } catch (err) {
            console.log(err);
            alert("Sai email hoặc mật khẩu rồi!");
        }
    };

    return (
        <div className="login">
            {/* ... (Phần giao diện giữ nguyên không đổi) ... */}
            <div className="top">
                <div className="wrapper">
                    <h2 className="logo">BEARMOVIE</h2>
                </div>
            </div>

            <div className="container">
                <form className="login-form">
                    <h1>Đăng Nhập</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="loginButton" onClick={handleLogin}>
                        Đăng Nhập
                    </button>

                    <div className="help">
                        <span>
                            Bạn mới tham gia BearMovie?
                            <Link to="/register" className="link"> Đăng ký ngay</Link>
                        </span>
                        <small>
                            Trang này được bảo vệ bởi Google reCAPTCHA.
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}