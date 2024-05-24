import protectRoute from "~/server/protectRoute";
export default defineEventHandler(async (event) => {
  await protectRoute(event);
  return "Hello";
});
