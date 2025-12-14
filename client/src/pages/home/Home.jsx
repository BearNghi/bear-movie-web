import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [latestMovie, setLatestMovie] = useState(null);
    const [allMovies, setAllMovies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const token = user ? user.accessToken : "";


                const resMovies = await axios.get("http://localhost:5000/api/movies", {
                    headers: { token: "Bearer " + token }
                });


                if (resMovies.data.length > 0) {

                    setLatestMovie(resMovies.data[0]);


                    setAllMovies(resMovies.data);
                }


                const resLists = await axios.get(
                    `http://localhost:5000/api/lists${type ? "?type=" + type : ""}`,
                    { headers: { token: "Bearer " + token } }
                );
                setLists(resLists.data);

            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, [type]);

    return (
        <div className="home">
            <Navbar />


            <Featured type={type} movie={latestMovie} />


            <div className="list-container">


                {allMovies.length > 0 && (
                    <List list={{
                        title: "Phim Mới Cập Nhật (Tất cả)",
                        content: allMovies
                    }} />
                )}


                {lists.map((list) => (
                    <List key={list._id} list={list} />
                ))}
            </div>
        </div>
    );
};

export default Home;