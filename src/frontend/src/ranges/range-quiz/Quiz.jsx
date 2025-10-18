import { useEffect, useState } from "react";
import QuizControls from "./QuizControls";
import Question from "./Question";
import Answer from "./Answer";
import QuizStats from "./QuizStats";

function Quiz({ grids, available_positions }) {
  const [scenario, setScenario] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const showAnswer = userAnswer !== null;
  const answerIsCorrect = userAnswer === scenario?.answer;

  // Quiz stats
  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Feedback class for the card based on the user's answer
  const [feedbackClass, setFeedbackClass] = useState("");
  const [disableActions, setDisableActions] = useState(false);

  useEffect(() => {
    if (scenario === null) {
      setScenario(randomScenario(grids, available_positions));
    }
  }, []);

  function handleNext() {
    setScenario(randomScenario(grids, available_positions));
    setUserAnswer(null);
  }

  // Set the user's answer and add feedback classes to the card.
  // Also manages quiz stats.
  function handleAnswer(answer) {
    setUserAnswer(answer);
    const answerIsCorrect = answer === scenario.answer;

    // Quiz stats
    setAttempts((prev) => prev + 1);
    setCorrectAnswers((prev) => (answerIsCorrect ? prev + 1 : prev));

    // UI feedback
    const newFeedbackClass = answerIsCorrect
      ? "border-success border-2"
      : "border-danger border-2";
    setFeedbackClass(newFeedbackClass);
    setDisableActions(true);
    setTimeout(() => {
      setFeedbackClass("");
      setDisableActions(false);
    }, 750);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-1 col-lg-6 offset-lg-3">
          <div className={`card ${feedbackClass}`}>
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
                disableActions={disableActions}
                showAnswer={showAnswer}
                handleAnswer={handleAnswer}
                handleNext={handleNext}
              />
            </div>
          </div>

          <QuizStats correctAnswers={correctAnswers} attempts={attempts} />
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
