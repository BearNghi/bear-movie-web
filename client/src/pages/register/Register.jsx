import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../../config";
import "./register.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {

            await axios.post(`${BASE_API_URL}/auth/register`, {
                email,
                username,
                password,
            });

            alert("Đăng ký thành công! Hãy đăng nhập nhé.");
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Lỗi đăng ký! Có thể email hoặc tên đã bị trùng.");
        }
    };


    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <h2 className="logo">BEARMOVIE</h2>
                </div>
            </div>

            <div className="container">
                <h1>Phim hay, Truyền hình & Giải trí sinh viên</h1>
                <h2>Xem mọi lúc, mọi nơi. Giải trí sau giờ học căng thẳng.</h2>
                <p>Bạn đã sẵn sàng tham gia chưa? Nhập thông tin để tạo tài khoản ngay.</p>

                <form className="register-form">
                    <div className="input-row">
                        <input
                            type="email"
                            placeholder="Địa chỉ Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-row">
                        <input
                            type="text"
                            placeholder="Tên đăng nhập (Username)"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="registerButton" onClick={handleRegister}>
                        Đăng Ký Ngay &gt;
                    </button>
                </form>

                <div className="footer-login">
                    Đã có tài khoản? <Link to="/login" className="link">Đăng nhập</Link>
                </div>
            </div>
        </div>
    );
}