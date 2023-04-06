import Home from "../pages";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  test("renders heading", () => {
    render(<Home />);
    const headingElement = screen.getByRole("heading", {
      name: "Find my Pet (working title)",
    });
    expect(headingElement).toBeInTheDocument();
  });
});
