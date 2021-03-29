//import React from "react";

import { useState } from "react";

interface Tribe {
    name: string;
    latitude: number;
    longitude: number;
}

function useCreateTribe() {
    const [state, setState] = useState<Tribe>(defaultTribe);

    const updateValues = (newValues: Partial<Tribe>) => {
        setState((prevValue) => ({...prevValue, ...newValues}));
    }
}
export default useCreateTribe;