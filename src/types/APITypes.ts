export type APIRouteInfo = { route: string; protected: boolean };

export type APITokens = {
  access: string;
  refresh: string;
};

export type UserRole = "tribeadmin";

export type User = {
  created_on: string;
  id: number;
  name: string;
  public_id: string;
  role: UserRole;
  username: string;
};

export type APILoginResponse = {
  ok: boolean;
  status: "Success";
  tokens: APITokens;
  user: User;
};

export type APIUserResponse = {
  status: "Success";
  user: User;
};

export type APIAuthorizeResponse = {
  status: "Success";
  token: string;
};
