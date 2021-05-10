import { Tribe } from "../types/TribeTypes";

export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  MANAGE_TRIBES: "/tribes",
  CREATE_NEW_TRIBE: "/tribes/create",
  CREATE_NEW_TRIBE_SUCCESS: "/tribes/create/success",
  TRIBE_SEARCH: "/tribes/search",
  CREATE_TRIBE_ADMIN: "/tribes/create-admin/",
  CREATE_TRIBE_ADMIN_SUCCESS: "/tribes/create-admin/success",
  MANAGE_SINGLE_TRIBE: "/tribes/:tribeID/manage",
  MANAGE_WELLS: "/wells",
  BULK_WELL_UPLOAD: "/wells/bulk-upload",
  FIND_WELLS: "/wells/search",
} as const;

export const AppBreadcrumbs = {
  HOME: [{ text: "Home", to: Routes.HOME }],
  LOGIN: [],
  MANAGE_TRIBES: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
  ],
  CREATE_NEW_TRIBE: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "New Tribe", to: Routes.CREATE_NEW_TRIBE },
  ],
  CREATE_NEW_TRIBE_SUCCESS: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "New Tribe", to: Routes.CREATE_NEW_TRIBE },
    { text: "Success", to: Routes.CREATE_NEW_TRIBE_SUCCESS },
  ],
  TRIBE_SEARCH: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Tribe Search", to: Routes.TRIBE_SEARCH },
  ],
  CREATE_TRIBE_ADMIN: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
  ],
  CREATE_TRIBE_ADMIN_SUCCESS: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
    { text: "Success", to: Routes.CREATE_TRIBE_ADMIN_SUCCESS },
  ],
  MANAGE_SINGLE_TRIBE: (tribe: Tribe | null) => [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    {
      text: tribe ? tribe.name : "Manage Tribe",
      to: tribe
        ? Routes.MANAGE_SINGLE_TRIBE.replace(":tribeID", tribe.public_id)
        : Routes.MANAGE_SINGLE_TRIBE,
    },
  ],
  MANAGE_WELLS: [
    { text: "Home", to: Routes.HOME },
    { text: "Wells", to: Routes.MANAGE_WELLS },
  ],
  BULK_WELL_UPLOAD: [
    { text: "Home", to: Routes.HOME },
    { text: "Wells", to: Routes.MANAGE_WELLS },
    { text: "Bulk Upload", to: Routes.BULK_WELL_UPLOAD },
  ],
};

export const APIBaseURL = process.env.REACT_APP_API_BASE;
if (!APIBaseURL) {
  throw new Error("REACT_APP_API_BASE Not Set");
}

const formatRoute = (route: string) => `${APIBaseURL}${route}`;

export const APIRoutes = {
  AUTHORIZE: {
    route: formatRoute("/auth/authorize"),
    protected: false,
  },
  LOGIN: {
    route: formatRoute("/auth/login"),
    protected: false,
  },
  USER: {
    route: formatRoute("/auth/user"),
    protected: true,
  },
  CREATE_TRIBE: {
    route: formatRoute("/tribe/create"),
    protected: true,
  },
  CREATE_TRIBE_ADMIN: (tribeId: string) => ({
    route: formatRoute(`/tribe/${tribeId}/create`),
    protected: true,
  }),
  SEARCH_TRIBES: (latitude: number, longitude: number, radius: number) => ({
    route: formatRoute(
      `/tribe/search?type=location&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    ),
    protected: true,
  }),
  GET_TRIBE_BY_ID: (tribeID: string) => ({
    route: formatRoute(`/tribe/${tribeID}`),
    protected: true,
  }),
  GET_TRIBE_ADMINS: (tribeID: string) => ({
    route: formatRoute(`/tribe/${tribeID}/admins`),
    protected: true,
  }),
  WELLS_BULK_UPLOAD: {
    route: formatRoute("/well/bulk"),
    protected: true,
  },
  GET_WELLS: {
    route: formatRoute("/well/"),
    protected: true,
  },
};
