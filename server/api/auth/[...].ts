import { NuxtAuthHandler } from "#auth";
import auth0 from "next-auth/providers/auth0";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: "xRtI8cBYK70cPMXQPIZtS8ffvGtzJkShx9RVlr31SJk=",
  pages: {
    signIn: "/signin",
  },
  providers: [
    auth0.default({
      id: "auth0",
      clientId:
        // config.clientId ||
        // process.env.AUTH0_CLIENT_ID ||
        "Y6oJo7VaFIEFvSyYh3bz34Cf36zNhroO",
      clientSecret:
        // config.clientSecret ||
        // process.env.AUTH0_CLIENT_SECRET ||
        "XYKzhoaWsG7r8nmGKFkzz9Eh4yuK54xyWpmakbiqbubBKuOOPnXZWNQWycnotaf-",
      issuer:
        // config.issuer ||
        // process.env.AUTH0_ISSUER ||
        "https://meshflow.eu.auth0.com",
    }),
  ],
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: `next-auth.state`,
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 900,
      },
    },
  },
});
