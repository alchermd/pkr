import QuizCards from "./QuizCards";

function Question({ scenario }) {
  return (
    <div>
      <p>You are {scenario.position}</p>
      <QuizCards cards={scenario.dealtCard} />
      <p>What do you do?</p>
      {/*<p className="lead">*/}
      {/*  You were dealt {scenario.dealtCard} from {scenario.position}. What is your*/}
      {/*  action?*/}
      {/*</p>*/}
    </div>
  );
}

export default Question;
