import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import ListItem from "../../components/listItem/ListItem";
import BASE_API_URL from "../../config";
import "./search.css";

export default function Search() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();


    const query = new URLSearchParams(location.search).get("q");

    useEffect(() => {
        const searchMovies = async () => {
            try {
                const res = await axios.get(`${BASE_API_URL}/movies/search?q=${query}`);
                setMovies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (query) searchMovies();
    }, [query]);


    return (
        <div className="searchPage">
            <Navbar />
            <div className="searchContainer">
                <h2>Kết quả tìm kiếm cho: "{query}"</h2>
                {movies.length === 0 ? (
                    <span className="noResult">Không tìm thấy phim nào...</span>
                ) : (
                    <div className="searchGrid">
                        {movies.map((item, i) => (
                            <div className="searchItem" key={item._id}>
                                <ListItem index={i} item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}