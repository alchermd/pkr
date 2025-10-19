function QuizStats({ attempts, isSummary }) {
  const correctAnswers = attempts.filter((a) => a.answerIsCorrect).length;
  const accuracy =
    attempts.length > 0
      ? ((correctAnswers / attempts.length) * 100).toFixed(2) + "%"
      : "N/A";
  const streakData = getStreakData(attempts);
  const accuracyData = getAccuracyByPosition(attempts);
  return (
    <div className="card mt-5">
      <div className="card-header">
        <h3 className="card-title">
          {isSummary ? "Session Summary" : "Stats"}
        </h3>
      </div>
      <div className="card-body">
        <div className="datagrid">
          <div className="datagrid-item">
            <div className="datagrid-title">Attempts</div>
            <div className="datagrid-content">
              {correctAnswers} / {attempts.length}{" "}
            </div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Accuracy</div>
            <div className="datagrid-content">{accuracy}</div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Current Streak</div>
            <div className={`datagrid-content ${streakData.streakClass}`}>
              {streakData.streakString}
            </div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Longest Streak</div>
            <div className={`datagrid-content ${streakData.streakRecordClass}`}>
              {streakData.streakRecord}
            </div>
          </div>
          {isSummary && (
            <>
              <div className="datagrid-item">
                <div className="datagrid-title">Accuracy by Position</div>
                <div className="datagrid-content">
                  <AccuracyList accuracyData={accuracyData} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Returns an object containing the following:
// - streakString: A string representing the current streak (e.g., "3 correct answers in a row") or "N/A" if no attempts.
// - streakClass: A CSS class for styling the streak text ("text-success" for correct, "text-danger" for incorrect, "text-muted" for N/A).
// - streakRecord: A string representing the longest streak achieved so far. Same format as streakString.
// - streakRecordClass: A CSS class for styling the longest streak achieved so far. Same format as streakString.
function getStreakData(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      streakString: "N/A",
      streakClass: "text-muted",
      streakRecord: "N/A",
      streakRecordClass: "text-muted",
    };
  }

  // --- Current streak (latest consecutive same-type answers) ---
  let streakLength = 0;
  let streakType = null;
  for (let i = attempts.length - 1; i >= 0; i--) {
    const currentType = attempts[i].answerIsCorrect ? "correct" : "incorrect";
    if (streakType === null || currentType === streakType) {
      streakLength++;
      streakType = currentType;
    } else break;
  }

  // --- Longest streak (regardless of correct/incorrect) ---
  let maxRun = 1;
  let maxType = attempts[0].answerIsCorrect ? "correct" : "incorrect";
  let currentRun = 1;
  for (let i = 1; i < attempts.length; i++) {
    const prev = attempts[i - 1].answerIsCorrect;
    const curr = attempts[i].answerIsCorrect;
    if (curr === prev) {
      currentRun++;
      if (currentRun > maxRun) {
        maxRun = currentRun;
        maxType = curr ? "correct" : "incorrect";
      }
    } else {
      currentRun = 1;
    }
  }

  // --- Format outputs ---
  const streakString = `${streakLength} ${streakType} answer${streakLength > 1 ? "s" : ""} in a row`;
  const streakClass = streakType === "correct" ? "text-success" : "text-danger";

  const streakRecord = `${maxRun} ${maxType} answer${maxRun > 1 ? "s" : ""} in a row`;
  const streakRecordClass =
    maxType === "correct" ? "text-success" : "text-danger";

  return { streakString, streakClass, streakRecord, streakRecordClass };
}

// Computes accuracy by position from the given attempts.
// Returns:
// {
//   byPosition: Record<string, number>,     // e.g. { BTN: 85, CO: 67, ... }
//   summaryString: string,                  // e.g. "BTN: 85% | CO: 67% | SB: 50%"
//   bestPosition: string | null,            // e.g. "BTN"
//   bestPositionClass: string,              // "text-success" | "text-muted"
//   worstPosition: string | null,           // e.g. "SB"
//   worstPositionClass: string,             // "text-danger" | "text-muted"
// }
function getAccuracyByPosition(attempts) {
  if (!attempts || attempts.length === 0) {
    return {
      byPosition: {},
      summaryString: "N/A",
      bestPosition: null,
      bestPositionClass: "text-muted",
      worstPosition: null,
      worstPositionClass: "text-muted",
    };
  }

  // --- Group attempts by position ---
  const stats = {};
  for (const { scenario, answerIsCorrect } of attempts) {
    const position = scenario.position;
    if (!stats[position]) stats[position] = { correct: 0, total: 0 };
    stats[position].total++;
    if (answerIsCorrect) stats[position].correct++;
  }

  // --- Compute accuracy per position ---
  const byPosition = {};
  for (const [pos, { correct, total }] of Object.entries(stats)) {
    byPosition[pos] = Math.round((correct / total) * 100);
  }

  // --- Derive best and worst ---
  const positions = Object.keys(byPosition);
  if (positions.length === 0) {
    return {
      byPosition,
      summaryString: "N/A",
      bestPosition: null,
      bestPositionClass: "text-muted",
      worstPosition: null,
      worstPositionClass: "text-muted",
    };
  }

  let bestPosition = positions[0];
  let worstPosition = positions[0];
  for (const pos of positions) {
    if (byPosition[pos] > byPosition[bestPosition]) bestPosition = pos;
    if (byPosition[pos] < byPosition[worstPosition]) worstPosition = pos;
  }

  const summaryString = positions
    .map((pos) => `${pos}: ${byPosition[pos]}%`)
    .join(" | ");

  return {
    byPosition,
    summaryString,
    bestPosition,
    bestPositionClass: "text-success",
    worstPosition,
    worstPositionClass: "text-danger",
  };
}
function AccuracyList({ accuracyData }) {
  console.log(accuracyData);
  const {
    byPosition,
    bestPosition,
    worstPosition,
    bestPositionClass,
    worstPositionClass,
  } = accuracyData;

  const positions = Object.keys(byPosition);
  if (positions.length === 0) {
    return <p className="text-muted">No data yet.</p>;
  }

  return (
    <ul className="list-unstyled mt-3">
      {positions.map((pos) => {
        let className = "text-body";
        if (pos === bestPosition) className = bestPositionClass;
        else if (pos === worstPosition) className = worstPositionClass;

        return (
          <li key={pos} className={className}>
            <strong>{pos}</strong>: {byPosition[pos]}%
          </li>
        );
      })}
    </ul>
  );
}
export default QuizStats;
