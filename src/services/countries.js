import axios from 'axios';

const API = "https://restcountries.com/v3.1"

export const getAllCountries = async () => {
    const res = await axios.get(`${API}/all?fields=name,flags,region,capital,population`)

    return res.data
}