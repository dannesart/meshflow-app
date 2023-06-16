import { vi } from "vitest";

vi.mock("#imports", () => {
  return {
    useSession: () => {
      return {
        data: {},
      };
    },
  };
});

vi.mock("#app", () => {
  return {
    useSession: () => {
      return {
        data: {},
      };
    },
  };
});
