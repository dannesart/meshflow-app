import { NuxtAuthHandler } from "#auth";
import Providers from "next-auth/providers/auth0";
export default NuxtAuthHandler({
  providers: [
    Providers.default({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  secret: "xRtI8cBYK70cPMXQPIZtS8ffvGtzJkShx9RVlr31SJk=",
});
