import { useState } from "react";
import { toast } from "react-toastify";
import { createHotel } from "../actions/hotel.js";
import { useSelector } from "react-redux";
import  HotelCreateForm  from "../components/forms/HotelCreateForm.js";


const NewHotel = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    from: "",
    to: "",
    bed: "",
  });

  const { title, content, image, price, from, to, bed } = values;
  const [location, setLocation] = useState('');
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100*100.png?text=PREVIEW"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    //sending form data
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
      let res = await createHotel(token, hotelData);
      if(res.status === 200){
        toast.success("New hotel is posted");
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
    }catch(err){
      toast.error(JSON.stringify(err.response.data.err));
    }
  };

  const handleImageChange = (e) => {
    //creating a temporary URL pointing to a local file
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary text-center p-5">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
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
            <pre>{JSON.stringify(values, null, 4)}</pre>
            {JSON.stringify(location)}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
