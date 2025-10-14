import Grid from "./Grid";
import PokerTable from "../components/PokerTable";
import { useState } from "react";

function findGridByPosition(grids, position) {
  return grids.find(([gridPosition, gridData]) => gridPosition === position)[1];
}

export default function App({ initialData }) {
  const { description, grids, available_positions, quiz_mode_url } =
    initialData;
  const [position, setPosition] = useState("BTN");
  const grid = findGridByPosition(grids, position);

  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-4 offset-md-1 d-flex flex-column align-items-center text-center mb-5">
          <Grid position={position} grid={grid} />
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
