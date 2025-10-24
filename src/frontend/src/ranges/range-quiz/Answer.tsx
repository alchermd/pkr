import "@/ranges/range-quiz/Answer.css";
import Grid from "@/ranges/range-grid/Grid";
import { GridData, Position } from "@/ranges/types";

export interface AnswerProps {
  answer: string;
  showAnswer: boolean;
  answerIsCorrect: boolean;
  answerGrid: [Position, GridData];
}

function Answer({
  answer,
  showAnswer,
  answerIsCorrect,
  answerGrid,
}: AnswerProps) {
  return (
    <>
      <div className="answer text-center">
        {showAnswer && (
          <p>
            You selected <strong>{answer}</strong>.{" "}
            {answerIsCorrect ? (
              <span className="text-success">Correct, good job!</span>
            ) : (
              <span className="text-danger">Incorrect, try again.</span>
            )}
            <br />
            <button
              className="mt-2 btn btn-sm btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#informationModal"
            >
              More Information
            </button>
          </p>
        )}
      </div>
      <div className="modal modal-lg" id="informationModal" tabIndex={-1}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Review {answerGrid[0]} Range</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {answerGrid && (
                <Grid position={answerGrid[0]} grid={answerGrid[1]} />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn me-auto"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Answer;
