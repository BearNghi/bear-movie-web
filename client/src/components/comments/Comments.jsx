import { useEffect, useState } from "react";
import axios from "axios";
import { DeleteOutline } from "@mui/icons-material";
import BASE_API_URL from "../../config";
import "./comments.css";

export default function Comments({ movieId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);


        const fetchComments = async () => {
            try {
                const res = await axios.get(`${BASE_API_URL}/comments/${movieId}`);
                setComments(res.data);
            } catch (err) { console.log(err); }
        };
        fetchComments();
    }, [movieId]);

    const handleSend = async () => {
        if (!currentUser) return alert("Bạn cần đăng nhập để bình luận!");
        try {
            const res = await axios.post(`${BASE_API_URL}/comments`, {
                userId: currentUser._id,
                username: currentUser.username,
                movieId: movieId,
                text: newComment
            }, {
                headers: { token: "Bearer " + currentUser.accessToken }
            });

            setComments([res.data, ...comments]);
            setNewComment(""); // Xóa ô nhập
        } catch (err) { console.log(err); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn muốn xóa bình luận này?")) return;
        try {
            await axios.delete(`${BASE_API_URL}/comments/${id}`, {
                headers: { token: "Bearer " + currentUser.accessToken }
            });
            setComments(comments.filter(c => c._id !== id));
        } catch (err) { alert("Bạn không có quyền xóa!"); }
    }

    return (
        <div className="comments">
            <h3>Bình luận phim</h3>
            <div className="write">
                <input
                    type="text"
                    placeholder="Viết cảm nghĩ của bạn..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleSend}>Gửi</button>
            </div>

            <div className="listComments">
                {comments.map((c) => (
                    <div className="commentItem" key={c._id}>
                        <div className="info">
                            <span className="user">{c.username}</span>
                            <span className="date">{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p>{c.text}</p>

                        {(currentUser?.isAdmin || currentUser?._id === c.userId) && (
                            <DeleteOutline className="deleteIcon" onClick={() => handleDelete(c._id)} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}