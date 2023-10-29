export const useColorByEstimate = (estimate: number) => {
  if (!estimate) return "system";
  if (estimate <= 2) return "primary";
  if (estimate > 2 && estimate < 5) return "secondary";
  if (estimate >= 5 && estimate <= 7) return "warning";
  return "error";
};
