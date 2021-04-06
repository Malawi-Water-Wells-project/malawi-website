export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  MANAGE_TRIBES: "/tribes",
  CREATE_NEW_TRIBE: "/tribes/create",
  CREATE_NEW_TRIBE_SUCCESS: "/tribes/create/success",
  TRIBE_SEARCH: "/tribes/search",
  CREATE_TRIBE_ADMIN: "/tribes/create-admin/",
  CREATE_TRIBE_ADMIN_SUCCESS: "tribes/create-admin/success",
} as const;

export const AppBreadcrumbs: Record<
  typeof Routes[keyof typeof Routes],
  Array<{ text: string; to: string }> | null
> = {
  [Routes.HOME]: [{ text: "Home", to: Routes.HOME }],
  [Routes.LOGIN]: null,
  [Routes.MANAGE_TRIBES]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
  ],
  [Routes.CREATE_NEW_TRIBE]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "New Tribe", to: Routes.CREATE_NEW_TRIBE },
  ],
  [Routes.CREATE_NEW_TRIBE_SUCCESS]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "New Tribe", to: Routes.CREATE_NEW_TRIBE },
    { text: "Success", to: Routes.CREATE_NEW_TRIBE_SUCCESS },
  ],
  [Routes.TRIBE_SEARCH]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Tribe Search", to: Routes.TRIBE_SEARCH },
  ],
  [Routes.CREATE_TRIBE_ADMIN]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
  ],
  [Routes.CREATE_TRIBE_ADMIN_SUCCESS]: [
    { text: "Home", to: Routes.HOME },
    { text: "Tribes", to: Routes.MANAGE_TRIBES },
    { text: "Create Admin", to: Routes.CREATE_TRIBE_ADMIN },
    { text: "Success", to: Routes.CREATE_TRIBE_ADMIN_SUCCESS },
  ],
};

export const APIBaseURL = "https://api.staging.africawater.org";

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
};
