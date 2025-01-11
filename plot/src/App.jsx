import "./App.css";
// import { SciChartReact } from "scichart-react";
import CandlestickChart from "./charts";

function App() {
  return (
    <>
      <div className="App">
      <div>
            <h1>Stock Prices</h1>
            <CandlestickChart />
        </div>
      </div>
    </>
  );
}

export default App;
