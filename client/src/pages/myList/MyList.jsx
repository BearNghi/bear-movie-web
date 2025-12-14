import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ListItem from "../../components/listItem/ListItem";
import axios from "axios";
import "./myList.css";

export default function MyList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMyList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                // Gọi API lấy danh sách phim đã lưu của user
                const res = await axios.get("http://localhost:5000/api/users/mylist/all", {
                    headers: { token: "Bearer " + user.accessToken }
                });
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMyList();
    }, []);

    return (
        <div className="myListPage">
            <Navbar />
            <div className="myListContainer">
                <h1>Danh sách của tôi</h1>

                {/* Kiểm tra nếu có phim thì hiện, không thì báo trống */}
                {movies.length > 0 ? (
                    <div className="myListGrid">
                        {movies.map((item, i) => (
                            <div className="myListItem" key={item._id || i}>
                                <ListItem item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <h2>Bạn chưa lưu phim nào cả!</h2>
                        <p>Hãy vào xem phim và bấm nút "Lưu Phim" để thêm vào đây nhé.</p>
                    </div>
                )}
            </div>
        </div>
    );
}