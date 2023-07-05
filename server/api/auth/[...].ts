import { NuxtAuthHandler } from "#auth";
import Providers from "next-auth/providers/auth0";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    Providers.default({
      clientId: config.clientId || process.env.AUTH0_CLIENT_ID,
      clientSecret: config.clientSecret || process.env.AUTH0_CLIENT_SECRET,
      issuer: config.issuer || process.env.AUTH0_ISSUER,
      domain: config.domain || process.env.AUTH0_DOMAIN,
    }),
  ],
  secret: "xRtI8cBYK70cPMXQPIZtS8ffvGtzJkShx9RVlr31SJk=",
});
