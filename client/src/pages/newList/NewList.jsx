import { useEffect, useState } from "react";
import "./newList.css";
import { useNavigate } from "react-router-dom"; // Dùng useNavigate thay cho useHistory
import axios from "axios";

export default function NewList() {
    const [list, setList] = useState(null);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
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

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    };

    // Hàm xử lý chọn nhiều phim (Giữ phím Ctrl để chọn nhiều)
    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, content: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:5000/api/lists", list, {
                headers: { token: "Bearer " + user.accessToken },
            });
            alert("Tạo danh sách thành công!");
            navigate("/"); // Quay về trang chủ để xem kết quả
        } catch (err) {
            alert("Lỗi! Hãy kiểm tra lại.");
        }
    };

    return (
        <div className="newList">
            <h1 className="addProductTitle">Tạo Danh Sách Mới</h1>
            <form className="addProductForm">
                <div className="formLeft">
                    <div className="addProductItem">
                        <label>Tên danh sách</label>
                        <input
                            type="text"
                            placeholder="Vd: Phim Hành Động Hay Nhất"
                            name="title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Thể loại (Genre)</label>
                        <input
                            type="text"
                            placeholder="Vd: action"
                            name="genre"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="addProductItem">
                        <label>Loại (Type)</label>
                        <select name="type" onChange={handleChange}>
                            <option>Loại phim?</option>
                            <option value="movie">Phim Lẻ (Movie)</option>
                            <option value="series">Phim Bộ (Series)</option>
                        </select>
                    </div>
                </div>

                <div className="formRight">
                    <div className="addProductItem">
                        <label>Chọn các phim có trong danh sách:</label>
                        {/* Giữ phím Ctrl (Windows) hoặc Command (Mac) để chọn nhiều phim */}
                        <select multiple name="content" onChange={handleSelect} style={{ height: "280px" }}>
                            {movies.map((movie) => (
                                <option key={movie._id} value={movie._id}>
                                    {movie.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className="addProductButton" onClick={handleSubmit}>
                    Tạo Ngay
                </button>
            </form>
        </div>
    );
}