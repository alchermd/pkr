import { useEffect, useState } from "react";

function App({ initialData }) {
  const { grids, available_positions } = initialData;
  const [scenario, setScenario] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const showAnswer = userAnswer !== null;
  const answerIsCorrect = userAnswer === scenario?.answer;

  useEffect(() => {
    if (scenario === null) {
      setScenario(randomScenario(grids, available_positions));
    }
  }, []);

  return (
    <div className="mt-5">
      {scenario && (
        <>
          <p>
            You were dealt {scenario.dealtCard} from {scenario.position}. What
            is your action?
          </p>

          <div>
            {/* These options should've been generated somewhere and not hardcoded */}
            <button
              className="btn btn-danger mx-2"
              onClick={() => setUserAnswer("fold")}
            >
              Fold
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setUserAnswer("open")}
            >
              Open
            </button>
          </div>

          {showAnswer && (
            <div>
              <p>Answer: {scenario.answer}</p>
              <p>{answerIsCorrect ? "Good job!" : "Incorrect"}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function randomScenario(grids, available_positions) {
  const randomPosition =
    available_positions[Math.floor(Math.random() * available_positions.length)];
  const randomGrid = grids.find(
    ([gridPosition, gridData]) => gridPosition === randomPosition,
  )[1];
  const randomRow = randomGrid[Math.floor(Math.random() * randomGrid.length)];
  const randomCell = randomRow[Math.floor(Math.random() * randomRow.length)];

  return {
    position: randomPosition,
    dealtCard: randomCell.label,
    answer: randomCell.action,
  };
}

export default App;
