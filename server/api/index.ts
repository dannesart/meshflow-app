import protectRoute from "~/server/protectedRoute";
export default defineEventHandler(async (event) => {
  await protectRoute(event);
  return "Hello";
});
