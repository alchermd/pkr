import { Scenario } from "@/ranges/range-quiz/types";
import QuizCards from "@/ranges/range-quiz/QuizCards";
import { verbosePositionName } from "@/ranges/range-quiz/utils";

export interface QuestionProps {
  scenario: Scenario;
}

function Question({ scenario }: QuestionProps) {
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

export default Question;
