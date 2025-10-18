function QuizStats({ correctAnswers, attempts }) {
  const accuracy =
    attempts > 0 ? ((correctAnswers / attempts) * 100).toFixed(2) + "%" : "N/A";
  return (
    <div className="card mt-5">
      <div className="card-header">
        <h3 className="card-title">Stats</h3>
      </div>
      <div className="card-body">
        <div className="datagrid">
          <div className="datagrid-item">
            <div className="datagrid-title">Attempts</div>
            <div className="datagrid-content">
              {correctAnswers} / {attempts}{" "}
            </div>
          </div>
          <div className="datagrid-item">
            <div className="datagrid-title">Accuracy</div>
            <div className="datagrid-content">{accuracy}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizStats;
