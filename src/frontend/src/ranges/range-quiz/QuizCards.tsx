import "@ranges/range-quiz/QuizCards.css";
import { useEffect, useState } from "react";
import { Cards } from "@/ranges/range-quiz/types";
import Suit from "@/ranges/range-quiz/Suit";

export interface QuizCardsProps {
  cards: Cards;
}

function QuizCards({ cards }: QuizCardsProps) {
  const [card1Suit, setCard1Suit] = useState<string>("");
  const [card2Suit, setCard2Suit] = useState<string>("");

  useEffect(() => {
    const suits = generateSuits(cards);
    setCard1Suit(suits[0]);
    setCard2Suit(suits[1]);
  }, [cards]);

  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
      <div className="card w-100 text-center border-secondary">
        <p className="d-flex align-items-center justify-content-center flex-row quiz-card">
          {cards[0]} <Suit suit={card1Suit} />
        </p>
      </div>
      <div className="card w-100 text-center border-secondary">
        <p className="d-flex align-items-center justify-content-center flex-row quiz-card">
          {cards[1]} <Suit suit={card2Suit} />
        </p>
      </div>
    </div>
  );
}

// Given a list of cards in the format of a single string ("AKs", "72o", "TT")
// Generate a random suit combination for the cards. The suit does not repeat for offsuit and pairs.
function generateSuits(cards: Cards): Array<string> {
  if (!(cards.length === 2 || cards.length === 3))
    throw new Error("Unsupported cards format");

  const isSuited = cards.length === 3 && cards[2] === "s";
  const suits = ["H", "D", "C", "S"];
  const results = [];
  results.push(suits[Math.floor(Math.random() * suits.length)]);
  // One random suit is enough for suited hands.
  if (isSuited) {
    return [results[0], results[0]];
  }

  // Make sure suits are different for offsuit / pairs.
  results.push(suits[Math.floor(Math.random() * suits.length)]);
  while (results[0] === results[1]) {
    results[1] = suits[Math.floor(Math.random() * suits.length)];
  }
  return results;
}

export default QuizCards;
