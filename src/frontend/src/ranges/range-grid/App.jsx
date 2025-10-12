import Grid from "./Grid";
import PokerTable from "../components/PokerTable";
import {useState} from "react";

function findGridByPosition(grids, position) {
  return grids.find(([gridPosition, gridData]) => gridPosition  === position)[1];
}

export default function App({initialData}) {
  const {range_name, grids, available_positions} = initialData;
  const [position, setPosition] = useState("BTN") ;
  const grid = findGridByPosition(grids, position);

  return <div className="mt-5">
    <div className="row">
      <div className="col-md-4 offset-1 d-flex flex-column align-items-center text-center mb-5">
        <Grid position={position} grid={grid}/>
      </div>
      <div className="col-md-4 offset-1">
        <PokerTable selectedPosition={position} onPositionClick={setPosition} availablePositions={available_positions} />
      </div>
    </div>
  </div>;
}
