import dataclasses
import random
from typing import Dict, List, Tuple

import constants
from range import PreFlopRange


@dataclasses.dataclass
class Attempt:
    position: str
    hand: str
    chosen: str
    correct: bool
    expected: str


class TrainingSession:
    def __init__(self, preflop_range: PreFlopRange):
        self.preflop_range = preflop_range
        self.attempts: List[Attempt] = []

    @staticmethod
    def random_scenario() -> Tuple[str, str]:
        """Return (position, hand)."""
        position = random.choice(constants.POSITIONS)
        hand = random.choice(constants.HANDS)
        return position, hand

    def check_answer(self, position: str, hand: str, chosen_action: str) -> bool:
        correct_action = self.preflop_range.get_action(position, hand)
        correct = chosen_action == correct_action
        attempt = Attempt(
            position=position,
            hand=hand,
            chosen=chosen_action,
            correct=correct,
            expected=correct_action,
        )
        self.attempts.append(attempt)
        return correct

    def stats(self) -> Dict[str, float]:
        if not self.attempts:
            return {"accuracy": 0.0}
        correct = sum(1 for a in self.attempts if a.correct)
        return {"accuracy": correct / len(self.attempts)}
