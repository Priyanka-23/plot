import { useEffect } from "react";
import {
  SciChartSurface,
  NumericAxis,
  FastCandlestickRenderableSeries,
  OhlcDataSeries,
  ENumericFormat,
} from "scichart";

const CandlestickChart = () => {
  useEffect(() => {
    const initSciChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create("chart-div-id", {
        engineLocation: "/",
      });

      // Create X and Y Axes
      sciChartSurface.xAxes.add(
        new NumericAxis(wasmContext, {
          growBy: { min: 0.1, max: 0.1 },
        })
      );
      sciChartSurface.yAxes.add(
        new NumericAxis(wasmContext, {
          growBy: { min: 0.1, max: 0.1 },
          labelFormat: ENumericFormat.Decimal,
        })
      );

      // Create Data for the Candlestick Series
      const xValues = [0, 1, 2, 3, 4, 5];
      const openValues = [10, 15, 20, 25, 30, 35];
      const highValues = [15, 20, 25, 30, 35, 40];
      const lowValues = [5, 10, 15, 20, 25, 30];
      const closeValues = [12, 18, 22, 28, 32, 38];

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
          strokeThickness: 2,
          dataPointWidth: 0.7,
          brushUp: "#32CD32", // Green for bullish candles
          brushDown: "#FF4500", // Red for bearish candles
          strokeUp: "#006400", // Green border
          strokeDown: "#8B0000", // Red border
        })
      );
    };

    initSciChart();

    return () => {
    //   SciChartSurface.delete("chart-div-id");
    };
  }, []);

  return <div id="chart-div-id" style={{ width: "100%", height: "500px" }}></div>;
};

export default CandlestickChart;
