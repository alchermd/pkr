function Legend() {
  return (
    <div>
      <h6>Legend</h6>
      <div className="d-flex justify-content-center gap-3">
        <div className="d-flex align-items-center justify-content-center">
          <span className="legend-box action-open me-2"></span> Open
        </div>
        <div className="d-flex align-items-center">
          <span className="legend-box action-fold me-2"></span> Fold
        </div>
      </div>
    </div>
  );
}

export default Legend;
