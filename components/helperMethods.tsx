import axios from "axios";
const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
export const saveBirdData = async (data, cb) => {
  await axios
    .post(`${baseURL}/birds`, data)
    .then((res) => {
      cb(res);
    })
    .catch((e) => console.log("error saving bird data", e));
};
export const getAllBirdsData = async (cb) => {
  await axios
    .get(`${baseURL}/birds`)
    .then((res) => {
      cb(res);
    })
    .catch((e) => console.log("error fetching birds", e));
};

export const getLatestBirdData = async (cb) => {
  await axios
    .get(`${baseURL}/latest`)
    .then((res) => {
      cb(res);
    })
    .catch((e) => console.log("error fetching latest bird data", e));
};

export const getBirdDataWithDate = async (date, cb) => {
  await axios
    .get(`${baseURL}/birds/:${date}`)
    .then((res) => {
      cb(res);
    })
    .catch((e) => console.log("error fetching birds with date", e));
};
