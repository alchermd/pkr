import React, { useEffect, useRef, useState } from "react";
import "./PokerTable.css";

const POSITIONS_6MAX = [
  "UTG",
  "HJ",
  "CO",
  "BTN",
  "SB",
  "BB",
];

function PokerTable({ players = 6, defaultSpot = "BTN" }) {
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Track live container size (for responsiveness)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, );

  const { width, height } = size;
  const radiusX = width * 0.45;  // about 85% of width for the ellipse
  const radiusY = height * 0.37; // about 70% of height
  const centerX = width / 2;
  const centerY = height / 2;

  const spots = Array.from({ length: players }, (_, i) => {
    const angle = (2 * Math.PI * i) / players - Math.PI / 2;
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);
    return { id: i, x, y };
  });

  return (
    <div
      ref={containerRef}
      className="poker-table-container"
    >
      <img
        src="/static/ranges/img/table.png"
        alt="Poker Table"
        className="poker-table-image"
      />
      {spots.map((spot, i) => (
        <div
          key={spot.id}
          className={`player-spot ${i === 0 ? "default-spot" : ""}`}
          style={{
            left: `${spot.x - 15}px`,
            top: `${spot.y - 15}px`,
          }}
        >
          {POSITIONS_6MAX[i]}
        </div>
      ))}
    </div>
  );
}

export default PokerTable;
