import csv
import random
from pathlib import Path
from typing import Dict, Tuple, List

RANGE_FILES_DIR = Path(__file__).parent / "range_files"
POSITIONS = ["UTG", "MP", "CO", "BTN", "SB", "BB"]
ACTIONS = ["fold", "open", "call", "3bet", "4bet"]


# Generate canonical 169 hands (pairs, suited, offsuit)
def generate_hands() -> List[str]:
    ranks = "AKQJT98765432"
    hands = []

    for i, r1 in enumerate(ranks):
        for j, r2 in enumerate(ranks):
            if i < j:
                hands.append(r1 + r2 + "s")  # suited
                hands.append(r1 + r2 + "o")  # offsuit
            elif i == j:
                hands.append(r1 + r2)  # pair
    return hands


HANDS = generate_hands()


class PreflopRange:
    def __init__(self, name: str):
        self.name = name
        # Dict[(position, hand)] -> action
        self.entries: Dict[Tuple[str, str], str] = {}

    def set_action(self, position: str, hand: str, action: str):
        if position not in POSITIONS:
            raise ValueError(f"Invalid position: {position}")
        if hand not in HANDS:
            raise ValueError(f"Invalid hand: {hand}")
        if action not in ACTIONS:
            raise ValueError(f"Invalid action: {action}")
        self.entries[(position, hand)] = action

    def get_action(self, position: str, hand: str) -> str:
        return self.entries.get((position, hand), "fold")  # default to fold


class TrainingSession:
    def __init__(self, preflop_range: PreflopRange):
        self.preflop_range = preflop_range
        self.attempts: List[Dict] = []

    def random_scenario(self) -> Tuple[str, str]:
        """Return (position, hand)."""
        position = random.choice(POSITIONS)
        hand = random.choice(HANDS)
        return position, hand

    def check_answer(self, position: str, hand: str, chosen_action: str) -> bool:
        correct_action = self.preflop_range.get_action(position, hand)
        correct = chosen_action == correct_action
        self.attempts.append(
            {
                "position": position,
                "hand": hand,
                "chosen": chosen_action,
                "correct": correct,
                "expected": correct_action,
            }
        )
        return correct

    def stats(self) -> Dict[str, float]:
        if not self.attempts:
            return {"accuracy": 0.0}
        correct = sum(1 for a in self.attempts if a["correct"])
        return {"accuracy": correct / len(self.attempts)}


def load_range_from_csv(filename: str, name: str = None) -> PreflopRange:
    """
    Parse a CSV with header: pos,hand,action
    Returns a PreflopRange instance.
    """
    preflop_range = PreflopRange(name)

    with open(RANGE_FILES_DIR / filename, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            pos = row["pos"].strip()
            hand = row["hand"].strip()
            action = row["action"].strip()
            preflop_range.set_action(pos, hand, action)

    return preflop_range


if __name__ == "__main__":
    # Create a sample range
    r = load_range_from_csv("6max_100bb.csv", "6max 100bb")

    # Training session
    session = TrainingSession(r)

    pos, hand = session.random_scenario()
    while pos != "UTG":
        pos, hand = session.random_scenario()

    print(f"Scenario: {pos} with {hand}")
    answer = input("What action? (fold/open/call/3bet/4bet): ")

    # Pretend user says "open"
    result = session.check_answer(pos, hand, answer)
    print("Correct!" if result else "Wrong!")
    print("Stats:", session.stats())
