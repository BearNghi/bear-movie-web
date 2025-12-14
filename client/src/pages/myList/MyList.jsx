import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ListItem from "../../components/listItem/ListItem";
import axios from "axios";
import BASE_API_URL from "../../config";
import "./myList.css";

export default function MyList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMyList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await axios.get(`${BASE_API_URL}/users/mylist/all`, {
                    headers: { token: "Bearer " + user.accessToken }
                });
                setMovies(res.data);
            } catch (err) { console.log(err); }
        };
        getMyList();
    }, []);

    return (
        <div className="myListPage">
            <Navbar />
            <div className="myListContainer">
                <h1>Danh sách của tôi</h1>
                <div className="myListGrid">
                    {movies.map((item, i) => (
                        <div className="myListItem" key={i}>
                            <ListItem index={i} item={item} />
                        </div>
                    ))}
                    {movies.length === 0 && <span className="empty">Bạn chưa lưu phim nào cả.</span>}
                </div>
            </div>
        </div>
    );
}