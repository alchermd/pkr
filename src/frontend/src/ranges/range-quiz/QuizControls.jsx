function QuizControls({ showAnswer, handleNext, handleAnswer }) {
  return (
    <div className="d-flex align-content-center justify-content-center gap-3">
      {/* These options should've been generated somewhere and not hardcoded */}

      {showAnswer ? (
        <button
          className="btn btn-secondary btn-lg w-100 flex"
          onClick={handleNext}
        >
          Next
        </button>
      ) : (
        <>
          <button
            className="btn btn-lg btn-danger w-100"
            onClick={() => handleAnswer("fold")}
          >
            Fold
          </button>
          <button
            className="btn btn-lg btn-primary w-100"
            onClick={() => handleAnswer("open")}
          >
            Open
          </button>
        </>
      )}
    </div>
  );
}

export default QuizControls;
