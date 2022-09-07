import { describe, it, expect } from "vitest";

import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("renders properly", () => {
    expect(HelloWorld).toBeTruthy();
  });
});
