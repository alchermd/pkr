import { Grids, Positions } from "@/ranges/types";
import { Scenario } from "@/ranges/range-quiz/types";

export function randomScenario(
  grids: Grids,
  available_positions: Positions,
): Scenario {
  const randomPosition =
    available_positions[Math.floor(Math.random() * available_positions.length)];
  const randomGridData = grids.find(
    ([gridPosition, gridData]) => gridPosition === randomPosition,
  );
  if (randomGridData === undefined) throw Error("No grid found for position");

  const randomGrid = randomGridData[1];
  const randomRow = randomGrid[Math.floor(Math.random() * randomGrid.length)];
  const randomCell = randomRow[Math.floor(Math.random() * randomRow.length)];

  return {
    position: randomPosition,
    dealtCard: randomCell.label,
    answer: randomCell.action,
  };
}
