import { DatePicker, Select } from "antd";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import moment from "moment";

const { Option } = Select;
const config = process.env.REACT_APP_MAP_API_KEY;

const HotelCreateForm = (props) => {
    const {values, setValues,handleChange, handleImageChange,handleSubmit,location, setLocation} = props;
    const {title,content, price} = values;
    const handleLocationChange = (e)=>{
      setLocation(e.label);
    }

  return (
    <form onSubmit={handleSubmit}>
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image{" "}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />
        <GooglePlacesAutocomplete
        apiKey={config}
        selectProps={{
          defaultValue:location,
          onChange: handleLocationChange,
          placeholder: "Location", 
          className: "m-2"
        }}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, bed: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Number of Beds"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      <DatePicker
        placeholder="From date"
        className="from-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      <DatePicker
        placeholder="To date"
        className="from-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })  
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        
      />
      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
 )
};

export default HotelCreateForm;
