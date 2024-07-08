import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { readHotel, updateHotel } from "../actions/hotel.js";
import { useSelector } from "react-redux";
import HotelEditForm from "../components/forms/HotelEditForm.js";

const EditHotel = ({ match }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    location:"",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const { title, content, price, from, to, bed } = values;
  
  useEffect(() => {
    loadSellerHotel();
  });

  const loadSellerHotel = async () => {
    let res = await readHotel(match.params.hotelId);
    //console.log(res);
    res.data.from = res.data.from.split("T")[0];
    res.data.to = res.data.to.split("T")[0];
    setValues({ ...values, ...res.data });
    setLocation(res.data.location);
    setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hahah");
    let hotelData = new FormData();
    hotelData.append("title", title);
    hotelData.append("content", content);
    hotelData.append("location", location);
    hotelData.append("price", price);
    image && hotelData.append("image", image);
    hotelData.append("from", from);
    hotelData.append("to", to);
    hotelData.append("bed", bed);

    try {
        let res = await updateHotel(token, hotelData,match.params.hotelId);
        console.log("HOTEL UPDATE RES", res);
        toast.success(`${res.data.title} is update`);

    } catch(err){
        toast.error(err.response.data);
    }

  };

  const handleImageChange = (e) => {
    //creating a temporary URL pointing to a local file
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary text-center p-5">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
