import React from "react";
import { render } from "@testing-library/react";
import Home from "../pages/index";
import { StateContext } from "../context/state.js";

describe("Home component", () => {
  it("renders the heading", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Find my Pet (working title)")).toBeInTheDocument();
  });

  it("renders the list of submissions", () => {
    const submissions = [
      {
        lostLocated: "Lost",
      },
      {
        lostLocated: "Located",
      },
    ];

    const { getByText } = render(
      <StateContext.Provider value={[submissions]}>
        <Home />
      </StateContext.Provider>
    );

    submissions.forEach((submission) => {
      expect(getByText(submission.lostLocated)).toBeInTheDocument();
    });
  });
});
