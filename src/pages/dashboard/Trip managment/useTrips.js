import { useState, useEffect } from "react";
import { fetchTrips, cancelTrip } from "../Trip managment/tripsService";

export default function useTrips(filters) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");

  const getTrips = async () => {
    setLoading(true);
    try {
      const res = await fetchTrips(filters);
      setTrips(res.data?.data?.items || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await cancelTrip(id);
      setSuccess(res.data?.message);
      setErr("");
      getTrips();
    } catch (e) {
      setErr(e.response?.data?.message);
      setSuccess("");
    }
  };

  useEffect(() => {
    getTrips();
  }, [filters.search, filters.status, filters.date]);

  return {
    trips,
    loading,
    success,
    err,
    handleCancel,
    refresh: getTrips,
  };
}