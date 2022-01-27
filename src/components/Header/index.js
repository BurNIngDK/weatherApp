import { Input } from "antd";
import { useState } from "react";

import "./Header.style.css";

const { Search } = Input;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const Header = ({ setData, loading, setLoading, ...props }) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnSearch = async () => {
    try {
      setLoading(true);
      fetch(
        `https://www.metaweather.com/api/location/search/?query=${inputValue}`
      )
        .then((response) => response.json())
        .then((data) => setData(data));

      //sleep function is here to demo the loading
      await sleep(1000);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container">
      <h4 className="header">How is the weather?</h4>
      <Search
        className="search"
        placeholder="Seach by city name"
        enterButton="GO"
        size="large"
        loading={loading}
        value={inputValue}
        onChange={handleOnChange}
        onSearch={handleOnSearch}
      />
    </div>
  );
};
