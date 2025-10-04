import Grid from "./Grid";

export default function App({initialData}) {
  const {range_name, grids} = initialData;
  return <>
    <div className="container-fluid">
      <h1 className="mb-4 text-center">{range_name}</h1>
      <div className="row">
        {grids.map(([position, grid], index) => <Grid position={position} grid={grid} key={`grid-${index}`}/>)}
      </div>
    </div>
  </>;
}
