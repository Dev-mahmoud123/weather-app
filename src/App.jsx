import { Button, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import "./App.css";
import { useEffect, useState } from "react";
import useCurrentLocation from "./useCurrentLocation";
import fetchData from "./fetchData";
import { useTranslation } from "react-i18next";

function App() {
  const API_KEY = import.meta.env.VITE_APP_API_KEY;

  const {
    coords,
    error: locationError,
    loading: locationLoading,
  } = useCurrentLocation();
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [weatherLoader, setWeatherLoader] = useState(false);
  const [locale, setLocale] = useState("ar");

  // Date and Time Formatter
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(`${i18n.language}`, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  });

  useEffect(() => {
    const loaderWeather = async () => {
      if (!coords || !API_KEY) return;
      setWeatherLoader(true);
      try {
        const data = await fetchData({
          latitude: coords.latitude,
          longitude: coords.longitude,
          api_key: API_KEY,
          lang: i18n.language,
        });
        setWeather(data);
      } catch (error) {
        setWeatherError(error?.message || String(error));
      } finally {
        setWeatherLoader(false);
      }
    };
    loaderWeather();
  }, [coords, API_KEY, i18n.language]);

  if (locationLoading) return <div>{t("getting your location")}</div>;
  if (locationError)
    return (
      <div>
        {t("failed to get your location")}
        {" : "}
        <strong>{locationError}</strong>
      </div>
    );

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLocale(newLang);
  };

  return (
    <div className="app">
      <Container maxWidth="sm">
        <div className="container-content">
          {weatherLoader && <p>{t("getting weather data")}</p>}
          {weatherError && <p>{t("failed to get weather data")}</p>}
          {weather && (
            <div className="card">
              <div className="city-time" dir={locale === "en" ? "ltr" : "rlt"}>
                <Typography variant="h6">{formatter.format(now)}</Typography>
                <Typography style={{ fontWeight: "600" }} variant="h2">
                  {weather.name}
                </Typography>
              </div>
              <hr />
              <div
                className="degree-description"
                dir={locale === "en" ? "ltr" : "rtl"}
              >
                <div className="temp">
                  <div className="degree">
                    <Typography variant="h1">
                      {Math.round(weather.main.temp)}
                      {"°"}
                    </Typography>
                  </div>
                  <div className="description">
                    <Typography
                      variant="h6"
                      style={
                        locale === "en"
                          ? { textAlign: "left" }
                          : { textAlign: "right" }
                      }
                    >
                      {weather.weather[0].description}
                    </Typography>
                  </div>
                  <div className="min-max-degree">
                    <h5>
                      {t("temp max")}
                      {Math.round(weather.main.temp_max)}
                      {"°"}
                    </h5>
                    <h5>
                      {t("temp min")} {Math.round(weather.main.temp_min)}
                      {"°"}
                    </h5>
                  </div>
                </div>
                <div className="icon">
                  <img
                    style={{ width: "200px", objectFit: "contain" }}
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                </div>
              </div>
            </div>
          )}
          <div
            dir={locale === "en" ? "ltr" : "rtl"}
            style={{ width: "100%", textAlign: "start", marginTop: "10px" }}
          >
            <Button
              variant="text"
              style={{ color: "white", fontSize: "18px" }}
              onClick={toggleLanguage}
            >
              {locale === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;
