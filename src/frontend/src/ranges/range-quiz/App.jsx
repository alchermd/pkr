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

  function handleNext() {
    setScenario(randomScenario(grids, available_positions));
    setUserAnswer(null);
  }

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-1 col-lg-6 offset-lg-3">
            <div className="card">
              <div className="card-body">
                {scenario && (
                  <>
                    <p className="lead">
                      You were dealt {scenario.dealtCard} from{" "}
                      {scenario.position}. What is your action?
                    </p>

                    <div style={{ minHeight: "50px", height: "50px" }}>
                      {showAnswer && (
                        <p className="">
                          You selected <strong>{userAnswer}</strong>.{" "}
                          {answerIsCorrect ? (
                            <span className="text-success">
                              Correct, good job!
                            </span>
                          ) : (
                            <span className="text-danger">
                              Incorrect, try again.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="card-footer">
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
                        onClick={() => setUserAnswer("fold")}
                      >
                        Fold
                      </button>
                      <button
                        className="btn btn-lg btn-primary w-100"
                        onClick={() => setUserAnswer("open")}
                      >
                        Open
                      </button>
                    </>
                  )}
                </div>
              </div>
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

export default App;
