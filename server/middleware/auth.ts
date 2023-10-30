import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const targetUrl = event.req.url;
  const securedUrls = "/api/";

  if (targetUrl.startsWith(securedUrls)) {
    const session = await getServerSession(event);

    if (!session) return;

    event.session = session;
  }
});