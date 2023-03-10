import { NuxtAuthHandler } from "#auth";
import Auth0Provider from "next-auth/providers/auth0";
export default NuxtAuthHandler({
  providers: [
    Auth0Provider.default({
      clientId: "8ymQ12zu64tchY5qmFytUYFUpA2BoWSb",
      clientSecret:
        "8heQTsUaqYjTviiQMcaMb6RxHZPmVclCbqC0tOJY4t-AlauDBm4D-aL1JRv2Buan",
      issuer: "https://dannesart.eu.auth0.com",
    }),
  ],
});
