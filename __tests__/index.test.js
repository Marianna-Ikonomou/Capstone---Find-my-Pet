import Home from "../pages";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<Home />);
  const element = screen.getByRole("Heading", {
    name: "Find my Pet (working title)",
  });
  expect(element).toBeInTheDocument();
});
