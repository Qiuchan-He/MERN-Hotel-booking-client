import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {HomeOutlined} from "@ant-design/icons";
import {createConnectAccount} from "../actions/stripe.js";
import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import DashboardNav from "../components/DashboardNav.js";
import ConnectNav from "../components/ConnectNav.js";
import { sellerHotels } from "../actions/hotel.js";
import SmallCard from "../components/cards/SmallCard.js";
import {deleteHotel} from "../actions/hotel.js";


const DashboardSeller = ()=>{
    const [hotels, setHotels]= useState([]);
    const {auth} = useSelector((state)=> ({...state}));
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        loadSellerHotels();
    })

    const loadSellerHotels = async ()=>{
        let {data} = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async ()=> {
        setLoading(true);
        try {
            //console.log(auth.token);
            console.log(auth);
            let res = await createConnectAccount(auth.token);
            window.location.href = res.data;

        } catch (err) {
            console.log(err);
            toast.error('Stripe connect failed. Try again');
        }
    }

    const handleHotelDelete = async (hotelId)=>{
        //console.log(hotelId);
        if(!window.confirm('Are you sure you want to delete?'))
            return;
            
        deleteHotel(auth.token, hotelId).then(res=>{
            toast.success('Hotel Deleted');
            loadSellerHotels();
        })
    }

    const connected = ()=>(
        <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/hotel/new" className="btn btn-primary">+ Add New</Link>
                    </div>
                </div>
                <div className="row">
                  {hotels.map((hotel)=><SmallCard key={hotel._id} hotel={hotel} showViewMoreButton={false} owner={true} handleHotelDelete={handleHotelDelete}/>)}

                </div>

            </div>
    )

    const notConnected = ()=>(
        <div className="container-fluid">
                <div className="row">
                        <div className="col-md-6  offset-md-3 text-center">
                        <HomeOutlined className="h1"/>
                        <h4>Setup payouts to post hotel rooms</h4>
                        <p className="lead">MERN partners with stripe to transfer earnings to your bank account</p>
                        <button disabled={loading} onClick={handleClick} className="btn btn-primary mb-3">
                            {loading? "Processing..." : "Setup Payouts"}
                        </button>
                        <p className="text-muted">
                            <small>
                                You'll be redirected to Stripe to complete the 
                                onboarding process.
                            </small>
                        </p>
                    </div>
                </div>
            </div>
    )


    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-4">
                <DashboardNav/>
            </div>
            {auth &&
             auth.user && 
             auth.user.stripe_seller &&
             auth.user.stripe_seller.charges_enabled ?
            connected():
            notConnected()
            }
        </>
    )
}

export default DashboardSeller;
