/**
 * TODO: Post-Live - Change JWT storage into cookies for admin
 * localStorage is vulnerable to XSS
 */

import { APITokens } from "../../types/APITypes";
import APIClient from "../APIClient";
import jwtDecode, { JwtPayload } from "jwt-decode";

class AuthClient {
  private static AuthTokenKey = "authToken";
  private static RefreshTokenKey = "refreshToken";

  constructor() {}

  public async getToken(): Promise<string> {
    const authToken = localStorage.getItem(AuthClient.AuthTokenKey);
    if (this.isTokenValid(authToken)) {
      return this.formatToken(authToken);
    } else if (authToken !== null) {
      localStorage.removeItem(AuthClient.AuthTokenKey);
    }

    const refreshToken = localStorage.getItem(AuthClient.RefreshTokenKey);
    if (this.isTokenValid(refreshToken)) {
      const newAuthToken = await this.refreshAuthToken(refreshToken);
      localStorage.setItem(AuthClient.AuthTokenKey, newAuthToken);
      return newAuthToken;
    } else if (refreshToken !== null) {
      localStorage.removeItem(AuthClient.RefreshTokenKey);
    }

    throw new Error("Could not retrieve auth token: no valid refresh token");
  }

  public setTokens({ refresh, access }: Partial<APITokens>) {
    if (access) localStorage.setItem(AuthClient.AuthTokenKey, access);
    if (refresh) localStorage.setItem(AuthClient.RefreshTokenKey, refresh);
  }

  private isTokenValid(token: string | null): token is string {
    if (token === null) return false;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (!exp) return false;

      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private formatToken(token: string) {
    return `Bearer ${token}`;
  }

  private async refreshAuthToken(refreshToken: string) {
    const response = await APIClient.auth.authorize(
      this.formatToken(refreshToken)
    );

    return response.token;
  }
}

export default new AuthClient();
