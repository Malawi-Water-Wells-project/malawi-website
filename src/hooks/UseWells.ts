import { useEffect, useState } from "react";
import APIClient from "../core/APIClient";
import { useAppState } from "../state/StateContext";

const useWells = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppState();

  useEffect(() => {
    if (!state.well.initialLoadComplete) {
      setIsLoading(true);
      APIClient.well.getAllWells().then((wells) => {
        dispatch({ type: "WELL::INITIAL_LOAD_COMPLETE", wells });
        setIsLoading(false);
      });
    } else if (!isLoading) {
      setIsLoading(false);
    }
  }, [state.well.initialLoadComplete, isLoading]);

  return {
    isLoading,
    wells: state.well.wells,
  };
};

export default useWells;
