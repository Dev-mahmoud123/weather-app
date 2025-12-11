import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "getting your location": "Getting your location...",
      "failed to get your location": "Failed to get your location",
      "weather app": "Weather App",
      "getting weather data": "Getting weather data",
      "failed to get weather data": "Failed to get weather data",
      "temp max": "temp max :",
      "temp min": "temp min :",
    },
  },
  ar: {
    translation: {
      "getting your location": "جارى تحديد موقعك...",
      "failed to get your location": "خطأ فى تحديد موقعك",
      "weather app": "تطبيق الطقس",
      "getting weather data": "جارى جلب بيانات الطقس",
      "failed to get weather data": "خطأ فى جلب بيانات الطقس",
      "temp max": "العظمى :",
      "temp min": "الصغرى :",
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
