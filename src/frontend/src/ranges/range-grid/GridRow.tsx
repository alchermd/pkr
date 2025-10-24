import { GridRow as GridRowType } from "@/ranges/types";

export interface RowProps {
  row: GridRowType;
}

function GridRow({ row }: RowProps) {
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

export default GridRow;
