import { useState } from "react";

import "./App.css";
import "antd/dist/antd.css";
import { Header, List } from "./components/index";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Header setData={setData} setLoading={setLoading} loading={loading} />
      <List data={data} loading={loading} />
    </div>
  );
}

export default App;
