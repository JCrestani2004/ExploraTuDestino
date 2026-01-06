import axios from "axios";

const UNSPLASH = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

export const getCountryImage = async (query) => {
  const response = await axios.get(UNSPLASH, {
    params: {
      query,
      per_page: 1,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });

  if (!response.data.results.length) {
    throw new Error("No images found");
  }

  return response.data.results[0];
};