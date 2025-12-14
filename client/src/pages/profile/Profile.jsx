import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./profile.css";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState("");
    const [oldPassword, setOldPassword] = useState(""); // Mật khẩu cũ
    const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedInUser);
        if (loggedInUser) setProfilePic(loggedInUser.profilePic);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!oldPassword) return alert("⚠️ Vui lòng nhập Mật khẩu cũ để xác nhận!");

        try {
            // Bước 1: Xác thực mật khẩu cũ bằng cách thử đăng nhập
            await axios.post("http://localhost:5000/api/auth/login", {
                email: user.email,
                password: oldPassword
            });

            // Bước 2: Nếu đúng pass cũ, tiến hành cập nhật
            const updatedData = { userId: user._id, profilePic: profilePic };
            if (newPassword) updatedData.password = newPassword;

            const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedData, {
                headers: { token: "Bearer " + user.accessToken },
            });

            // Bước 3: Lưu lại thông tin mới
            const newUser = { ...res.data, accessToken: user.accessToken };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);
            setOldPassword("");
            setNewPassword("");
            alert("✅ Cập nhật hồ sơ thành công!");

        } catch (err) {
            console.log(err);
            alert("❌ Mật khẩu cũ không chính xác!");
        }
    };

    if (!user) return <div className="profile"><h2>Đang tải...</h2></div>;

    return (
        <div className="profile">
            <Navbar />
            <div className="profileContainer">
                <h1>Hồ Sơ Cá Nhân</h1>
                <div className="profileWrapper">
                    <div className="profileTop">
                        <img src={profilePic || user.profilePic} alt="" />
                        <div className="profileInfo">
                            <span className="profileName">{user.username}</span>
                            <span className="profileEmail">{user.email}</span>
                        </div>
                    </div>

                    <form className="profileBottom">
                        <h3>Thay đổi thông tin</h3>

                        <label>Link Avatar mới</label>
                        <input
                            type="text"
                            placeholder="Dán link ảnh mới..."
                            value={profilePic}
                            onChange={e => setProfilePic(e.target.value)}
                        />

                        <label style={{ marginTop: "20px", color: "#e50914" }}>Mật khẩu cũ (Bắt buộc)</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu hiện tại..."
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />

                        <label>Mật khẩu mới (Nếu muốn đổi)</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới..."
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />

                        <button className="updateButton" onClick={handleUpdate}>Lưu Thay Đổi</button>
                    </form>
                </div>
            </div>
        </div>
    );
}