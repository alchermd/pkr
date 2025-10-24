export interface QuizControlsProps {
  showAnswer: boolean;
  handleNext: () => void;
  handleAnswer: (answer: string) => void;
  disableActions: boolean;
}

function QuizControls({
  showAnswer,
  handleNext,
  handleAnswer,
  disableActions,
}: QuizControlsProps) {
  return (
    <div className="d-flex align-content-center justify-content-center gap-3">
      {/* These options should've been generated somewhere and not hardcoded */}

      {showAnswer ? (
        <button
          className="btn btn-secondary btn-lg w-100 flex"
          onClick={handleNext}
          disabled={disableActions}
        >
          Next
        </button>
      ) : (
        <>
          <button
            className="btn btn-lg btn-danger w-100"
            onClick={() => handleAnswer("fold")}
            disabled={disableActions}
          >
            Fold
          </button>
          <button
            className="btn btn-lg btn-primary w-100"
            onClick={() => handleAnswer("open")}
            disabled={disableActions}
          >
            Open
          </button>
        </>
      )}
    </div>
  );
}

export default QuizControls;
