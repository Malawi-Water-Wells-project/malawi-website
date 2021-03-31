import { Tribe } from "../types/TribeTypes";

abstract class AbstractAPIClient {
  protected BASE_URL = "https://api.staging.africawater.org";

  private defaultFetchOptions: RequestInit;

  constructor() {
    this.BASE_URL = this.BASE_URL.endsWith("/")
      ? this.BASE_URL.slice(0, this.BASE_URL.length - 1)
      : this.BASE_URL;

    this.defaultFetchOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  protected async performFetch(route: string, options: RequestInit = {}) {
    const url = `${this.BASE_URL}${route}`;

    const mergedOptions = {
      ...this.defaultFetchOptions,
      ...options,
    };

    return fetch(url, mergedOptions);
  }
}

class TribeAPIClient extends AbstractAPIClient {
  private static CREATE_TRIBE_ROUTE = "/tribe/create";

  async createTribe(tribe: Pick<Tribe, "name" | "latitude" | "longitude">) {
    const response = await this.performFetch(
      TribeAPIClient.CREATE_TRIBE_ROUTE,
      { method: "POST", body: JSON.stringify(tribe) }
    );

    const body = await response.json();

    return {
      success: response.ok,
      tribe: body.tribe as Tribe,
    };
  }
}

const APIClient = {
  tribe: new TribeAPIClient(),
};

export default APIClient;
