import { useEffect, useState } from "react";

function useCurrentLocation() {
  const supportsGeolocation =
    typeof navigator !== "undefined" && "geolocation" in navigator;

  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(
    supportsGeolocation ? null : "المتصفح لا يدعم تحديد الموقع"
  );
  const [loading, setLoading] = useState(Boolean(supportsGeolocation));

  useEffect(() => {
    if (!supportsGeolocation) return;

    const options = {
      enableHighAccuracy: false,
      // Give the device more time to resolve a position (10s)
      timeout: 10000,
      maximumAge: 0,
    };

    const onSuccess = (pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });
      setLoading(false);
    };

    const onError = (err) => {
      setError(err?.message || "تعذر الحصول على الموقع");
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, [supportsGeolocation]);

  return { coords, error, loading };
}

export default useCurrentLocation;
