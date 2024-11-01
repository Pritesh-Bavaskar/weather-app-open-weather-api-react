import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./search.css";
import { IconButton, Tooltip } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [error, setError] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setError(null);

          try {
            const response = await fetch(
              `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${latitude}${longitude}/nearbyCities?radius=100`,
              geoApiOptions
            );
            setSearch({
              value: `${latitude} ${longitude}`,
              label: "Current Location",
            });
            onSearchChange({
              value: `${latitude} ${longitude}`,
              label: "Current Location",
            });
          } catch (err) {
            setError("Failed to fetch weather location data");
            console.log(err);
          }
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div className="search-main">
      <div className="search-right">
        <AsyncPaginate
          placeholder="Search for city"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />
      </div>
      <Tooltip title="Current Location">
        <IconButton onClick={handleGetLocation}>
          <MyLocationIcon />
        </IconButton>
      </Tooltip>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
