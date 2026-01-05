import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CountryDetail = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const data = await res.json();
        setCountry(data[0]);
      } catch (err) {
        setError(`${err.message} Error al cargar los paises`);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">
        {error}
      </div>
    );

  return (
    <div className="container my-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Volver
      </Link>

      <div className="card shadow">
        <img
          src={country.flags.svg}
          className="card-img-top"
          alt={country.name.common}
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
        />

        <div className="card-body">
          <h2>{country.name.common}</h2>
          <p><strong>Capital:</strong> {country.capital?.[0]}</p>
          <p><strong>Región:</strong> {country.region}</p>
          <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
