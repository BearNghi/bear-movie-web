import { useEffect, useState } from "react";
import "./newList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_API_URL from "../../config";

export default function NewList() {
    const [list, setList] = useState(null);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const value = e.target.value;
        setList({ ...list, [e.target.name]: value });
    };


    const handleSelect = (e) => {
        let value = Array.from(e.target.selectedOptions, (option) => option.value);
        setList({ ...list, content: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.post(`${BASE_API_URL}/lists`, list, {
                headers: { token: "Bearer " + user.accessToken },
            });
            alert("Tạo danh sách thành công!");
            navigate("/");
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