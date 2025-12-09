import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import NewMovie from "./pages/admin/NewMovie";
import MovieList from "./pages/movieList/MovieList";
import NewList from "./pages/newList/NewList"; // Trang tạo list bạn vừa làm
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  // Kiểm tra xem đã đăng nhập chưa
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Nếu có user thì vào Home, chưa thì đá về Register */}
        <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />

        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* Chỉ cho phép truy cập các trang này khi đã đăng nhập */}
        {user && (
          <>
            {/* Hai trang mới cho Phim Lẻ và Phim Bộ */}
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />

            <Route path="/watch" element={<Watch />} />
            <Route path="/profile" element={<Profile />} />

            {/* Khu vực Admin */}
            <Route path="/admin/add" element={<NewMovie />} />
            <Route path="/admin/movies" element={<MovieList />} />
            <Route path="/admin/newList" element={<NewList />} />
            <Route path="/search" element={<Search />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;