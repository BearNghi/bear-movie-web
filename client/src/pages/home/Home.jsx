import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";
import BASE_API_URL from "../../config";
import "./home.css";


const Home = ({ type }) => {

    useEffect(() => {
        const getRandomLists = async () => {
            try {

                const url = `${BASE_API_URL}/lists${type ? "?type=" + type : ""}`;

                const res = await axios.get(url);

            } catch (err) {

            }
        };
        getRandomLists();
    }, [type]);


};

export default Home;