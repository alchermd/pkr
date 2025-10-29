import dataclasses
import random

from core import constants
from core.range import PreFlopRange


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
        self.attempts: list[Attempt] = []

    def random_scenario(self) -> tuple[str, str]:
        """Return (position, hand)."""
        position = random.choice(constants.POSITIONS)
        while position not in self.preflop_range.positions:
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

    def stats(self) -> dict[str, float]:
        if not self.attempts:
            return {"accuracy": 0.0}
        correct = sum(1 for a in self.attempts if a.correct)
        return {"accuracy": correct / len(self.attempts)}
