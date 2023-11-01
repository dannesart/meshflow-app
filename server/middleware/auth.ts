import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);

    if (!session) return;

    event.session = session;
  } catch (error) {}
});
