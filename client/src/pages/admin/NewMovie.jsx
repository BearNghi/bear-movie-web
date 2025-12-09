import { useState } from "react";
import axios from "axios";
import "./newMovie.css";
import { Link } from "react-router-dom";

export default function NewMovie() {
    const [movie, setMovie] = useState({
        title: "",
        desc: "",
        img: "",
        imgTitle: "",
        imgSm: "",
        trailer: "",
        video: "",
        year: "",
        limit: "",
        genre: "",
        isSeries: false,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Lấy token của Admin đang đăng nhập
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || !user.isAdmin) {
                alert("Bạn không phải Admin!");
                return;
            }

            await axios.post("http://localhost:5000/api/movies", movie, {
                headers: { token: "Bearer " + user.accessToken },
            });

            alert("Đăng phim thành công!");
            // Reset form hoặc chuyển trang
        } catch (err) {
            console.log(err);
            alert("Lỗi khi đăng phim. Kiểm tra lại quyền Admin.");
        }
    };

    return (
        <div className="newMovie">
            <h1 className="addProductTitle">Đăng Phim Mới</h1>
            <Link to="/" className="backHome">Về Trang Chủ</Link>

            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Tên phim</label>
                    <input type="text" placeholder="Vd: The Matrix" name="title" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Năm sản xuất</label>
                    <input type="text" placeholder="Year" name="year" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Thể loại</label>
                    <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Giới hạn tuổi</label>
                    <input type="number" placeholder="Limit" name="limit" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Mô tả</label>
                    <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
                </div>

                {/* Trong thực tế sẽ dùng nút Upload ảnh, ở đây ta nhập Link ảnh cho nhanh */}
                <div className="addProductItem">
                    <label>Link Ảnh Bìa (To)</label>
                    <input type="text" placeholder="URL Image" name="img" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Link Ảnh Nhỏ (Thumbnail)</label>
                    <input type="text" placeholder="URL Small Image" name="imgSm" onChange={handleChange} />
                </div>
                <div className="addProductItem">
                    <label>Link Video (Mp4/Vimeo)</label>
                    <input type="text" placeholder="URL Video" name="video" onChange={handleChange} />
                </div>

                <button className="addProductButton" onClick={handleSubmit}>Đăng Phim</button>
            </form>
        </div>
    );
}