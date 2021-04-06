import {
  APIAuthorizeResponse,
  APILoginResponse,
  APIRouteInfo,
  APIUserResponse,
} from "../types/APITypes";
import { TribeAdmin } from "../types/TribeAdminTypes";
import { Tribe } from "../types/TribeTypes";
import AuthClient from "./auth/AuthClient";
import { APIRoutes } from "./Constants";

abstract class AbstractAPIClient {
  private defaultFetchOptions: RequestInit;

  constructor() {
    this.defaultFetchOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  protected async performFetch(
    routeInfo: APIRouteInfo,
    options: RequestInit = {}
  ) {
    const headers: HeadersInit = {
      ...this.defaultFetchOptions.headers,
      Authorization: routeInfo.protected ? await AuthClient.getToken() : "",
      ...options.headers,
    };

    const mergedOptions = {
      ...this.defaultFetchOptions,
      ...options,
      headers,
    };

    return fetch(routeInfo.route, mergedOptions);
  }
}

class AuthAPIClient extends AbstractAPIClient {
  async login(username: string, password: string): Promise<APILoginResponse> {
    const response = await this.performFetch(APIRoutes.LOGIN, {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    return {
      ok: response.ok,
      ...(await response.json()),
    };
  }

  async user(): Promise<APIUserResponse> {
    const response = await this.performFetch(APIRoutes.USER);
    return response.json();
  }

  async authorize(token: string): Promise<APIAuthorizeResponse> {
    const response = await this.performFetch(APIRoutes.AUTHORIZE, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    });

    return response.json();
  }
}

class TribeAPIClient extends AbstractAPIClient {
  async createTribe(tribe: Pick<Tribe, "name" | "latitude" | "longitude">) {
    const response = await this.performFetch(APIRoutes.CREATE_TRIBE, {
      method: "POST",
      body: JSON.stringify(tribe),
    });

    const body = await response.json();

    return {
      success: response.ok,
      tribe: body.tribe as Tribe,
    };
  }
}

class TribeAdminAPIClient extends AbstractAPIClient {
  //route needs updating

  async createTribeAdmin(
    tribeAdmin: Pick<TribeAdmin, "name" | "username" | "password">
  ) {
    const response = await this.performFetch(
      APIRoutes.CREATE_TRIBE_ADMIN("tribeId"),
      {
        method: "POST",
        body: JSON.stringify(tribeAdmin),
      }
    );

    const body = await response.json();

    return {
      success: response.ok,
      tribeAdmin: body.tribeAdmin as TribeAdmin,
    };
  }
}

const APIClient = {
  tribe: new TribeAPIClient(),
  tribeAdmin: new TribeAdminAPIClient(),
  auth: new AuthAPIClient(),
};

export default APIClient;
