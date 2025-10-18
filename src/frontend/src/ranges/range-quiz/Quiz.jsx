import { useEffect, useState } from "react";
import QuizControls from "./QuizControls";
import Question from "./Question";
import Answer from "./Answer";

function Quiz({ grids, available_positions }) {
  const [scenario, setScenario] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const showAnswer = userAnswer !== null;
  const answerIsCorrect = userAnswer === scenario?.answer;

  useEffect(() => {
    if (scenario === null) {
      setScenario(randomScenario(grids, available_positions));
    }
  }, []);

  function handleNext() {
    setScenario(randomScenario(grids, available_positions));
    setUserAnswer(null);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-1 col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-body">
              {scenario && (
                <>
                  <Question scenario={scenario} />
                  <Answer
                    answer={userAnswer}
                    showAnswer={showAnswer}
                    answerIsCorrect={answerIsCorrect}
                  />
                </>
              )}
            </div>
            <div className="card-footer">
              <QuizControls
                showAnswer={showAnswer}
                handleAnswer={setUserAnswer}
                handleNext={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
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
export default Quiz;
