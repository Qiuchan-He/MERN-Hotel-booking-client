import {useState, useEffect} from 'react';
import queryString from 'query-string';
import Search from '../components/forms/Search.js'
import { searchListings } from '../actions/hotel.js';
import SmallCard from "../components/cards/SmallCard.js"


const SearchResult = ()=>{
    const [hotels, setHotels] =useState([]);


    //when component mounts, get search params from url and use to send search query to backend
    useEffect(()=>{
        const {location, date, bed} = queryString.parse(window.location.search);
        //console.log(location, date, bed);
        searchListings({location, date, bed}).then(res=>{
            setHotels(res.data);
        })

    }, [window.location.search])

    return (
        <>
        <div className='col'>
           <br/>
           <Search/> 
        </div>
        <div className="container">
            <div className="row">
            {  
                hotels.length>0 && hotels.map(hotel => 
                 <SmallCard key={hotel._id} hotel={hotel}/>
                 )
            }
            </div>
        </div>
        </>
    )
}

export default SearchResult;