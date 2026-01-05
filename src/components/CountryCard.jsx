import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    

    <div className="col-md-4 col-xl-3 mb-3">
      <Link to={`country/${country.name.common}`}>
      <div className="card h-100" style={{ width: "18rem", height: "350px" }}>
        <div className="card-header">
          <img
            src={country.flags.png}
            className="card-img-top"
            alt={country.name.common}
            style={{ width: "100%", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{country.name.common}</h5>
          <p className="card-text">
            Population: {country.population.toLocaleString()}
          </p>
          <p className="card-text">Region: {country.region}</p>
          <p className="card-text">
            Capital: {country.capital ? country.capital[0] : "N/A"}
          </p>
        </div>
        <div className="card-footer">
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
      </Link>
    </div>
    
    
  );
};

export default CountryCard;
