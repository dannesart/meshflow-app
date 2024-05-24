import { serverSupabaseUser } from "#supabase/server";

export default async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};
