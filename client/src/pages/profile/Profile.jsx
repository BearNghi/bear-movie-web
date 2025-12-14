import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import BASE_API_URL from "../../config";
import "./profile.css";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedInUser);
        if (loggedInUser) setProfilePic(loggedInUser.profilePic);
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                userId: user._id,
                profilePic: profilePic,
            };
            if (password) updatedData.password = password;

            const res = await axios.put(`${BASE_API_URL}/users/` + user._id, updatedData, {
                headers: { token: "Bearer " + user.accessToken },
            });


            const newUser = { ...res.data, accessToken: user.accessToken };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser);

            alert("Cập nhật thành công!");
        } catch (err) {
            console.log(err);
            alert("Lỗi cập nhật!");
        }
    };


    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    if (!user) return <div className="profile"><h2>Vui lòng đăng nhập...</h2></div>;

    return (
        <div className="profile">
            <Navbar />
            <div className="profileContainer">
                <h1>Hồ Sơ Cá Nhân</h1>
                <div className="profileWrapper">
                    <div className="profileTop">
                        <img src={user.profilePic || "https://i.pinimg.com/originals/e3/94/30/e39430434d2b8207188f880ac66c6411.png"} alt="" />
                        <div className="profileInfo">
                            <span className="profileName">{user.username}</span>
                            <span className="profileEmail">{user.email}</span>
                        </div>
                    </div>

                    <form className="profileBottom">
                        <h3>Chỉnh sửa thông tin</h3>

                        <label>Ảnh đại diện (URL)</label>
                        <input
                            type="text"
                            placeholder={user.profilePic}
                            onChange={e => setProfilePic(e.target.value)}
                        />

                        <label>Đổi Mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới..."
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button className="updateButton" onClick={handleUpdate}>Cập Nhật</button>
                        <button className="logoutButton" onClick={handleLogout}>Đăng Xuất</button>
                    </form>
                </div>
            </div>
        </div>
    );
}