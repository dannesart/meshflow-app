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
