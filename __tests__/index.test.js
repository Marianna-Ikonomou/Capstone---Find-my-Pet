import React from "react";
import { render } from "@testing-library/react";
import Home from "../pages/index.js";
import { StateProvider } from "../context/state.js";

describe("Home component", () => {
  it("renders the 'Find my Pet' heading", () => {
    const { getByText } = render(
      <StateProvider>
        <Home />
      </StateProvider>
    );
    const heading = getByText("Find my Pet");
    expect(heading).toBeInTheDocument();
  });
});
