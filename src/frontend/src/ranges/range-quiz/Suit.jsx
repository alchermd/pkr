function Suit({ suit }) {
  switch (suit) {
    case "H":
      return <span className="text-danger">&hearts;</span>;
    case "D":
      return <span className="text-danger">&diams;</span>;
    case "C":
      return <span>&clubs;</span>;
    case "S":
      return <span>&spades;</span>;
    default:
      return null;
  }
}

export default Suit;
