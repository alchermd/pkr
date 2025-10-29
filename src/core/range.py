import csv
import json
from pathlib import Path

from core import constants

RANGE_FILES_DIR = Path(__file__).parent / "range_files"


class InvalidPositionException(Exception):
    pass


class InvalidHandException(Exception):
    pass


class InvalidActionException(Exception):
    pass


class PreFlopRange:
    def __init__(self, name: str, description: str = ""):
        self.name = name
        # Dict[(position, hand)] -> action
        self.entries: dict[tuple[str, str], str] = {}
        self.positions: set[str] = set()
        self.description = description

    def set_action(self, position: str, hand: str, action: str):
        if position not in constants.POSITIONS:
            raise InvalidPositionException(f"Invalid position: {position}")
        if hand not in constants.HANDS:
            raise InvalidHandException(f"Invalid hand: {hand}")
        if action not in constants.ACTIONS:
            raise InvalidActionException(f"Invalid action: {action}")
        self.entries[(position, hand)] = action
        self.positions.add(position)

    def get_action(self, position: str, hand: str) -> str:
        return self.entries.get((position, hand), "fold")  # default to fold


def load_range_from_csv(filename: str, name: str = None) -> PreFlopRange:
    """
    Parse a CSV with header: pos,hand,action
    Returns a PreflopRange instance.
    """
    preflop_range = PreFlopRange(name)

    with open(RANGE_FILES_DIR / filename, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            pos = row["pos"].strip()
            hand = row["hand"].strip()
            action = row["action"].strip()
            preflop_range.set_action(pos, hand, action)

    return preflop_range


def load_range(base_name: str) -> PreFlopRange:
    """
    Looks for the CSV and metadata (JSON) file for the given base name and builds a PreFlopRange instance.
    """
    meta_path = RANGE_FILES_DIR / f"{base_name}.meta.json"
    if not meta_path.exists():
        raise FileNotFoundError(f"No metadata file found for {base_name}")

    with open(meta_path) as f:
        meta = json.load(f)

    csv_filename = f"{base_name}.csv"
    csv_path = RANGE_FILES_DIR / csv_filename
    if not csv_path.exists():
        raise FileNotFoundError(f"No CSV file found for {base_name}")

    preflop_range = load_range_from_csv(csv_filename)
    preflop_range.name = meta["name"]
    preflop_range.description = meta["description"]
    return preflop_range


def make_grid(preflop_range: PreFlopRange, position: str):
    """
    Build a 13x13 grid for a specific position.
    Each cell is {label: hand, action: str}.
    """
    grid = []
    for i, r1 in enumerate(constants.RANKS):
        row = []
        for j, r2 in enumerate(constants.RANKS):
            if i < j:
                hand = f"{r1}{r2}s"
            elif i > j:
                hand = f"{r2}{r1}o"
            else:
                hand = f"{r1}{r1}"
            row.append(
                {
                    "label": hand,
                    "action": preflop_range.get_action(position, hand),
                }
            )
        grid.append(row)
    return grid
