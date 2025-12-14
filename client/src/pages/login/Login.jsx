import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../../config";
import "./login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_API_URL}/auth/login`, {
                email,
                password
            });

            localStorage.setItem("user", JSON.stringify(res.data));

            alert("Đăng nhập thành công!");


            window.location.replace("/");

        } catch (err) {
            console.log(err);
            alert("Sai email hoặc mật khẩu rồi!");
        }
    };


    return (
        <div className="login">
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