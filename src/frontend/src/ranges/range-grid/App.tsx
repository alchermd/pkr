import PokerTable from "@/ranges/components/PokerTable";
import { useState } from "react";
import { Grids, Position, Positions } from "@/ranges/types";
import GridComponent from "@/ranges/range-grid/Grid";
import { findGridByPosition } from "@/ranges/utils";

export interface AppProps {
  description: string;
  grids: Grids;
  available_positions: Positions;
  quiz_mode_url: string;
}

export default function App({
  description,
  grids,
  available_positions,
  quiz_mode_url,
}: AppProps) {
  const [position, setPosition] = useState<Position>("BTN");
  const grid = findGridByPosition(grids, position);

  if (grid === null) {
    return <div>No grid found for position {position}</div>;
  }

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-1 d-flex flex-column align-items-center text-center mb-5">
          <GridComponent position={position} grid={grid} />
        </div>
        <div className="col-md-4 offset-md-1">
          <div className="mb-5">
            <blockquote className="blockquote">{description}</blockquote>
          </div>
          <PokerTable
            selectedPosition={position}
            onPositionClick={setPosition}
            availablePositions={available_positions}
          />
          <div className="d-flex align-items-center justify-content-center mt-5">
            <a href={quiz_mode_url} className="btn btn-primary btn-block">
              Quiz Mode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
