export const getGraphAttributes = (data) => {
  const xValues = [],
    openValues = [],
    highValues = [],
    lowValues = [],
    closeValues = [];
  data.forEach(({ timestamp, low, high, close, open }) => {
    xValues.push(timestamp);
    openValues.push(open);
    lowValues.push(low);
    closeValues.push(close);
    highValues.push(high);
  });

  return { xValues, openValues, highValues, lowValues, closeValues };
};

export const intervalToTimeMapping = {
  "1s": 1,
  "1m": 2,
  "3m": 3,
  "5m": 4,
  "15m": 5,
  "30m": 6,
  "1h": 7,
  "2h": 8,
  "4h": 9,
  "24h": 10,
};

export const intervalToSecondsMapping = {
  1: 1,
  2: 60,
  3: 180,
  4: 300,
  5: 900,
  6: 1800,
  7: 3600,
  8: 7200,
  9: 14400,
  10: 86400,
};

export const extractStartTime = (time, interval) => {
  let candlesCount = 100;
  console.log("time", time, candlesCount * intervalToSecondsMapping[interval]);
  return time - candlesCount * intervalToSecondsMapping[interval];
};
