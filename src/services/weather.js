import axios from "axios";

const API = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY_WEATHER;

export const getWeatherByCity = async (city) => {
  console.log("API KEY:", import.meta.env.VITE_API_KEY_WEATHER);
  if (!city) return null;

  try {
    const response = await axios.get(API, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "es",
      },
    });

    return response.data;
  } catch (err) {
    console.error("Weather API error:", err);
    throw err;
  }
};
