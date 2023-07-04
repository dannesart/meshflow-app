import { vi } from "vitest";

vi.mock("#imports", () => {
  return {
    useAuth: () => {
      return {
        data: {},
      };
    },
  };
});

vi.mock("#app", () => {
  return {
    useAuth: () => {
      return {
        data: {},
      };
    },
  };
});
