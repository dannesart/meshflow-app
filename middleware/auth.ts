export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (
    !user.value &&
    to.path !== "/auth/create-account" &&
    to.path !== "/auth/log-in"
  ) {
    return navigateTo("/auth/log-in");
  }
});
