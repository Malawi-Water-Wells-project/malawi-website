import { Tribe } from "../../types/TribeTypes";

type SetCurrentTribe = { type: "TRIBE::SET_CURRENT_TRIBE"; tribe: Tribe };

export type ITribeAction = SetCurrentTribe;
