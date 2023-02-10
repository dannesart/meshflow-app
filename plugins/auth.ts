import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain: "dannesart.eu.auth0.com",
    clientId: "8ymQ12zu64tchY5qmFytUYFUpA2BoWSb",
    authorizationParams: {
      redirect_uri: "http://localhost:3000",
    },
  });

  if (process.client) {
    nuxtApp.vueApp.use(auth0);
  }

  addRouteMiddleware("auth", () => {
    if (process.client) {
      auth0.checkSession();
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        });
      }
    }
  });
});
