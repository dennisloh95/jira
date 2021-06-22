import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark component correct keyword mark", () => {
  const name = "User Management";
  const keyword = "Management";

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color:#257afd");
  expect(screen.getByText("User")).not.toHaveStyle("color:#257afd");
});
