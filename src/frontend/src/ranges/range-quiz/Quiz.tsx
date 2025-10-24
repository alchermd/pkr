import { useEffect, useState } from "react";
import { Grids, Position, Positions } from "@/ranges/types";
import QuizControls from "@/ranges/range-quiz/QuizControls";
import QuizStats from "@/ranges/range-quiz/QuizStats";
import Answer from "@/ranges/range-quiz/Answer";
import Question from "@/ranges/range-quiz/Question";
import { Attempts, Scenario } from "@/ranges/range-quiz/types";
import { randomScenario } from "@/ranges/range-quiz/utils";

const HANDS_PER_SESSION = 20;

export interface QuizProps {
  grids: Grids;
  available_positions: Positions;
}

function Quiz({ grids, available_positions }: QuizProps) {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const showAnswer = userAnswer !== null;
  const answerIsCorrect = userAnswer === scenario?.answer;
  const selectedGrid = grids.find((grid) => grid[0] === scenario?.position);

  // Quiz settings
  const [autoNext, setAutoNext] = useState(false);

  // Quiz stats
  const [attempts, setAttempts] = useState<Attempts>([]);
  const sessionIsOver = attempts.length >= HANDS_PER_SESSION;

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
  function handleAnswer(answer: string) {
    if (scenario === null) throw Error("No scenario set");

    setUserAnswer(answer);
    const answerIsCorrect = answer === scenario.answer;

    // Quiz stats
    setAttempts((prev) => [...prev, { answerIsCorrect, scenario }]);

    // UI feedback
    const newFeedbackClass = answerIsCorrect
      ? "border-success border-2"
      : "border-danger border-2";
    setFeedbackClass(newFeedbackClass);
    setDisableActions(true);
    setTimeout(() => {
      setFeedbackClass("");
      setDisableActions(false);
      if (autoNext) {
        handleNext();
      }
    }, 750);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-1 col-lg-6 offset-lg-3">
          {sessionIsOver ? null : (
            <div className={`card ${feedbackClass}`}>
              <div className="card-body">
                <label className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={autoNext}
                    onChange={(e) => setAutoNext(e.target.checked)}
                  />
                  <span className="form-check-label">Auto-next</span>
                </label>

                {scenario && selectedGrid && (
                  <>
                    <Question scenario={scenario} />
                    <Answer
                      answer={userAnswer}
                      showAnswer={showAnswer}
                      answerIsCorrect={answerIsCorrect}
                      answerGrid={selectedGrid}
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
          )}

          <QuizStats attempts={attempts} isSummary={sessionIsOver} />
        </div>
      </div>
    </div>
  );
}

export default Quiz;
