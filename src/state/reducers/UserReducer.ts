import { Reducer } from "react";

export interface IUserState {}

export const initialUserState: IUserState = {};

const UserReducer: Reducer<IUserState, { type: string }> = (
  state = initialUserState,
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default UserReducer;
