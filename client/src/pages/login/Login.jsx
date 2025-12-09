import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gọi API đăng nhập
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });

            // Lưu thông tin người dùng vào bộ nhớ trình duyệt (LocalStorage)
            // Để lần sau vào web không cần đăng nhập lại
            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Đăng nhập thành công! Chào mừng trở lại.");
            navigate("/"); // Chuyển thẳng về Trang chủ
        } catch (err) {
            console.log(err);
            alert("Sai email hoặc mật khẩu rồi!");
        }
    };

    return (
        <div className="login">
            {/* ... (Giữ nguyên giao diện cũ) ... */}
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
                            Trang này được bảo vệ bởi Google reCAPTCHA để đảm bảo bạn không phải là robot.
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
}