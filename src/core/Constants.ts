import { Tribe } from "../types/TribeTypes";

export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  MANAGE_TRIBES: "/villages",
  CREATE_NEW_TRIBE: "/villages/create",
  CREATE_NEW_TRIBE_SUCCESS: "/villages/create/success",
  TRIBE_SEARCH: "/villages/search",
  CREATE_TRIBE_ADMIN: "/villages/create-admin/",
  CREATE_TRIBE_ADMIN_SUCCESS: "/villages/create-admin/success",
  MANAGE_SINGLE_TRIBE: "/villages/:tribeID/manage",
  MANAGE_WELLS: "/wells",
  BULK_WELL_UPLOAD: "/wells/bulk-upload",
  FIND_WELLS: "/wells/search",
} as const;

export const AppBreadcrumbs = {
  HOME: [{ text: "Home", to: Routes.HOME }],
  LOGIN: [],
  MANAGE_TRIBES: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
  ],
  CREATE_NEW_TRIBE: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    { text: "New Village", to: Routes.CREATE_NEW_TRIBE },
  ],
  CREATE_NEW_TRIBE_SUCCESS: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    { text: "New Village", to: Routes.CREATE_NEW_TRIBE },
    { text: "Success", to: Routes.CREATE_NEW_TRIBE_SUCCESS },
  ],
  TRIBE_SEARCH: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    { text: "Village Search", to: Routes.TRIBE_SEARCH },
  ],
  CREATE_TRIBE_ADMIN: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
  ],
  CREATE_TRIBE_ADMIN_SUCCESS: [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
    { text: "Success", to: Routes.CREATE_TRIBE_ADMIN_SUCCESS },
  ],
  MANAGE_SINGLE_TRIBE: (tribe: Tribe | null) => [
    { text: "Home", to: Routes.HOME },
    { text: "Villages", to: Routes.MANAGE_TRIBES },
    {
      text: tribe ? tribe.name : "Manage Village",
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
    route: formatRoute("/users/current"),
    protected: true,
  },
  CREATE_TRIBE: {
    route: formatRoute("/villages/create"),
    protected: true,
  },
  CREATE_TRIBE_ADMIN: (tribeId: string) => ({
    route: formatRoute(`/villages/${tribeId}/create`),
    protected: true,
  }),
  SEARCH_TRIBES: (latitude: number, longitude: number, radius: number) => ({
    route: formatRoute(
      `/tribes/search?type=location&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    ),
    protected: true,
  }),
  GET_TRIBE_BY_ID: (tribeID: string) => ({
    route: formatRoute(`/villages/${tribeID}`),
    protected: true,
  }),
  GET_TRIBE_ADMINS: (tribeID: string) => ({
    route: formatRoute(`/villages/${tribeID}/admins`),
    protected: true,
  }),
  WELLS_BULK_UPLOAD: {
    route: formatRoute("/wells/bulk"),
    protected: true,
  },
  GET_WELLS: {
    route: formatRoute("/wells/"),
    protected: true,
  },
};
