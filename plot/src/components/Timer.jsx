import { createContext, useState } from "react";
import CandlestickChart from "../charts";
import DateTimeInput from "./DateTimeInput";
import { useDebounce } from "../hooks";
import { intervalToTimeMapping } from "../utils";

// eslint-disable-next-line react-refresh/only-export-components
export const TimerContext = createContext(null);

const Timer = () => {
  const [endTime, setEndTime] = useState("");
  const [interval, setInterval] = useState(1);
  const debouncedTime = useDebounce((value, setterFn) => setterFn(value), 1000);

  const handleEndTime = (e) => debouncedTime(e.target.value, setEndTime);

  return (
    <TimerContext.Provider value={{ endTime, interval }}>
      <div className="timer-comp">
        <DateTimeInput
          label={"Select end date-time :"}
          value={endTime}
          handleChange={handleEndTime}
        />
        <div>
          <span>Select Interval:</span>
          <select
            className="interval-select"
            onChange={(e) => setInterval(e.target.value)}
          >
            {Object.keys(intervalToTimeMapping).map((interval) => {
              return (
                <option key={interval} value={intervalToTimeMapping[interval]}>
                  {interval}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <CandlestickChart />
    </TimerContext.Provider>
  );
};

export default Timer;
