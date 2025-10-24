import { GridData, Grids, Position } from "@/ranges/types";

export function findGridByPosition(
  grids: Grids,
  position: Position,
): GridData | null {
  const grid = grids.find(([gridPosition]) => gridPosition === position);
  if (grid !== undefined) return grid[1];
  return null;
}
