import { NuxtAuthHandler } from "#auth";
import Providers from "next-auth/providers/auth0";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    Providers.default({
      clientId:
        config.clientId ||
        process.env.AUTH0_CLIENT_ID ||
        "wYKLHxV9LPWMzvwZmmro7wemafsO4dsU",
      clientSecret:
        config.clientSecret ||
        process.env.AUTH0_CLIENT_SECRET ||
        "GrNNZ7EsS-N9nS_G7wkaFtEtkqTvDTHsjo-13GBuJFa0Cnt40MmcOf5hVk--SkV9",
      issuer:
        config.issuer ||
        process.env.AUTH0_ISSUER ||
        "https://meshflow.eu.auth0.com",
    }),
  ],

  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
  },

  secret: "xRtI8cBYK70cPMXQPIZtS8ffvGtzJkShx9RVlr31SJk=",
});
