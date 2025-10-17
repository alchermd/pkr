function App({ initialData }) {
  const { grids, available_positions } = initialData;
  const scenario = randomScenario(grids, available_positions);
  return (
    <p>
      You were dealt {scenario.dealtCard} from {scenario.position}. What is your
      action?
      <br />
      Answer: {scenario.answer}
    </p>
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
