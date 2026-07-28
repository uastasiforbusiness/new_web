import { defineConfig } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";

// eslint-config-next >= 16 ships native flat config — no FlatCompat needed.
export default defineConfig([
  {
    extends: [next],
  },
]);
