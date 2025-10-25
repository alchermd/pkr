import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "@/ranges/range-grid/Grid";
import { GridData, GridRow} from "@/ranges/types";

describe("<Grid/>", () => {
  const row: GridRow = [
    { label: "AA", action: "open" },
    { label: "AKs", action: "open" },
    { label: "AQs", action: "open" },
    { label: "AJs", action: "open" },
    { label: "ATs", action: "open" },
    { label: "A9s", action: "open" },
    { label: "A8s", action: "open" },
    { label: "A7s", action: "open" },
    { label: "A6s", action: "open" },
    { label: "A5s", action: "open" },
    { label: "A4s", action: "open" },
    { label: "A3s", action: "open" },
    { label: "A2s", action: "open" },
  ];
  const grid: GridData = [row];

  it("can highlight a hand", async () => {
    render(<Grid position="UTG" grid={grid} highlightedLabel="AKs" />);
    const label = await screen.findByText("AKs");
    const parent = label.parentElement;
    expect(parent).toHaveClass("cell-highlighted");
  });

  it("doesn't highlight anything if none is provided", async () => {
    const {container} = render(<Grid position="UTG" grid={[row]} />);
    expect(container.querySelectorAll(".cell-highlighted")).toHaveLength(0);
  });
});
