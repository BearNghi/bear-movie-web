import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

// Nhận prop "type" truyền từ App.jsx (vd: "movie" hoặc "series")
const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                // Tạo đường dẫn API linh động
                // Nếu có type (vd: movie) thì gọi: .../lists?type=movie
                // Nếu không có (Trang chủ) thì gọi: .../lists
                const url = `http://localhost:5000/api/lists${type ? "?type=" + type : ""}`;

                const res = await axios.get(url);
                console.log("Dữ liệu lấy về:", res.data);
                setLists(res.data);
                setLoading(false);
            } catch (err) {
                console.log("Lỗi kết nối:", err);
                setError(true);
                setLoading(false);
            }
        };
        getRandomLists();
    }, [type]); // Khi "type" thay đổi thì chạy lại hàm này để lấy list mới

    return (
        <div className="home">
            <Navbar />
            {/* Truyền type vào Featured để banner đổi chữ "Phim Lẻ/Phim Bộ" theo */}
            <Featured type={type} />

            {loading && <h2 className="loading-text">Đang tải danh sách phim...</h2>}

            {error && (
                <div className="error-text">
                    <h2>Không thể lấy phim!</h2>
                    <p>Hãy kiểm tra lại Server.</p>
                </div>
            )}

            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    );
};

export default Home;