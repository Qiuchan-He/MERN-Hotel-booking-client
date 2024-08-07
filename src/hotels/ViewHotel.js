import { useState, useEffect } from "react";
import { readHotel, diffDays, isAlreadyBooked } from "../actions/hotel.js";
import { useSelector } from "react-redux";
import { getSessionId } from "../actions/stripe.js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment";

const ViewHotel = ({ match, history }) => {
  const [hotel, setHotel] = useState({});
  const [image, setImage] = useState("");
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  useEffect(() => {
    loadSellerHotel();
  },[]);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, match.params.hotelId).then((res) =>
        setAlreadyBooked(res.data.ok)
      );
    }
  },[]);

  const loadSellerHotel = async () => {
    let res = await readHotel(match.params.hotelId);
    //console.log(res);
    setHotel(res.data);
    setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token){
      history.push("/login");
      return;
    }
    setLoading(true);
    let res = await getSessionId(auth.token, match.params.hotelId);
    //console.log(`get sessionid response`, res.response.data);
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <div className="container-fluid bg-secondary text-center p-5">
        <h2>{hotel.title}</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={hotel.title} className="img img-fluid m-2" />
          </div>
          <div className="col-md-6">
            <br />
            <b>{hotel.content}</b>
            <p className="alert alert-info mt-3">€{hotel.price}</p>
            <p className="card-text">
              <span className="float-right text-primary">
                for {diffDays(hotel.from, hotel.to)}{" "}
                {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
              </span>
            </p>
            <p>
              From <br />{" "}
              {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}{" "}
            </p>
            <p>
              To <br />{" "}
              {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}{" "}
            </p>
            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
            <br />
            <button
              disabled={loading || alreadyBooked}
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
            >
              {loading
                ? "Loading..."
                : alreadyBooked
                ? "Already Booked"
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHotel;
