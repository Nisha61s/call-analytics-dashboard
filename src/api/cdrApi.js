import axios from "axios";

const API =
  "https://69b30b45e224ec066bdb55a0.mockapi.io/api/v1/cdr";

export const fetchCalls = async () => {
  const response = await axios.get(API);
  return response.data;
};