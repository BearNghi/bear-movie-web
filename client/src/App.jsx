import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch"; // <--- Import trang Watch
import NewMovie from "./pages/admin/NewMovie";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Thêm đường dẫn trang xem phim */}
        <Route path="/watch" element={<Watch />} />
        <Route path="/admin/add" element={<NewMovie />} />
      </Routes>
    </Router>
  );
};

export default App;