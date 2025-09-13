import csv
from pathlib import Path
from typing import Dict, Tuple, List, Set

import constants

RANGE_FILES_DIR = Path(__file__).parent / "range_files"


class PreFlopRange:
    def __init__(self, name: str):
        self.name = name
        # Dict[(position, hand)] -> action
        self.entries: Dict[Tuple[str, str], str] = {}
        self.positions: Set[str] = set()

    def set_action(self, position: str, hand: str, action: str):
        if position not in constants.POSITIONS:
            raise ValueError(f"Invalid position: {position}")
        if hand not in constants.HANDS:
            raise ValueError(f"Invalid hand: {hand}")
        if action not in constants.ACTIONS:
            raise ValueError(f"Invalid action: {action}")
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
