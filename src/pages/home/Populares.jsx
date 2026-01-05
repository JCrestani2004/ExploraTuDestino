import { useEffect, useState } from "react";
import { getAllCountries } from "../../services/countries";
import CountryCard from "../../components/CountryCard";

const Populares = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (err) {
      setError(`${err.message} Error al cargar los paises`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Cargando Paises...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <h4>Error al cargar los Paises</h4>
        <p>{error}</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex + itemsPerPage < countries.length) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };
  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prev) => prev - itemsPerPage);
    }
  };

  const currentCountries = countries.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <>
      {" "}
      <div className="mb-5">
        <span className="text-primary fw-bold text-uppercase small">
          Tendencias
        </span>
        <h2 className="display-6 fw-bold">Paises Populares</h2>
      </div>
      <div className="d-flex justify-content-between mb-5">
        <div className="d-flex gap-2">
          <button
            className="btn p-3 nav-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <span
              className="carousel-control-prev-icon"
            ></span>
          </button>
            <div className="row">
        {currentCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
          <button
            className="btn p-3 nav-btn"
            onClick={handleNext}
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

    </>
  );
};

export default Populares;
