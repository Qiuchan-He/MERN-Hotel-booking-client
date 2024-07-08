import { useState,useEffect } from "react";
import { allHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard.js"
import Search from "../components/forms/Search.js";

const Home = ()=>{

    const [hotels,setHotels] = useState([]);

    useEffect(()=>{
        loadAllhotels();
    },[])

    const loadAllhotels = async ()=>{
        let res = await allHotels();
        setHotels(res.data);
        //console.log(res);
        
    }

    return (
       <>
        <div className="container-fluid p-5 text-center bg-secondary">
            <h1>All Hotels</h1>
        </div>
        <div className="col">
            <br/>
            <Search />
        </div>
        <div className="container-fluid">
            {hotels.map((hotel)=><SmallCard key={hotel._id} hotel={hotel} />)}
        </div>
       </>
    )
}

export default Home;