import "./listItem.css";
import { Link } from "react-router-dom";

export default function ListItem({ item }) {
    // CHÚ Ý: Đã loại bỏ hoàn toàn các state (isHovered) và các hàm xử lý sự kiện chuột (onMouseEnter...)
    // Đã loại bỏ phần video trailer và các icon thông tin bổ sung.

    return (
        // Bọc toàn bộ item trong thẻ Link.
        // Khi click vào bất kỳ đâu trên ảnh này, nó sẽ chuyển hướng đến trang "/watch"
        <Link to="/watch" state={{ movie: item }}>
            <div className="listItem">
                {/* Chỉ hiển thị duy nhất ảnh thumbnail */}
                {/* Sử dụng imgSm (ảnh nhỏ dọc) ưu tiên, nếu không có thì dùng ảnh bìa */}
                <img
                    src={item?.imgSm || item?.img || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={item?.title}
                />
                {/* Không còn phần thông tin ẩn hiện ra ở đây nữa */}
            </div>
        </Link>
    );
}