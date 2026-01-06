import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeatherByCity } from "../services/weather";
import { getCountryImage } from "../services/unplash";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        // 1️⃣ País
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        const data = await res.json();
        const countryData = data[0];
        setCountry(countryData);

        // 2️⃣ Clima (try/catch SEPARADO)
        if (countryData.capital?.length > 0) {
          try {
            const weatherData = await getWeatherByCity(countryData.capital[0]);
            setWeather(weatherData);
          } catch (weatherErr) {
            console.error("Error clima:", weatherErr);
            setWeatherError("No se pudo cargar el clima");
          }
        } else {
          setWeatherError("Este país no tiene capital");
        }
       
try {
  // 1️⃣ País
  let img;
  try {
    img = await getCountryImage(
      `${countryData.name.common} country`
    );
  } catch {
    // 2️⃣ Capital
    if (countryData.capital?.length) {
      img = await getCountryImage(
        `${countryData.capital[0]} city`
      );
    }
  }
  setImage(img);
} catch (err) {
  setImageError("No se encontraron imágenes", err.message);
}

      } catch (err) {
        setError("No se pudo cargar el país", err.message);
      } finally {
        setLoading(false);
        setWeatherLoading(false);
      }
    };

    fetchData();
  }, [name]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    );

  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Volver
      </Link>

    {image && (
  <img
    src={image.urls.regular}
    alt={image.alt_description}
    className="img-fluid rounded shadow mb-3"
  />
)}

{imageError && (
  <div className="alert alert-secondary">{imageError}</div>
)}

      <div className="card shadow">
        <img
          src={country.flags.svg}
          className="card-img-top"
          alt={country.name.common}
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h2>{country.name.common}</h2>
          <p>
            <strong>Capital:</strong> {country.capital?.[0]}
          </p>
          <p>
            <strong>Región:</strong> {country.region}
          </p>
          <p>
            <strong>Población:</strong> {country.population.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h4>Clima actual</h4>

        {weatherLoading && (
          <div className="spinner-border spinner-border-sm text-primary" />
        )}

        {weatherError && (
          <div className="alert alert-warning mt-2">{weatherError}</div>
        )}

        {weather && !weatherLoading && (
          <div className="card mt-2 shadow-sm">
            <div className="card-body">
              <p>🌡️ {Math.round(weather.main.temp)}°C</p>
              <p>☁️ {weather.weather[0].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
