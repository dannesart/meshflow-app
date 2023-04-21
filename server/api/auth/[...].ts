import { NuxtAuthHandler } from "#auth";
import Auth0Provider from "next-auth/providers/auth0";
export default NuxtAuthHandler({
  providers: [
    Auth0Provider.default({
      clientId: "wYKLHxV9LPWMzvwZmmro7wemafsO4dsU",
      clientSecret:
        "GrNNZ7EsS-N9nS_G7wkaFtEtkqTvDTHsjo-13GBuJFa0Cnt40MmcOf5hVk--SkV9",
      issuer: "https://meshflow.eu.auth0.com",
    }),
  ],
  secret: "xRtI8cBYK70cPMXQPIZtS8ffvGtzJkShx9RVlr31SJk=",
});
