import { axiosInstance as axios } from "./axiosInterceptor";

export const getGraphData = async (
  instrumentId = 1,
  interval = 1,
  start ,
  end ,
) => {
  const params = { instrument_id: instrumentId, interval, start, end };
  const response = await axios.get(`/api/candles`, {
    params: params,
  });
  return response.data;
};
