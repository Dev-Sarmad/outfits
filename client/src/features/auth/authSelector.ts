import { RootState } from "../../../store/store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export const selectStatus = (state: RootState) => state.auth.status;
export const selectAuthInitialized = (state: RootState) =>
  state.auth.authInitialized;
