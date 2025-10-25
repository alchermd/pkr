import "@/ranges/range-grid/GridRow.css";
import { GridRow as GridRowType } from "@/ranges/types";

export interface RowProps {
  row: GridRowType;
  highlightedLabel?: string;
}

function GridRow({ row, highlightedLabel }: RowProps) {
  return (
    <div className="grid-row">
      {row.map((cell, index) => (
        <div
          className={`cell action-${cell.action} ${highlightedLabel === cell.label && "cell-highlighted"}`}
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
