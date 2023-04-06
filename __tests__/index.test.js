import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("renders without errors", () => {
    render(<Home />);
  });

  it("displays submission information when there are submissions", () => {
    const submissions = [
      {
        lostLocated: "Lost",
        name: "Fluffy",
        description: "Small white dog with brown spots",
        contact: "555-1234",
      },
    ];

    const { getByText } = render(<Home />, {
      wrapper: ({ children }) => (
        <StateContext.Provider value={[submissions]}>
          {children}
        </StateContext.Provider>
      ),
    });

    expect(getByText("Fluffy")).toBeInTheDocument();
    expect(getByText("Small white dog with brown spots")).toBeInTheDocument();
    expect(getByText("Contact: 555-1234")).toBeInTheDocument();
  });

  it("does not display submission information when there are no submissions", () => {
    const { queryByText } = render(<Home />);
    expect(queryByText("Fluffy")).not.toBeInTheDocument();
    expect(
      queryByText("Small white dog with brown spots")
    ).not.toBeInTheDocument();
    expect(queryByText("Contact: 555-1234")).not.toBeInTheDocument();
  });
});
