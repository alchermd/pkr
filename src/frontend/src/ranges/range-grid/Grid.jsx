import Legend from "./Legend";
import "./Grid.css";

function Row({ row }) {
  return (
    <div className="grid-row">
      {row.map((cell, index) => (
        <div
          className={`cell action-${cell.action}`}
          key={index}
          title={cell.label}
        >
          <span className="cell-label">{cell.label}</span>
        </div>
      ))}
    </div>
  );
}

function Grid({ position, grid }) {
  return (
    <div className="grid-wrapper text-center mb-4">
      <h2 className="h5 mb-3">Position: {position}</h2>
      <div className="range-grid-container">
        <div className="range-grid">
          {grid.map((row, index) => (
            <Row row={row} key={index} />
          ))}
        </div>
      </div>
      <Legend />
    </div>
  );
}

export default Grid;
