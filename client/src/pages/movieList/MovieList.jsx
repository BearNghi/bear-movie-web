import "./movieList.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_API_URL from "../../config";

export default function MovieList() {
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const getMovies = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                const res = await axios.get(`${BASE_API_URL}/movies`, {
                    headers: { token: "Bearer " + user.accessToken },
                });
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMovies();
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) return;
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.delete(`${BASE_API_URL}/movies/` + id, {
                headers: { token: "Bearer " + user.accessToken },
            });

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

                                <Link
                                    to={`/admin/edit/${movie._id}`}
                                    state={{ movieId: movie._id }}
                                >
                                    <button className="movieListEdit">Sửa</button>
                                </Link>

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