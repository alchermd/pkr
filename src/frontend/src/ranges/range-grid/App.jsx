import Grid from "./Grid";
import PokerTable from "../components/PokerTable";

export default function App({initialData}) {
  const {range_name, grids} = initialData;
  return <div className="container">
        <PokerTable />
  </div>;
}
