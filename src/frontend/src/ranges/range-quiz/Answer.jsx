import "./Answer.css";

function Answer({ answer, showAnswer, answerIsCorrect }) {
  return (
    <div className="answer">
      {showAnswer && (
        <p>
          You selected <strong>{answer}</strong>.{" "}
          {answerIsCorrect ? (
            <span className="text-success">Correct, good job!</span>
          ) : (
            <span className="text-danger">Incorrect, try again.</span>
          )}
        </p>
      )}
    </div>
  );
}

export default Answer;
