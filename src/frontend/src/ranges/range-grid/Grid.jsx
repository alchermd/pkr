import Legend from "./Legend";

function Row({row}) {
  return <div className="d-flex">
    {row.map((cell, index) => {
      return <div className={`cell action-${cell.action} flex-fill text-center`} key={index}>
        {cell.label}
      </div>
    })}
  </div>;
}

function Grid({position, grid}) {
  return <div className="col-md-4 mb-5 d-flex flex-column align-items-center text-center">
    <h2 className="h5 mb-3">Position: {position}</h2>
    <div className="range-grid d-inline-block mb-3">
      {grid.map((row, index) => <Row row={row} key={index}/>)}
    </div>
    <Legend/>
  </div>;
}

export default Grid;
