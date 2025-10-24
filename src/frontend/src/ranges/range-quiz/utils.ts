import { Grids, Position, Positions } from "@/ranges/types";
import { Accuracy, Attempts, Scenario, Stats } from "@/ranges/range-quiz/types";

export function randomScenario(
  grids: Grids,
  available_positions: Positions,
): Scenario {
  const randomPosition =
    available_positions[Math.floor(Math.random() * available_positions.length)];
  const randomGridData = grids.find(
    ([gridPosition, gridData]) => gridPosition === randomPosition,
  );
  if (randomGridData === undefined) throw Error("No grid found for position");

  const randomGrid = randomGridData[1];
  const randomRow = randomGrid[Math.floor(Math.random() * randomGrid.length)];
  const randomCell = randomRow[Math.floor(Math.random() * randomRow.length)];

  return {
    position: randomPosition,
    dealtCard: randomCell.label,
    answer: randomCell.action,
  };
}

export interface StreakData {
  streakString: string;
  streakClass: string;
  streakRecord: string;
  streakRecordClass: string;
}

// Returns an object containing the following:
// - streakString: A string representing the current streak (e.g., "3 correct answers in a row") or "N/A" if no attempts.
// - streakClass: A CSS class for styling the streak text ("text-success" for correct, "text-danger" for incorrect, "text-muted" for N/A).
// - streakRecord: A string representing the longest streak achieved so far. Same format as streakString.
// - streakRecordClass: A CSS class for styling the longest streak achieved so far. Same format as streakString.
export function getStreakData(attempts: Attempts): StreakData {
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

export interface AccuracyData {
  byPosition: Accuracy;
  bestPosition: Position | null;
  worstPosition: Position | null;
  bestPositionClass: string;
  worstPositionClass: string;
  summaryString: string;
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
export function getAccuracyByPosition(attempts: Attempts): AccuracyData {
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
  const stats: Stats = {};
  for (const { scenario, answerIsCorrect } of attempts) {
    const position = scenario.position;
    if (!stats[position]) stats[position] = { correct: 0, total: 0 };
    stats[position].total++;
    if (answerIsCorrect) stats[position].correct++;
  }

  // --- Compute accuracy per position ---
  const byPosition: Accuracy = {};
  for (const [pos, { correct, total }] of Object.entries(stats)) {
    const position = pos as Position;
    byPosition[position] = Math.round((correct / total) * 100);
  }

  // --- Derive best and worst ---
  const positions = Object.keys(byPosition) as Positions;
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
    const current = byPosition[pos] ?? 0;
    const best = byPosition[bestPosition] ?? 0;
    const worst = byPosition[worstPosition] ?? 0;
    if (current > best) bestPosition = pos;
    if (current < worst) worstPosition = pos;
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
