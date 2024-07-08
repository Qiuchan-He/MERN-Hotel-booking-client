import { useState } from "react";
import { useHistory } from "react-router-dom";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;
const config = process.env.REACT_APP_MAP_API_KEY;

const Search = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  const handleLocationChange = (e) => {
    setLocation(e.label);
  };

  const customStyles = {
      height: '60px', // 居中
    }

  return (
    <div className="d-flex pb-4">
      <div className="w-100" >
        <GooglePlacesAutocomplete
          apiKey={config}
          selectProps={{
            defaultValue: location,
            onChange: handleLocationChange,
            placeholder: "Location",
            styles: customStyles,
          }}
        />
        </div>
        <RangePicker
          className="w-100"
          style={{ height: '38px' }}
          onChange={(value, dateString) => setDate(dateString)}
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, "days")
          }
        />
        <Select
          onChange={(value) => setBed(value)}
          className="w-100"
          style={{ height: '38px' }}
          size="large"
          placeholder="Number of beds"
        >
            <Option key={1}>{1}</Option>
            <Option key={2}>{2}</Option>
            <Option key={3}>{3}</Option>
            <Option key={4}>{4}</Option>
        </Select>

        <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn-square"/>
    </div>
  );
};

export default Search;
