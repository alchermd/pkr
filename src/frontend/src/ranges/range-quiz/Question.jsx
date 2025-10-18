import QuizCards from "./QuizCards";

function Question({ scenario }) {
  return (
    <div className="text-center py-5">
      <QuizCards cards={scenario.dealtCard} />
      <p className="mt-4 h2">
        {verbosePositionName(scenario.position)} ({scenario.position})
      </p>
      <p className="mt-4">
        You are dealt <strong>{scenario.dealtCard}</strong> in the{" "}
        <strong>{scenario.position}</strong> position.
      </p>
      <p className="mt-4">What action do you choose?</p>
    </div>
  );
}

function verbosePositionName(position) {
  const positionNames = {
    UTG: "Under the Gun",
    HJ: "Hijack",
    CO: "Cutoff",
    BTN: "Button",
    SB: "Small Blind",
    BB: "Big Blind",
  };
  return positionNames[position] || position;
}

export default Question;
