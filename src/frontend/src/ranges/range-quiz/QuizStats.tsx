import { Attempts } from "@/ranges/range-quiz/types";
import AccuracyList from "@/ranges/range-quiz/AccuracyList";
import {
  getAccuracyByPosition,
  getStreakData,
} from "@/ranges/range-quiz/utils";

export interface QuizStatsProps {
  attempts: Attempts;
  isSummary: boolean;
}

function QuizStats({ attempts, isSummary }: QuizStatsProps) {
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
                  <AccuracyList {...accuracyData} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizStats;
