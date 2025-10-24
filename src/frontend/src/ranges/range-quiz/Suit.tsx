export interface SuitProps {
  suit: string;
}

function Suit({ suit }: SuitProps) {
  switch (suit) {
    case "H":
      return <span className="text-danger">&hearts;</span>;
    case "D":
      return <span className="text-primary">&diams;</span>;
    case "C":
      return <span className="text-success">&clubs;</span>;
    case "S":
      return <span>&spades;</span>;
    default:
      return null;
  }
}

export default Suit;
