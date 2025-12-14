import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./newMovie.css";

export default function EditMovie() {
    const location = useLocation();
    const navigate = useNavigate();

    const movieId = location.pathname.split("/")[3];

    const [movie, setMovie] = useState(null);


    useEffect(() => {
        const getMovie = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const res = await axios.get("http://localhost:5000/api/movies/find/" + movieId, {
                    headers: { token: "Bearer " + user.accessToken },
                });
                setMovie(res.data);
            } catch (err) { console.log(err); }
        };
        getMovie();
    }, [movieId]);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            await axios.put(`http://localhost:5000/api/movies/${movieId}`, movie, {
                headers: { token: "Bearer " + user.accessToken },
            });
            alert("Cập nhật thành công!");
            navigate("/admin/movies");
        } catch (err) {
            alert("Lỗi cập nhật!");
        }
    };

    if (!movie) return <div className="newMovie"><h1>Đang tải...</h1></div>;

    return (
        <div className="newMovie">
            <h1 className="addProductTitle">Chỉnh Sửa Phim</h1>
            <Link to="/admin/movies" className="backHome">Quay lại</Link>

            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Tên phim</label>
                    <input type="text" value={movie.title} name="title" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Link Ảnh Bìa</label>
                    <input type="text" value={movie.img} name="img" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Link Video (YouTube)</label>
                    <input type="text" value={movie.video} name="video" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Mô tả</label>
                    <input type="text" value={movie.desc} name="desc" onChange={handleChange} />
                </div>
                <button className="addProductButton" onClick={handleUpdate} style={{ backgroundColor: "green" }}>
                    LƯU THAY ĐỔI
                </button>
            </form>
        </div>
    );
}