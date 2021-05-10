import {
  APIAuthorizeResponse,
  APILoginResponse,
  APIRouteInfo,
  APIUserResponse,
  User,
  Well,
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
    options: RequestInit = {},
    useDefaults: boolean = true
  ) {
    const headers: HeadersInit = {
      ...(useDefaults ? this.defaultFetchOptions.headers : {}),
      Authorization: routeInfo.protected ? await AuthClient.getToken() : "",
      ...options.headers,
    };

    const mergedOptions = {
      ...(useDefaults ? this.defaultFetchOptions : {}),
      ...options,
      headers,
    };

    console.log(mergedOptions);

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

  async user(): Promise<APIUserResponse | null> {
    const response = await this.performFetch(APIRoutes.USER);
    if (!response.ok) return null;
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

  async searchByLocation(latitude: number, longitude: number, radius: number) {
    const response = await this.performFetch(
      APIRoutes.SEARCH_TRIBES(latitude, longitude, radius),
      { method: "GET" }
    );

    const body = await response.json();

    return body.results as Tribe[];
  }

  async getTribeByID(publicID: string) {
    const response = await this.performFetch(
      APIRoutes.GET_TRIBE_BY_ID(publicID),
      { method: "GET" }
    );

    const body = await response.json();

    return body.tribe as Tribe;
  }

  async getTribeAdminsByID(publicID: string): Promise<Array<User> | null> {
    const response = await this.performFetch(
      APIRoutes.GET_TRIBE_ADMINS(publicID),
      { method: "GET" }
    );
    if (!response.ok) return null;

    const body = await response.json();

    return body.admins as User[];
  }
}

class WellAPIClient extends AbstractAPIClient {
  async uploadBulkWells(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.performFetch(
      APIRoutes.WELLS_BULK_UPLOAD,
      { method: "POST", body: formData },
      false
    );

    console.log(response);
  }

  async getAllWells(): Promise<Array<Well>> {
    const response = await this.performFetch(APIRoutes.GET_WELLS, {
      method: "GET",
    });

    return response.json();
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
  well: new WellAPIClient(),
};

export default APIClient;
