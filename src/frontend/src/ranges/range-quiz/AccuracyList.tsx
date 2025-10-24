import { Position } from "@/ranges/types";
import { Accuracy } from "@/ranges/range-quiz/types";

export interface AccuracyListProps {
  byPosition: Accuracy;
  bestPosition: Position | null;
  worstPosition: Position | null;
  bestPositionClass: string;
  worstPositionClass: string;
  summaryString: string;
}

function AccuracyList({
  byPosition,
  bestPosition,
  worstPosition,
  bestPositionClass,
  worstPositionClass,
}: AccuracyListProps) {
  const positions = Object.keys(byPosition);
  if (positions.length === 0) {
    return <p className="text-muted">No data yet.</p>;
  }

  return (
    <ul className="list-unstyled mt-3">
      {positions.map((p) => {
        const pos = p as Position;
        let className = "text-body";
        if (pos === bestPosition) className = bestPositionClass;
        else if (pos === worstPosition) className = worstPositionClass;

        return (
          <li key={pos} className={className}>
            <strong>{pos}</strong>: {byPosition[pos]}%
          </li>
        );
      })}
    </ul>
  );
}

export default AccuracyList;
