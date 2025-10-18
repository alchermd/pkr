import { useEffect, useState } from "react";
import Quiz from "./Quiz";

function App({ initialData }) {
  const { grids, available_positions } = initialData;

  return (
    <div className="mt-5">
      <Quiz grids={grids} available_positions={available_positions} />
    </div>
  );
}

export default App;
