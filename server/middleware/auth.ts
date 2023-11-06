import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  // Only protect a certain backend route
  if (!event.node.req.url?.startsWith("/api/")) {
    return;
  }

  const session = await getServerSession(event);
  if (!session) {
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  }
});
