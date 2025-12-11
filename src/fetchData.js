import axios from "axios";

async function fetchData({ latitude, longitude, api_key, lang }) {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    appid: api_key,
    units: "metric",
  });
  if (lang) params.set("lang", lang);

  const url = `https://api.openweathermap.org/data/2.5/weather?${params.toString()}`;

  const res = await axios.get(url);
  return res.data;
}

export default fetchData;
