import { List as AntdList, Modal } from "antd";
import { useState } from "react";

import "./List.style.css";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const List = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [weatherDetail, setWeatherDetail] = useState(null);
  const [loadingWeatherDetail, setloadingWeatherDetail] = useState(false);

  const handleButtonOnClick = async (rowData) => {
    try {
      setloadingWeatherDetail(true);
      fetch(`https://www.metaweather.com/api/location/${rowData?.woeid}`)
        .then((response) => response.json())
        .then((weatherDetail) => setWeatherDetail(weatherDetail));

      //sleep function is here to demo the loading
      await sleep(1000);
    } catch (e) {
      console.log(e);
    } finally {
      setloadingWeatherDetail(false);
      setOpenModal(true);
    }
  };

  const renderContent = () => {
    const { consolidated_weather: consolidatedWeather } = weatherDetail;
    const today = consolidatedWeather?.[0];
    const {
      the_temp,
      max_temp,
      min_temp,
      wind_speed,
      weather_state_name,
    } = today;

    return (
      <div className="weather-detail">
        <p>
          {`${the_temp.toFixed(1)} C`} <span>{weather_state_name}</span>
        </p>
        <p>{`Min: ${min_temp.toFixed(1)} C | Max: ${max_temp.toFixed(1)} C`}</p>
        <p>{`${wind_speed.toFixed(1)} mph`}</p>
      </div>
    );
  };

  return (
    <div className="list-container">
      <AntdList
        className="list"
        loading={loading || loadingWeatherDetail}
        itemLayout="vertical"
        dataSource={data}
        renderItem={(item) => (
          <AntdList.Item
            extra={
              <button
                className="link"
                onClick={() => handleButtonOnClick(item)}
              >
                See Details...
              </button>
            }
          >
            {item.title}
          </AntdList.Item>
        )}
      />
      {weatherDetail && (
        <Modal
          title={`Today's ${weatherDetail.title}`}
          centered
          keyboard
          visible={openModal}
          onOk={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
        >
          {renderContent()}
        </Modal>
      )}
    </div>
  );
};
