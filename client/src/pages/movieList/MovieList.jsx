import "./movieList.css";
import { DeleteOutline } from "@mui/icons-material"; // Icon thùng rác
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    // Lấy danh sách phim từ Server
    useEffect(() => {
        const getMovies = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                // Gọi API lấy tất cả phim
                const res = await axios.get("http://localhost:5000/api/movies", {
                    headers: { token: "Bearer " + user.accessToken },
                });
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovies();
    }, []);

    // Hàm xử lý khi bấm nút Xóa
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) return;
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:5000/api/movies/" + id, {
                headers: { token: "Bearer " + user.accessToken },
            });
            // Xóa xong thì lọc bỏ phim đó khỏi danh sách trên màn hình
            setMovies(movies.filter((item) => item._id !== id));
            alert("Đã xóa thành công!");
        } catch (err) {
            alert("Lỗi! Bạn có phải là Admin không?");
        }
    };

    return (
        <div className="movieList">
            <div className="movieListTitleContainer">
                <h1 className="movieListTitle">Quản Lý Phim</h1>
                <Link to="/admin/add">
                    <button className="movieAddButton">Tạo phim mới</button>
                </Link>
            </div>

            <table className="movieTable">
                <thead>
                    <tr>
                        <th>Phim</th>
                        <th>Thể loại</th>
                        <th>Năm</th>
                        <th>Giới hạn</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie._id}>
                            <td className="movieUser">
                                <img src={movie.imgSm} alt="" className="movieImg" />
                                <span className="movieName">{movie.title}</span>
                            </td>
                            <td>{movie.genre}</td>
                            <td>{movie.year}</td>
                            <td>{movie.limit}+</td>
                            <td>
                                <DeleteOutline
                                    className="movieListDelete"
                                    onClick={() => handleDelete(movie._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}