import Quiz from "./Quiz";
import { Grids, Positions } from "@/ranges/types";

export interface AppProps {
  grids: Grids;
  available_positions: Positions;
}

function App({ grids, available_positions }: AppProps) {
  return (
    <div className="mt-5">
      <Quiz grids={grids} available_positions={available_positions} />
    </div>
  );
}

export default App;
