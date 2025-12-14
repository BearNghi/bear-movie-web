import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_API_URL from "../../config";
import "./editMovie.css";

export default function EditMovie() {
    const location = useLocation();
    const navigate = useNavigate();
    const movieId = location.state?.movieId;

    const [movie, setMovie] = useState({
        title: "", desc: "", img: "", imgSm: "", trailer: "", video: "", year: "", limit: "", genre: "", isSeries: false,
    });


    useEffect(() => {
        const getMovie = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));

                const res = await axios.get(`${BASE_API_URL}/movies/find/${movieId}`, {
                    headers: { token: "Bearer " + user.accessToken },
                });
                setMovie(res.data);
            } catch (err) { console.log(err); }
        };
        if (movieId) getMovie();
    }, [movieId]);


    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));

            await axios.put(`${BASE_API_URL}/movies/${movieId}`, movie, {
                headers: { token: "Bearer " + user.accessToken },
            });
            alert("Cập nhật phim thành công!");
            navigate("/admin/movies");
        } catch (err) {
            console.log(err);
            alert("Lỗi khi cập nhật. Kiểm tra lại quyền Admin.");
        }
    };


    return (
        <div className="editMovie">
            <h1 className="addProductTitle">SỬA PHIM: {movie.title}</h1>
            <Link to="/admin/movies" className="backHome">Về danh sách quản lý</Link>

            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Tên phim</label>
                    <input type="text" placeholder="Title" name="title" value={movie.title} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Mô tả</label>
                    <input type="text" placeholder="Description" name="desc" value={movie.desc} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Năm sản xuất</label>
                    <input type="text" placeholder="Year" name="year" value={movie.year} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Thể loại</label>
                    <input type="text" placeholder="Genre" name="genre" value={movie.genre} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Giới hạn tuổi</label>
                    <input type="number" placeholder="Limit" name="limit" value={movie.limit} onChange={handleChange} />
                </div>

                <div className="addProductItem">
                    <label>Link Ảnh Bìa (To)</label>
                    <input type="text" placeholder="URL Image" name="img" value={movie.img} onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Link Video</label>
                    <input type="text" placeholder="URL Video" name="video" value={movie.video} onChange={handleChange} />
                </div>

                <div className="addProductItem">
                    <label>Phim Bộ/Lẻ (Hiện tại: {movie.isSeries ? 'Phim Bộ' : 'Phim Lẻ'})</label>
                    <select name="isSeries" value={movie.isSeries} onChange={handleChange}>
                        <option value={false}>Phim Lẻ</option>
                        <option value={true}>Phim Bộ</option>
                    </select>
                </div>

                <button className="addProductButton" onClick={handleUpdate}>CẬP NHẬT PHIM</button>
            </form>
        </div>
    );
}