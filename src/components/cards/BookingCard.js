import { currencyFormatter } from "../../actions/stripe.js";
import { diffDays } from "../../actions/hotel.js";
import { useState} from "react";
import OrderModal from "../modals/OrderModal.js";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt=""
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900*500.png?text=MERN+Booking"
                alt=""
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title} &nbsp;
                <span>
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "eur",
                  })}
                </span>
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text">{`${hotel.content.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
                </span>
              </p>
              <p className="card-text">{hotel.bed} bed</p>
              <p className="card-text">
                Available from {new Date(hotel.from).toLocaleDateString()}
              </p>
              {showModal && (
                <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal}/>
              )}
              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn btn-primary"
                >
                  Show Payment info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
