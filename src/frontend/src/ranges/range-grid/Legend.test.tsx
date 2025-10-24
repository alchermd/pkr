import { render, screen } from "@testing-library/react";
import Legend from "./Legend";
import "@testing-library/jest-dom";

describe("<Legend/>", () => {
  it("renders expected actions", async () => {
    render(<Legend />);
    const actions = ["Fold", "Open"];
    for (const action of actions) {
      expect(await screen.findByText(action)).toBeInTheDocument();
    }
  });
});
