import { NuxtAuthHandler } from "#auth";
// import auth0 from "next-auth/providers/auth0";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const config = useRuntimeConfig();

type Credentials = {
  username: string;
  password: string;
};

export default NuxtAuthHandler({
  secret: config.nextAuthSecret,
  pages: {
    signIn: "/auth/log-in",
  },
  providers: [
    CredentialProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: Credentials) {
        // TODO: fetch user
        return {};
      },
    }),
    GoogleProvider.default({
      name: "google",
      clientId: config.google_client_id,
      clientSecret: config.google_client_secret,
      authorization: {
        params: {
          scope: "openid profile email",
          response_type: "code",
          acess_type: "offline",
          redirect_uri: config.REDIRECT_URI,
        },
      },
    }),
  ],
  // providers: [
  //   auth0.default({
  //     clientId:
  //       // config.clientId ||
  //       // process.env.AUTH0_CLIENT_ID ||
  //       "Y6oJo7VaFIEFvSyYh3bz34Cf36zNhroO",
  //     clientSecret:
  //       // config.clientSecret ||
  //       // process.env.AUTH0_CLIENT_SECRET ||
  //       "XYKzhoaWsG7r8nmGKFkzz9Eh4yuK54xyWpmakbiqbubBKuOOPnXZWNQWycnotaf-",
  //     issuer:
  //       // config.issuer ||
  //       // process.env.AUTH0_ISSUER ||
  //       "https://meshflow.eu.auth0.com",
  //   }),
  // ],

  // https://next-auth.js.org/configuration/callbacks#session-callback
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...token,
        ...session.user,
      };
      return session;
    },
  },
});
