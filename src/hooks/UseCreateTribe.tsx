import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import APIClient from "../core/APIClient";
import { Routes } from "../core/Constants";
import { useAppState } from "../state/StateContext";

const validateTribe = (name: string, latitude: string, longitude: string) => {
  const nameErrors = [];
  const locationErrors = [];

  if (name.length <= 0) {
    nameErrors.push("Name must not be empty");
  }

  if (latitude.length <= 0 || longitude.length <= 0) {
    locationErrors.push("Latitude and longitude must not be empty");
  }

  return {
    nameErrors,
    locationErrors,
    hasFailed: Boolean(nameErrors.length || locationErrors.length),
  };
};

const useCreateTribe = () => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [nameErrors, setNameErrors] = useState<string[]>([]);
  const [locationErrors, setLocationErrors] = useState<string[]>([]);
  const dispatch = useAppState()[1];
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = validateTribe(name, latitude, longitude);
    setNameErrors(result.nameErrors);
    setLocationErrors(result.locationErrors);

    if (result.hasFailed) {
      return;
    }

    const { success, tribe } = await APIClient.tribe.createTribe({
      name,
      latitude: Number(latitude),
      longitude: Number(longitude),
    });

    if (!success) return; // TODO: Failure Response

    dispatch({ type: "TRIBE::SET_CURRENT_TRIBE", tribe });
    history.push(Routes.CREATE_NEW_TRIBE_SUCCESS);
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  };

  return {
    name,
    latitude,
    longitude,
    setName,
    setLatitude,
    setLongitude,
    handleSubmit,
    handleCurrentLocation,
    nameErrors,
    locationErrors,
  };
};

export default useCreateTribe;
