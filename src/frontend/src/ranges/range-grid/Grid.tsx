import Legend from "./Legend";
import "./Grid.css";
import { GridData, Position } from "@/ranges/types";
import GridRow from "@/ranges/range-grid/GridRow";

export interface GridProps {
  position: Position;
  grid: GridData;
}

function Grid({ position, grid }: GridProps) {
  return (
    <div className="grid-wrapper text-center mb-4">
      <h2 className="h5 mb-3">Position: {position}</h2>
      <div className="range-grid-container">
        <div className="range-grid">
          {grid.map((row, index) => (
            <GridRow row={row} key={index} />
          ))}
        </div>
      </div>
      <Legend />
    </div>
  );
}

export default Grid;
