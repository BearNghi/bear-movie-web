import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                // Lấy danh sách phim từ Server thật
                const res = await axios.get("http://localhost:5000/api/lists");
                console.log("Dữ liệu lấy về:", res.data); // Xem log ở F12
                setLists(res.data);
                setLoading(false);
            } catch (err) {
                console.log("Lỗi kết nối:", err);
                setError(true);
                setLoading(false);
            }
        };
        getRandomLists();
    }, []);

    return (
        <div className="home">
            <Navbar />
            <Featured type="movie" />

            {loading && <h2 className="loading-text">Đang kết nối Server...</h2>}

            {error && (
                <div className="error-text">
                    <h2>Không thể lấy phim!</h2>
                    <p>Hãy chắc chắn bạn đã chạy: <b>npm run dev</b> ở thư mục Server</p>
                </div>
            )}

            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    );
};

export default Home;