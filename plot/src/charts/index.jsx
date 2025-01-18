import { useContext, useEffect, useState } from "react";
import {
  SciChartSurface,
  NumericAxis,
  FastCandlestickRenderableSeries,
  OhlcDataSeries,
  ENumericFormat,
  DateTimeNumericAxis,
} from "scichart";
import { TimerContext } from "../components/Timer";
import { getGraphData } from "../services/graphServices";
import { extractStartTime, getGraphAttributes } from "../utils";

const CandlestickChart = () => {
  const { endTime, interval } = useContext(TimerContext);
  const [graphData, setGraphData] = useState([]);
  const instrumentId = import.meta.env.VITE_APP_INSTRUMENT_ID;

  useEffect(() => {
    initSciChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData]);

  const handleShowGraph = () => {
    fetchGraphData();
  };

  const fetchGraphData = async () => {
    const end = new Date(endTime).getTime() / 1000;
    const start = extractStartTime(end, interval);
    const response = await getGraphData(instrumentId, interval, start, end);
    setGraphData(response);
  };

  const initSciChart = async () => {
    const { xValues, openValues, highValues, lowValues, closeValues } =
      getGraphAttributes(graphData);

    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "chart-div-id",
      {
        engineLocation: "/",
      }
    );

    sciChartSurface.xAxes.add(
      new DateTimeNumericAxis(wasmContext, {
        growBy: { min: 0.1, max: 0.1 },
        labelFormat: "yyyy-MM-dd HH:mm:ss",
      })
    );
    sciChartSurface.yAxes.add(
      new NumericAxis(wasmContext, {
        growBy: { min: 0.1, max: 0.1 },
        labelFormat: ENumericFormat.Decimal,
      })
    );
    const dataSeries = new OhlcDataSeries(wasmContext, {
      xValues,
      openValues,
      highValues,
      lowValues,
      closeValues,
    });
    // Add Candlestick Series
    sciChartSurface.renderableSeries.add(
      new FastCandlestickRenderableSeries(wasmContext, {
        dataSeries,
        strokeThickness: 1,
        dataPointWidth: 0.4,
        brushUp: "#32CD32", // Green for bullish candles
        brushDown: "#EE4B2B", // Red for bearish candles
        strokeUp: "#006400", // Green border
        strokeDown: "#8B0000", // Red border
      })
    );
  };

  return (
    <>
      <div className="show-div">
        <h3>See your Candlestick Chart here-</h3>
        <button onClick={handleShowGraph}>Show Chart</button>
      </div>
      {graphData.length === 0 ? (
        <div className="no-data-chart">No Data Found</div>
      ) : (
        <div
          id="chart-div-id"
          style={{ width: "100%", height: "max-content" }}
        ></div>
      )}
    </>
  );
};

export default CandlestickChart;
