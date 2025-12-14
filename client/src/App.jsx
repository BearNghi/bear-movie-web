import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Watch from "./pages/watch/Watch";
import NewMovie from "./pages/admin/NewMovie";
import MovieList from "./pages/movieList/MovieList";
import EditMovie from "./pages/admin/EditMovie";
import NewList from "./pages/newList/NewList";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import MyList from "./pages/myList/MyList";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>

        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />


        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/mylist" element={<MyList />} />


            <Route path="/admin/add" element={<NewMovie />} />
            <Route path="/admin/movies" element={<MovieList />} />
            <Route path="/admin/movie/:movieId" element={<EditMovie />} />
            <Route path="/admin/newList" element={<NewList />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;