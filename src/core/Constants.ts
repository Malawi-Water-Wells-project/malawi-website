export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  MANAGE_TRIBES: "/tribes",
  CREATE_NEW_TRIBE: "/tribes/create",
  CREATE_NEW_TRIBE_SUCCESS: "/tribes/create/success",
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
};
