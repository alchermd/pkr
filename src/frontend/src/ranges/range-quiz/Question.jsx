function Question({ scenario }) {
  return (
    <p className="lead">
      You were dealt {scenario.dealtCard} from {scenario.position}. What is your
      action?
    </p>
  );
}

export default Question;
