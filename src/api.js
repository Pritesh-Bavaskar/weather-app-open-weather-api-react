export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
export const geoApiOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "cfefa891c1msh5fb2720d9a897bap18b3e4jsn3598e81da013",
    "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
  },
};

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "abe9e77652ff90cd5cd14454e8ffb38f";

// try {
//   const response = await fetch(geo_api_url, geoApiOptions);
//   const result = await response.text();
//   console.log("results", result);
// } catch (error) {
//   console.error(error);
// }
