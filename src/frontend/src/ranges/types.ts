export type Position = "BB" | "SB" | "BTN" | "CO" | "HJ" | "UTG";
export type Positions = Array<Position>;
export type HandAction = {
  label: string;
  action: "open" | "call" | "fold" | "raise" | "check";
};
export type GridRow = Array<HandAction>;
export type GridData = Array<GridRow>;
export type Grid = [Position, GridData];
export type Grids = Array<Grid>;
